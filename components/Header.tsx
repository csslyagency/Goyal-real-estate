"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow, Chevron } from "./Icons";
import { Logo } from "./Mark";
import { Pic } from "./Pic";
import { menu } from "@/lib/nav";
import { site } from "@/lib/site";

/** Frosted ivory by default. Over a full-bleed hero (main's first section is .hero) the CSS turns
 * it transparent until the page scrolls. Each top-level link opens a dropdown on hover; its
 * chevron opens it for keyboard and touch. */
export function Header() {
  const raw = usePathname() || "/";
  const path = raw.length > 1 ? raw.replace(/\/$/, "") : raw;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<number | null>(null);
  const leave = useRef<number>(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu and any dropdown when the route changes (adjusting state during render,
  // as React recommends, rather than in an effect).
  const [seen, setSeen] = useState(raw);
  if (seen !== raw) {
    setSeen(raw);
    setOpen(false);
    setDrop(null);
  }

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setDrop((d) => {
        if (d != null) navRef.current?.querySelectorAll<HTMLButtonElement>(".nav-caret")[d]?.focus();
        return null;
      });
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
  const hover = (i: number | null) => {
    window.clearTimeout(leave.current);
    if (i === null) leave.current = window.setTimeout(() => setDrop(null), 160);
    else setDrop(i);
  };
  const cls = ["hdr", scrolled ? "is-scrolled" : "", open ? "is-open" : "", drop != null ? "is-drop" : ""].filter(Boolean).join(" ");

  return (
    <header className={cls}>
      <div className="wrap hdr-in">
        <Link href="/" aria-label={`${site.name}, home`} className="hdr-logo">
          <Logo />
        </Link>
        <nav
          className="hdr-nav"
          aria-label="Main"
          ref={navRef}
          onMouseLeave={() => hover(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setDrop(null);
          }}
        >
          {menu.map((m, i) => (
            <div key={m.label} className={`nav-item${drop === i ? " is-open" : ""}`} onMouseEnter={() => hover(i)}>
              <Link href={m.href} aria-current={current(m.href)}>
                {m.label}
              </Link>
              <button
                type="button"
                className="nav-caret"
                aria-expanded={drop === i}
                aria-controls={`drop-${i}`}
                aria-label={`Open the ${m.label} menu`}
                onClick={() => setDrop((d) => (d === i ? null : i))}
              >
                <Chevron />
              </button>
              <div id={`drop-${i}`} className="drop" hidden={drop !== i}>
                <div className="wrap drop-in">
                  <div className="drop-cols">
                    {m.groups.map((g) => (
                      <div key={g.title} className="drop-col">
                        <p className="drop-title">{g.title}</p>
                        <ul>
                          {g.links.map((l) => (
                            <li key={l.href + l.label}>
                              <Link href={l.href} onClick={() => setDrop(null)}>
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link href={m.feature.href} className="drop-feature" onClick={() => setDrop(null)}>
                    <Pic name={m.feature.image} sizes="360px" alt="" />
                    <span className="drop-feature-in">
                      <span className="eyebrow">{m.feature.eyebrow}</span>
                      <strong>{m.feature.title}</strong>
                      <span className="drop-feature-go" aria-hidden="true">
                        <Arrow />
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </nav>
        <div className="hdr-tools">
          <Link href="/contact/" className="btn hdr-cta">
            Contact Us <Arrow />
          </Link>
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
                <details className="menu-sub">
                  <summary>
                    <span>{m.label}</span>
                    <Chevron />
                  </summary>
                  <ul>
                    <li>
                      <Link href={m.href} aria-current={current(m.href)}>
                        {m.label}
                      </Link>
                    </li>
                    {m.groups
                      .flatMap((g) => g.links)
                      .filter((l, n, arr) => l.href !== m.href && arr.findIndex((x) => x.href === l.href) === n)
                      .map((l) => (
                        <li key={l.href + l.label}>
                          <Link href={l.href}>{l.label}</Link>
                        </li>
                      ))}
                  </ul>
                </details>
              </li>
            ))}
            <li>
              <Link href="/contact/" aria-current={current("/contact/")}>
                Contact
              </Link>
            </li>
          </ol>
          <div className="menu-foot">
            <Link href="/contact/" className="btn">
              Contact Us <Arrow />
            </Link>
          </div>
          <p className="menu-note">An Indore-rooted business group building across commercial, residential and hospitality since 1984.</p>
        </nav>
      </div>
    </header>
  );
}
