import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Pic } from "@/components/Pic";
import { ProjectCard } from "@/components/ProjectCard";
import { RegisterInterest } from "@/components/RegisterInterest";
import { Eyebrow, Hero, SecHead } from "@/components/Sections";
import { moreToCome, otherDevelopments, projectsIntro } from "@/lib/content";
import { categories, projects } from "@/lib/projects";
import { itemListSchema } from "@/lib/schema";
import { ogImage, pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Our Work: Residential, Commercial & Hospitality Projects in Indore",
  description:
    "Goyals Group projects across Indore: Goyal Nagar, Goyal Vihar, Goyal Hills, Radhika Palace, Golden Leaves Convention Centre, Fortune Select Nipania, Goyal Resort and more.",
  path: "/projects/",
  image: ogImage("hero-skybridge"),
});

export default function ProjectsPage() {
  return (
    <>
      <Hero small images={["hero-skybridge"]} crumbs={[{ name: "Our work", path: "/projects/" }]} eyebrow={projectsIntro.eyebrow} h1="Places we have built." lede={projectsIntro.body} />
      <section className="sec" aria-labelledby="list-h">
        <div className="wrap">
          <SecHead eyebrow="Selected projects" title="Experiences we continue to create." id="list-h" />
          <div className="grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} p={p} sizes={i === 0 ? "(max-width: 640px) 100vw, 33vw" : undefined} />
            ))}
            <Link href="#upcoming" className="card card-more rv">
              <span className="plus" aria-hidden="true">
                +
              </span>
              <span>
                <span className="eyebrow">{moreToCome.eyebrow}</span>
                <h3>{moreToCome.title}</h3>
                <p>{moreToCome.body}</p>
                <span className="more">
                  Register your interest <Arrow />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="sec stone" aria-labelledby="portfolio-h">
        <div className="wrap">
          <SecHead eyebrow="Portfolio" title="Fifty and more developments across Indore." id="portfolio-h" />
          <div className="guide-list">
            {otherDevelopments.map((o) => (
              <article key={o.name} className="guide rv">
                <h3>{o.name}</h3>
                <p>{o.body}</p>
                <Link href={categories[o.category].href} className="more">
                  {categories[o.category].plural} <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" id="upcoming" aria-labelledby="upcoming-h">
        <div className="wrap split">
          <div className="split-media rv">
            <Pic name="rooftop-terrace" sizes="(max-width: 900px) 100vw, 50vw" alt="" />
          </div>
          <div>
            <Eyebrow className="rv">{moreToCome.eyebrow}</Eyebrow>
            <h2 id="upcoming-h" className="rv">
              {moreToCome.title}
            </h2>
            <p className="lede rv">{moreToCome.body}</p>
            <p className="fine-note rv">{moreToCome.note}</p>
            <div className="panel rv" style={{ marginTop: 28 }}>
              <RegisterInterest />
            </div>
          </div>
        </div>
      </section>
      <JsonLd data={itemListSchema("Goyals Group projects", projects)} />
    </>
  );
}
