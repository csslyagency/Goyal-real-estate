import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: "Disclaimer", description: "Important information about the content and imagery on the Goyals Group website.", path: "/disclaimer/" });

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      path="/disclaimer/"
      intro="The content of this website is for general information only and does not constitute an offer or a legal, financial or investment recommendation."
      sections={[
        { heading: "Images", body: ["Photographs and visuals on this website are representative and for illustration only. They may not depict the actual project, specifications, fittings or surroundings."] },
        { heading: "Project information", body: ["Configurations, areas, amenities, possession timelines and prices are shared on request and are subject to change. Where a project is registered under the Real Estate (Regulation and Development) Act, 2016, its registration details will be shown on the project page."] },
        { heading: "No investment advice", body: ["Any guidance shared on this website or by our team is general in nature. Property values can rise or fall. Please make decisions based on your own circumstances and independent advice where appropriate."] },
        { heading: "Testimonials", body: ["Testimonials currently shown on this website are illustrative placeholders for the design preview and will be replaced with genuine customer feedback."] },
      ]}
    />
  );
}
