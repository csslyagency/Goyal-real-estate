"use client";

import { useEffect, useRef } from "react";
import { Pic } from "./Pic";
import type { PhotoName } from "@/lib/photos";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * A photograph that starts as a framed window between two halves of a line and opens to the full
 * screen as you scroll; the words part to make room and the copy settles in over the picture.
 * Without motion it is simply a full-bleed photograph with its copy.
 */
export function Expanse({
  image,
  words,
  children,
  id,
}: {
  image: PhotoName;
  words: [string, string];
  children: React.ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const live = !useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !live) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      const q = Math.min(1, p / 0.62);
      const reveal = Math.min(1, Math.max(0, (p - 0.6) / 0.28));
      el.style.setProperty("--q", q.toFixed(4));
      el.style.setProperty("--r", reveal.toFixed(4));
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
      el.style.removeProperty("--q");
      el.style.removeProperty("--r");
    };
  }, [live]);

  return (
    <section ref={ref} id={id} className={`expanse${live ? " is-live" : ""}`}>
      <div className="expanse-pin">
        <div className="expanse-frame">
          {/* Full screen on a portrait phone shows only the middle of a wide photograph. */}
          <Pic name={image} sizes="(max-aspect-ratio: 16/9) 178vh, 100vw" alt="" />
        </div>
        <p className="expanse-words" aria-hidden="true">
          <span>{words[0]}</span>
          <span>{words[1]}</span>
        </p>
        <div className="wrap expanse-copy on-photo">{children}</div>
      </div>
    </section>
  );
}
