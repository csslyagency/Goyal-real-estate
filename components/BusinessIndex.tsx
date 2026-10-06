"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Icons";
import { Pic } from "./Pic";
import type { PhotoName } from "@/lib/photos";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type BusinessRow = { name: string; kind: string; text: string; href: string; image: PhotoName };

/**
 * The businesses as an editorial index. On a desktop with a mouse, a photograph of the row under
 * the pointer follows it (eased, so it trails a little); on touch screens each row shows its
 * photograph inline instead.
 */
export function BusinessIndex({ items }: { items: BusinessRow[] }) {
  const box = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0, ready: false });

  useEffect(() => {
    if (active === null) return;
    let raf = 0;
    const step = () => {
      const el = card.current;
      if (el) {
        const k = reduced ? 1 : 0.16;
        pos.current.x += (target.current.x - pos.current.x) * k;
        pos.current.y += (target.current.y - pos.current.y) * k;
        el.style.translate = `${pos.current.x.toFixed(1)}px ${pos.current.y.toFixed(1)}px`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !box.current || !card.current) return;
    const r = box.current.getBoundingClientRect();
    const w = card.current.offsetWidth;
    const h = card.current.offsetHeight;
    target.current = { x: e.clientX - r.left - w / 2 + 40, y: e.clientY - r.top - h / 2 };
    if (!pos.current.ready) {
      pos.current = { ...target.current, ready: true };
    }
  };

  return (
    <div
      className="bindex"
      ref={box}
      onPointerMove={onMove}
      onPointerLeave={() => {
        setActive(null);
        pos.current.ready = false;
      }}
    >
      <ul>
        {items.map((b, i) => (
          <li key={b.name} className="bindex-row">
            <Link href={b.href} onPointerEnter={() => setActive(i)} onFocus={() => setActive(null)}>
              <span className="bindex-n num">{String(i + 1).padStart(2, "0")}</span>
              <span className="bindex-thumb" aria-hidden="true">
                <Pic name={b.image} sizes="(max-width: 900px) 100vw, 1px" alt="" />
              </span>
              <span>
                <span className="bindex-name">{b.name}</span>
                <span className="bindex-kind">{b.kind}</span>
              </span>
              <span className="bindex-text">{b.text}</span>
              <span className="bindex-go" aria-hidden="true">
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className={`bindex-preview${active !== null ? " is-on" : ""}`} ref={card} aria-hidden="true">
        {items.map((b, i) => (
          <Pic key={b.name} name={b.image} sizes="300px" alt="" className={i === active ? "is-on" : undefined} />
        ))}
      </div>
    </div>
  );
}
