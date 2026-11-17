import { mustNotIndex } from "../../shared/seoPolicy.js";

/**
 * Pure HTML helpers shared by the build-time prerender and the SEO function.
 * No database or Node-only imports so the prerender script can use it.
 */

export const SITE_URL = "https://www.gokulkp.com";

export type PageMeta = {
  title: string;
  description: string;
  image?: string;
};

export type InjectResult = {
  status: 200 | 404;
  html: string;
};

/** Escapes text for use inside an HTML attribute or text node. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function absoluteUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? "" : "/"}${encodeURI(src)}`;
}

export function withBrand(title: string): string {
  return title.includes("Gokul KP") ? title : `${title} | Gokul KP`;
}

/** Replaces the first match of `pattern` with `replacement` verbatim (no `$` interpretation). */
function replaceTag(html: string, pattern: RegExp, replacement: string): string {
  return html.replace(pattern, () => replacement);
}

/** Sets or inserts a <meta> tag identified by `attr="key"`. */
function setMeta(html: string, attr: "name" | "property", key: string, content: string): string {
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}" data-static-seo />`;
  const pattern = new RegExp(`<meta ${attr}="${key.replace(/[.:]/g, "\\$&")}"[^>]*>`, "s");
  return pattern.test(html) ? replaceTag(html, pattern, tag) : html.replace("</head>", () => `  ${tag}\n</head>`);
}

function setCanonical(html: string, url: string): string {
  const tag = `<link rel="canonical" href="${escapeHtml(url)}" data-static-seo />`;
  return /<link rel="canonical"[^>]*>/.test(html)
    ? replaceTag(html, /<link rel="canonical"[^>]*>/, tag)
    : html.replace("</head>", () => `  ${tag}\n</head>`);
}

/** Replaces the crawler fallback block (between the markers in index.html). */
function setFallbackBody(html: string, body: string): string {
  return replaceTag(html, /<!--fallback:start-->[\s\S]*?<!--fallback:end-->/, `<!--fallback:start-->${body}<!--fallback:end-->`);
}

/** Applies page metadata to an HTML template. Used by the prerender script and the SEO function. */
export function applyMeta(html: string, path: string, meta: PageMeta & { noindex?: boolean; bodyHtml?: string }): string {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  let out = replaceTag(html, /<title[^>]*>[\s\S]*?<\/title>/, `<title data-static-seo>${escapeHtml(meta.title)}</title>`);
  out = setMeta(out, "name", "title", meta.title);
  out = setMeta(out, "name", "description", meta.description);
  const noindex = meta.noindex || mustNotIndex(path, meta.title, meta.description);
  out = setMeta(out, "name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
  out = setMeta(out, "property", "og:title", meta.title);
  out = setMeta(out, "property", "og:description", meta.description);
  out = setMeta(out, "property", "og:url", url);
  out = setMeta(out, "property", "twitter:title", meta.title);
  out = setMeta(out, "property", "twitter:description", meta.description);
  out = setMeta(out, "property", "twitter:url", url);
  if (meta.image) {
    const image = absoluteUrl(meta.image);
    out = setMeta(out, "property", "og:image", image);
    out = setMeta(out, "property", "og:image:secure_url", image);
    out = setMeta(out, "property", "twitter:image", image);
  }
  out = setCanonical(out, url);
  out = setFallbackBody(
    out,
    meta.bodyHtml ??
      `<main><h1>${escapeHtml(meta.title.replace(/\s*[|—-]\s*Gokul KP$/, ""))}</h1><p>${escapeHtml(meta.description)}</p><p><a href="/">Home</a> · <a href="/results">Case studies</a> · <a href="/contact">Contact</a></p></main>`
  );
  return out;
}

export const NOT_FOUND_META: PageMeta & { noindex: true } = {
  title: "Page not found | Gokul KP",
  description: "This page doesn't exist. Browse case studies, services and contact details on gokulkp.com.",
  noindex: true,
};

