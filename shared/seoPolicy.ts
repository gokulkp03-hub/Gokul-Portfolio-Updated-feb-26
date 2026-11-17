/**
 * Brands this site must not rank for. Any page whose URL, title or
 * description mentions one of these is served with `noindex`, kept out of
 * the sitemap and structured data, and its images get `X-Robots-Tag: noindex`
 * (see vercel.json). Visitors still see the content.
 */
export const NOINDEX_BRAND_PATTERN = /aqua[\s_-]?care/i;

export function mustNotIndex(...texts: Array<string | null | undefined>): boolean {
  return texts.some(text => !!text && NOINDEX_BRAND_PATTERN.test(text));
}
