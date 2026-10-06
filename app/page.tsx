import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HeroFeature } from "@/components/HeroFeature";
import { AskSearch } from "@/components/AskSearch";
import { BusinessIndex } from "@/components/BusinessIndex";
import { Expanse } from "@/components/Expanse";
import { Arrow, Instagram, WhatsApp } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PrinciplesStack } from "@/components/PrinciplesStack";
import { Pic } from "@/components/Pic";
import { ProjectCard } from "@/components/ProjectCard";
import { PropertyCard } from "@/components/PropertyCard";
import { Rail } from "@/components/Rail";
import { RegisterInterest } from "@/components/RegisterInterest";
import { Band, Eyebrow, Hero, Marquee, Pending, SecHead } from "@/components/Sections";
import { about, advisory, businessesIntro, founderNote, indore, moreToCome, principles, stats, testimonials, testimonialsIntro } from "@/lib/content";
import type { PhotoName } from "@/lib/photos";
import { featuredProjects, getProject, locationLabel, projectHref, projects } from "@/lib/projects";
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

export default function HomePage() {
  const hospitality = projects.filter((p) => p.category === "hospitality");
  const hills = getProject("goyal-hills")!;
  const green = getProject("goyals-green")!;
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
            label="Our projects"
            items={projects.map((p) => ({ href: projectHref(p), title: p.name, meta: `${p.label} · ${locationLabel(p)}` }))}
          />
        }
      >
        <div className="btns">
          <Link href="/properties/" className="btn">
            Explore Properties <Arrow />
          </Link>
          <Link href="/contact/" className="btn btn-ghost">
            Contact Us
          </Link>
        </div>
        <AskSearch />
      </Hero>

      <section className="sec" id="featured" aria-labelledby="featured-h">
        <div className="wrap">
          <SecHead
            eyebrow="Featured properties"
            title="Homes and workplaces, thoughtfully planned."
            id="featured-h"
            side={
              <Link href="/properties/" className="more">
                All properties <Arrow />
              </Link>
            }
          />
          <div className="grid grid-feature">
            {featuredProjects.map((p, i) => (
              <PropertyCard key={p.slug} p={p} priority={i === 0} sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : undefined} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec stone" aria-labelledby="projects-h">
        <div className="wrap">
          <SecHead
            eyebrow="Our projects"
            title="Places we have built. Experiences we continue to create."
            id="projects-h"
            side={
              <Link href="/projects/" className="more">
                All projects ({projects.length}) <Arrow />
              </Link>
            }
          />
          <div className="grid">
            {hospitality.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
            <Link href="/projects/#upcoming" className="card card-more rv">
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

      <Marquee items={["Residential", "Commercial", "Hospitality", "Indore since 1984", "Goyal Hills", "Goyals Green", "Golden Leaves", "Fortune Select Nipania"]} />

      <section className="sec" id="businesses" aria-labelledby="businesses-h">
        <div className="wrap sec-head rv">
          <div>
            <Eyebrow>{businessesIntro.eyebrow}</Eyebrow>
            <h2 id="businesses-h">Commercial. Residential. Hospitality.</h2>
          </div>
          <p className="lede">{businessesIntro.body}</p>
        </div>
        <div className="wrap">
          <BusinessIndex
            items={[
              { name: hills.name, kind: "Residential", text: "Places made for life: planned around thoughtful design, comfortable living and the needs of modern families.", href: projectHref(hills), image: hills.image },
              { name: green.name, kind: "Commercial", text: "Spaces that move business forward: accessibility, functionality and long-term value.", href: projectHref(green), image: green.image },
              { name: "Golden Leaves", kind: "Hospitality & events", text: "A destination for weddings, conventions, celebrations and large-scale experiences.", href: projectHref(leaves), image: "venue-lawn" },
              { name: "Fortune Select", kind: "Hospitality · Nipania", text: "A contemporary hotel marking the Group's growing presence in hospitality.", href: projectHref(fortune), image: fortune.image },
              { name: "More to come", kind: "New & upcoming", text: moreToCome.body, href: "/projects/#upcoming", image: "hero-skybridge" },
            ]}
          />
        </div>
      </section>

      <section className="sec" aria-labelledby="indore-h">
        <div className="wrap sec-head rv">
          <div>
            <Eyebrow>Locations</Eyebrow>
            <h2 id="indore-h">{indore.title}</h2>
          </div>
          <p className="lede">{indore.lead}</p>
        </div>
        <div className="wrap loc rv">
          <div className="loc-media">
            <Pic name="indore-rajwada" sizes="(max-width: 960px) 100vw, 60vw" position="50% 35%" />
            <div className="loc-cap">
              <span>
                <small>Madhya Pradesh</small>
                <strong>Indore</strong>
              </span>
              <em>Rajwada, the historic Holkar palace</em>
            </div>
          </div>
          <div className="loc-card">
            <div className="loc-thumbs">
              <figure>
                <Pic name="indore-gandhi-hall" sizes="(max-width: 960px) 100vw, 36vw" />
                <figcaption>Gandhi Hall, Indore</figcaption>
              </figure>
              <figure>
                <Pic name="indore-chhatris" sizes="12vw" />
              </figure>
              <figure>
                <Pic name="heritage-arches" sizes="12vw" />
              </figure>
              <figure>
                <Pic name="residence-garden-tower" sizes="12vw" alt="" />
              </figure>
            </div>
            <div className="loc-body">
              <h3>The city we call home</h3>
              <p>{indore.body}</p>
              <dl className="loc-rows">
                {indore.positioning.map((x) => (
                  <div key={x.label}>
                    <dt>{x.label}</dt>
                    <dd>{x.body}</dd>
                  </div>
                ))}
              </dl>
              <div className="btns">
                <Link href="/locations/indore/" className="btn">
                  Explore Indore <Arrow />
                </Link>
                <Link href="/properties/?location=indore" className="btn btn-ghost">
                  Properties in Indore
                </Link>
              </div>
            </div>
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

      <section className="sec dark" aria-labelledby="principles-h">
        <PrinciplesStack
          items={principles.map((p, i) => ({ ...p, image: (["heritage-jaali-corridor", "interior-courtyard", "heritage-sandstone", "residence-garden-tower", "heritage-arches"] as PhotoName[])[i] }))}
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

      <Band image="venue-lawn" eyebrow="Hospitality" h2="Creating places people remember." lede="From celebrations and conventions to contemporary stays, our hospitality ventures bring together scale, service, thoughtful design and the warmth of Indian hospitality.">
        <Link href="/hospitality/" className="btn">
          Explore hospitality <Arrow />
        </Link>
        <Link href="/hospitality/#enquire" className="btn btn-ghost">
          Plan an occasion
        </Link>
      </Band>

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

      <Expanse image="interior-living" words={["Places made", "for life."]} id="places">
        <Eyebrow>Residential</Eyebrow>
        <h2>Places made for life.</h2>
        <p>A home is more than an address. It is where everyday life unfolds, memories are created and futures take shape.</p>
        <div className="btns">
          <Link href="/properties/residential/" className="btn">
            Explore homes <Arrow />
          </Link>
          <Link href="/properties/" className="btn btn-ghost">
            All properties
          </Link>
        </div>
      </Expanse>

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

      <section className="sec stone" aria-labelledby="founder-h">
        <div className="wrap split">
          <div className="split-media rv">
            <Pic name="heritage-jaali-corridor" sizes="(max-width: 900px) 100vw, 50vw" alt="" />
          </div>
          <div>
            <Eyebrow className="rv">{founderNote.eyebrow}</Eyebrow>
            <h2 id="founder-h" className="quote-h rv">
              {founderNote.title}
            </h2>
            <div className="stack rv" style={{ marginTop: 24 }}>
              <p>{founderNote.paragraphs[1]}</p>
              <p>{founderNote.paragraphs[3]}</p>
            </div>
            <div className="sig rv">
              <strong>{founderNote.name}</strong>
              <span>{founderNote.role}</span>
            </div>
            <div className="btns rv">
              <Link href="/about/#founder" className="more">
                Read the full note <Arrow />
              </Link>
            </div>
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
