import { indore } from "./content";

/** Cities where Goyals Group builds. The brief names Indore only. */
export const locations = [{ slug: "indore", ...indore }];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
