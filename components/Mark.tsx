/**
 * The Goyals Group logo from the client's file (assets/brand/goyals-group-logo.pdf): the "GG"
 * mark and the serif wordmark, drawn as CSS masks so they take the colour of their setting
 * (antique gold on ivory, champagne on navy). The link around it carries the accessible name.
 */
export function Logo({ className = "logo" }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <span className="logo-mark" />
      <span className="logo-word" />
    </span>
  );
}
