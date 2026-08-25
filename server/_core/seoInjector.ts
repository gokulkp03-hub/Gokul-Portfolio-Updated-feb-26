import { db } from "../db";
import { blogs, projects } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export async function injectDynamicSEO(url: string, html: string): Promise<string> {
  try {
    let title = "";
    let description = "";
    let image = "";

    const blogMatch = url.match(/^\/blogs\/([^\/]+)$/);
    const projectMatch = url.match(/^\/portfolio\/[^\/]+\/([^\/]+)$/) || url.match(/^\/marketing\/([^\/]+)$/);

    if (blogMatch) {
      const slug = blogMatch[1];
      const blog = await db.select().from(blogs).where(eq(blogs.slug, slug)).get();
      if (blog) {
        title = blog.metaTitle || `${blog.title} | Gokul KP`;
        description = blog.metaDescription || blog.excerpt || "";
        image = blog.thumbnail || "";
      }
    } else if (projectMatch) {
      const slug = projectMatch[1];
      const project = await db.select().from(projects).where(eq(projects.slug, slug)).get();
      if (project) {
        title = project.metaTitle || `${project.title} | Gokul KP`;
        description = project.metaDescription || project.description || "";
        image = project.ogImage || project.thumbnail || "";
      }
    }

    if (!title && !description && !image) {
      return html;
    }

    let modifiedHtml = html;
    
    if (title) {
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      modifiedHtml = modifiedHtml.replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${title}" />`);
      modifiedHtml = modifiedHtml.replace(/<meta name="twitter:title" content=".*?"\s*\/>/, `<meta name="twitter:title" content="${title}" />`);
    }
    
    if (description) {
      modifiedHtml = modifiedHtml.replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${description}" />`);
      modifiedHtml = modifiedHtml.replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${description}" />`);
      modifiedHtml = modifiedHtml.replace(/<meta name="twitter:description" content=".*?"\s*\/>/, `<meta name="twitter:description" content="${description}" />`);
    }

    if (image) {
      modifiedHtml = modifiedHtml.replace(/<meta property="og:image" content=".*?"\s*\/>/, `<meta property="og:image" content="${image}" />`);
      modifiedHtml = modifiedHtml.replace(/<meta name="twitter:image" content=".*?"\s*\/>/, `<meta name="twitter:image" content="${image}" />`);
    }

    return modifiedHtml;
  } catch (error) {
    console.error("Error injecting dynamic SEO:", error);
    return html;
  }
}
