import { site, whatsappUrl } from "./site";

export type EnquiryPayload = Record<string, string> & { name: string; phone: string; source: string };

export type EnquiryOutcome = "sent" | "whatsapp";

/** The submission as labelled rows, in a fixed order; empty fields are left out. */
function rows(p: EnquiryPayload): [string, string][] {
  const all: [string, string | undefined][] = [
    ["Form", p.source],
    ["Name", p.name],
    ["Phone", p.phone],
    ["Email", p.email],
    ["Looking to", p.lookingTo],
    ["Interested in", p.interest],
    ["Project", p.project],
    ["Preferred location", p.location],
    ["Budget", p.budget],
    ["Area of interest", p.team],
    ["Message", p.message],
  ];
  return all.filter((r): r is [string, string] => !!r[1]);
}

function asMessage(p: EnquiryPayload) {
  return [`New enquiry via the Goyals Group website`, ...rows(p).map(([k, v]) => `${k}: ${v}`)].join("\n");
}

/** Opens WhatsApp with the enquiry typed out. Falls back to a same-tab visit if a popup is blocked. */
function handOffToWhatsApp(p: EnquiryPayload) {
  const wa = whatsappUrl(asMessage(p));
  if (!wa) return false;
  const win = window.open(wa, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = wa;
  return true;
}

/**
 * Enquiries go by email through site.enquiryEndpoint (api/enquiry.js, Resend). If that fails or
 * cannot be reached, the enquiry is handed to WhatsApp instead, so it is never lost; only when
 * neither works does the form report an error.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryOutcome> {
  if (site.enquiryEndpoint) {
    try {
      const res = await fetch(site.enquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (res.ok && body.ok) return "sent";
    } catch {
      // Network failure: fall through to WhatsApp.
    }
  }
  if (handOffToWhatsApp(payload)) return "whatsapp";
  throw new Error("Enquiry could not be sent");
}

export function validatePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export function validateEmail(raw: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw);
}
