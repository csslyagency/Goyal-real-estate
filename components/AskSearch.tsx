"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Arrow, Chevron } from "./Icons";
import { locationOptions } from "@/lib/filters";

type Opt = [value: string, label: string];

const INTENT: Opt[] = [
  ["", "buy or rent"],
  ["buy", "buy"],
  ["rent", "rent"],
];
const TYPE: Opt[] = [
  ["", "a property"],
  ["residential", "a home"],
  ["commercial", "a business space"],
];
const BHK: Opt[] = [
  ["", "any number of bedrooms"],
  ["1", "1 BHK"],
  ["2", "2 BHK"],
  ["3", "3 BHK"],
  ["4", "4 BHK"],
  ["5", "5+ BHK"],
];
const STAGE: Opt[] = [
  ["", "at any stage"],
  ["ready", "ready to move"],
  ["under-construction", "under construction"],
  ["new-launch", "as a new launch"],
  ["upcoming", "in an upcoming project"],
];

function Pick({ name, label, options, value, onChange }: { name: string; label: string; options: Opt[]; value: string; onChange: (v: string) => void }) {
  const current = options.find((o) => o[0] === value)?.[1] ?? options[0][1];
  return (
    <label className="ask-pick">
      <span className="sr">{label}: </span>
      <span aria-hidden="true">{current}</span>
      <Chevron />
      <select name={name} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}

/**
 * The hero search as one sentence: each underlined phrase is a native select, so it works with a
 * keyboard, a screen reader and a phone picker, and the form still submits without JavaScript.
 */
export function AskSearch() {
  const router = useRouter();
  const locations: Opt[] = [["", "Indore"], ...locationOptions().filter((o) => o.value !== "indore").map((o): Opt => [o.value, o.label])];
  const [v, setV] = useState({ intent: "", type: "", location: "", bhk: "", possession: "" });
  const set = (k: keyof typeof v) => (x: string) => setV((s) => ({ ...s, [k]: x }));

  return (
    <form
      className="ask"
      action="/properties/"
      method="get"
      role="search"
      aria-label="Find a property"
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams(Object.entries(v).filter(([, x]) => x));
        router.push(`/properties/${q.size ? `?${q}` : ""}`);
      }}
    >
      <p className="ask-line">
        I&apos;d like to <Pick name="intent" label="Looking to" options={INTENT} value={v.intent} onChange={set("intent")} />{" "}
        <Pick name="type" label="Property type" options={TYPE} value={v.type} onChange={set("type")} /> in{" "}
        <Pick name="location" label="Location" options={locations} value={v.location} onChange={set("location")} />, with{" "}
        <Pick name="bhk" label="Bedrooms" options={BHK} value={v.bhk} onChange={set("bhk")} />,{" "}
        <Pick name="possession" label="Possession" options={STAGE} value={v.possession} onChange={set("possession")} />.
      </p>
      <button className="btn" type="submit">
        Show properties <Arrow />
      </button>
    </form>
  );
}
