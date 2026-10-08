export type MenuLink = { label: string; href: string };

/** Header menu: four plain links. Every link points at a page that exists. */
export const menu: MenuLink[] = [
  { label: "Our Work", href: "/projects/" },
  { label: "Enquire us", href: "/contact/" },
  { label: "About", href: "/about/" },
  { label: "Careers", href: "/careers/" },
];
