import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: "Privacy Policy", description: "How Goyals Group handles personal information shared through this website.", path: "/privacy-policy/" });

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy/"
      intro="Goyals Group respects your privacy. This policy explains what information we collect through this website, why we collect it and how we look after it."
      sections={[
        { heading: "Information we collect", body: ["When you submit an enquiry or register interest, we collect the details you choose to share, such as your name, phone number, email address, preferred location, budget band and message.", "This website does not use advertising cookies. Basic technical information may be processed by our hosting provider to deliver the site securely."] },
        { heading: "How we use it", body: ["We use your details only to respond to your enquiry, share information about properties, projects or events you have asked about, and keep a record of our conversation. We do not sell your personal information."] },
        { heading: "Sharing", body: ["Enquiries may be processed by a trusted form or messaging service acting on our behalf, solely to deliver your message to our team. We may also disclose information where required by law."] },
        { heading: "Retention and your rights", body: ["We keep enquiry details for as long as needed to respond and for reasonable record-keeping. In line with applicable Indian data protection law, you may ask us to access, correct or erase your personal information, or withdraw your consent, by contacting us."] },
        { heading: "Contact", body: ["For privacy questions, please reach us through the contact page. Our dedicated contact details will be published here."] },
      ]}
    />
  );
}
