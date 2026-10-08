import { CareersForm } from "@/components/CareersForm";
import { Pic } from "@/components/Pic";
import { Eyebrow, Hero, SecHead } from "@/components/Sections";
import { careers, principles } from "@/lib/content";
import { ogImage, pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Careers at Goyals Group, Indore",
  description:
    "Build what lasts with Goyals Group, an Indore-rooted business group across construction, real estate and hospitality since 1984. Introduce yourself to our team.",
  path: "/careers/",
  image: ogImage("commercial-lounge"),
});

export default function CareersPage() {
  return (
    <>
      <Hero small images={["commercial-lounge"]} crumbs={[{ name: "Careers", path: "/careers/" }]} eyebrow="Careers" h1="Build what lasts, with us." lede={careers.lede} />

      <section className="sec" id="why" aria-labelledby="why-h">
        <div className="wrap split top">
          <div className="split-media rv">
            <Pic name="hero-skybridge" sizes="(max-width: 900px) 100vw, 50vw" alt="" />
          </div>
          <div>
            <Eyebrow className="rv">Why Goyals Group</Eyebrow>
            <h2 id="why-h" className="rv">
              A place to do work that lasts.
            </h2>
            <ol className="guide-card rv">
              {careers.why.map((w, i) => (
                <li key={w.title}>
                  <span className="n num">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{w.title}</strong>
                  <p>{w.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="sec dark" id="values" aria-labelledby="values-h">
        <div className="wrap">
          <SecHead eyebrow="Our values" title="Five principles we hire for." id="values-h" />
          <ol className="values">
            {principles.map((p, i) => (
              <li key={p.name} className="rv">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.name}</h3>
                <p>{p.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec stone" id="teams" aria-labelledby="teams-h">
        <div className="wrap">
          <SecHead eyebrow="Where you could fit in" title="Teams across the Group." id="teams-h" />
          <ul className="teams">
            {careers.teams.map((t) => (
              <li key={t.name} className="rv">
                <h3>{t.name}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" id="apply" aria-labelledby="apply-h">
        <div className="wrap split top">
          <div>
            <Eyebrow className="rv">Current openings</Eyebrow>
            <h2 id="apply-h" className="rv">
              Introduce yourself.
            </h2>
            <p className="lede rv">
              There are no openings listed right now. New roles will be posted on this page. Until then, share your details and we will keep them on file for suitable roles across the Group.
            </p>
            <ol className="guide-card rv">
              {careers.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="n num">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{s.title}</strong>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="panel rv" id="careers-form">
            <CareersForm />
          </div>
        </div>
      </section>
    </>
  );
}
