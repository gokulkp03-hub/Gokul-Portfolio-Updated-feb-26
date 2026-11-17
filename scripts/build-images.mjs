/**
 * Generates smaller copies of every WebP image the site references and
 * records each image's real size, so <Img> can serve the right file to each
 * screen (srcset) and reserve space before it loads (width/height).
 *
 *   pnpm images
 *
 * Re-run after adding or replacing images, then commit the results:
 * - <name>.w480.webp / .w960.webp / .w1600.webp next to the original
 * - client/src/data/imageManifest.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "client/public");
const srcDir = path.join(root, "client/src");
const manifestPath = path.join(srcDir, "data/imageManifest.json");
const WIDTHS = [480, 960, 1600];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|json)$/.test(entry.name) && full !== manifestPath) out.push(full);
  }
  return out;
}

const refs = new Set();
for (const file of walk(srcDir)) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/\/assets\/[^"'`\n]+?\.webp(?=["'`])/g)) {
    if (!/\.w\d+\.webp$/.test(match[0])) refs.add(match[0]);
  }
}

const manifest = {};
let created = 0;
for (const ref of [...refs].sort()) {
  const file = path.join(publicDir, ref);
  if (!fs.existsSync(file)) continue;
  const { width, height } = await sharp(file).metadata();
  const variants = [];
  for (const w of WIDTHS) {
    if (w >= width * 0.9) continue; // not meaningfully smaller than the original
    const out = file.replace(/\.webp$/, `.w${w}.webp`);
    if (!fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(file).mtimeMs) {
      await sharp(file).resize({ width: w }).webp({ quality: 78 }).toFile(out);
      created++;
    }
    variants.push(w);
  }
  manifest[ref] = { w: width, h: height, v: variants };
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 0) + "\n");
console.log(`${Object.keys(manifest).length} images in manifest, ${created} resized copies written.`);
