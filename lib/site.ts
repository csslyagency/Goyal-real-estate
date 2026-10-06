/**
 * Company facts. Everything here comes from the Goyals Group brief document.
 *
 * Contact details, the Instagram handle and the office address were NOT in the
 * brief, so they are `null` and the site shows a clearly marked placeholder
 * until they are filled in. Do not invent values: add the real ones here and
 * every page (header, footer, contact, WhatsApp button, schema) picks them up.
 */
export const site = {
  name: "Goyals Group",
  shortName: "Goyals",
  tagline: "We build what lasts.",
  established: 1984,
  city: "Indore",
  state: "Madhya Pradesh",
  country: "India",
  founders: ["Mr. Prem Chand Goyal", "Mr. Vijay Goyal"],
  description:
    "Goyals Group is an Indore-rooted business group established in 1984. Over four decades it has delivered 50+ real estate developments across Indore, across commercial, residential and hospitality.",

  /** Public URL of the site (no trailing slash). Set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.goyalsgroup.example").replace(/\/$/, ""),

  /** Set NEXT_PUBLIC_SITE_LIVE=true on the production build to allow indexing. */
  live: process.env.NEXT_PUBLIC_SITE_LIVE === "true",

  contact: {
    /** Display format, e.g. "+91 98XXX XXXXX". */
    phone: null as string | null,
    /** Digits only with country code, e.g. "9198XXXXXXXX". Drives every WhatsApp link. */
    whatsapp: null as string | null,
    email: null as string | null,
    /** Multi-line office address. */
    address: null as string[] | null,
    hours: null as string | null,
  },

  social: {
    /** Instagram handle without the @. */
    instagram: null as string | null,
  },

  /**
   * Where enquiry forms are sent. The site is static, so this must be a form
   * service or CRM webhook that accepts a JSON POST (Formspree, Web3Forms,
   * Zoho/HubSpot webhook...). Set NEXT_PUBLIC_ENQUIRY_ENDPOINT at build time.
   */
  enquiryEndpoint: process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "",
} as const;

export const instagramUrl = site.social.instagram
  ? `https://www.instagram.com/${site.social.instagram}/`
  : null;

export function whatsappUrl(message?: string) {
  if (!site.contact.whatsapp) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.contact.whatsapp}${text}`;
}

export const telUrl = site.contact.phone ? `tel:${site.contact.phone.replace(/[^\d+]/g, "")}` : null;
export const mailUrl = site.contact.email ? `mailto:${site.contact.email}` : null;

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
