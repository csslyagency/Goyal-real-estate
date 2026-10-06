"use client";

import { useId, useState } from "react";
import { Arrow } from "./Icons";
import { type EnquiryOutcome, submitEnquiry, validatePhone } from "@/lib/enquiry";

/** A short "register your interest" form for new and upcoming projects. */
export function RegisterInterest() {
  const id = useId();
  const [status, setStatus] = useState<"" | "sending" | "error" | EnquiryOutcome>("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (name.length < 2 || !validatePhone(phone)) {
      setError("Please add your name and a valid phone number.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      setStatus(await submitEnquiry({ source: "Register interest: new projects", name, phone, interest: String(data.get("interest") ?? "") }));
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent" || status === "whatsapp" || status === "preview") {
    return (
      <div className="form-done" role="status">
        <h3>Thank you.</h3>
        <p>
          {status === "preview"
            ? "This is a design preview, so the form is not yet connected and nothing has been sent."
            : "We will let you know as soon as new projects are announced."}
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="inputs">
        <div className="input">
          <label htmlFor={`${id}-n`}>Your name</label>
          <input id={`${id}-n`} name="name" autoComplete="name" required />
        </div>
        <div className="input">
          <label htmlFor={`${id}-p`}>Phone number</label>
          <input id={`${id}-p`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" required />
        </div>
        <div className="input full">
          <label htmlFor={`${id}-i`}>Interested in</label>
          <select id={`${id}-i`} name="interest" defaultValue="All new projects">
            <option>All new projects</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Hospitality</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Register interest"} <Arrow />
      </button>
      <p className="form-status" role="status" hidden={!error && status !== "error"}>
        {error || "Something went wrong. Please try again."}
      </p>
    </form>
  );
}
