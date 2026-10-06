"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PropertyCard } from "./PropertyCard";
import {
  type Filters,
  FILTER_KEYS,
  applyFilters,
  areaOptions,
  bathOptions,
  bhkOptions,
  budgetOptions,
  locationOptions,
  parseFilters,
  possessionOptions,
  projectOptions,
  subTypeOptions,
  typeOptions,
} from "@/lib/filters";
import { type Project, categories } from "@/lib/projects";

type Level = "h1" | "h2";

function Pick({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <label className="pick">
      <span className="sr">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

function heading(f: Filters) {
  const what = f.type ? categories[f.type].plural.toLowerCase() : "properties";
  const verb = f.intent === "rent" ? "to rent" : f.intent === "buy" ? "for sale" : "";
  const text = `${what} ${verb} in Indore`.replace(/\s+/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Filters live in the query string, so every search can be shared and bookmarked. The server
 * renders the unfiltered list (what search engines index); the browser reads the query string
 * after mount and updates it with history.replaceState, so the static export needs no Suspense.
 */
export function PropertySearch({ list, lockType, level = "h1", title }: { list: Project[]; lockType?: Filters["type"]; level?: Level; title?: string }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const read = () => setQuery(window.location.search);
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const parsed = parseFilters(new URLSearchParams(query));
  const f: Filters = lockType ? { ...parsed, type: lockType } : parsed;

  const write = (q: URLSearchParams) => {
    for (const [key, val] of [...q.entries()]) if (!val) q.delete(key);
    const s = q.toString();
    window.history.replaceState(window.history.state, "", s ? `${window.location.pathname}?${s}` : window.location.pathname);
    setQuery(s ? `?${s}` : "");
  };
  const set = (k: keyof Filters, v: string) => {
    const q = new URLSearchParams(query);
    q.set(k, v);
    // A category belongs to one property type; drop it if the type no longer matches.
    if (k === "type" && q.get("sub")) {
      const sub = subTypeOptions.find((o) => o.value === q.get("sub"));
      if (sub && v && sub.category !== v) q.delete("sub");
    }
    write(q);
  };
  const clear = () => write(new URLSearchParams());

  const results = applyFilters(list, f);
  const onRequest = results.some((r) => r.onRequest);
  const active = FILTER_KEYS.some((k) => parsed[k] && !(lockType && k === "type"));
  const subs = subTypeOptions.filter((o) => !f.type || o.category === f.type);
  const H = level;
  const opts = (rows: { value: string; label: string }[]): [string, string][] => rows.map((o) => [o.value, o.label]);

  return (
    <>
      <div className="filters">
        <div className="wrap filters-in">
          <Pick label="Looking to" value={f.intent ?? ""} onChange={(v) => set("intent", v)} options={[["", "Buy or rent"], ["buy", "Buy"], ["rent", "Rent"]]} />
          <Pick label="Location" value={f.location ?? ""} onChange={(v) => set("location", v)} options={[["", "All locations"], ...opts(locationOptions(list))]} />
          {!lockType && <Pick label="Property type" value={f.type ?? ""} onChange={(v) => set("type", v)} options={[["", "Any type"], ...opts(typeOptions)]} />}
          <Pick label="Category" value={f.sub ?? ""} onChange={(v) => set("sub", v)} options={[["", "Any category"], ...opts(subs)]} />
          <Pick label="Budget" value={f.budget ?? ""} onChange={(v) => set("budget", v)} options={[["", "Any budget"], ...opts(budgetOptions)]} />
          <Pick label="Bedrooms" value={f.bhk ?? ""} onChange={(v) => set("bhk", v)} options={[["", "Any bedrooms"], ...opts(bhkOptions)]} />
          <Pick label="Bathrooms" value={f.bath ?? ""} onChange={(v) => set("bath", v)} options={[["", "Any bathrooms"], ...bathOptions.map((o): [string, string] => [o.value, `${o.label} bath`])]} />
          <Pick label="Area" value={f.area ?? ""} onChange={(v) => set("area", v)} options={[["", "Any size"], ...opts(areaOptions)]} />
          <Pick label="Possession" value={f.possession ?? ""} onChange={(v) => set("possession", v)} options={[["", "Any possession"], ...opts(possessionOptions)]} />
          <Pick label="Project or developer" value={f.project ?? ""} onChange={(v) => set("project", v)} options={[["", "Goyals Group, all projects"], ...opts(projectOptions)]} />
          {active && (
            <button type="button" className="clear" onClick={clear}>
              Clear filters
            </button>
          )}
        </div>
      </div>
      <div className="wrap results">
        <div className="results-bar">
          <H>{title ?? heading(f)}</H>
          <p aria-live="polite">
            {results.length} {results.length === 1 ? "property" : "properties"}
          </p>
        </div>
        {onRequest && (
          <p className="fine-note" style={{ marginTop: 0, marginBottom: 28 }}>
            Configurations, sizes, possession and pricing for these developments are shared on request, so they appear for those filters.{" "}
            <Link href="/contact/">Speak with an advisor</Link> for the exact options that match.
          </p>
        )}
        {results.length > 0 ? (
          <div className="grid">
            {results.map(({ project }, i) => (
              <PropertyCard key={project.slug} p={project} priority={i < 3 && level === "h1"} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>Nothing listed matches just yet.</h2>
            <p>Tell us what you are looking for and an advisor will share suitable options, including new projects before they are listed.</p>
            <div className="btns">
              <button type="button" className="btn btn-ghost" onClick={clear}>
                Clear filters
              </button>
              <Link href="/contact/#enquiry" className="btn">
                Speak with an advisor
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
