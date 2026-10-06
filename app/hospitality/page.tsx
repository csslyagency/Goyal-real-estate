import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Arrow } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Pic } from "@/components/Pic";
import { Eyebrow, Hero } from "@/components/Sections";
import { businesses } from "@/lib/content";
import { projectHref, projects } from "@/lib/projects";
import { itemListSchema } from "@/lib/schema";
import { ogImage, pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Hospitality in Indore: Golden Leaves Convention Centre & Fortune Select Nipania",
  description:
    "Goyals Group hospitality in Indore: Golden Leaves Convention Centre for weddings, conventions and celebrations, and the contemporary Fortune Select Nipania hotel.",
  path: "/hospitality/",
  image: ogImage("venue-lawn"),
});

export default function HospitalityPage() {
  const hospitality = businesses.find((b) => b.key === "hospitality")!;
  const venues = projects.filter((p) => p.category === "hospitality");
  return (
    <>
      <Hero
        small
        images={["venue-lawn", "hotel-lobby"]}
        crumbs={[{ name: "Hospitality", path: "/hospitality/" }]}
        eyebrow="Hospitality"
        h1={hospitality.headline}
        lede="Hospitality is a natural extension of our belief in building experiences, not simply structures."
      />
      {venues.map((v, i) => (
        <section key={v.slug} className={`sec${i % 2 ? " stone" : ""}`} aria-labelledby={`v-${v.slug}`}>
          <div className="wrap split">
            <div className="split-media rv" style={i % 2 ? { order: 2 } : undefined}>
              <Pic name={v.image} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div>
              <Eyebrow className="rv">
                {String(i + 1).padStart(2, "0")} · {v.label}
              </Eyebrow>
              <h2 id={`v-${v.slug}`} className="rv">
                {v.name}
              </h2>
              <p className="lede rv">{v.detail}</p>
              {v.offering ? (
                <ul className="ticks rv" style={{ marginTop: 22 }}>
                  <li>{v.offering}</li>
                  <li>In {v.locality ? `${v.locality}, ` : ""}Indore</li>
                </ul>
              ) : null}
              <div className="btns rv">
                <Link href={projectHref(v)} className="btn">
                  Explore {v.name.split(" ").slice(0, 2).join(" ")} <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
      <section className="sec stone" id="enquire" aria-labelledby="enquire-h">
        <div className="wrap split top">
          <div>
            <Eyebrow className="rv">Plan an occasion</Eyebrow>
            <h2 id="enquire-h" className="rv">
              Weddings, conventions and celebrations.
            </h2>
            <p className="lede rv">{hospitality.body}</p>
          </div>
          <div className="panel rv">
            <EnquiryForm source="Hospitality page" project="Hospitality enquiry" intents={[]} submitLabel="Send enquiry" />
          </div>
        </div>
      </section>
      <JsonLd data={itemListSchema("Goyals Group hospitality", venues)} />
    </>
  );
}
