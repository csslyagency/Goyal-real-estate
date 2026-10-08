import { Pic } from "./Pic";
import type { PhotoName } from "@/lib/photos";

export type Principle = { name: string; note: string; image: PhotoName };

/** The five principles as a static column of cards beside the section heading. */
export function Principles({ items, head }: { items: Principle[]; head: React.ReactNode }) {
  return (
    <div className="wrap pstack">
      <div className="pstack-head">{head}</div>
      <ol className="pcards">
        {items.map((p, i) => (
          <li key={p.name} className="pcard rv">
            <div className="pcard-in">
              <Pic name={p.image} sizes="(max-width: 900px) 100vw, 26vw" alt="" />
              <div className="pcard-body">
                <span className="pcard-n num">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <h3>{p.name}</h3>
                <p>{p.note}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
