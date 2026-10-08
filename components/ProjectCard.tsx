import Link from "next/link";
import { Arrow, Pin } from "./Icons";
import { Pic } from "./Pic";
import { type Project, locationLabel, projectHref } from "@/lib/projects";

/** A project in the card frame: location, name, the client's description and its website. */
export function ProjectCard({ p, sizes = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" }: { p: Project; sizes?: string }) {
  const href = projectHref(p);
  return (
    <article className="card rv">
      <div className="card-media">
        <Pic name={p.image} sizes={sizes} alt="" position={p.imagePosition} />
        <Link href={href} className="card-hit" tabIndex={-1} aria-hidden="true" />
        <div className="card-badges">
          <span className="chip chip-accent">{p.label}</span>
          <span className="chip">{p.developer}</span>
        </div>
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
        <p className="card-desc">{p.summary}</p>
        {p.website ? (
          <a href={p.website} className="card-site" target="_blank" rel="noopener noreferrer">
            {p.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} <Arrow />
          </a>
        ) : null}
      </div>
    </article>
  );
}
