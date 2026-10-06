import Link from "next/link";
import { Arrow, Bath, Bed, Building, Pin, Size } from "./Icons";
import { Pic } from "./Pic";
import {
  type Project,
  ON_REQUEST,
  PRICE_ON_REQUEST,
  categories,
  formatArea,
  formatBedrooms,
  formatCount,
  locationLabel,
  possessionLabels,
  projectHref,
} from "@/lib/projects";

/**
 * A property in the listing-card frame: photograph with status chips, location, name, the key
 * specs and the price line. Specs the brief did not give show as "On request"; the price shows
 * only if one is published, otherwise "Price on Request". No currency formatting anywhere.
 */
export function PropertyCard({
  p,
  sizes = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw",
  priority = false,
}: {
  p: Project;
  sizes?: string;
  priority?: boolean;
}) {
  const href = projectHref(p);
  const residential = p.category === "residential";
  const status = p.possession ? possessionLabels[p.possession] : p.status;
  return (
    <article className="card rv">
      <div className="card-media">
        <Pic name={p.image} sizes={sizes} priority={priority} />
        <Link href={href} className="card-hit" tabIndex={-1} aria-hidden="true" />
        <div className="card-badges">
          <span className="chip chip-accent">{categories[p.category].label}</span>
          {status ? <span className="chip">{status}</span> : null}
        </div>
        <span className="rep-tag">Representative image</span>
        <span className="card-view" aria-hidden="true">
          View property <Arrow />
        </span>
      </div>
      <div className="card-body">
        <p className="card-loc">
          <Pin />
          {locationLabel(p)} · {p.developer}
        </p>
        <h3 className="card-title">
          <Link href={href} className="card-link">
            {p.name}
          </Link>
        </h3>
        <ul className="card-specs">
          {residential ? (
            <>
              <li>
                <Bed />
                <span className={p.bedrooms ? undefined : "on-request"}>{p.bedrooms ? formatBedrooms(p.bedrooms) : `Bedrooms ${ON_REQUEST.toLowerCase()}`}</span>
              </li>
              <li>
                <Bath />
                <span className={p.bathrooms ? undefined : "on-request"}>{p.bathrooms ? `${formatCount(p.bathrooms)} bath` : "Baths on request"}</span>
              </li>
            </>
          ) : (
            <li>
              <Building />
              <span className={p.propertyTypes ? undefined : "on-request"}>{p.propertyTypes?.join(", ") ?? "Spaces on request"}</span>
            </li>
          )}
          <li>
            <Size />
            <span className={p.area ? "num" : "on-request"}>{p.area ? formatArea(p.area) : "Area on request"}</span>
          </li>
        </ul>
        <div className="card-foot">
          <p className="card-price">{p.price ?? PRICE_ON_REQUEST}</p>
          <span className="card-go" aria-hidden="true">
            <Arrow />
          </span>
        </div>
      </div>
    </article>
  );
}
