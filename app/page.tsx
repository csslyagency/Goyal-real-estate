import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Arrow } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Principles } from "@/components/Principles";
import { Pic } from "@/components/Pic";
import { Portrait } from "@/components/Portrait";
import { ProjectCard } from "@/components/ProjectCard";
import { Rail } from "@/components/Rail";
import { Eyebrow, Hero, Pending, SecHead } from "@/components/Sections";
import {
  about,
  founderNote,
  legacy,
  mission,
  principles,
  stats,
  testimonials,
  testimonialsIntro,
  vision,
} from "@/lib/content";
import {
  getProject,
  projects,
} from "@/lib/projects";
import { itemListSchema } from "@/lib/schema";
import { instagramUrl, mailUrl, site, telUrl } from "@/lib/site";

export default function HomePage() {
  const leaves = getProject("golden-leaves-convention-centre")!;
  const fortune = getProject("fortune-select-nipania")!;

  return (
    <>
      <Hero
        images={["hero-film-poster"]}
        film={{ src: "/video/hero-aerial.mp4", width: 1280, height: 786 }}
        eyebrow="An Indore-rooted business group · Since 1956"
        h1="We build what lasts."
        lede="Residential, commercial and hospitality developments shaped by seven decades of trust, integrity and thoughtful planning across Indore."
      >
        <div className="btns">
          <Link href="/projects/" className="btn">
            Explore Our Work <Arrow />
          </Link>
        </div>
      </Hero>

      <section className="sec dark" aria-labelledby="principles-h">
        <Principles
          items={principles}
          head={
            <>
              <Eyebrow>How we work</Eyebrow>
              <h2 id="principles-h">Five principles. One way of working.</h2>
              <p className="lede">
                At the heart of the Group are five enduring principles. They
                have guided every development since 1956, and they guide every
                conversation with you.
              </p>
              <div className="btns">
                <Link href="/about/" className="btn">
                  Our story <Arrow />
                </Link>
              </div>
            </>
          }
        />
      </section>

      <section className="sec stone" id="work" aria-labelledby="projects-h">
        <div className="wrap">
          <SecHead
            eyebrow="Our work"
            title="Places we have built. Experiences we continue to create."
            id="projects-h"
          />
          <div className="grid grid-4">
            {projects.slice(0, 4).map((p) => (
              <ProjectCard
                key={p.slug}
                p={p}
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
              />
            ))}
          </div>
          <div className="btns see-more rv">
            <Link href="/projects/" className="btn btn-ghost">
              See more <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="sec" id="hospitality" aria-labelledby="hospitality-h">
        <div className="wrap">
          <SecHead
            eyebrow="Hospitality"
            title="Our Legacy Extends to Hospitality"
            id="hospitality-h"
            side={
              <p className="lede">
                From celebrations and conventions to contemporary stays, our
                hospitality ventures bring together scale, service, thoughtful
                design and the warmth of Indian hospitality.
              </p>
            }
          />
          <div className="grid grid-2">
            {[leaves, fortune].map((p) => (
              <ProjectCard
                key={p.slug}
                p={p}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="sec stone" id="founder" aria-labelledby="founder-h">
        <div className="wrap split top">
          <div className="split-media rv">
            <Pic
              name="person-prem-chand-goyal"
              sizes="(max-width: 900px) 100vw, 50vw"
              position="50% 12%"
            />
          </div>
          <div>
            <Eyebrow className="rv">{founderNote.eyebrow}</Eyebrow>
            <h2 id="founder-h" className="quote-h rv">
              {founderNote.title}
            </h2>
            <div className="stack rv" style={{ marginTop: 24 }}>
              {founderNote.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="sig rv">
              <strong>{founderNote.name}</strong>
              <span>{founderNote.role}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="legacy" aria-labelledby="gens-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow>{legacy.eyebrow}</Eyebrow>
              <h2 id="gens-h">Three generations. One philosophy.</h2>
            </div>
            <p className="lede">{legacy.intro}</p>
          </div>
          <ol className="gens">
            {legacy.generations.map((g) => (
              <li key={g.label} className="rv">
                <Portrait name={g.person} photo={g.photo} />
                <div className="gen-body">
                  <p className="gen-label">{g.label}</p>
                  <h3>{g.person}</h3>
                  <p>{g.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="lede rv" style={{ marginTop: 40, maxWidth: "none" }}>
            {legacy.philosophy}
          </p>
        </div>
      </section>

      <section
        className="sec dark vision"
        id="vision"
        aria-labelledby="vision-h"
      >
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow>{vision.eyebrow}</Eyebrow>
              <h2 id="vision-h">{vision.heading}</h2>
            </div>
            <p className="lede">{vision.aside}</p>
          </div>
          <div className="vm rv">
            <article>
              <Eyebrow>{vision.label}</Eyebrow>
              <h3>{vision.title}</h3>
              <p>{vision.body}</p>
            </article>
            <article>
              <Eyebrow>{mission.label}</Eyebrow>
              <h3>{mission.title}</h3>
              <p>{mission.body}</p>
              <p className="belief">{mission.belief}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="sec dark legacy" aria-labelledby="legacy-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow>Why Goyals Group</Eyebrow>
              <h2 id="legacy-h">Rooted in Indore, built on trust.</h2>
            </div>
            <p className="lede">{about.paragraphs[2]}</p>
          </div>
          <dl className="figures rv">
            {stats.map((s) => (
              <div key={s.label}>
                <dd>
                  <CountUp
                    value={s.value}
                    suffix={s.suffix}
                    animate={s.animate}
                  />
                </dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        className="sec"
        id="testimonials"
        aria-labelledby="testimonials-h"
      >
        <div className="wrap sec-head rv">
          <div>
            <Eyebrow>{testimonialsIntro.eyebrow}</Eyebrow>
            <h2 id="testimonials-h">{testimonialsIntro.title}</h2>
          </div>
          <p className="lede">{testimonialsIntro.body}</p>
        </div>
        {testimonials.length > 0 ? (
          <>
            <Rail label="Testimonials" className="quotes">
              {testimonials.map((t) => (
                <figure key={t.name} className="quote-card">
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <span className="avatar" aria-hidden="true">
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                    <span className="who">
                      {t.name}
                      <small>{t.context}</small>
                    </span>
                   
                  </figcaption>
                </figure>
              ))}
            </Rail>
           
          </>
        ) : (
          <div className="wrap">
            <div className="share-story rv">
              <div>
                <h3>Your experience matters to us.</h3>
                <p>
                  Have you made a home with Goyals Group, or celebrated an
                  occasion at Golden Leaves? We would be glad to hear your
                  story.
                </p>
              </div>
              <div className="btns">
                {mailUrl ? (
                  <a
                    href={`${mailUrl}?subject=${encodeURIComponent("My experience with Goyals Group")}`}
                    className="btn btn-ghost"
                  >
                    Write to us
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="sec stone" id="contact" aria-labelledby="contact-h">
        <div className="wrap split top">
          <div>
            <Eyebrow className="rv">Contact</Eyebrow>
            <h2 id="contact-h" className="rv">
              Let&apos;s find your next property.
            </h2>
            <p className="lede rv">
              Share a few details and an advisor will get in touch to understand
              what you need, whether it is a home, a business address or an
              occasion.
            </p>
            <dl className="contact-list rv">
              <div>
                <dt>Phone</dt>
                <dd>
                  {telUrl ? (
                    <a href={telUrl}>{site.contact.phone}</a>
                  ) : (
                    <Pending>To be added</Pending>
                  )}
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  {mailUrl ? (
                    <a href={mailUrl}>{site.contact.email}</a>
                  ) : (
                    <Pending>To be added</Pending>
                  )}
                </dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  {instagramUrl ? (
                    <a href={instagramUrl}>@{site.social.instagram}</a>
                  ) : (
                    <Pending>To be added</Pending>
                  )}
                </dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>
                  {site.contact.address ? (
                    site.contact.address.join(", ")
                  ) : (
                    <>
                      <Pending>Address to be added</Pending>, Indore
                    </>
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <div className="panel rv" id="enquiry">
            <EnquiryForm source="Home page" />
          </div>
        </div>
      </section>

      <JsonLd
        data={itemListSchema("Goyals Group projects in Indore", projects)}
      />
    </>
  );
}
