import { EnquiryForm } from "@/components/EnquiryForm";
import { WhatsApp } from "@/components/Icons";
import { Hero, Pending } from "@/components/Sections";
import { instagramUrl, mailUrl, site, telUrl, whatsappUrl } from "@/lib/site";
import { ogImage, pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Contact Goyals Group, Indore",
  description: "Speak with a Goyals Group advisor about residential and commercial property in Indore, new projects, or hospitality and events.",
  path: "/contact/",
  image: ogImage("hero-penthouse"),
});

export default function ContactPage() {
  const wa = whatsappUrl("Hello Goyals Group, I would like to know more about your properties.");
  return (
    <>
      <Hero
        small
        images={["hero-penthouse"]}
        crumbs={[{ name: "Contact", path: "/contact/" }]}
        eyebrow="Contact"
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
            <h2>Find us</h2>
            <dl className="contact-list">
              <div>
                <dt>Phone</dt>
                <dd>{telUrl ? <a href={telUrl}>{site.contact.phone}</a> : <Pending>To be added</Pending>}</dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  {wa ? (
                    <a href={wa} target="_blank" rel="noopener noreferrer">
                      Message us on WhatsApp
                    </a>
                  ) : (
                    <Pending>To be added</Pending>
                  )}
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{mailUrl ? <a href={mailUrl}>{site.contact.email}</a> : <Pending>To be added</Pending>}</dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>{instagramUrl ? <a href={instagramUrl}>@{site.social.instagram}</a> : <Pending>To be added</Pending>}</dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>{site.contact.address ? site.contact.address.join(", ") : <><Pending>Address to be added</Pending>, Indore, Madhya Pradesh</>}</dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>{site.contact.hours ?? <Pending>To be added</Pending>}</dd>
              </div>
            </dl>
            {wa ? (
              <div className="btns">
                <a href={wa} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                  <WhatsApp /> Chat on WhatsApp
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
