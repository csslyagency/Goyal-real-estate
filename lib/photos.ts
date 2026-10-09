import manifest from "./photo-manifest.json";

/**
 * Photography library. Source files live in assets/photos (credits and links in
 * assets/photos/CREDITS.md); scripts/images.mjs turns them into responsive WebP.
 *
 * Project photos, the hero film poster and the family portraits were supplied by
 * Goyals Group. The rest are free stock images under the Unsplash License, used as
 * atmosphere (principles cards, Instagram grid, page headers).
 */
export const photos = {
  "hero-sunrise-tower": "Contemporary residential tower with planted balconies, lit by a golden sunrise above the trees",
  "hero-penthouse": "Double-height penthouse living room with floor-to-ceiling windows and a sculptural chandelier",
  "hero-skybridge": "Two residential towers joined by a glass sky lounge, glowing at dusk",
  "commercial-lounge": "Contemporary office lounge with sculptural seating and glass-walled workspaces",
  // Supplied by Goyals Group (October 2026)
  "about-indore": "Indore at sunset: the Rajwada palace, a white marble temple and a clock-tower building among palms",
  "about-header": "Golden-hour view over leafy Indore neighbourhoods from a modern balcony",
  "hero-film-poster": "Aerial view over a planned Goyals Group residential layout in Indore",
  "project-goyal-nagar": "Goyal Nagar masterplan beside the Ring Road, Indore",
  "project-goyal-vihar": "Carved stone entrance gate of Goyal Vihar",
  "project-hare-krishna-vihar": "Hare Krishna Vihar entrance gate on a sunny, tree-lined street",
  "project-pawan-dham": "Pawan Dham community entrance with landscaped street",
  "project-sukoon-vihar": "Sukoon Vihar residential entrance",
  "project-goyal-avenue": "Goyal Avenue residential building at dusk",
  "project-goyal-greens": "Modern entrance gate of Goyal Greens",
  "project-goyal-hills": "Tree-lined avenue and gardens at Goyal Hills",
  "project-radhika-palace": "Radhika Palace entrance in warm daylight",
  "project-golden-leaves": "Golden Leaves Convention Centre and its lawns",
  "project-fortune-select": "Fortune Select Nipania hotel, a sandstone-and-steel building with a floating roof",
  "project-goyal-resort": "Entrance gate of Goyal Resort",
  "person-prem-chand-goyal": "Mr. Prem Chand Goyal, founder of Goyals Group",
  "person-gopal-goyal": "Mr. Gopal Goyal, Goyals Group",
  "person-tanmay-goyal": "Mr. Tanmay Goyal, Goyals Group",
} as const;

export type PhotoName = keyof typeof photos;

type Meta = { width: number; height: number; blur: string };

export function photo(name: PhotoName) {
  const meta = (manifest as Record<string, Meta>)[name];
  if (!meta) throw new Error(`Photo "${name}" is missing from lib/photo-manifest.json. Run npm run images.`);
  return { src: `/img/${name}.jpg`, alt: photos[name], ...meta };
}
