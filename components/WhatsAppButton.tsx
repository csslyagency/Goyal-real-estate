import { WhatsApp } from "./Icons";
import { whatsappUrl } from "@/lib/site";

/**
 * The floating WhatsApp button on every page. It uses site.contact.whatsapp; until that number
 * is supplied it opens the enquiry form instead (no number is ever invented).
 */
export function WhatsAppButton() {
  const href = whatsappUrl("Hello Goyals Group, I would like to know more about your properties.");
  const label = href ? "Chat with Goyals Group on WhatsApp" : "Contact Goyals Group (WhatsApp number to be added)";
  return (
    <a
      className="wa-float"
      href={href ?? "/contact/#enquiry"}
      {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      title={href ? "WhatsApp" : "WhatsApp number to be added"}
    >
      <WhatsApp />
    </a>
  );
}
