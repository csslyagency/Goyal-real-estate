import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { projects } from "@/lib/projects";
import { locations } from "@/lib/locations";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/properties/", priority: 0.9 },
    { path: "/properties/residential/", priority: 0.8 },
    { path: "/properties/commercial/", priority: 0.8 },
    { path: "/projects/", priority: 0.8 },
    { path: "/hospitality/", priority: 0.7 },
    ...locations.map((l) => ({ path: `/locations/${l.slug}/`, priority: 0.8 })),
    ...projects.map((p) => ({ path: `/projects/${p.slug}/`, priority: 0.7 })),
    { path: "/about/", priority: 0.6 },
    { path: "/contact/", priority: 0.6 },
    { path: "/careers/", priority: 0.3 },
    { path: "/privacy-policy/", priority: 0.2 },
    { path: "/terms/", priority: 0.2 },
    { path: "/disclaimer/", priority: 0.2 },
  ];
  return pages.map((p) => ({ url: absoluteUrl(p.path), changeFrequency: "monthly", priority: p.priority }));
}
