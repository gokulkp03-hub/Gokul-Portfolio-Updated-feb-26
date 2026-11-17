import { describe, expect, it, vi } from "vitest";
import fs from "fs";
import path from "path";

vi.mock("./db", async () => (await import("./test/memoryDb.js")).createMemoryDbModule());

import { mustNotIndex } from "../shared/seoPolicy.js";
import { applyMeta } from "./_core/pageMeta.js";
import { injectDynamicSEO } from "./_core/seoInjector.js";

const root = path.resolve(__dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
const shell =
  '<html><head><title>x</title><meta name="description" content="x" /></head>' +
  "<body><!--fallback:start--><!--fallback:end--></body></html>";

describe("AquaCare must not be indexed", () => {
  it("matches every spelling", () => {
    for (const t of ["AquaCare", "Aqua Care UAE", "aqua-care-uae", "Aqua_Care_video", "AQUACARE"]) {
      expect(mustNotIndex(t)).toBe(true);
    }
    expect(mustNotIndex("PrepMeal UAE", "/marketing/prepmeal")).toBe(false);
  });

  it("forces noindex on pages that mention it", () => {
    const html = applyMeta(shell, "/marketing/aqua-care-uae", { title: "Case study", description: "x" });
    expect(html).toContain('content="noindex, nofollow"');
    const other = applyMeta(shell, "/marketing/prepmeal", { title: "PrepMeal", description: "x" });
    expect(other).toContain('content="index, follow');
  });

  it("noindexes static AquaCare projects served by the SEO function", async () => {
    const result = await injectDynamicSEO("/portfolio/ads/aqua-care-softener-system-ai", shell);
    expect(result.status).toBe(200);
    expect(result.html).toContain('content="noindex, nofollow"');
  });

  it("is absent from the sitemap and crawler fallback", () => {
    expect(read("client/public/sitemap.xml")).not.toMatch(/aqua/i);
    expect(read("client/index.html")).not.toMatch(/aqua/i);
  });

  it("is blocked for images and the case study in vercel.json", () => {
    const config = JSON.parse(read("vercel.json"));
    const sources = config.headers
      .filter((h: any) => h.headers.some((kv: any) => kv.key === "X-Robots-Tag"))
      .map((h: any) => h.source);
    expect(sources).toContain("/marketing/aqua-care-uae");
    expect(sources.some((s: string) => /Aa.*Qq.*Uu.*Aa/.test(s))).toBe(true);
  });
});
