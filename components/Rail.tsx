"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Chevron } from "./Icons";

/**
 * A horizontal, snap-scrolling row. Touch and trackpads scroll it natively; the buttons and the
 * progress line are for a mouse.
 */
export function Rail({ children, label, className = "" }: { children: React.ReactNode; label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ start: true, end: false, pos: 0, view: 1 });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = Math.abs(el.scrollLeft);
    setState({ start: x < 4, end: x > max - 4, pos: max > 0 ? x / max : 0, view: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1 });
  }, []);

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [measure]);

  const go = (step: 1 | -1) => {
    const el = ref.current;
    const tile = el?.firstElementChild as HTMLElement | null;
    if (!el || !tile) return;
    el.scrollBy({ left: step * (tile.offsetWidth + 16), behavior: "smooth" });
  };

  const bar = Math.max(0.12, Math.min(1, state.view));
  return (
    <div className="rail-shell rv">
      <div className={`rail ${className}`.trim()} ref={ref} tabIndex={0} role="region" aria-label={label}>
        {children}
      </div>
      <div className="wrap rail-foot">
        <span className="rail-track" aria-hidden="true">
          <span style={{ width: `${bar * 100}%`, insetInlineStart: `${state.pos * (1 - bar) * 100}%` }} />
        </span>
        <div className="rail-btns">
          <button type="button" className="round" onClick={() => go(-1)} disabled={state.start} aria-label="Previous">
            <span className="flip">
              <Chevron />
            </span>
          </button>
          <button type="button" className="round" onClick={() => go(1)} disabled={state.end} aria-label="Next">
            <Chevron />
          </button>
        </div>
      </div>
    </div>
  );
}
