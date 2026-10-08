import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Pic } from "@/components/Pic";
import { PropertySearch } from "@/components/PropertySearch";
import { Eyebrow, Hero } from "@/components/Sections";
import { businesses, otherDevelopments } from "@/lib/content";
import type { PhotoName } from "@/lib/photos";
import { listedProjects } from "@/lib/projects";
import { itemListSchema } from "@/lib/schema";
import { ogImage, pageMeta } from "@/lib/metadata";

const pages = {
  residential: {
    title: "Residential Properties in Indore",
    h1: "Residential properties in Indore",
    description:
      "Residential developments in Indore by Goyals Group, including Goyal Hills: homes planned around quality, usability, community and lasting value.",
    hero: "residence-garden-tower" as PhotoName,
    side: "interior-living" as PhotoName,
    position: "50% 40%",
  },
  commercial: {
    title: "Commercial Property in Indore",
    h1: "Commercial property in Indore",
    description:
      "Commercial developments in Indore by Goyals Group, planned around accessibility, functionality and long-term business value.",
    hero: "commercial-tower" as PhotoName,
    side: "commercial-lounge" as PhotoName,
    position: "50% 30%",
  },
} as const;

type Cat = keyof typeof pages;

export const dynamicParams = false;
export function generateStaticParams() {
  return (Object.keys(pages) as Cat[]).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/properties/[category]">) {
  const { category } = await params;
  const page = pages[category as Cat];
  if (!page) return {};
  return pageMeta({ title: page.title, description: page.description, path: `/properties/${category}/`, image: ogImage(page.hero) });
}

export default async function CategoryPage({ params }: PageProps<"/properties/[category]">) {
  const { category } = await params;
  const page = pages[category as Cat];
  if (!page) notFound();
  const cat = category as Cat;
  const business = businesses.find((b) => b.key === cat)!;
  const other = otherDevelopments.find((o) => o.category === cat)!;
  const list = listedProjects.filter((p) => p.category === cat);

  return (
    <>
      <Hero
        small
        images={[page.hero]}
        positions={[page.position]}
        crumbs={[
          { name: "Properties", path: "/properties/" },
          { name: business.name, path: `/properties/${cat}/` },
        ]}
        eyebrow={business.headline}
        h1={page.h1}
        lede={business.body}
      />
      <PropertySearch list={listedProjects} lockType={cat} level="h2" title={`${business.name} developments by Goyals Group`} />
      <section className="sec stone" aria-labelledby="portfolio-h">
        <div className="wrap split">
          <div className="split-media rv">
            <Pic name={page.side} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div>
            <Eyebrow className="rv">Portfolio</Eyebrow>
            <h2 id="portfolio-h" className="rv">
              {other.name}
            </h2>
            <p className="lede rv">{other.body}</p>
            <p className="rv" style={{ marginTop: 18 }}>
              Over four decades, Goyals Group has delivered 50+ real estate developments across Indore. Details of individual developments are available from our team on request.
            </p>
            <div className="btns rv">
              <Link href="/contact/#enquiry" className="btn">
                Ask about {business.name.toLowerCase()} options <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <JsonLd data={itemListSchema(page.title, list)} />
    </>
  );
}
