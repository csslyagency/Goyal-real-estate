import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Goyals Group",
    short_name: "Goyals",
    description: "Residential, commercial and hospitality developments in Indore since 1984.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0e6",
    theme_color: "#12213d",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
