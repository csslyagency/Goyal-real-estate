import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Pic } from "@/components/Pic";
import { ProjectCard } from "@/components/ProjectCard";
import { PropertyCard } from "@/components/PropertyCard";
import { Band, Hero, SecHead } from "@/components/Sections";
import { getLocation, locations } from "@/lib/locations";
import { projects } from "@/lib/projects";
import { itemListSchema } from "@/lib/schema";
import { ogImage, pageMeta } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[city]">) {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) return {};
  return pageMeta({
    title: `Property in ${loc.name}: Residential, Commercial & Hospitality`,
    description: `Explore residential and commercial property in ${loc.name}, ${loc.state} by Goyals Group, building across the city since 1984 with 50+ real estate developments.`,
    path: `/locations/${loc.slug}/`,
    image: ogImage(loc.image),
  });
}

export default async function LocationPage({ params }: PageProps<"/locations/[city]">) {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) notFound();
  const here = projects.filter((p) => p.city === loc.name);
  const listed = here.filter((p) => p.listed);
  const other = here.filter((p) => !p.listed);

  return (
    <>
      <Hero
        small
        images={[loc.image]}
        positions={["50% 30%"]}
        crumbs={[{ name: loc.name, path: `/locations/${loc.slug}/` }]}
        eyebrow={`Locations · ${loc.state}`}
        h1={`Property in ${loc.name}`}
        lede={loc.lead}
      />
      <section className="sec" aria-labelledby="why-h">
        <div className="wrap loc">
          <div className="loc-media rv">
            <Pic name="heritage-arches" sizes="(max-width: 960px) 100vw, 60vw" />
            <div className="loc-cap">
              <span>
                <small>Since 1984</small>
                <strong>{loc.name}</strong>
              </span>
              <em>Rajwada arches, Indore</em>
            </div>
          </div>
          <div className="loc-card rv">
            <div className="loc-thumbs">
              <figure>
                <Pic name="indore-gandhi-hall" sizes="(max-width: 960px) 100vw, 36vw" />
                <figcaption>Gandhi Hall, Indore</figcaption>
              </figure>
              <figure>
                <Pic name="indore-chhatris" sizes="12vw" />
              </figure>
              <figure>
                <Pic name="indore-rajwada" sizes="12vw" />
              </figure>
              <figure>
                <Pic name="commercial-tower" sizes="12vw" alt="" />
              </figure>
            </div>
            <div className="loc-body">
              <h2 id="why-h" style={{ fontSize: "clamp(26px, 2.2vw, 32px)" }}>
                {loc.title}
              </h2>
              <p>{loc.body}</p>
              <dl className="loc-rows">
                {loc.positioning.map((x) => (
                  <div key={x.label}>
                    <dt>{x.label}</dt>
                    <dd>{x.body}</dd>
                  </div>
                ))}
                <div>
                  <dt>Since 1984</dt>
                  <dd>50+ real estate developments delivered by Goyals Group across {loc.name}.</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section className="sec stone" aria-labelledby="props-h">
        <div className="wrap">
          <SecHead
            eyebrow="Properties"
            title={`Residential and commercial property in ${loc.name}`}
            id="props-h"
            side={
              <Link href="/properties/" className="more">
                Search properties <Arrow />
              </Link>
            }
          />
          <div className="grid">
            {listed.map((p) => (
              <PropertyCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>
      {other.length ? (
        <section className="sec" aria-labelledby="hosp-h">
          <div className="wrap">
            <SecHead eyebrow="Hospitality" title={`Hospitality in ${loc.name}`} id="hosp-h" />
            <div className="grid">
              {other.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <Band image="balcony-dusk" eyebrow="Your brief" h2={`Looking for property in ${loc.name}?`} lede="Tell us what you need and an advisor will share suitable options across the city.">
        <Link href="/contact/#enquiry" className="btn">
          Speak with an advisor <Arrow />
        </Link>
      </Band>
      <JsonLd data={itemListSchema(`Goyals Group developments in ${loc.name}`, here)} />
    </>
  );
}
