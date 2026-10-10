import { JsonLd } from "@/components/JsonLd";
import { ProjectCard } from "@/components/ProjectCard";
import { Hero, SecHead } from "@/components/Sections";
import { projectsIntro } from "@/lib/content";
import { workProjects } from "@/lib/projects";
import { itemListSchema } from "@/lib/schema";
import { ogImage, pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Our Work: Residential, Commercial & Hospitality Projects in Indore",
  description:
    "Goyals Group projects across Indore: Goyal Nagar, Goyal Vihar, Goyal Hills, Radhika Palace, Goyal Resort and more.",
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
            {workProjects.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={itemListSchema("Goyals Group projects", workProjects)} />
    </>
  );
}
