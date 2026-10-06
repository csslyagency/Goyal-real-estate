"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Icons";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type FeatureItem = { href: string; title: string; meta: string };

const STEP = 6500;

/**
 * The glass card over the home hero: our projects, one at a time, with a progress line under
 * each. It advances on its own, holds while pointed at or focused (keeping the time left, so the
 * line and the timer stay together), and never moves for visitors who prefer reduced motion.
 */
export function HeroFeature({ items, label }: { items: FeatureItem[]; label: string }) {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const auto = !useReducedMotion();
  const left = useRef(STEP);
  const started = useRef(0);

  useEffect(() => {
    left.current = STEP;
    started.current = performance.now();
  }, [i]);
  useEffect(() => {
    if (!auto) return;
    if (held) {
      left.current = Math.max(0, left.current - (performance.now() - started.current));
      return;
    }
    started.current = performance.now();
    const t = window.setTimeout(() => setI((n) => (n + 1) % items.length), left.current);
    return () => window.clearTimeout(t);
  }, [i, auto, held, items.length]);

  const it = items[i];
  const state = !auto ? " is-static" : held ? " is-held" : "";
  return (
    <div
      className={`hero-feature${state}`}
      style={{ "--step": `${STEP}ms` } as React.CSSProperties}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <span className="hero-feature-label">
        <i aria-hidden="true" />
        {label}
        <span className="hero-feature-count num" aria-hidden="true">
          {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </span>
      <Link href={it.href} className="hero-feature-link" key={it.href}>
        <strong>{it.title}</strong>
        <span className="hero-feature-meta">{it.meta}</span>
        <span className="hero-feature-go" aria-hidden="true">
          <Arrow />
        </span>
      </Link>
      <div className="hero-feature-bars" role="group" aria-label="Choose a project">
        {items.map((x, n) => (
          <button
            key={x.href}
            type="button"
            className={n === i ? "is-on" : n < i ? "is-done" : undefined}
            aria-label={x.title}
            aria-current={n === i ? "true" : undefined}
            onClick={() => setI(n)}
          >
            <span key={n === i ? `on-${i}` : "off"} />
          </button>
        ))}
      </div>
    </div>
  );
}
