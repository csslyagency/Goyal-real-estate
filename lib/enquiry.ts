import { site, whatsappUrl } from "./site";

export type EnquiryPayload = Record<string, string> & { name: string; phone: string; source: string };

export type EnquiryOutcome = "sent" | "whatsapp" | "preview";

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

/**
 * The site is static, so enquiries go to an external endpoint
 * (site.enquiryEndpoint, FormSubmit by default). Without one, they hand off to WhatsApp when a
 * number is configured, and otherwise report "preview" so the page can say the
 * form is not yet connected rather than pretend it was delivered.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryOutcome> {
  if (site.enquiryEndpoint) {
    const res = await fetch(site.enquiryEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Goyals Group website: ${payload.source} from ${payload.name}`,
        _template: "table",
        _captcha: "false",
        ...(payload.email ? { _replyto: payload.email } : {}),
        ...Object.fromEntries(rows(payload)),
      }),
    });
    if (!res.ok) throw new Error(`Enquiry endpoint responded ${res.status}`);
    // FormSubmit answers 200 with success "false" until the inbox is activated.
    const body = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    if (body.success === false || body.success === "false") throw new Error(body.message ?? "Enquiry was not accepted");
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
