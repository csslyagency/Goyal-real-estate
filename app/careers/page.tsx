import { CareersForm } from "@/components/CareersForm";
import { Eyebrow, Hero } from "@/components/Sections";
import { careers, principles } from "@/lib/content";
import { ogImage, pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Careers at Goyals Group, Indore",
  description:
    "Build what lasts with Goyals Group, an Indore-rooted business group across construction, real estate and hospitality since 1984. Introduce yourself to our team.",
  path: "/careers/",
  image: ogImage("commercial-lounge"),
});

export default function CareersPage() {
  return (
    <>
      <Hero small images={["commercial-lounge"]} crumbs={[{ name: "Careers", path: "/careers/" }]} eyebrow="Careers" h1="Build what lasts, with us." lede={careers.lede} />

      <section className="sec" id="apply" aria-labelledby="apply-h">
        <div className="wrap split top">
          <div>
            <Eyebrow className="rv">Join us</Eyebrow>
            <h2 id="apply-h" className="rv">
              Introduce yourself.
            </h2>
            <p className="lede rv">There are no openings listed right now. Share your details and we will be in touch when a suitable role comes up across the Group.</p>
            <div className="principles-line rv" aria-label="Our five principles">
              {principles.map((p) => (
                <span key={p.name} className="chip chip-soft">
                  {p.name}
                </span>
              ))}
            </div>
          </div>
          <div className="panel rv" id="careers-form">
            <CareersForm />
          </div>
        </div>
      </section>
    </>
  );
}
