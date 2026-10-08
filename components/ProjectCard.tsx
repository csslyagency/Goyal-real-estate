import Link from "next/link";
import { Arrow, Pin } from "./Icons";
import { Pic } from "./Pic";
import { type Project, ON_REQUEST, categories, formatPossession, locationLabel, projectHref } from "@/lib/projects";

/** A project in the card frame: developer, location and what it is. */
export function ProjectCard({ p, sizes = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" }: { p: Project; sizes?: string }) {
  const href = projectHref(p);
  const realEstate = p.category !== "hospitality";
  return (
    <article className="card rv">
      <div className="card-media">
        <Pic name={p.image} sizes={sizes} alt="" />
        <Link href={href} className="card-hit" tabIndex={-1} aria-hidden="true" />
        <div className="card-badges">
          <span className="chip chip-accent">{p.label}</span>
          <span className="chip">{p.developer}</span>
        </div>
        <span className="rep-tag">Representative image</span>
        <span className="card-view" aria-hidden="true">
          View project <Arrow />
        </span>
      </div>
      <div className="card-body">
        <p className="card-loc">
          <Pin />
          {locationLabel(p)}
        </p>
        <h3 className="card-title">
          <Link href={href} className="card-link">
            {p.name}
          </Link>
        </h3>
        <ul className="card-specs">
          {realEstate ? (
            <>
              <li className={p.configuration ? undefined : "on-request"}>{p.configuration ?? `Configuration ${ON_REQUEST.toLowerCase()}`}</li>
              <li className={p.possession || p.status ? undefined : "on-request"}>{p.possession || p.status ? formatPossession(p) : "Possession on request"}</li>
            </>
          ) : (
            <li>{p.offering ?? categories[p.category].label}</li>
          )}
        </ul>
      </div>
    </article>
  );
}
