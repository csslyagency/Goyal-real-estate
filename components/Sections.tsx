import Link from "next/link";
import { Fragment } from "react";
import { type Film, HeroMedia } from "./HeroMedia";
import { JsonLd } from "./JsonLd";
import { Pic } from "./Pic";
import type { PhotoName } from "@/lib/photos";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; path: string };

export function Crumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        {all.map((it, i) => (
          <li key={it.path + it.name}>
            {i === all.length - 1 ? <span aria-current="page">{it.name}</span> : <Link href={it.path}>{it.name}</Link>}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbSchema(items)} />
    </nav>
  );
}

/** A headline whose words rise into place one after another. Each word is masked by its own
 * box, so the motion is pure transform and the text stays one heading for search and readers. */
export function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w" style={{ "--w": i } as React.CSSProperties}>
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`.trim()}>{children}</p>;
}

export function Hero({
  images,
  positions,
  h1,
  lede,
  eyebrow,
  crumbs,
  small = false,
  aside,
  film,
  children,
}: {
  images: PhotoName[];
  positions?: (string | undefined)[];
  h1: string;
  lede?: string;
  eyebrow?: string;
  crumbs?: Crumb[];
  small?: boolean;
  aside?: React.ReactNode;
  film?: Film;
  children?: React.ReactNode;
}) {
  return (
    <section className={`hero on-photo${small ? " hero-sm" : ""}`}>
      <HeroMedia images={images} positions={positions} film={film} />
      {aside}
      {small ? null : (
        <div className="scroll-cue" aria-hidden="true">
          <b>Scroll</b>
          <i />
        </div>
      )}
      <div className="wrap hero-in">
        {crumbs && <Crumbs items={crumbs} />}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1>
          <Words text={h1} />
        </h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}

/** A full-width photograph with a frosted panel of copy and buttons. */
export function Band({
  image,
  h2,
  lede,
  eyebrow,
  children,
  id,
}: {
  image: PhotoName;
  h2: string;
  lede?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  id?: string;
}) {
  return (
    <section className="band on-photo" id={id}>
      <div className="band-media">
        <Pic name={image} sizes="100vw" alt="" />
      </div>
      <div className="wrap band-in">
        <div className="band-card rv">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2>{h2}</h2>
          {lede && <p className="lede">{lede}</p>}
          {children && <div className="btns">{children}</div>}
        </div>
      </div>
    </section>
  );
}

/** Section heading row: eyebrow and title on one side, a link or lede on the other. */
export function SecHead({ eyebrow, title, id, side }: { eyebrow: string; title: string; id?: string; side?: React.ReactNode }) {
  return (
    <div className="sec-head rv">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id}>{title}</h2>
      </div>
      {side}
    </div>
  );
}

/** A detail the brief did not provide, shown as a visible placeholder instead of an invented value. */
export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="pending" title="To be confirmed by Goyals Group before launch">
      {children}
    </span>
  );
}
