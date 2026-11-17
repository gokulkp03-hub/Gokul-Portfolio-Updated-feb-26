import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { M } from "../client/src/data/metrics.js";
import manifest from "../client/src/data/imageManifest.json";
import { applyMeta } from "./_core/pageMeta.js";

const root = path.resolve(__dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("headline numbers", () => {
  it("index.html (which can't import metrics.ts) matches metrics.ts", () => {
    const html = read("client/index.html");
    for (const value of [M.whatsappConversations, M.totalMetaSpend, M.bestRoas, M.prepmeal.conversations, M.prepmeal.spend]) {
      expect(html).toContain(value);
    }
    expect(html).not.toMatch(/7,300|Avg ROAS/);
  });

  it("8,400+ is still the sum of the two documented campaigns", () => {
    const n = (s: string) => Number(s.replace(/[^\d]/g, ""));
    const sum = n(M.aquacare.conversations) + n(M.prepmeal.conversations);
    expect(sum).toBeGreaterThanOrEqual(n(M.whatsappConversations));
  });
});

describe("responsive images", () => {
  const entries = Object.entries(manifest as Record<string, { w: number; h: number; v: number[] }>);

  it("every resized copy listed in the manifest exists", () => {
    expect(entries.length).toBeGreaterThan(50);
    for (const [src, entry] of entries) {
      expect(fs.existsSync(path.join(root, "client/public", src)), src).toBe(true);
      for (const w of entry.v) {
        const copy = src.replace(/\.webp$/, `.w${w}.webp`);
        expect(fs.existsSync(path.join(root, "client/public", copy)), copy).toBe(true);
        expect(w).toBeLessThan(entry.w);
      }
    }
  });
});

describe("case-study structured data", () => {
  const shell = "<html><head><title>x</title></head><body><!--fallback:start--><!--fallback:end--></body></html>";

  it("is embedded safely", () => {
    const html = applyMeta(shell, "/marketing/prepmeal", {
      title: "PrepMeal",
      description: "x",
      jsonLd: { name: "</script><script>alert(1)</script>" },
    });
    expect(html).toContain('<script type="application/ld+json" data-page-ld>');
    expect(html).not.toContain("</script><script>alert(1)");
  });

  it("is skipped on pages hidden from search", () => {
    const html = applyMeta(shell, "/marketing/aqua-care-uae", { title: "x", description: "x", jsonLd: { name: "x" } });
    expect(html).not.toContain("application/ld+json");
  });
});
