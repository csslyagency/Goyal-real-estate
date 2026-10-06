import type { NextConfig } from "next";

// Fully static site: `next build` writes plain HTML/CSS/JS to `out/`,
// which can be hosted anywhere (Vercel, Netlify, Hostinger, S3...).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Responsive WebP files are generated ahead of time by scripts/images.mjs.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [256, 384],
  },
};

export default nextConfig;
