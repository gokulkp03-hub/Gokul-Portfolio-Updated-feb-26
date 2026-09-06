import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from "../server/db";
import { projects, blogs } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const baseUrl = "https://www.gokulkp.com";
    
    let allProjects: any[] = [];
    let allBlogs: any[] = [];

    try {
      allProjects = await db.select().from(projects).where(eq(projects.status, "published"));
      allBlogs = await db.select().from(blogs).where(eq(blogs.published, true));
    } catch (e) {
      console.warn("[Sitemap] Could not query database directly, using static fallback routes:", e);
    }
    
    const coreRoutes = [
      { url: "/", changefreq: "weekly", priority: 1.0 },
      { url: "/portfolio", changefreq: "weekly", priority: 0.9 },
      { url: "/marketing", changefreq: "weekly", priority: 0.9 },
      { url: "/results", changefreq: "weekly", priority: 0.9 },
      { url: "/portfolio/video", changefreq: "monthly", priority: 0.8 },
      { url: "/portfolio/photo", changefreq: "monthly", priority: 0.8 },
      { url: "/services", changefreq: "monthly", priority: 0.8 },
      { url: "/about", changefreq: "monthly", priority: 0.7 },
      { url: "/contact", changefreq: "monthly", priority: 0.7 },
      { url: "/blogs", changefreq: "weekly", priority: 0.7 },
      { url: "/marketing/aqua-care-uae", changefreq: "monthly", priority: 0.8 },
      { url: "/marketing/prepmeal", changefreq: "monthly", priority: 0.8 },
      { url: "/marketing/steaburg-local-seo", changefreq: "monthly", priority: 0.8 },
      { url: "/privacy", changefreq: "yearly", priority: 0.3 },
    ];

    const routeSet = new Set(coreRoutes.map(r => r.url));
    const routes = [...coreRoutes];
    
    allProjects.forEach(project => {
      let routeUrl = `/portfolio/${project.category}/${project.slug}`;
      if (project.category === "marketing") {
        routeUrl = `/marketing/${project.slug}`;
      }
      if (!routeSet.has(routeUrl)) {
        routeSet.add(routeUrl);
        routes.push({ url: routeUrl, changefreq: "monthly", priority: 0.7 });
      }
    });
    
    allBlogs.forEach(blog => {
      const blogUrl = `/blogs/${blog.slug}`;
      if (!routeSet.has(blogUrl)) {
        routeSet.add(blogUrl);
        routes.push({ url: blogUrl, changefreq: "monthly", priority: 0.7 });
      }
    });

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    routes.forEach(route => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}${route.url}</loc>\n`;
      sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${route.priority}</priority>\n`;
      sitemap += `  </url>\n`;
    });
    
    sitemap += `</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return res.status(500).end();
  }
}
