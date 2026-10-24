import { EnquiryForm } from "@/components/EnquiryForm";
import { Hero, Pending } from "@/components/Sections";
import { mailUrl, site, telUrl } from "@/lib/site";
import { ogImage, pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Enquire Us: Goyals Group, Indore",
  description: "Speak with a Goyals Group advisor about residential and commercial property in Indore, new projects, or hospitality and events.",
  path: "/contact/",
  image: ogImage("hero-penthouse"),
});

export default function ContactPage() {
  return (
    <>
      <Hero
        small
        images={["hero-penthouse"]}
        crumbs={[{ name: "Enquire us", path: "/contact/" }]}
        eyebrow="Enquire us"
        h1="Let's find your next property."
        lede="Tell us what you are looking for. An advisor will get in touch personally, plainly and without pressure."
      />
      <section className="sec">
        <div className="wrap split top">
          <section id="enquiry" aria-labelledby="brief-h">
            <h2 id="brief-h">Speak with an advisor</h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Whether it is a family home, a business address, an occasion or a long-term holding, we will help you understand the options.
            </p>
            <div className="calc-wrap">
              <EnquiryForm source="Contact page" />
            </div>
          </section>
          <div>
            <h2>Let&apos;s Connect</h2>
            <dl className="contact-list">
              <div>
                <dt>Phone</dt>
                <dd>{telUrl ? <a href={telUrl}>{site.contact.phone}</a> : <Pending>To be added</Pending>}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{mailUrl ? <a href={mailUrl}>{site.contact.email}</a> : <Pending>To be added</Pending>}</dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>{site.contact.address ? site.contact.address.join(", ") : <><Pending>Address to be added</Pending>, Indore, Madhya Pradesh</>}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
