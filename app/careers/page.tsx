import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { Crumbs } from "@/components/Sections";
import { principles } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Careers",
  description: "Build what lasts with Goyals Group, an Indore-rooted business group across real estate and hospitality since 1984.",
  path: "/careers/",
});

export default function CareersPage() {
  return (
    <>
      <div className="wrap narrow phead">
        <Crumbs items={[{ name: "Careers", path: "/careers/" }]} />
        <h1>Build what lasts, with us.</h1>
        <p className="lede">
          Goyals Group has grown over four decades through trust, integrity and an enduring entrepreneurial spirit, across construction, real estate and hospitality in Indore. We are always glad to hear from people who share our values.
        </p>
      </div>
      <div className="wrap narrow" style={{ paddingBottom: "var(--space)" }}>
        <ul className="guide-card">
          {principles.map((p, i) => (
            <li key={p.name}>
              <span className="n num">{String(i + 1).padStart(2, "0")}</span>
              <strong>{p.name}</strong>
              <p>{p.note}</p>
            </li>
          ))}
        </ul>
        <p className="fine-note">Current openings will be listed here. In the meantime, you are welcome to introduce yourself through our contact page.</p>
        <div className="btns">
          <Link href="/contact/" className="btn">
            Get in touch <Arrow />
          </Link>
        </div>
      </div>
    </>
  );
}
