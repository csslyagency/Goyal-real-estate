import type { PhotoName } from "./photos";

export type MenuLink = { label: string; href: string };
export type MenuItem = {
  label: string;
  href: string;
  groups: { title: string; links: MenuLink[] }[];
  feature: { image: PhotoName; eyebrow: string; title: string; href: string };
};

/** Header menu. Every link points at a page or section that exists. */
export const menu: MenuItem[] = [
  {
    label: "Properties",
    href: "/properties/",
    groups: [
      {
        title: "Find a property",
        links: [
          { label: "All properties", href: "/properties/" },
          { label: "Buy", href: "/properties/?intent=buy" },
          { label: "Rent", href: "/properties/?intent=rent" },
        ],
      },
      {
        title: "By type",
        links: [
          { label: "Residential properties", href: "/properties/residential/" },
          { label: "Commercial properties", href: "/properties/commercial/" },
          { label: "Featured properties", href: "/#featured" },
        ],
      },
    ],
    feature: { image: "residence-garden-tower", eyebrow: "Featured", title: "Goyal Hills, Indore", href: "/projects/goyal-hills/" },
  },
  {
    label: "Projects",
    href: "/projects/",
    groups: [
      {
        title: "Our projects",
        links: [
          { label: "Goyal Hills", href: "/projects/goyal-hills/" },
          { label: "Goyals Green", href: "/projects/goyals-green/" },
          { label: "Golden Leaves Convention Centre", href: "/projects/golden-leaves-convention-centre/" },
          { label: "Fortune Select Nipania", href: "/projects/fortune-select-nipania/" },
        ],
      },
      {
        title: "New developments",
        links: [
          { label: "New & upcoming", href: "/projects/#upcoming" },
          { label: "All projects", href: "/projects/" },
        ],
      },
    ],
    feature: { image: "hero-skybridge", eyebrow: "New & upcoming", title: "More to come. Register your interest.", href: "/projects/#upcoming" },
  },
  {
    label: "Hospitality",
    href: "/hospitality/",
    groups: [
      {
        title: "Hospitality",
        links: [
          { label: "Golden Leaves Convention Centre", href: "/projects/golden-leaves-convention-centre/" },
          { label: "Fortune Select Nipania", href: "/projects/fortune-select-nipania/" },
          { label: "Plan an occasion", href: "/hospitality/#enquire" },
        ],
      },
    ],
    feature: { image: "venue-lawn", eyebrow: "Hospitality", title: "Creating places people remember.", href: "/hospitality/" },
  },
  {
    label: "Locations",
    href: "/locations/indore/",
    groups: [
      {
        title: "Locations",
        links: [{ label: "Indore, Madhya Pradesh", href: "/locations/indore/" }],
      },
      {
        title: "In Indore",
        links: [
          { label: "Residential in Indore", href: "/properties/residential/" },
          { label: "Commercial in Indore", href: "/properties/commercial/" },
          { label: "Hospitality in Indore", href: "/hospitality/" },
        ],
      },
    ],
    feature: { image: "indore-rajwada", eyebrow: "Our home city", title: "Rooted in Indore since 1984", href: "/locations/indore/" },
  },
  {
    label: "Services",
    href: "/#businesses",
    groups: [
      {
        title: "What we do",
        links: [
          { label: "Residential developments", href: "/properties/residential/" },
          { label: "Commercial developments", href: "/properties/commercial/" },
          { label: "Hospitality & events", href: "/hospitality/" },
          { label: "Property guidance", href: "/#guidance" },
        ],
      },
    ],
    feature: { image: "balcony-dusk", eyebrow: "Guidance", title: "Make better property decisions.", href: "/#guidance" },
  },
  {
    label: "About",
    href: "/about/",
    groups: [
      {
        title: "About us",
        links: [
          { label: "Our story", href: "/about/#story" },
          { label: "Vision & mission", href: "/about/#vision" },
          { label: "Our journey", href: "/about/#journey" },
          { label: "Founder's note", href: "/about/#founder" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Contact", href: "/contact/" },
          { label: "Careers", href: "/careers/" },
        ],
      },
    ],
    feature: { image: "heritage-arches", eyebrow: "Since 1984", title: "A legacy built on trust", href: "/about/" },
  },
];
