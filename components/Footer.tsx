import Link from "next/link";
import { Arrow, ArrowUp, Instagram } from "./Icons";
import { Logo } from "./Mark";
import { Pending } from "./Sections";
import { instagramUrl, mailUrl, site, telUrl, whatsappUrl } from "@/lib/site";

const COLUMNS = [
  {
    id: "f-company",
    title: "Company",
    links: [
      { label: "About us", href: "/about/" },
      { label: "Our story", href: "/about/#story" },
      { label: "Careers", href: "/careers/" },
      { label: "Enquire us", href: "/contact/" },
    ],
  },
  {
    id: "f-work",
    title: "Our Work",
    links: [
      { label: "Goyal Hills", href: "/projects/#goyal-hills" },
      { label: "Golden Leaves Convention Centre", href: "/projects/#golden-leaves-convention-centre" },
      { label: "Fortune Select Nipania", href: "/projects/#fortune-select-nipania" },
      { label: "Goyal Resort", href: "/projects/#goyal-resort" },
      { label: "All our work", href: "/projects/" },
    ],
  },
];

export function Footer() {
  const { contact } = site;
  const wa = whatsappUrl();
  const year = new Date().getFullYear();

  return (
    <footer className="ftr dark">
      <div className="wrap">
        <div className="ftr-cta rv">
          <div>
            <p className="eyebrow">Goyals Group · Since {site.established}</p>
            <h2 className="ftr-cta-h">We build what lasts.</h2>
          </div>
          <div className="ftr-cta-side">
            <p>For more than four decades, Goyals Group has believed that the strongest foundations are built on trust. Speak with our team about homes, business spaces and new projects across Indore.</p>
            <div className="btns">
              <Link href="/contact/" className="btn">
                Enquire us <Arrow />
              </Link>
              <Link href="/projects/" className="btn btn-ghost">
                Our work
              </Link>
            </div>
          </div>
        </div>

        <div className="ftr-top">
          <div className="ftr-brand">
            <Link href="/" aria-label={`${site.name}, home`}>
              <Logo />
            </Link>
            <p className="ftr-note">An Indore-rooted business group building across commercial, residential and hospitality since 1984.</p>
            <dl className="ftr-contact">
              <div>
                <dt>Phone</dt>
                <dd>{telUrl ? <a href={telUrl}>{contact.phone}</a> : <Pending>To be added</Pending>}</dd>
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
                <dd>{mailUrl ? <a href={mailUrl}>{contact.email}</a> : <Pending>To be added</Pending>}</dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>{contact.address ? contact.address.join(", ") : <><Pending>Address to be added</Pending>, Indore, Madhya Pradesh</>}</dd>
              </div>
            </dl>
            <div className="ftr-social" role="group" aria-label="Follow Goyals Group">
              {instagramUrl ? (
                <a href={instagramUrl} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                </a>
              ) : (
                <span className="pending" title="Instagram handle to be added">
                  Instagram to be added
                </span>
              )}
            </div>
          </div>
          {COLUMNS.map((c) => (
            <nav key={c.id} aria-labelledby={c.id}>
              <h2 id={c.id}>{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="ftr-base">
          <div className="ftr-legal">
            <span>
              © {year} {site.name}. All rights reserved.
            </span>
          </div>
          <a className="ftr-top-link" href="#top">
            Back to top
            <span className="ftr-up">
              <ArrowUp />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
