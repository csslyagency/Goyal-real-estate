"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type OrbitCard = { t: string; d: string; n?: string };

/**
 * Cards on a turning cylinder: the section pins while you scroll through it and the ring turns
 * one card per step, the facing card lit, the others seen edge-on and from behind. Until this
 * mounts (and always with reduced motion) the same cards sit in a plain grid.
 */
export function Orbit({ cards, head, foot, id }: { cards: OrbitCard[]; head: React.ReactNode; foot?: React.ReactNode; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const on = !useReducedMotion();
  const [active, setActive] = useState(0);
  const n = cards.length;

  useEffect(() => {
    if (!on) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = ref.current;
      const r = ring.current;
      if (!el || !r) return;
      const box = el.getBoundingClientRect();
      const span = box.height - innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -box.top / span)) : 0;
      r.style.setProperty("--p", p.toFixed(4));
      setActive(Math.round(p * (n - 1)));
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
  }, [on, n]);

  return (
    <section ref={ref} id={id} className={`orbit dark${on ? " is-3d" : ""}`} style={{ "--n": n } as React.CSSProperties}>
      <div className="orbit-pin">
        <div className="wrap orbit-head">
          {head}
          {on && (
            <p className="orbit-count num" aria-hidden="true">
              <b>{String(active + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}
            </p>
          )}
        </div>
        <div className="orbit-stage">
          <div className="orbit-ring" ref={ring}>
            {cards.map((c, i) => (
              <article key={c.t} className={`orbit-card${on && i === active ? " is-on" : ""}`} style={{ "--i": i } as React.CSSProperties}>
                <span className="orbit-num num">{c.n ?? String(i + 1).padStart(2, "0")}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </article>
            ))}
          </div>
        </div>
        {foot && <div className="wrap orbit-foot">{foot}</div>}
      </div>
    </section>
  );
}
