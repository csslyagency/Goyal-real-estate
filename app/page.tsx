import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HeroFeature } from "@/components/HeroFeature";
import { Arrow, Instagram, WhatsApp } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Principles } from "@/components/Principles";
import { Pic } from "@/components/Pic";
import { Portrait } from "@/components/Portrait";
import { ProjectCard } from "@/components/ProjectCard";
import { Rail } from "@/components/Rail";
import { RegisterInterest } from "@/components/RegisterInterest";
import { Eyebrow, Hero, Pending, SecHead } from "@/components/Sections";
import { about, advisory, founderNote, legacy, mission, moreToCome, principles, stats, testimonials, testimonialsIntro, vision } from "@/lib/content";
import type { PhotoName } from "@/lib/photos";
import { getProject, locationLabel, projectHref, projects } from "@/lib/projects";
import { itemListSchema } from "@/lib/schema";
import { instagramUrl, mailUrl, site, telUrl, whatsappUrl } from "@/lib/site";

const INSTA: { name: PhotoName; label: string; cls?: string }[] = [
  { name: "hero-penthouse", label: "Interiors", cls: "big" },
  { name: "rooftop-pool", label: "Lifestyle" },
  { name: "venue-mandap", label: "Celebrations" },
  { name: "residence-garden-tower", label: "Architecture", cls: "tall" },
  { name: "interior-dining", label: "Homes" },
  { name: "hotel-lobby", label: "Hospitality" },
  { name: "heritage-arches", label: "Indore" },
  { name: "commercial-lounge", label: "Workspaces" },
];

/** The glass card in the hero cycles a short selection, not all twelve. */
const HERO_PROJECTS = ["goyal-hills", "radhika-palace", "golden-leaves-convention-centre", "fortune-select-nipania", "goyal-resort"];

const PRINCIPLE_IMAGES: PhotoName[] = ["heritage-jaali-corridor", "interior-courtyard", "heritage-sandstone", "residence-garden-tower", "heritage-arches"];

export default function HomePage() {
  const leaves = getProject("golden-leaves-convention-centre")!;
  const fortune = getProject("fortune-select-nipania")!;
  const wa = whatsappUrl("Hello Goyals Group, I would like to know more about your properties.");

  return (
    <>
      <Hero
        images={["hero-sunrise-tower", "hero-penthouse", "hero-skybridge"]}
        positions={["50% 60%", "50% 50%", "50% 40%"]}
        eyebrow="An Indore-rooted business group · Since 1984"
        h1="We build what lasts."
        lede="Residential, commercial and hospitality developments shaped by four decades of trust, integrity and thoughtful planning across Indore."
        aside={
          <HeroFeature
            label="Our work"
            items={HERO_PROJECTS.map((slug) => getProject(slug)!).map((p) => ({ href: projectHref(p), title: p.name, meta: `${p.label} · ${locationLabel(p)}` }))}
          />
        }
      >
        <div className="btns">
          <Link href="/properties/" className="btn">
            Explore Properties <Arrow />
          </Link>
        </div>
      </Hero>

      <section className="sec dark" aria-labelledby="principles-h">
        <Principles
          items={principles.map((p, i) => ({ ...p, image: PRINCIPLE_IMAGES[i] }))}
          head={
            <>
              <Eyebrow>How we work</Eyebrow>
              <h2 id="principles-h">Five principles. One way of working.</h2>
              <p className="lede">At the heart of the Group are five enduring principles. They have guided every development since 1984, and they guide every conversation with you.</p>
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
          <SecHead eyebrow="Our work" title="Places we have built. Experiences we continue to create." id="projects-h" />
          <div className="grid grid-4">
            {projects.slice(0, 4).map((p) => (
              <ProjectCard key={p.slug} p={p} sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw" />
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
              <Link href="/hospitality/" className="more">
                Explore hospitality <Arrow />
              </Link>
            }
          />
          <p className="lede rv" style={{ marginTop: -12, marginBottom: 36 }}>
            From celebrations and conventions to contemporary stays, our hospitality ventures bring together scale, service, thoughtful design and the warmth of Indian hospitality.
          </p>
          <div className="grid grid-2">
            {[leaves, fortune].map((p) => (
              <ProjectCard key={p.slug} p={p} sizes="(max-width: 640px) 100vw, 50vw" />
            ))}
          </div>
        </div>
      </section>

      <section className="sec stone" id="founder" aria-labelledby="founder-h">
        <div className="wrap split top">
          <div className="split-media rv">
            <Pic name="heritage-jaali-corridor" sizes="(max-width: 900px) 100vw, 50vw" alt="" />
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
            {legacy.generations.map((g, i) => (
              <li key={g.label} className="rv">
                <span className="roman">{["I", "II", "III"][i]}</span>
                <h3>{g.label}</h3>
                <p>{g.body}</p>
                {g.person ? <Portrait name={g.person} /> : null}
              </li>
            ))}
          </ol>
          <p className="lede rv" style={{ marginTop: 40, maxWidth: "none" }}>
            {legacy.philosophy}
          </p>
        </div>
      </section>

      <section className="sec dark vision" id="vision" aria-labelledby="vision-h">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <Eyebrow>Vision &amp; mission</Eyebrow>
              <h2 id="vision-h">Build what lasts.</h2>
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
                  <CountUp value={s.value} suffix={s.suffix} animate={s.animate} />
                </dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
          <div className="principles-line rv" aria-label="Our five principles">
            {principles.map((p) => (
              <span key={p.name} className="chip chip-accent">
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="testimonials-h">
        <div className="wrap sec-head rv">
          <div>
            <Eyebrow>{testimonialsIntro.eyebrow}</Eyebrow>
            <h2 id="testimonials-h">{testimonialsIntro.title}</h2>
          </div>
          <p className="lede">{testimonialsIntro.body}</p>
        </div>
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
                {t.illustrative ? <span className="chip chip-soft">Illustrative</span> : null}
              </figcaption>
            </figure>
          ))}
        </Rail>
        {testimonials.some((t) => t.illustrative) ? (
          <p className="wrap fine-note">Illustrative testimonials shown for design purposes only. They will be replaced with genuine words from Goyals Group customers and partners.</p>
        ) : null}
      </section>

      <section className="sec stone" id="guidance" aria-labelledby="guidance-h">
        <div className="wrap split top">
          <div className="split-media rv">
            <Pic name="balcony-dusk" sizes="(max-width: 900px) 100vw, 50vw" position="72% 50%" />
          </div>
          <div>
            <Eyebrow className="rv">{advisory.eyebrow}</Eyebrow>
            <h2 id="guidance-h" className="rv">
              {advisory.title}
            </h2>
            <p className="lede rv">{advisory.body}</p>
            <ol className="guide-card rv">
              {advisory.points.map((p, i) => (
                <li key={p.title}>
                  <span className="n num">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{p.title}</strong>
                  <p>{p.body}</p>
                </li>
              ))}
            </ol>
            <div className="btns rv">
              <Link href="/contact/#enquiry" className="btn">
                Speak with an advisor <Arrow />
              </Link>
            </div>
            <p className="fine-note">{advisory.disclaimer}</p>
          </div>
        </div>
      </section>

      <section className="sec" id="upcoming" aria-labelledby="upcoming-h">
        <div className="wrap split">
          <div className="split-media rv">
            <Pic name="rooftop-pool" sizes="(max-width: 900px) 100vw, 50vw" alt="" />
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

      <section className="sec" aria-labelledby="insta-h">
        <div className="wrap">
          <SecHead
            eyebrow="Instagram"
            title="Follow our property stories"
            id="insta-h"
            side={
              <div className="sec-side">
                <span className="handle">
                  <Instagram />
                  {site.social.instagram ? `@${site.social.instagram}` : <Pending>Instagram handle to be added</Pending>}
                </span>
                <a href={instagramUrl ?? "https://www.instagram.com/"} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                  Follow on Instagram
                </a>
              </div>
            }
          />
          <div className="insta rv">
            {INSTA.map((t) => (
              <a key={t.name} href={instagramUrl ?? "https://www.instagram.com/"} target="_blank" rel="noopener noreferrer" className={t.cls} aria-label={`${t.label}: view on Instagram`}>
                <Pic name={t.name} sizes="(max-width: 760px) 50vw, 25vw" alt="" />
                <span className="insta-over">
                  <Instagram />
                  {t.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sec stone" id="contact" aria-labelledby="contact-h">
        <div className="wrap split top">
          <div>
            <Eyebrow className="rv">Contact</Eyebrow>
            <h2 id="contact-h" className="rv">
              Let&apos;s find your next property.
            </h2>
            <p className="lede rv">Share a few details and an advisor will get in touch to understand what you need, whether it is a home, a business address or an occasion.</p>
            <dl className="contact-list rv">
              <div>
                <dt>Phone</dt>
                <dd>{telUrl ? <a href={telUrl}>{site.contact.phone}</a> : <Pending>To be added</Pending>}</dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  {wa ? (
                    <a href={wa} target="_blank" rel="noopener noreferrer">
                      Message us
                    </a>
                  ) : (
                    <Pending>To be added</Pending>
                  )}
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{mailUrl ? <a href={mailUrl}>{site.contact.email}</a> : <Pending>To be added</Pending>}</dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>{instagramUrl ? <a href={instagramUrl}>@{site.social.instagram}</a> : <Pending>To be added</Pending>}</dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>{site.contact.address ? site.contact.address.join(", ") : <><Pending>Address to be added</Pending>, Indore</>}</dd>
              </div>
            </dl>
            {wa ? (
              <div className="btns rv">
                <a href={wa} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                  <WhatsApp /> Chat on WhatsApp
                </a>
              </div>
            ) : null}
          </div>
          <div className="panel rv" id="enquiry">
            <EnquiryForm source="Home page" />
          </div>
        </div>
      </section>


      <JsonLd data={itemListSchema("Goyals Group projects in Indore", projects)} />
    </>
  );
}
