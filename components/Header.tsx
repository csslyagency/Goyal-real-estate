"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Mark";
import { menu } from "@/lib/nav";
import { site } from "@/lib/site";

/** Frosted ivory by default. Over a full-bleed hero (main's first section is .hero) the CSS turns
 * it transparent until the page scrolls. Four plain links; a full-screen menu on phones. */
export function Header() {
  const raw = usePathname() || "/";
  const path = raw.length > 1 ? raw.replace(/\/$/, "") : raw;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route changes (adjusting state during render,
  // as React recommends, rather than in an effect).
  const [seen, setSeen] = useState(raw);
  if (seen !== raw) {
    setSeen(raw);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = (href: string) => {
    if (href.includes("#")) return undefined;
    const h = href.split("?")[0].replace(/\/$/, "");
    if (!h) return undefined;
    return path === h || path.startsWith(`${h}/`) ? "page" : undefined;
  };
  const cls = ["hdr", scrolled ? "is-scrolled" : "", open ? "is-open" : ""].filter(Boolean).join(" ");

  return (
    <header className={cls}>
      <div className="wrap hdr-in">
        <Link href="/" aria-label={`${site.name}, home`} className="hdr-logo">
          <Logo />
        </Link>
        <nav className="hdr-nav" aria-label="Main">
          {menu.map((m) => (
            <div key={m.label} className="nav-item">
              <Link href={m.href} aria-current={current(m.href)}>
                {m.label}
              </Link>
            </div>
          ))}
        </nav>
        <div className="hdr-tools">
          <button type="button" className="hdr-menu" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}>
            <span className="burger" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="hdr-menu-label">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>
      <div id="site-menu" className="menu" hidden={!open}>
        <nav className="wrap menu-in" aria-label="Site menu">
          <ol className="menu-links">
            <li>
              <Link href="/" aria-current={path === "/" ? "page" : undefined}>
                Home
              </Link>
            </li>
            {menu.map((m) => (
              <li key={m.label}>
                <Link href={m.href} aria-current={current(m.href)}>
                  {m.label}
                </Link>
              </li>
            ))}
          </ol>
          <p className="menu-note">An Indore-rooted business group building across commercial, residential and hospitality since 1956.</p>
        </nav>
      </div>
    </header>
  );
}
