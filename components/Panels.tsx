import Link from "next/link";
import { Arrow } from "./Icons";
import { Pic } from "./Pic";
import type { PhotoName } from "@/lib/photos";

export type Panel = { name: string; text: string; chip: string; href: string; image: PhotoName };

/**
 * Tall photographic panels side by side. The one under the pointer (or with focus) widens to show
 * its story; the first is open until then. Pure CSS: flex-grow does the work. On narrow screens
 * they become a swipeable row of cards with everything showing.
 */
export function Panels({ items }: { items: Panel[] }) {
  return (
    <ul className="expand">
      {items.map((a, i) => (
        <li key={a.name} className="expand-item">
          <Link href={a.href} className="expand-link">
            <Pic name={a.image} sizes="(max-width: 900px) 80vw, 50vw" alt="" />
            <span className="expand-idx num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="expand-name" aria-hidden="true">
              {a.name}
            </span>
            <span className="expand-body">
              <strong>{a.name}</strong>
              <span className="expand-text">{a.text}</span>
              <span className="expand-meta">
                <span className="chip">{a.chip}</span>
                <span className="expand-go" aria-hidden="true">
                  <Arrow />
                </span>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
