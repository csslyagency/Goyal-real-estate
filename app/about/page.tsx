import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { Timeline } from "@/components/Timeline";
import { Pic } from "@/components/Pic";
import { Band, Eyebrow, Hero } from "@/components/Sections";
import { about, closing, journey, legacy, principles } from "@/lib/content";
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

      <section className="sec dark" id="journey" aria-labelledby="journey-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow>Our journey</Eyebrow>
              <h2 id="journey-h">From 1984 to what&apos;s next.</h2>
            </div>
            <Link href="/projects/" className="more">
              Our work <Arrow />
            </Link>
          </div>
          <Timeline items={journey} />
        </div>
      </section>

      <Band image="hero-sunrise-tower" eyebrow={closing.eyebrow} h2={closing.title} lede={`${closing.body} ${closing.line}`}>
        <Link href="/contact/" className="btn">
          Enquire us <Arrow />
        </Link>
        <Link href="/properties/" className="btn btn-ghost">
          Explore properties
        </Link>
      </Band>
    </>
  );
}
