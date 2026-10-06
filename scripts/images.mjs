// Generates responsive WebP renditions + blur placeholders for every photo in
// assets/photos. Runs before `next dev` and `next build` (see package.json).
// Output: public/img/<name>-<width>.webp and lib/photo-manifest.json
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "assets/photos");
const outDir = path.join(root, "public/img");
const widths = JSON.parse(fs.readFileSync(path.join(root, "lib/image-widths.json"), "utf8"));

fs.mkdirSync(outDir, { recursive: true });
const manifest = {};
const files = fs.readdirSync(srcDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();

for (const file of files) {
  const name = file.replace(/\.\w+$/, "");
  const input = path.join(srcDir, file);
  const { width, height } = await sharp(input).metadata();
  const srcTime = fs.statSync(input).mtimeMs;

  await Promise.all(
    widths.map(async (w) => {
      const out = path.join(outDir, `${name}-${w}.webp`);
      if (fs.existsSync(out) && fs.statSync(out).mtimeMs > srcTime) return;
      await sharp(input)
        .resize({ width: Math.min(w, width), withoutEnlargement: true })
        .webp({ quality: w <= 640 ? 70 : 74, effort: 5 })
        .toFile(out);
    }),
  );

  // 1200×630 JPEG for Open Graph / social previews (WebP is not universally supported there)
  const og = path.join(outDir, "og", `${name}.jpg`);
  if (!fs.existsSync(og) || fs.statSync(og).mtimeMs < srcTime) {
    fs.mkdirSync(path.dirname(og), { recursive: true });
    await sharp(input).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 78, mozjpeg: true }).toFile(og);
  }

  const blur = await sharp(input).resize(16).webp({ quality: 40 }).toBuffer();
  manifest[name] = { width, height, blur: `data:image/webp;base64,${blur.toString("base64")}` };
}

fs.writeFileSync(path.join(root, "lib/photo-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`images: ${files.length} photos × ${widths.length} widths ready in public/img`);
