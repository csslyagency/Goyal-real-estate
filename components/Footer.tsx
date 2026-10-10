import Link from "next/link";
import { ArrowUp, Instagram } from "./Icons";
import { Logo } from "./Mark";
import { Pending } from "./Sections";
import { instagramUrl, mailUrl, site, telUrl } from "@/lib/site";

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
      { label: "Golden Leaves Convention Centre", href: "/#golden-leaves-convention-centre" },
      { label: "Fortune Select Nipania", href: "/#fortune-select-nipania" },
      { label: "Goyal Resort", href: "/projects/#goyal-resort" },
      { label: "All our work", href: "/projects/" },
    ],
  },
];

export function Footer() {
  const { contact } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="ftr dark">
      <div className="wrap">
        <div className="ftr-top">
          <div className="ftr-brand">
            <Link href="/" aria-label={`${site.name}, home`}>
              <Logo />
            </Link>
            <p className="ftr-note">An Indore-rooted business group building across commercial, residential and hospitality since 1956.</p>
            <dl className="ftr-contact">
              <div>
                <dt>Phone</dt>
                <dd>{telUrl ? <a href={telUrl}>{contact.phone}</a> : <Pending>To be added</Pending>}</dd>
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
