/**
 * Goyals Group mark for the design preview: an arched frame (a jharokha silhouette, for an
 * Indore-rooted builder) with a smaller arch set inside it, in currentColor. Replace with the Group's official
 * logo files when they are supplied.
 */
export function Mark() {
  return (
    <svg viewBox="0 0 96 110" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 110V48a40 40 0 0 1 80 0v62H78V48a30 30 0 0 0-60 0v62Z M30 110V62a18 18 0 0 1 36 0v48h-8V62a10 10 0 0 0-20 0v48Z"
      />
    </svg>
  );
}

/** The wordmark: GOYALS in medium, GROUP in light, tracked like the rest of the identity. */
export function Logo({ className = "logo" }: { className?: string }) {
  return (
    <span className={className}>
      <Mark />
      <span className="logo-word">
        <b>Goyals</b>
        <span>Group</span>
      </span>
    </span>
  );
}
