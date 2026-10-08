import type { PhotoName } from "./photos";

/**
 * Projects named in the Goyals Group brief document.
 *
 * The brief describes each project in one or two sentences and gives no unit
 * mix, sizes, possession dates, amenities or prices. Those fields are `null`
 * here and render as "On request" / "Price on Request". Fill them in from the
 * project team; the property search, cards and project pages update on their own.
 */

export type Category = "residential" | "commercial" | "hospitality";
export type Possession = "ready" | "under-construction" | "new-launch" | "upcoming";
export type Intent = "buy";

export type Project = {
  slug: string;
  name: string;
  category: Category;
  /** Label used in the brief, e.g. "Residential Development". */
  label: string;
  summary: string;
  /** Optional longer description for the project page. */
  detail?: string;
  /** The project's own website, when it has one. */
  website?: string;
  /** What a hospitality venue is for, from the brief. */
  offering?: string;
  developer: string;
  city: string;
  /** Locality within the city, only when known. */
  locality: string | null;
  /** Shown in property search (residential and commercial real estate). */
  listed: boolean;
  featured: boolean;
  image: PhotoName;
  /** CSS object-position for the main photograph when cropped, e.g. "50% 80%". */
  imagePosition?: string;
  gallery: PhotoName[];

  // ---- Not provided in the brief. Keep null until confirmed. ----
  status: string | null;
  intent: Intent[] | null;
  propertyTypes: string[] | null;
  configuration: string | null;
  /** BHK options, e.g. [2, 3, 4]. */
  bedrooms: number[] | null;
  bathrooms: number[] | null;
  /** Carpet/built-up area range in sq ft. */
  area: [number, number] | null;
  possession: Possession | null;
  possessionDate: string | null;
  amenities: string[] | null;
  /** Only when the client wants a price published. No currency formatting is applied. */
  price: string | null;
  /** RERA registration number, where applicable. */
  rera?: string | null;
  budget: Budget | null;
};

export type Budget = "value" | "mid" | "premium" | "luxury";

/** Fields the client has not supplied yet; they render as "On request". */
const pending = {
  developer: "Goyals Group",
  city: "Indore",
  locality: null,
  status: null,
  intent: null,
  propertyTypes: null,
  configuration: null,
  bedrooms: null,
  bathrooms: null,
  area: null,
  possession: null,
  possessionDate: null,
  amenities: null,
  price: null,
  budget: null,
} satisfies Partial<Project>;

/** In the client's order. Descriptions are the client's own copy. */
export const projects: Project[] = [
  {
    ...pending,
    slug: "goyal-nagar",
    name: "Goyal Nagar",
    category: "residential",
    label: "Residential",
    summary:
      "Goyal Nagar brings together the charm of an established neighbourhood and the convenience of a well-connected urban address. Thoughtfully situated in the heart of Indore's evolving landscape, it offers a lifestyle defined by comfort, connectivity and belonging.",
    listed: true,
    featured: false,
    image: "project-goyal-nagar",
    gallery: [],
  },
  {
    ...pending,
    slug: "goyal-vihar",
    name: "Goyal Vihar",
    category: "residential",
    label: "Residential",
    summary:
      "Goyal Vihar reflects the essence of comfortable community living, where thoughtfully planned spaces create a welcoming residential environment. An address that brings together everyday convenience, a sense of belonging and the warmth of a well-established neighbourhood.",
    listed: true,
    featured: false,
    image: "project-goyal-vihar",
    gallery: [],
  },
  {
    ...pending,
    slug: "hare-krishna-vihar",
    name: "Hare Krishna Vihar",
    category: "residential",
    label: "Residential",
    summary:
      "Hare Krishna Vihar embodies the charm of timeless residential living, where a peaceful atmosphere meets the warmth of a close-knit community. An established address that reflects simplicity, comfort and a lasting sense of belonging.",
    listed: true,
    featured: false,
    image: "project-hare-krishna-vihar",
    gallery: [],
  },
  {
    ...pending,
    slug: "pawan-dham",
    name: "Pawan Dham",
    category: "residential",
    label: "Residential",
    summary:
      "Pawan Dham reflects the beauty of peaceful residential living, where comfort and simplicity come together to create a welcoming neighbourhood. An enduring address that celebrates community, everyday convenience and the joy of calling a place home.",
    listed: true,
    featured: false,
    image: "project-pawan-dham",
    gallery: [],
  },
  {
    ...pending,
    slug: "sukoon-vihar",
    name: "Sukoon Vihar",
    category: "residential",
    label: "Residential",
    summary:
      "A peaceful retreat offering comfort, simplicity and everyday convenience. A welcoming address where tranquillity meets the warmth of community living.",
    listed: true,
    featured: false,
    image: "project-sukoon-vihar",
    gallery: [],
  },
  {
    ...pending,
    slug: "goyal-avenue",
    name: "Goyal Avenue",
    category: "residential",
    label: "Residential",
    summary:
      "A thoughtfully developed residential address that brings together modern living and everyday convenience. A welcoming neighbourhood designed for comfort, connectivity and a lasting sense of belonging.",
    listed: true,
    featured: false,
    image: "project-goyal-avenue",
    gallery: [],
  },
  {
    ...pending,
    slug: "goyal-greens",
    name: "Goyal Greens",
    category: "residential",
    label: "Residential",
    summary:
      "A refreshing residential address that blends peaceful surroundings with the comforts of everyday living. A welcoming community where nature, comfort and a sense of belonging come together.",
    listed: true,
    featured: false,
    image: "project-goyal-greens",
    gallery: [],
  },
  {
    ...pending,
    slug: "goyal-hills",
    name: "Goyal Hills",
    category: "residential",
    label: "Residential",
    summary:
      "A distinctive residential address offering a perfect balance of comfort and peaceful living. A thoughtfully developed community where everyday convenience meets a sense of belonging.",
    listed: true,
    featured: true,
    image: "project-goyal-hills",
    gallery: [],
  },
  {
    ...pending,
    slug: "radhika-palace",
    name: "Radhika Palace",
    category: "residential",
    label: "Residential",
    summary:
      "An elegant residential address that brings together timeless charm and modern comfort. A welcoming community designed for refined living and a lasting sense of belonging.",
    listed: true,
    featured: false,
    image: "project-radhika-palace",
    gallery: [],
  },
  {
    ...pending,
    slug: "golden-leaves-convention-centre",
    name: "Golden Leaves Convention Centre",
    category: "hospitality",
    label: "Hospitality & Events",
    summary:
      "A magnificent destination where grand celebrations meet timeless elegance and exceptional hospitality. Featuring luxurious venues and thoughtfully curated experiences, it creates the perfect setting for life's most memorable occasions.",
    offering: "Weddings, conventions, celebrations and large-scale experiences",
    website: "https://goldenleavesindore.com/",
    listed: false,
    featured: false,
    image: "project-golden-leaves",
    gallery: [],
  },
  {
    ...pending,
    slug: "fortune-select-nipania",
    name: "Fortune Select Nipania",
    category: "hospitality",
    label: "Hotel · Coming soon",
    summary:
      "A new landmark in premium hospitality, bringing together contemporary elegance, refined comfort and exceptional experiences. Thoughtfully designed for modern travellers, it promises a distinctive stay in the heart of Indore.",
    offering: "Contemporary hotel, coming soon",
    locality: "Nipania",
    status: "Coming soon",
    listed: false,
    featured: false,
    image: "project-fortune-select",
    imagePosition: "50% 90%",
    gallery: [],
  },
  {
    ...pending,
    slug: "goyal-resort",
    name: "Goyal Resort",
    category: "hospitality",
    label: "Resort",
    summary:
      "A serene escape that brings together natural charm, relaxation and warm hospitality. An inviting retreat where peaceful surroundings create the perfect setting for memorable experiences.",
    offering: "Resort stays and occasions",
    listed: false,
    featured: false,
    image: "project-goyal-resort",
    gallery: [],
  },
];

export const categories: Record<Category, { label: string; plural: string; href: string }> = {
  residential: { label: "Residential", plural: "Residential properties", href: "/properties/residential/" },
  commercial: { label: "Commercial", plural: "Commercial properties", href: "/properties/commercial/" },
  hospitality: { label: "Hospitality", plural: "Hospitality", href: "/hospitality/" },
};

export const possessionLabels: Record<Possession, string> = {
  ready: "Ready to move",
  "under-construction": "Under construction",
  "new-launch": "New launch",
  upcoming: "Upcoming",
};

export const budgetLabels: Record<Budget, string> = {
  value: "Value",
  mid: "Mid-segment",
  premium: "Premium",
  luxury: "Luxury",
};

export const PRICE_ON_REQUEST = "Price on Request";
export const ON_REQUEST = "On request";

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const listedProjects = projects.filter((p) => p.listed);
export const featuredProjects = projects.filter((p) => p.featured);

export function projectHref(p: Pick<Project, "slug">) {
  return `/projects/${p.slug}/`;
}

export function locationLabel(p: Pick<Project, "locality" | "city">) {
  return p.locality ? `${p.locality}, ${p.city}` : p.city;
}

export function formatBedrooms(beds: number[] | null) {
  if (!beds?.length) return ON_REQUEST;
  const sorted = [...beds].sort((a, b) => a - b);
  return sorted.length === 1 ? `${sorted[0]} BHK` : `${sorted[0]}–${sorted[sorted.length - 1]} BHK`;
}

export function formatCount(values: number[] | null) {
  if (!values?.length) return ON_REQUEST;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted.length === 1 ? `${sorted[0]}` : `${sorted[0]}–${sorted[sorted.length - 1]}`;
}

export function formatArea(area: [number, number] | null) {
  if (!area) return ON_REQUEST;
  const f = (n: number) => n.toLocaleString("en-IN");
  return area[0] === area[1] ? `${f(area[0])} sq ft` : `${f(area[0])}–${f(area[1])} sq ft`;
}

export function formatPossession(p: Pick<Project, "possession" | "possessionDate" | "status">) {
  if (p.possession) return p.possessionDate ? `${possessionLabels[p.possession]} · ${p.possessionDate}` : possessionLabels[p.possession];
  return p.status ?? ON_REQUEST;
}
