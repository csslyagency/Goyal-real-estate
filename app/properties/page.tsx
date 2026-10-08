import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PropertySearch } from "@/components/PropertySearch";
import { Band } from "@/components/Sections";
import { listedProjects } from "@/lib/projects";
import { itemListSchema } from "@/lib/schema";
import { ogImage, pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Properties in Indore: Residential & Commercial",
  description:
    "Search residential and commercial properties in Indore by Goyals Group. Filter by type, bedrooms, area and possession status, or speak with an advisor.",
  path: "/properties/",
  image: ogImage("residence-garden-tower"),
});

const POPULAR = [
  { label: "Residential properties in Indore", href: "/properties/residential/" },
  { label: "Commercial property in Indore", href: "/properties/commercial/" },
  { label: "New and upcoming projects in Indore", href: "/projects/#upcoming" },
  { label: "Goyal Hills, residential development", href: "/projects/#goyal-hills" },
  { label: "Goyal Greens, residential development", href: "/projects/#goyal-greens" },
  { label: "Property in Indore: the city guide", href: "/locations/indore/" },
];

export default function PropertiesPage() {
  return (
    <>
      <PropertySearch list={listedProjects} />
      <section className="sec stone" aria-labelledby="popular-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="popular-h">Popular searches</h2>
          </div>
          <ul className="links">
            {POPULAR.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Band image="hero-skybridge" eyebrow="Your brief" h2="Tell us what you are looking for." lede="Share what you need and an advisor will come back with suitable options, including new projects before they are listed.">
        <Link href="/contact/#enquiry" className="btn">
          Speak with an advisor <Arrow />
        </Link>
      </Band>
      <JsonLd data={itemListSchema("Properties in Indore by Goyals Group", listedProjects)} />
    </>
  );
}
