import type { VercelRequest, VercelResponse } from '@vercel/node';
import { injectDynamicSEO } from "../server/_core/seoInjector";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Determine the base URL to fetch the raw index.html from the same domain
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    
    // Fetch the generic static index.html from the root path
    const response = await fetch(`${baseUrl}/index.html`);
    if (!response.ok) {
      throw new Error(`Failed to fetch index.html: ${response.statusText}`);
    }
    
    let template = await response.text();
    
    // Inject the dynamic SEO tags
    // req.url is the path that was requested (e.g. /blogs/my-slug)
    const requestUrl = req.headers["x-invoke-path"] || req.url || "/";
    template = await injectDynamicSEO(requestUrl as string, template);
    
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res.status(200).send(template);
  } catch (error) {
    console.error("Error in SEO injector:", error);
    return res.status(500).end();
  }
}
