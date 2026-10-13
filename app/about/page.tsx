import { Timeline } from "@/components/Timeline";
import { Pic } from "@/components/Pic";
import { Eyebrow, Hero } from "@/components/Sections";
import { about, honesty, journey, legacy, parmarthikTrust } from "@/lib/content";
import { ogImage, pageMeta } from "@/lib/metadata";

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Line icons for the Trust's three values: compassion, service, social responsibility. */
const TRUST_ICONS = [
  <svg key="compassion" viewBox="0 0 24 24">
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" {...line} />
  </svg>,
  <svg key="service" viewBox="0 0 24 24">
    <path d="M3 14.5h3.2l3.6 2.4h5.4a1.6 1.6 0 0 0 0-3.2h-3.6" {...line} />
    <path d="M6.2 14.5V21M3 21h3.2M11.6 13.7l6.6-3.3a1.6 1.6 0 0 1 1.5 2.8L14.4 17" {...line} />
    <path d="M14 7.6s-2.6-1.6-2.6-3.5a1.5 1.5 0 0 1 2.6-.9 1.5 1.5 0 0 1 2.6.9c0 1.9-2.6 3.5-2.6 3.5z" {...line} />
  </svg>,
  <svg key="community" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="3" {...line} />
    <path d="M6.5 20a5.5 5.5 0 0 1 11 0" {...line} />
    <circle cx="5" cy="10.5" r="2.2" {...line} />
    <path d="M1.8 18.5A3.8 3.8 0 0 1 5 15.2" {...line} />
    <circle cx="19" cy="10.5" r="2.2" {...line} />
    <path d="M22.2 18.5a3.8 3.8 0 0 0-3.2-3.3" {...line} />
  </svg>,
];

export const metadata = pageMeta({
  title: "About Goyals Group: A Legacy Built on Trust Since 1956",
  description:
    "Established in Indore in 1956 by Mr. Prem Chand Goyal and Mr. Vijay Goyal, Goyals Group has delivered 75+ real estate developments across the city and grown into hospitality.",
  path: "/about/",
  image: ogImage("about-header"),
});

export default function AboutPage() {
  return (
    <>
      <Hero small images={["about-header"]} crumbs={[{ name: "About us", path: "/about/" }]} eyebrow={about.eyebrow} h1="A legacy built on trust since 1956." lede={legacy.title} />

      <section className="sec" id="story" aria-labelledby="story-h">
        <div className="wrap split top">
          <div className="split-media rv">
            <Pic name="about-indore" sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div>
            <Eyebrow className="rv">Our story</Eyebrow>
            <h2 id="story-h" className="rv">
              More than constructing buildings.
            </h2>
            <div className="stack rv" style={{ marginTop: 24 }}>
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="fine-note rv">{about.closing}</p>
          </div>
        </div>
      </section>

      <section className="sec dark belief" id="honesty" aria-labelledby="honesty-h">
        <div className="wrap belief-grid">
          <div className="belief-quote rv">
            <Eyebrow>{honesty.eyebrow}</Eyebrow>
            <h2 id="honesty-h">
              <span className="q" aria-hidden="true">
                “
              </span>
              {honesty.title}
            </h2>
            <p className="belief-sign">
              <strong>Mr. Prem Chand Goyal</strong>
              <span>Written on his first bill book, 1956</span>
            </p>
          </div>
          <div className="belief-text rv">
            {honesty.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sec stone trust" id="trust" aria-labelledby="trust-h">
        <div className="wrap">
          <div className="trust-head rv">
            <div>
              <Eyebrow>{parmarthikTrust.eyebrow}</Eyebrow>
              <h2 id="trust-h">{parmarthikTrust.title}</h2>
            </div>
            <p className="lede">{parmarthikTrust.paragraphs[0]}</p>
          </div>
          <ul className="trust-values">
            {parmarthikTrust.values.map((v, i) => (
              <li key={v} className="rv">
                <span className="trust-icon" aria-hidden="true">
                  {TRUST_ICONS[i]}
                </span>
                <h3>{v}</h3>
              </li>
            ))}
          </ul>
          <div className="trust-text rv">
            {parmarthikTrust.paragraphs.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sec dark" id="journey" aria-labelledby="journey-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow>Our journey</Eyebrow>
              <h2 id="journey-h">An Enduring Vision</h2>
            </div>
          </div>
          <Timeline items={journey} />
        </div>
      </section>

    </>
  );
}
