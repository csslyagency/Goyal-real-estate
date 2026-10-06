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
export type Intent = "buy" | "rent";

export type Project = {
  slug: string;
  name: string;
  category: Category;
  /** Label used in the brief, e.g. "Residential Development". */
  label: string;
  summary: string;
  /** Longer description from the brief's "Our Businesses" section. */
  detail: string;
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

export const projects: Project[] = [
  {
    slug: "goyal-hills",
    name: "Goyal Hills",
    category: "residential",
    label: "Residential Development",
    summary:
      "A residential development shaped around thoughtful planning, comfortable living and the needs of modern families.",
    detail:
      "A home is more than an address. It is where everyday life unfolds, memories are created and futures take shape. Goyal Hills is planned with a focus on quality, usability, community and lasting value.",
    developer: "Goyals Group",
    city: "Indore",
    locality: null,
    listed: true,
    featured: true,
    image: "residence-garden-tower",
    gallery: ["residence-lawn", "interior-living", "interior-bedroom", "interior-dining"],
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
  },
  {
    slug: "goyals-green",
    name: "Goyals Green",
    category: "commercial",
    label: "Commercial Development",
    summary:
      "A thoughtfully planned commercial destination created around accessibility, functionality and long-term business value.",
    detail:
      "Goyals Green is shaped around accessibility, functionality and long-term business value, giving businesses the environment they need to establish, grow and thrive.",
    developer: "Goyals Group",
    city: "Indore",
    locality: null,
    listed: true,
    featured: true,
    image: "commercial-tower",
    gallery: ["commercial-arrival", "commercial-lounge"],
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
  },
  {
    slug: "golden-leaves-convention-centre",
    name: "Golden Leaves Convention Centre",
    category: "hospitality",
    label: "Hospitality & Events",
    summary:
      "A large-scale hospitality destination built for celebrations, conventions and memorable experiences, bringing together expansive spaces, service and thoughtful hospitality.",
    detail:
      "A destination created for weddings, conventions, celebrations and large-scale experiences, bringing together expansive spaces, hospitality and service.",
    offering: "Weddings, conventions, celebrations and large-scale experiences",
    developer: "Goyals Group",
    city: "Indore",
    locality: null,
    listed: false,
    featured: false,
    image: "venue-archway",
    gallery: ["venue-lawn", "venue-mandap"],
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
  },
  {
    slug: "fortune-select-nipania",
    name: "Fortune Select Nipania",
    category: "hospitality",
    label: "Hospitality",
    summary:
      "A contemporary hotel development marking the Group's growing presence in hospitality and its continuing evolution beyond its real estate foundations.",
    detail:
      "A contemporary hospitality development representing the Group's growing presence in the hotel sector and its continuing evolution beyond real estate.",
    offering: "Contemporary hotel",
    developer: "Goyals Group",
    city: "Indore",
    locality: "Nipania",
    listed: false,
    featured: false,
    image: "hotel-lobby",
    gallery: ["hotel-lounge", "hotel-suite"],
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
