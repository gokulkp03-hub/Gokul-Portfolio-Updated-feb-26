import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from "../server/db";
import { projects, blogs } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const baseUrl = "https://www.gokulkp.com";
    
    const allProjects = await db.select().from(projects).where(eq(projects.status, "published"));
    const allBlogs = await db.select().from(blogs).where(eq(blogs.published, true));
    
    const routes = [
      { url: "/", changefreq: "weekly", priority: 1.0 },
      { url: "/marketing", changefreq: "monthly", priority: 0.8 },
      { url: "/portfolio/video", changefreq: "monthly", priority: 0.8 },
      { url: "/portfolio/photo", changefreq: "monthly", priority: 0.8 },
      { url: "/services", changefreq: "monthly", priority: 0.7 },
      { url: "/about", changefreq: "monthly", priority: 0.6 },
      { url: "/contact", changefreq: "yearly", priority: 0.5 },
      { url: "/blogs", changefreq: "weekly", priority: 0.8 },
    ];
    
    allProjects.forEach(project => {
      let routeUrl = `/portfolio/${project.category}/${project.slug}`;
      if (project.category === "marketing") {
        routeUrl = `/marketing/${project.slug}`;
      }
      routes.push({ url: routeUrl, changefreq: "monthly", priority: 0.7 });
    });
    
    allBlogs.forEach(blog => {
      routes.push({ url: `/blogs/${blog.slug}`, changefreq: "monthly", priority: 0.7 });
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
    return res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return res.status(500).end();
  }
}
