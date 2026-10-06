import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: "Terms & Conditions", description: "Terms that apply to the use of the Goyals Group website.", path: "/terms/" });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms/"
      intro="By using this website you agree to these terms. Please read them alongside our privacy policy and disclaimer."
      sections={[
        { heading: "Use of this website", body: ["This website provides general information about Goyals Group and its developments. You may browse and share it for personal, non-commercial purposes."] },
        { heading: "No offer", body: ["Nothing on this website is an offer, invitation to offer or contract for the sale or lease of any property. Any transaction is governed solely by the agreement executed between the parties."] },
        { heading: "Accuracy", body: ["We take care to keep information accurate, but details, plans, specifications and availability may change without notice. Please confirm all details with our team before making a decision."] },
        { heading: "Intellectual property", body: ["The Goyals Group name, content and design of this website belong to Goyals Group or its licensors. Photographs may be licensed from third parties."] },
        { heading: "Governing law", body: ["These terms are governed by the laws of India."] },
      ]}
    />
  );
}
