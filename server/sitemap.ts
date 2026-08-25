import { Request, Response } from "express";
import { db } from "./db";
import { projects, blogs } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function generateSitemap(req: Request, res: Response) {
  try {
    const baseUrl = "https://www.gokulkp.com";
    
    // Fetch dynamic content
    const allProjects = await db.select().from(projects).where(eq(projects.status, "published"));
    const allBlogs = await db.select().from(blogs).where(eq(blogs.published, true));
    
    // Base static routes
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
    
    // Add dynamic projects
    allProjects.forEach(project => {
      let routeUrl = `/portfolio/${project.category}/${project.slug}`;
      if (project.category === "marketing") {
        routeUrl = `/marketing/${project.slug}`;
      }
      routes.push({
        url: routeUrl,
        changefreq: "monthly",
        priority: 0.7
      });
    });
    
    // Add dynamic blogs
    allBlogs.forEach(blog => {
      routes.push({
        url: `/blogs/${blog.slug}`,
        changefreq: "monthly",
        priority: 0.7
      });
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

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).end();
  }
}
