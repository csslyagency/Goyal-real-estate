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
  established: 1956,
  city: "Indore",
  state: "Madhya Pradesh",
  country: "India",
  founders: ["Mr. Prem Chand Goyal", "Mr. Vijay Goyal"],
  description:
    "Goyals Group is an Indore-rooted business group established in 1956. Over seven decades it has delivered 50+ real estate developments across Indore, across commercial, residential and hospitality.",

  /** Public URL of the site (no trailing slash). Set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.goyalsgroup.example").replace(/\/$/, ""),

  /** Set NEXT_PUBLIC_SITE_LIVE=true on the production build to allow indexing. */
  live: process.env.NEXT_PUBLIC_SITE_LIVE === "true",

  contact: {
    /** Display format, e.g. "+91 98XXX XXXXX". */
    phone: "+91 87705 49267" as string | null,
    /** Digits only with country code, e.g. "9198XXXXXXXX". Drives every WhatsApp link. */
    whatsapp: "918770549267" as string | null,
    email: "marketing@glcc.in" as string | null,
    /** Multi-line office address. */
    address: ["404 A, Mahasagar Corporate", "Geeta Bhawan, Indore (M.P.) 452001"] as string[] | null,
    hours: null as string | null,
  },

  social: {
    /** Instagram handle without the @. */
    instagram: "goyalsgroup" as string | null,
  },

  /**
   * Where every form is sent: the Vercel Function in api/enquiry.js, which emails the inbox through
   * Resend with a key held only in Vercel's environment. NEXT_PUBLIC_ENQUIRY_ENDPOINT overrides it.
   */
  enquiryEndpoint: process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "/api/enquiry/",
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
