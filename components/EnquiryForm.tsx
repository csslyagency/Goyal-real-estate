"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Arrow } from "./Icons";
import { type EnquiryOutcome, submitEnquiry, validateEmail, validatePhone } from "@/lib/enquiry";
import { budgetOptions, locationOptions } from "@/lib/options";
import { site } from "@/lib/site";

type Errors = Partial<Record<"name" | "phone" | "email", string>>;

/**
 * The enquiry form. The site is static, so it emails the enquiry through lib/enquiry.ts
 * (Resend, via api/enquiry.js), falling back to WhatsApp if that fails.
 */
export function EnquiryForm({
  source,
  project,
  submitLabel = "Speak With an Advisor",
}: {
  source: string;
  project?: string;
  submitLabel?: string;
}) {
  const id = useId();
  const f = (k: string) => `${id}-${k}`;
  const [status, setStatus] = useState<"" | "sending" | "error" | EnquiryOutcome>("");
  const [errors, setErrors] = useState<Errors>({});
  const [first, setFirst] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const val = (k: string) => String(data.get(k) ?? "").trim();
    if (val("website")) return; // spam trap

    const next: Errors = {};
    if (val("name").length < 2) next.name = "Please enter your full name.";
    if (!validatePhone(val("phone"))) next.phone = "Please enter a valid phone number.";
    if (val("email") && !validateEmail(val("email"))) next.email = "Please check the email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const outcome = await submitEnquiry({
        source,
        name: val("name"),
        phone: val("phone"),
        email: val("email"),
        location: val("location"),
        budget: val("budget"),
        message: val("message"),
        ...(project ? { project } : {}),
      });
      setFirst(val("name").split(" ")[0]);
      setStatus(outcome);
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent" || status === "whatsapp") {
    return (
      <div className="form-done" role="status">
        <h3>Thank you, {first}.</h3>
        <p>
          {status === "sent" && "Your enquiry has reached our team. An advisor will be in touch shortly."}
          {status === "whatsapp" && "WhatsApp has opened with your details ready to send. Tap send and our team will reply there."}
        </p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus("")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="inputs">
        <div className="input full">
          <label htmlFor={f("name")}>Full name</label>
          <input id={f("name")} name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? f("name-e") : undefined} />
          {errors.name && <p className="field-err" id={f("name-e")}>{errors.name}</p>}
        </div>
        <div className="input">
          <label htmlFor={f("phone")}>Phone number</label>
          <input id={f("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? f("phone-e") : undefined} />
          {errors.phone && <p className="field-err" id={f("phone-e")}>{errors.phone}</p>}
        </div>
        <div className="input">
          <label htmlFor={f("email")}>Email</label>
          <input id={f("email")} name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? f("email-e") : undefined} />
          {errors.email && <p className="field-err" id={f("email-e")}>{errors.email}</p>}
        </div>
        <div className="input">
          <label htmlFor={f("location")}>Preferred location</label>
          <select id={f("location")} name="location" defaultValue="">
            <option value="">Choose a location</option>
            {locationOptions().map((o) => (
              <option key={o.value}>{o.label}</option>
            ))}
            <option>Not sure yet</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor={f("budget")}>Budget</label>
          <select id={f("budget")} name="budget" defaultValue="">
            <option value="">Choose a budget band</option>
            {budgetOptions.map((o) => (
              <option key={o.value}>{o.label}</option>
            ))}
            <option>Prefer to discuss</option>
          </select>
        </div>
        <div className="input full">
          <label htmlFor={f("message")}>Message</label>
          <textarea id={f("message")} name="message" placeholder={project ? `I would like to know more about ${project}.` : "Tell us what you are looking for"} />
        </div>
        <label className="check full">
          <input type="checkbox" required />
          <span>
            I agree to be contacted by Goyals Group about this enquiry. See our <Link href="/privacy-policy/">privacy policy</Link>.
          </span>
        </label>
      </div>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={f("website")}>Website</label>
        <input id={f("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : submitLabel} <Arrow />
      </button>
      <p className="form-status" role="status" hidden={status !== "error"}>
        Something went wrong. Please try again, or call us on {site.contact.phone}.
      </p>
    </form>
  );
}
