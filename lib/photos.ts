import manifest from "./photo-manifest.json";

/**
 * Photography library. Source files live in assets/photos (credits and links in
 * assets/photos/CREDITS.md); scripts/images.mjs turns them into responsive WebP.
 *
 * All images are free to use under the Unsplash License. They are REPRESENTATIVE
 * imagery (architectural renders and stock photography) until Goyals Group
 * supplies photography of its own projects; project imagery is labelled
 * "Representative image" on the page. Rajwada, Gandhi Hall and the chhatris are
 * real Indore landmarks.
 */
export const photos = {
  "hero-sunrise-tower": "Contemporary residential tower with planted balconies, lit by a golden sunrise above the trees",
  "hero-penthouse": "Double-height penthouse living room with floor-to-ceiling windows and a sculptural chandelier",
  "hero-skybridge": "Two residential towers joined by a glass sky lounge, glowing at dusk",
  "residence-garden-tower": "Slender residential tower with terracotta panels and greenery on every floor",
  "residence-lawn": "Children playing on a landscaped lawn beside a modern residential building",
  "interior-living": "Elegant living room with a crystal chandelier, marble accents and soft ivory seating",
  "interior-bedroom": "Calm bedroom with a tufted headboard, chandelier and sheer floor-to-ceiling curtains",
  "interior-dining": "Dining room with a long table, brass pendant lights and warm stone walls",
  "commercial-tower": "Glass and stone commercial tower lit at dusk above a tree-lined street",
  "commercial-lounge": "Contemporary office lounge with sculptural seating and glass-walled workspaces",
  "commercial-arrival": "Covered arrival court of a commercial building with a pergola and mature trees",
  "hotel-lobby": "Double-height hotel lobby with marble walls, timber screens and garden views",
  "hotel-lounge": "Hotel lounge with backlit stone walls, armchairs and indoor planting",
  "hotel-suite": "Calm contemporary hotel suite with an arched headboard wall",
  "venue-archway": "Grand Indian archway decorated with chandeliers and candles for a celebration",
  "venue-lawn": "Landscaped lawn set for an evening wedding reception under draped canopies",
  "venue-mandap": "Floral mandap and aisle prepared for an outdoor wedding ceremony",
  "balcony-dusk": "Apartment balcony with a hanging chair and planters overlooking the city at dusk",
  "rooftop-pool": "Rooftop swimming pool beside a living green wall at sunset",
  "rooftop-terrace": "Framed rooftop terrace with lounge seating and a single tree at twilight",
  "villa-modern": "Modern family home with timber screens behind a garden wall",
  "interior-courtyard": "Seating nook in front of a white jaali-block wall with hanging greenery",
  "indore-rajwada": "Rajwada, the historic Holkar palace in the heart of Indore",
  "indore-gandhi-hall": "Gandhi Hall, Indore's Indo-Gothic town hall with its clock tower",
  "indore-chhatris": "Holkar-era chhatri with carved stone arches in Indore",
  "heritage-arches": "Carved arches of Rajwada, Indore, framing trees beyond",
  "heritage-jaali-corridor": "Sunlight falling through carved jaali screens in a stone corridor",
  "heritage-sandstone": "Red sandstone facade with intricate geometric carving",
} as const;

export type PhotoName = keyof typeof photos;

type Meta = { width: number; height: number; blur: string };

export function photo(name: PhotoName) {
  const meta = (manifest as Record<string, Meta>)[name];
  if (!meta) throw new Error(`Photo "${name}" is missing from lib/photo-manifest.json. Run npm run images.`);
  return { src: `/img/${name}.jpg`, alt: photos[name], ...meta };
}
