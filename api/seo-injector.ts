import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from "fs/promises";
import path from "path";
import { injectDynamicSEO, SITE_URL } from "../server/_core/seoInjector.js";

let cachedTemplate: string | null = null;

/**
 * Loads the SPA shell. Prefers the copy bundled with the function (see
 * `functions.includeFiles` in vercel.json). Falls back to fetching it from a
 * fixed origin — never from the request's Host header, which a client controls.
 */
async function loadTemplate(): Promise<string> {
  if (cachedTemplate) return cachedTemplate;

  for (const file of ["dist/shell.html", "dist/index.html"]) {
    try {
      cachedTemplate = await fs.readFile(path.join(process.cwd(), file), "utf-8");
      return cachedTemplate;
    } catch {
      // try the next option
    }
  }

  const origin =
    process.env.VERCEL_ENV === "production" || !process.env.VERCEL_URL
      ? SITE_URL
      : `https://${process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL}`;
  const response = await fetch(`${origin}/shell.html`);
  if (!response.ok) {
    throw new Error(`Failed to fetch shell.html from ${origin}: ${response.status}`);
  }
  cachedTemplate = await response.text();
  return cachedTemplate;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const template = await loadTemplate();
    const requestUrl = (req.headers["x-invoke-path"] as string | undefined) || req.url || "/";
    const { status, html } = await injectDynamicSEO(requestUrl, template);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      status === 200 ? "public, s-maxage=60, stale-while-revalidate=300" : "public, s-maxage=60"
    );
    return res.status(status).send(html);
  } catch (error) {
    console.error("Error in SEO injector:", error);
    return res.status(500).end();
  }
}
