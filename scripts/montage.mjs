// Dev QA: tiles viewport shots into contact sheets. node scripts/montage.mjs <dir> <prefix> [cols]
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
const [dir, prefix, colsArg] = process.argv.slice(2);
const files = fs.readdirSync(dir).filter((f) => f.startsWith(prefix) && f.endsWith(".jpg") && !f.includes("sheet")).sort();
const first = await sharp(path.join(dir, files[0])).metadata();
const cols = Number(colsArg ?? 2), tw = first.width > 1000 ? 720 : 300, th = Math.round((tw * first.height) / first.width);
const per = cols * 2;
for (let s = 0; s * per < files.length; s++) {
  const batch = files.slice(s * per, (s + 1) * per);
  const rows = Math.ceil(batch.length / cols);
  const comps = await Promise.all(batch.map(async (f, i) => ({ input: await sharp(path.join(dir, f)).resize(tw, th).toBuffer(), left: (i % cols) * (tw + 6), top: Math.floor(i / cols) * (th + 6) })));
  await sharp({ create: { width: cols * (tw + 6), height: rows * (th + 6), channels: 3, background: "#f0f" } }).composite(comps).jpeg({ quality: 75 }).toFile(path.join(dir, `${prefix}-sheet${s + 1}.jpg`));
}
console.log("sheets", Math.ceil(files.length / per));
