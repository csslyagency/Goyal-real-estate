"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Arrow } from "./Icons";
import { careers } from "@/lib/content";
import { type EnquiryOutcome, submitEnquiry, validateEmail, validatePhone } from "@/lib/enquiry";

type Errors = Partial<Record<"name" | "phone" | "email" | "link", string>>;

const TEAMS = [...careers.teams.map((t) => t.name), "Something else"];
const EXPERIENCE = ["Student or fresher", "1 to 3 years", "3 to 7 years", "7 years or more"];

/** Introduce yourself to the Group. Sent the same way as an enquiry (see lib/enquiry.ts). */
export function CareersForm() {
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
    if (!validateEmail(val("email"))) next.email = "Please enter a valid email address.";
    if (val("link") && !/^https?:\/\/\S+\.\S+/.test(val("link"))) next.link = "Please paste a full link, starting with https://";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const outcome = await submitEnquiry({
        source: "Careers page",
        name: val("name"),
        phone: val("phone"),
        email: val("email"),
        team: val("team"),
        experience: val("experience"),
        link: val("link"),
        message: val("message"),
      });
      setFirst(val("name").split(" ")[0]);
      setStatus(outcome);
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent" || status === "whatsapp" || status === "preview") {
    return (
      <div className="form-done" role="status">
        <h3>Thank you, {first}.</h3>
        <p>
          {status === "sent" && "Your introduction has reached our team. If there is a fit, we will be in touch."}
          {status === "whatsapp" && "WhatsApp has opened with your details ready to send. Tap send and our team will reply there."}
          {status === "preview" &&
            "Your details were checked successfully. This is a design preview, so the form is not yet connected to an inbox and nothing has been sent."}
        </p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus("")}>
          Send another
        </button>
      </div>
    );
  }

  const err = (k: keyof Errors) => (errors[k] ? <p className="field-err" id={f(`${k}-e`)}>{errors[k]}</p> : null);
  const aria = (k: keyof Errors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? f(`${k}-e`) : undefined });

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="inputs">
        <div className="input full">
          <label htmlFor={f("name")}>Full name</label>
          <input id={f("name")} name="name" autoComplete="name" required {...aria("name")} />
          {err("name")}
        </div>
        <div className="input">
          <label htmlFor={f("phone")}>Phone number</label>
          <input id={f("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" required {...aria("phone")} />
          {err("phone")}
        </div>
        <div className="input">
          <label htmlFor={f("email")}>Email</label>
          <input id={f("email")} name="email" type="email" autoComplete="email" required {...aria("email")} />
          {err("email")}
        </div>
        <div className="input">
          <label htmlFor={f("team")}>Area of interest</label>
          <select id={f("team")} name="team" defaultValue="">
            <option value="">Choose an area</option>
            {TEAMS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="input">
          <label htmlFor={f("experience")}>Experience</label>
          <select id={f("experience")} name="experience" defaultValue="">
            <option value="">Choose your experience</option>
            {EXPERIENCE.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="input full">
          <label htmlFor={f("link")}>LinkedIn, portfolio or CV link (optional)</label>
          <input id={f("link")} name="link" type="url" inputMode="url" placeholder="https://" {...aria("link")} />
          {err("link")}
        </div>
        <div className="input full">
          <label htmlFor={f("message")}>About you</label>
          <textarea id={f("message")} name="message" placeholder="Tell us a little about yourself and the kind of work you are looking for" />
        </div>
        <label className="check full">
          <input type="checkbox" required />
          <span>
            I agree to be contacted by Goyals Group about opportunities. See our <Link href="/privacy-policy/">privacy policy</Link>.
          </span>
        </label>
      </div>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={f("website")}>Website</label>
        <input id={f("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my details"} <Arrow />
      </button>
      <p className="form-status" role="status" hidden={status !== "error"}>
        Something went wrong. Please try again in a moment.
      </p>
    </form>
  );
}
