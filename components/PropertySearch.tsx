"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PropertyCard } from "./PropertyCard";
import {
  type Filters,
  FILTER_KEYS,
  applyFilters,
  areaOptions,
  bathOptions,
  bhkOptions,
  budgetOptions,
  filterLabel,
  locationOptions,
  parseFilters,
  possessionOptions,
  projectOptions,
  subTypeOptions,
  typeOptions,
} from "@/lib/filters";
import { type Project, categories } from "@/lib/projects";

type Level = "h1" | "h2";
type Opt = { value: string; label: string };

function heading(f: Filters) {
  const what = f.type ? categories[f.type].plural.toLowerCase() : "properties";
  const verb = f.intent === "buy" ? "for sale" : "";
  const text = `${what} ${verb} in Indore`.replace(/\s+/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** One group of single-choice chips. Choosing the selected chip again clears it. */
function Chips({ title, value, options, onPick }: { title: string; value?: string; options: Opt[]; onPick: (v: string) => void }) {
  return (
    <div className="facet" role="group" aria-label={title}>
      <h3>{title}</h3>
      <div className="opts">
        {options.map((o) => (
          <button key={o.value} type="button" className="opt" aria-pressed={value === o.value} onClick={() => onPick(value === o.value ? "" : o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Property browser: chip filters in a sticky sidebar (a bottom drawer on phones) beside the
 * results. Filters live in the query string, so every search can be shared; the server renders
 * the unfiltered list and the browser applies the query after mount (no Suspense needed).
 */
export function PropertySearch({ list, lockType, level = "h1", title }: { list: Project[]; lockType?: Filters["type"]; level?: Level; title?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const read = () => setQuery(window.location.search);
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  // The phone drawer behaves like a dialog: page scroll locks, focus moves in, and Escape or
  // closing hands focus back to the Filters button.
  const drawer = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("menu-open", open);
    root.classList.toggle("facets-open", open);
    if (open) drawer.current?.focus();
    else if (wasOpen.current) toggle.current?.focus();
    wasOpen.current = open;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.classList.remove("menu-open", "facets-open");
    };
  }, [open]);

  const parsed = parseFilters(new URLSearchParams(query));
  const f: Filters = lockType ? { ...parsed, type: lockType } : parsed;

  const write = (q: URLSearchParams) => {
    for (const [key, val] of [...q.entries()]) if (!val) q.delete(key);
    const s = q.toString();
    window.history.replaceState(window.history.state, "", s ? `${window.location.pathname}?${s}` : window.location.pathname);
    setQuery(s ? `?${s}` : "");
  };
  const set = (k: keyof Filters) => (v: string) => {
    const q = new URLSearchParams(query);
    q.set(k, v);
    if (k === "type" && q.get("sub")) {
      const sub = subTypeOptions.find((o) => o.value === q.get("sub"));
      if (sub && v && sub.category !== v) q.delete("sub");
    }
    write(q);
  };
  const clear = () => write(new URLSearchParams());

  const results = applyFilters(list, f);
  const onRequest = results.some((r) => r.onRequest);
  const activeKeys = FILTER_KEYS.filter((k) => parsed[k] && !(lockType && k === "type"));
  const subs = subTypeOptions.filter((o) => !f.type || o.category === f.type);
  const H = level;
  const count = `${results.length} ${results.length === 1 ? "property" : "properties"}`;

  return (
    <div className="wrap browse">
      <div className={`facets-scrim${open ? " is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside ref={drawer} tabIndex={-1} className={`facets${open ? " is-open" : ""}`} aria-label="Filters" id="facets">
        <div className="facets-head">
          <h2>Filters</h2>
          {activeKeys.length > 0 && (
            <button type="button" className="facets-clear" onClick={clear}>
              Clear all
            </button>
          )}
        </div>
        {!lockType && <Chips title="Property type" value={f.type} options={typeOptions} onPick={set("type")} />}
        <Chips title="Category" value={f.sub} options={subs} onPick={set("sub")} />
        <div className="facet">
          <h3>
            <label htmlFor="fx-location">Location</label>
          </h3>
          <select id="fx-location" value={f.location ?? ""} onChange={(e) => set("location")(e.target.value)}>
            <option value="">All locations</option>
            {locationOptions(list).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <Chips title="Budget" value={f.budget} options={budgetOptions} onPick={set("budget")} />
        <Chips title="Bedrooms" value={f.bhk} options={bhkOptions} onPick={set("bhk")} />
        <Chips title="Bathrooms" value={f.bath} options={bathOptions} onPick={set("bath")} />
        <Chips title="Area" value={f.area} options={areaOptions} onPick={set("area")} />
        <Chips title="Possession" value={f.possession} options={possessionOptions} onPick={set("possession")} />
        <div className="facet">
          <h3>
            <label htmlFor="fx-project">Project or developer</label>
          </h3>
          <select id="fx-project" value={f.project ?? ""} onChange={(e) => set("project")(e.target.value)}>
            <option value="">Goyals Group, all projects</option>
            {projectOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn facets-done" onClick={() => setOpen(false)}>
          Show {count}
        </button>
      </aside>

      <div>
        <div className="browse-bar">
          <div>
            <H>{title ?? heading(f)}</H>
            <p className="browse-count" aria-live="polite">
              {count}
            </p>
          </div>
          <button ref={toggle} type="button" className="btn btn-ghost facets-toggle" aria-expanded={open} aria-controls="facets" onClick={() => setOpen(true)}>
            Filters{activeKeys.length ? ` (${activeKeys.length})` : ""}
          </button>
        </div>
        {activeKeys.length > 0 && (
          <div className="active-chips">
            {activeKeys.map((k) => (
              <button key={k} type="button" onClick={() => set(k)("")} aria-label={`Remove filter: ${filterLabel(k, parsed[k]!)}`}>
                {filterLabel(k, parsed[k]!)} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}
        {onRequest && (
          <p className="fine-note" style={{ marginTop: 0, marginBottom: 24 }}>
            Configurations, sizes, possession and pricing for these developments are shared on request, so they appear for those filters.{" "}
            <Link href="/contact/">Speak with an advisor</Link> for the exact options that match.
          </p>
        )}
        {results.length > 0 ? (
          <div className="grid">
            {results.map(({ project }, i) => (
              <PropertyCard key={project.slug} p={project} priority={i < 2 && level === "h1"} sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 34vw" />
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
    </div>
  );
}
