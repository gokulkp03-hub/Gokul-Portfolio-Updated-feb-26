import { db } from "../db";
import { blogs, projects } from "../../drizzle/schema";
import { and, eq } from "drizzle-orm";
import { projects as staticProjects } from "../../client/src/data/projects";
import { marketingCampaigns as staticMarketing } from "../../client/src/data/marketing";
import { applyMeta, NOT_FOUND_META, withBrand, type InjectResult, type PageMeta } from "./pageMeta";

export { SITE_URL } from "./pageMeta";

async function findBlog(slug: string): Promise<PageMeta | null> {
  const blog = await db
    .select()
    .from(blogs)
    .where(and(eq(blogs.slug, slug), eq(blogs.published, true)))
    .get();
  if (!blog) return null;
  return {
    title: blog.metaTitle || withBrand(blog.title),
    description: blog.metaDescription || blog.excerpt || "",
    image: blog.thumbnail || undefined,
  };
}

async function findProject(slug: string): Promise<PageMeta | null> {
  const project = await db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.status, "published")))
    .get();
  if (project) {
    return {
      title: project.metaTitle || withBrand(project.title),
      description: project.metaDescription || project.description || "",
      image: project.ogImage || project.thumbnail || undefined,
    };
  }
  // The client falls back to the static data files, so the server must too.
  const fromProjects = staticProjects.find(p => p.slug === slug);
  if (fromProjects) {
    return { title: withBrand(fromProjects.title), description: fromProjects.description, image: fromProjects.thumbnail };
  }
  const fromMarketing = staticMarketing.find(m => m.slug === slug);
  if (fromMarketing) {
    return {
      title: withBrand(`${fromMarketing.client}: ${fromMarketing.title}`),
      description: fromMarketing.description,
      image: fromMarketing.visuals[0],
    };
  }
  return null;
}

/** Injects per-page SEO for dynamic routes; unknown slugs get a real 404. */
export async function injectDynamicSEO(rawUrl: string, html: string): Promise<InjectResult> {
  const path = (rawUrl.split(/[?#]/)[0] || "/").replace(/\/+$/, "") || "/";
  let slug: string | undefined;

  try {
    let meta: PageMeta | null = null;
    const blogMatch = path.match(/^\/blogs\/([^/]+)$/);
    const projectMatch = path.match(/^\/portfolio\/[^/]+\/([^/]+)$/) || path.match(/^\/marketing\/([^/]+)$/);

    if (blogMatch) {
      slug = decodeURIComponent(blogMatch[1]);
      meta = await findBlog(slug);
    } else if (projectMatch) {
      slug = decodeURIComponent(projectMatch[1]);
      meta = await findProject(slug);
    }

    if (!meta) {
      return { status: 404, html: applyMeta(html, path, NOT_FOUND_META) };
    }
    return { status: 200, html: applyMeta(html, path, meta) };
  } catch (error) {
    // Database trouble shouldn't take pages down: serve the SPA shell, unindexed.
    console.error("Error injecting dynamic SEO:", error);
    return { status: 200, html: applyMeta(html, path, { ...NOT_FOUND_META, title: "Gokul KP" }) };
  }
}
