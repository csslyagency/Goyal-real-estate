import {
  type Budget,
  type Category,
  type Intent,
  type Possession,
  type Project,
  budgetLabels,
  listedProjects,
  possessionLabels,
} from "./projects";

/** Property search filters. Values map 1:1 to URL query parameters. */
export type Filters = {
  intent?: Intent;
  q?: string;
  location?: string;
  type?: Exclude<Category, "hospitality">;
  sub?: string;
  budget?: Budget;
  bhk?: string;
  bath?: string;
  area?: string;
  possession?: Possession;
  project?: string;
};

export const FILTER_KEYS = ["intent", "q", "location", "type", "sub", "budget", "bhk", "bath", "area", "possession", "project"] as const;

type Option = { value: string; label: string };

export const intentOptions: Option[] = [
  { value: "buy", label: "Buy" },
];

export const typeOptions: Option[] = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
];

/** Sub-types, grouped by the category they belong to. */
export const subTypeOptions: (Option & { category: Exclude<Category, "hospitality"> })[] = [
  { value: "apartment", label: "Apartment / Flat", category: "residential" },
  { value: "villa", label: "Villa / Independent house", category: "residential" },
  { value: "plot", label: "Residential plot", category: "residential" },
  { value: "office", label: "Office space", category: "commercial" },
  { value: "retail", label: "Shop / Showroom", category: "commercial" },
];

/** Neutral budget bands: no currency figures are shown anywhere on the site. */
export const budgetOptions: Option[] = (Object.keys(budgetLabels) as Budget[]).map((b) => ({ value: b, label: budgetLabels[b] }));

export const bhkOptions: Option[] = ["1", "2", "3", "4", "5"].map((n) => ({ value: n, label: n === "5" ? "5+ BHK" : `${n} BHK` }));
export const bathOptions: Option[] = ["1", "2", "3", "4"].map((n) => ({ value: n, label: n === "4" ? "4+" : n }));

export const areaOptions: (Option & { range: [number, number] })[] = [
  { value: "0-1000", label: "Up to 1,000 sq ft", range: [0, 1000] },
  { value: "1000-2000", label: "1,000 – 2,000 sq ft", range: [1000, 2000] },
  { value: "2000-3500", label: "2,000 – 3,500 sq ft", range: [2000, 3500] },
  { value: "3500-plus", label: "3,500 sq ft and above", range: [3500, Number.POSITIVE_INFINITY] },
];

export const possessionOptions: Option[] = (Object.keys(possessionLabels) as Possession[]).map((p) => ({
  value: p,
  label: possessionLabels[p],
}));

/** Locations come from the data, so the list grows as listings are added. */
export function locationOptions(list: Project[] = listedProjects): Option[] {
  const options = new Map<string, string>();
  for (const p of list) {
    options.set(p.city.toLowerCase(), `${p.city} (all areas)`);
    if (p.locality) options.set(`${p.city}:${p.locality}`.toLowerCase(), `${p.locality}, ${p.city}`);
  }
  return [...options].map(([value, label]) => ({ value, label }));
}

export const projectOptions: Option[] = listedProjects.map((p) => ({ value: p.slug, label: p.name }));

export function parseFilters(params: URLSearchParams): Filters {
  const f: Record<string, string> = {};
  for (const key of FILTER_KEYS) {
    const v = params.get(key)?.trim();
    if (v) f[key] = v.slice(0, 80);
  }
  return f as Filters;
}

export function filtersToQuery(filters: Filters) {
  const params = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    const v = filters[key];
    if (v) params.set(key, v);
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

export type MatchResult = { project: Project; onRequest: boolean };

/**
 * Filters listings. A field the client has not published yet (null) is treated
 * as "details on request": the listing still shows, flagged, rather than
 * silently disappearing from every search.
 */
export function applyFilters(list: Project[], f: Filters): MatchResult[] {
  const results: MatchResult[] = [];
  for (const p of list) {
    let onRequest = false;
    const soft = (known: boolean, ok: () => boolean) => {
      if (!known) {
        onRequest = true;
        return true;
      }
      return ok();
    };

    if (f.type && p.category !== f.type) continue;
    if (f.project && p.slug !== f.project) continue;
    if (f.location) {
      const [city, locality] = f.location.split(":");
      if (p.city.toLowerCase() !== city) continue;
      if (locality && !soft(p.locality !== null, () => p.locality!.toLowerCase() === locality)) continue;
    }
    if (f.q) {
      const hay = [p.name, p.label, p.summary, p.city, p.locality ?? "", p.developer].join(" ").toLowerCase();
      if (!f.q.toLowerCase().split(/\s+/).every((term) => hay.includes(term))) continue;
    }
    if (f.sub) {
      const sub = subTypeOptions.find((o) => o.value === f.sub);
      if (sub && sub.category !== p.category) continue;
      if (!soft(p.propertyTypes !== null, () => p.propertyTypes!.map((t) => t.toLowerCase()).includes(f.sub!))) continue;
    }
    if (f.intent && !soft(p.intent !== null, () => p.intent!.includes(f.intent!))) continue;
    if (f.budget && !soft(p.budget !== null, () => p.budget === f.budget)) continue;
    if (f.bhk) {
      const n = Number(f.bhk);
      if (!soft(p.bedrooms !== null, () => p.bedrooms!.some((b) => (n >= 5 ? b >= 5 : b === n)))) continue;
    }
    if (f.bath) {
      const n = Number(f.bath);
      if (!soft(p.bathrooms !== null, () => p.bathrooms!.some((b) => (n >= 4 ? b >= 4 : b === n)))) continue;
    }
    if (f.area) {
      const range = areaOptions.find((o) => o.value === f.area)?.range;
      if (range && !soft(p.area !== null, () => p.area![1] >= range[0] && p.area![0] <= range[1])) continue;
    }
    if (f.possession && !soft(p.possession !== null, () => p.possession === f.possession)) continue;

    results.push({ project: p, onRequest });
  }
  return results;
}

export function filterLabel(key: keyof Filters, value: string): string {
  const find = (opts: Option[]) => opts.find((o) => o.value === value)?.label ?? value;
  switch (key) {
    case "intent":
      return find(intentOptions);
    case "type":
      return find(typeOptions);
    case "sub":
      return find(subTypeOptions);
    case "budget":
      return `${find(budgetOptions)} budget`;
    case "bhk":
      return find(bhkOptions);
    case "bath":
      return `${find(bathOptions)} bath`;
    case "area":
      return find(areaOptions);
    case "possession":
      return find(possessionOptions);
    case "project":
      return find(projectOptions);
    case "location":
      return find(locationOptions());
    case "q":
      return `“${value}”`;
  }
}
