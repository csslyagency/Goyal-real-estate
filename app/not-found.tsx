import Link from "next/link";
import { Arrow } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="wrap narrow phead" style={{ paddingBottom: "var(--space)" }}>
      <p className="eyebrow">Page not found</p>
      <h1>This address is not built yet.</h1>
      <p className="lede">The page you are looking for may have moved. Try our properties or head back home.</p>
      <div className="btns">
        <Link href="/" className="btn">
          Back to home <Arrow />
        </Link>
        <Link href="/properties/" className="btn btn-ghost">
          Explore properties
        </Link>
      </div>
    </div>
  );
}
