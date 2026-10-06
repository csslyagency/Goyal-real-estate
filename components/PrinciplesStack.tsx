"use client";

import { useEffect, useRef, useState } from "react";
import { Pic } from "./Pic";
import type { PhotoName } from "@/lib/photos";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type Principle = { name: string; note: string; image: PhotoName };

/**
 * The five principles as cards that pin one after another; each card settles back (smaller,
 * dimmer) as the next slides over it. The list beside them follows along.
 */
export function PrinciplesStack({ items, head }: { items: Principle[]; head: React.ReactNode }) {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const cards = [...ol.children] as HTMLElement[];
      const mark = window.innerHeight * 0.55;
      let on = 0;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        if (r.top < mark) on = i;
        const next = cards[i + 1];
        if (!next || reduced) {
          c.style.setProperty("--p", "0");
          return;
        }
        const n = next.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (r.bottom - n.top) / r.height));
        c.style.setProperty("--p", p.toFixed(3));
      });
      setActive(on);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className="wrap pstack">
      <div className="pstack-head">
        {head}
        <ul className="pstack-list" aria-hidden="true">
          {items.map((p, i) => (
            <li key={p.name} className={i === active ? "is-on" : undefined}>
              {p.name}
            </li>
          ))}
        </ul>
      </div>
      <ol className="pcards" ref={list}>
        {items.map((p, i) => (
          <li key={p.name} className="pcard" style={{ "--i": i } as React.CSSProperties}>
            <div className="pcard-in">
              <Pic name={p.image} sizes="(max-width: 900px) 100vw, 30vw" alt="" />
              <div className="pcard-body">
                <div>
                  <span className="pcard-n num">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                  <h3>{p.name}</h3>
                </div>
                <p>{p.note}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
