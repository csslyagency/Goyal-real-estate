import { site, whatsappUrl } from "./site";

export type EnquiryPayload = Record<string, string> & { name: string; phone: string; source: string };

export type EnquiryOutcome = "sent" | "whatsapp" | "preview";

function asMessage(p: EnquiryPayload) {
  const lines = [
    `New enquiry via the Goyals Group website (${p.source})`,
    `Name: ${p.name}`,
    `Phone: ${p.phone}`,
    p.email && `Email: ${p.email}`,
    p.lookingTo && `Looking to: ${p.lookingTo}`,
    p.interest && `Interested in: ${p.interest}`,
    p.project && `Project: ${p.project}`,
    p.location && `Preferred location: ${p.location}`,
    p.budget && `Budget: ${p.budget}`,
    p.message && `Message: ${p.message}`,
  ];
  return lines.filter(Boolean).join("\n");
}

/**
 * The site is static, so enquiries go to an external endpoint
 * (NEXT_PUBLIC_ENQUIRY_ENDPOINT). Without one, they hand off to WhatsApp when a
 * number is configured, and otherwise report "preview" so the page can say the
 * form is not yet connected rather than pretend it was delivered.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryOutcome> {
  if (site.enquiryEndpoint) {
    const res = await fetch(site.enquiryEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...payload, _subject: `Website enquiry: ${payload.name}`, message_text: asMessage(payload) }),
    });
    if (!res.ok) throw new Error(`Enquiry endpoint responded ${res.status}`);
    return "sent";
  }
  const wa = whatsappUrl(asMessage(payload));
  if (wa) {
    window.open(wa, "_blank", "noopener,noreferrer");
    return "whatsapp";
  }
  return "preview";
}

export function validatePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export function validateEmail(raw: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw);
}
