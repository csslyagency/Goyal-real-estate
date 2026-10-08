import { Arrow, Pin } from "./Icons";
import { Pic } from "./Pic";
import { type Project, locationLabel } from "@/lib/projects";

/** A project in the card frame: location, name, the client's description and its website. */
export function ProjectCard({ p, sizes = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" }: { p: Project; sizes?: string }) {
  return (
    <article className="card rv" id={p.slug}>
      <div className="card-media">
        <Pic name={p.image} sizes={sizes} alt="" position={p.imagePosition} />
        <div className="card-badges">
          <span className="chip chip-accent">{p.label}</span>
          <span className="chip">{p.developer}</span>
        </div>
      </div>
      <div className="card-body">
        <p className="card-loc">
          <Pin />
          {locationLabel(p)}
        </p>
        <h3 className="card-title">
          {p.name}
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
