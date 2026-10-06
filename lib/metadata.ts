import type { Metadata } from "next";
import { site } from "./site";

/** Per-page metadata with canonical URL and Open Graph defaults. */
export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const images = [{ url: image ?? "/og.png", width: 1200, height: 630, alt: title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path, type: "website", locale: "en_IN", siteName: site.name, images },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: images.map((i) => i.url) },
  };
}

export const ogImage = (name: string) => `/img/og/${name}.jpg`;
