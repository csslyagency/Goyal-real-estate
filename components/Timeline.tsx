"use client";

import { useEffect, useRef } from "react";

export type Milestone = { marker: string; title: string; body: string };

/** The journey as a vertical line that fills with gold as you read; each milestone lights up as the line reaches it. */
export function Timeline({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("is-live");
    let raf = 0;
    const tick = () => {
      raf = 0;
      const mark = window.innerHeight * 0.62;
      const r = el.getBoundingClientRect();
      const fill = Math.min(1, Math.max(0, (mark - r.top) / r.height));
      el.style.setProperty("--fill", fill.toFixed(4));
      el.querySelectorAll("li").forEach((li) => li.classList.toggle("is-on", li.getBoundingClientRect().top < mark));
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
  }, []);

  return (
    <div className="tl" ref={ref}>
      <span className="tl-fill" aria-hidden="true" />
      <ol>
        {items.map((m) => (
          <li key={m.title}>
            <div>
              <p className="tl-marker">{m.marker}</p>
              <h3>{m.title}</h3>
            </div>
            <p>{m.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
