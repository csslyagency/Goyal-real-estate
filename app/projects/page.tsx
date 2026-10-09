import { JsonLd } from "@/components/JsonLd";
import { ProjectCard } from "@/components/ProjectCard";
import { Hero, SecHead } from "@/components/Sections";
import { otherDevelopments, projectsIntro } from "@/lib/content";
import { projects } from "@/lib/projects";
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
              </article>
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={itemListSchema("Goyals Group projects", projects)} />
    </>
  );
}
