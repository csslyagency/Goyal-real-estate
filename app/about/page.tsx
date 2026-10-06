import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { Arrow } from "@/components/Icons";
import { Orbit } from "@/components/Orbit";
import { Pic } from "@/components/Pic";
import { Band, Eyebrow, Hero } from "@/components/Sections";
import { about, closing, founderNote, journey, legacy, mission, principles, stats, vision } from "@/lib/content";
import { ogImage, pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "About Goyals Group: A Legacy Built on Trust Since 1984",
  description:
    "Established in Indore in 1984 by Mr. Prem Chand Goyal and Mr. Vijay Goyal, Goyals Group has delivered 50+ real estate developments across the city and grown into hospitality.",
  path: "/about/",
  image: ogImage("heritage-arches"),
});

export default function AboutPage() {
  return (
    <>
      <Hero small images={["heritage-arches"]} crumbs={[{ name: "About us", path: "/about/" }]} eyebrow={about.eyebrow} h1="A legacy built on trust since 1984." lede={legacy.title} />

      <section className="sec" id="story" aria-labelledby="story-h">
        <div className="wrap split top">
          <div className="split-media rv">
            <Pic name="heritage-sandstone" sizes="(max-width: 900px) 100vw, 50vw" alt="" />
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
            <div className="principles-line rv" aria-label="Our five principles">
              {principles.map((p) => (
                <span key={p.name} className="chip chip-soft">
                  {p.name}
                </span>
              ))}
            </div>
            <p className="fine-note rv">{about.closing}</p>
          </div>
        </div>
      </section>

      <section className="sec dark legacy" id="vision" aria-labelledby="vision-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow>Vision &amp; mission</Eyebrow>
              <h2 id="vision-h">Build what lasts.</h2>
            </div>
            <p className="lede">{vision.aside}</p>
          </div>
          <div className="vm rv">
            <article>
              <Eyebrow>{vision.label}</Eyebrow>
              <h3>{vision.title}</h3>
              <p>{vision.body}</p>
            </article>
            <article>
              <Eyebrow>{mission.label}</Eyebrow>
              <h3>{mission.title}</h3>
              <p>{mission.body}</p>
              <p className="belief">{mission.belief}</p>
            </article>
          </div>
          <dl className="figures rv">
            {stats.map((s) => (
              <div key={s.label}>
                <dd>
                  <CountUp value={s.value} suffix={s.suffix} animate={s.animate} />
                </dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sec stone" aria-labelledby="legacy-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow>{legacy.eyebrow}</Eyebrow>
              <h2 id="legacy-h">Three generations. One philosophy.</h2>
            </div>
            <p className="lede">{legacy.intro}</p>
          </div>
          <ol className="gens">
            {legacy.generations.map((g, i) => (
              <li key={g.label} className="rv">
                <span className="roman">{["I", "II", "III"][i]}</span>
                <h3>{g.label}</h3>
                <p>{g.body}</p>
              </li>
            ))}
          </ol>
          <p className="lede rv" style={{ marginTop: 40, maxWidth: "none" }}>
            {legacy.philosophy}
          </p>
        </div>
      </section>

      <Orbit
        id="journey"
        cards={journey.map((j) => ({ t: j.title, d: j.body, n: j.marker }))}
        head={
          <div className="rv">
            <Eyebrow>Our journey</Eyebrow>
            <h2>From 1984 to what&apos;s next.</h2>
          </div>
        }
        foot={
          <Link href="/projects/" className="btn">
            Our projects <Arrow />
          </Link>
        }
      />

      <section className="sec" id="founder" aria-labelledby="founder-h">
        <div className="wrap split top">
          <div className="split-media rv">
            <Pic name="heritage-jaali-corridor" sizes="(max-width: 900px) 100vw, 50vw" alt="" />
          </div>
          <div>
            <Eyebrow className="rv">{founderNote.eyebrow}</Eyebrow>
            <h2 id="founder-h" className="quote-h rv">
              {founderNote.title}
            </h2>
            <div className="stack rv" style={{ marginTop: 24 }}>
              {founderNote.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="sig rv">
              <strong>{founderNote.name}</strong>
              <span>{founderNote.role}</span>
            </div>
          </div>
        </div>
      </section>

      <Band image="hero-sunrise-tower" eyebrow={closing.eyebrow} h2={closing.title} lede={`${closing.body} ${closing.line}`}>
        <Link href="/contact/" className="btn">
          Contact Us <Arrow />
        </Link>
        <Link href="/properties/" className="btn btn-ghost">
          Explore properties
        </Link>
      </Band>
    </>
  );
}
