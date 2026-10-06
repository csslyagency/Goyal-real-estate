import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

/** Preview builds block all crawlers; set NEXT_PUBLIC_SITE_LIVE=true for production. */
export default function robots(): MetadataRoute.Robots {
  if (!site.live) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: absoluteUrl("/sitemap.xml"), host: site.url };
}
