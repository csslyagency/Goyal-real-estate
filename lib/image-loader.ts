"use client";

import widths from "./image-widths.json";

// Maps next/image requests for /img/<name>.jpg onto the pre-generated
// /img/<name>-<width>.webp files written by scripts/images.mjs.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const match = src.match(/^\/img\/([\w-]+)\.\w+$/);
  if (!match) return src;
  const w = widths.find((candidate) => candidate >= width) ?? widths[widths.length - 1];
  return `/img/${match[1]}-${w}.webp`;
}
