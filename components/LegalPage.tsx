import { Crumbs } from "./Sections";

export function LegalPage({ title, path, intro, sections }: { title: string; path: string; intro: string; sections: { heading: string; body: string[] }[] }) {
  return (
    <>
      <div className="wrap narrow phead">
        <Crumbs items={[{ name: title, path }]} />
        <h1>{title}</h1>
        <p className="lede">{intro}</p>
      </div>
      <div className="wrap narrow">
        <div className="prose" style={{ paddingBottom: "var(--space)" }}>
          {sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
