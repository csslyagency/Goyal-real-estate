import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Arrow, WhatsApp } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Pic } from "@/components/Pic";
import { ProjectCard } from "@/components/ProjectCard";
import { Crumbs, Pending } from "@/components/Sections";
import { businesses } from "@/lib/content";
import {
  ON_REQUEST,
  PRICE_ON_REQUEST,
  categories,
  formatArea,
  formatBedrooms,
  formatCount,
  formatPossession,
  getProject,
  locationLabel,
  projects,
} from "@/lib/projects";
import { projectSchema } from "@/lib/schema";
import { whatsappUrl } from "@/lib/site";
import { ogImage, pageMeta } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const kind = p.category === "hospitality" ? p.label : `${categories[p.category].label} property`;
  return pageMeta({
    title: `${p.name}, ${locationLabel(p)}: ${kind}`,
    description: `${p.name} by ${p.developer}, ${locationLabel(p)}. ${p.summary}`,
    path: `/projects/${p.slug}/`,
    image: ogImage(p.image),
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const realEstate = p.category !== "hospitality";
  const business = businesses.find((b) => b.key === p.category);
  const wa = whatsappUrl(`Hello Goyals Group, I would like to know more about ${p.name}.`);
  const others = projects.filter((x) => x.slug !== p.slug);
  const similar = [...others.filter((x) => x.category === p.category), ...others.filter((x) => x.category !== p.category)].slice(0, 3);
  const images = [p.image, ...p.gallery].slice(0, 2);
  const more = p.gallery.slice(1, 3);
  const cell = (v: string) => (v === ON_REQUEST ? <span className="on-request">{v}</span> : v);

  const facts: [string, React.ReactNode][] = realEstate
    ? [
        ["Price", PRICE_ON_REQUEST],
        ["Configuration", cell(p.configuration ?? (p.category === "residential" ? formatBedrooms(p.bedrooms) : ON_REQUEST))],
        ...(p.category === "residential" ? ([["Bathrooms", cell(formatCount(p.bathrooms))]] as [string, React.ReactNode][]) : []),
        ["Area", cell(formatArea(p.area))],
        ["Possession", cell(formatPossession(p))],
        ["Developer", p.developer],
        ["Location", locationLabel(p)],
      ]
    : [
        ["Category", p.label],
        ["Offering", p.offering ?? ON_REQUEST],
        ["Developer", p.developer],
        ["Location", locationLabel(p)],
      ];

  return (
    <>
      <div className="wrap">
        <div className="crumbs-nav">
          <Crumbs
            items={[
              { name: "Projects", path: "/projects/" },
              { name: p.name, path: `/projects/${p.slug}/` },
            ]}
          />
        </div>
        <div className="gallery-wrap">
          <div className={`gallery${images.length === 1 ? " one" : ""}`}>
            {images.map((name, i) => (
              <Pic key={name} name={name} priority={i === 0} sizes={i === 0 ? "(max-width: 760px) 100vw, 66vw" : "33vw"} alt={i === 0 ? undefined : ""} />
            ))}
          </div>
          <span className="rep-tag">Representative images</span>
        </div>

        <div className="detail">
          <div>
            <header className="detail-head">
              <p className="detail-chips">
                <span className="chip chip-soft chip-accent">{categories[p.category].label}</span>
                <span className="chip chip-soft">{p.label}</span>
                <span className="chip chip-soft">{p.developer}</span>
              </p>
              <h1>{p.name}</h1>
              <p className="detail-loc">
                {p.label} in <Link href="/locations/indore/">{locationLabel(p)}</Link>, Madhya Pradesh
              </p>
              <dl className="facts">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </header>

            <section className="block prose-p" aria-label={`About ${p.name}`}>
              <p className="lede">{p.summary}</p>
              <p>{p.detail}</p>
              {business ? <p>{business.body}</p> : null}
              <p>
                Detailed information on {p.name}
                {realEstate ? ", including configurations, sizes, availability and pricing," : ""} is shared by our team on request.
              </p>
            </section>

            {realEstate ? (
              <section className="block" aria-labelledby="facts-h">
                <h2 id="facts-h">Project details</h2>
                <ul className="ticks">
                  <li>Developed by {p.developer}, building across Indore since 1984</li>
                  <li>Amenities: {p.amenities?.join(", ") ?? "shared on request"}</li>
                  <li>
                    RERA registration: {p.rera ?? <Pending>details to be added where applicable</Pending>}
                  </li>
                </ul>
              </section>
            ) : null}

            {more.length ? (
              <section className="block" aria-labelledby="more-h">
                <h2 id="more-h">More images</h2>
                <div className={`gallery${more.length === 1 ? " one" : ""}`}>
                  {more.map((name) => (
                    <Pic key={name} name={name} sizes="(max-width: 760px) 100vw, 50vw" alt="" />
                  ))}
                </div>
              </section>
            ) : null}

            <section className="block" id="enquire" aria-labelledby="enquire-h">
              <h2 id="enquire-h">Enquire about {p.name}</h2>
              <EnquiryForm source={`Project page: ${p.name}`} project={p.name} intents={realEstate ? ["Buy", "Rent", "Invest"] : []} submitLabel={realEstate ? "Speak With an Advisor" : "Send enquiry"} />
            </section>
          </div>

          <aside className="aside" aria-label="Pricing and enquiries">
            <p className="aside-price">{realEstate ? PRICE_ON_REQUEST : "Enquire for details"}</p>
            <p className="aside-sub">
              {p.label} · {locationLabel(p)}
            </p>
            <a href="#enquire" className="btn">
              {realEstate ? "Speak with an advisor" : "Send an enquiry"} <Arrow />
            </a>
            {wa ? (
              <a href={wa} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                <WhatsApp /> Ask on WhatsApp
              </a>
            ) : null}
            <p className="aside-ref">
              <span>Developer: {p.developer}</span>
              <span>Images are representative</span>
            </p>
          </aside>
        </div>
      </div>

      <section className="sec stone" aria-labelledby="similar-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="similar-h">More from Goyals Group</h2>
            <Link href="/projects/" className="more">
              All projects <Arrow />
            </Link>
          </div>
          <div className="grid">
            {similar.map((x) => (
              <ProjectCard key={x.slug} p={x} />
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={projectSchema(p)} />
    </>
  );
}
