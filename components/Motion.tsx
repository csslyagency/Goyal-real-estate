"use client";

import { useEffect } from "react";

/**
 * Scroll reveals. Anything with `.rv` fades up as it enters the viewport; items entering together
 * are staggered. Content is only hidden once this has mounted (html.rv-ready), so the page reads
 * in full without JavaScript. New nodes (client navigation, filtered results) are picked up too.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.style.setProperty("--d", `${Math.min(n++, 5) * 90}ms`);
          el.classList.add("in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    const watch = (node: ParentNode) => node.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => io.observe(el));
    const mo = new MutationObserver((muts) => {
      for (const m of muts)
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches(".rv:not(.in)")) io.observe(n);
          watch(n);
        });
    });

    // What is already on screen stays put; the rest reveals on scroll.
    const h = window.innerHeight;
    document.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < h && r.bottom > 0) el.classList.add("in");
    });
    root.classList.add("rv-ready");
    watch(document);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
