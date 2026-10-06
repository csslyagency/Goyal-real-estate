import { site, absoluteUrl, instagramUrl } from "./site";
import { type Project, projectHref, locationLabel } from "./projects";

const orgId = `${site.url}/#organization`;

export function organizationSchema() {
  const sameAs = [instagramUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    description: site.description,
    foundingDate: String(site.established),
    foundingLocation: { "@type": "Place", name: `${site.city}, ${site.state}, ${site.country}` },
    founders: site.founders.map((name) => ({ "@type": "Person", name: name.replace(/^Mr\.\s*/, "") })),
    areaServed: { "@type": "City", name: site.city },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: "IN",
      ...(site.contact.address ? { streetAddress: site.contact.address.join(", ") } : {}),
    },
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": orgId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectSchema(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": p.category === "hospitality" ? "LocalBusiness" : "Place",
    name: p.name,
    description: p.summary,
    url: absoluteUrl(projectHref(p)),
    image: absoluteUrl(`/img/og/${p.image}.jpg`),
    address: {
      "@type": "PostalAddress",
      addressLocality: locationLabel(p),
      addressRegion: site.state,
      addressCountry: "IN",
    },
    ...(p.category === "hospitality" ? { parentOrganization: { "@id": orgId } } : { containedInPlace: { "@type": "City", name: p.city } }),
    additionalProperty: [{ "@type": "PropertyValue", name: "Developer", value: p.developer }],
  };
}

export function itemListSchema(name: string, list: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: list.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: absoluteUrl(projectHref(p)),
    })),
  };
}
