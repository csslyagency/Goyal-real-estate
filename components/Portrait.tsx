/** A neutral placeholder portrait until Goyals Group supplies the real photograph. */
export function Portrait({ name }: { name: string }) {
  return (
    <figure className="portrait">
      <svg viewBox="0 0 120 120" role="img" aria-label={`Photograph of ${name} to be added`}>
        <defs>
          <linearGradient id="portrait-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1f3a68" />
            <stop offset="1" stopColor="#12213d" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" fill="url(#portrait-bg)" />
        <circle cx="60" cy="47" r="21" fill="#d6b77a" fillOpacity="0.55" />
        <path d="M16 120c3-27 21-42 44-42s41 15 44 42z" fill="#d6b77a" fillOpacity="0.55" />
      </svg>
      <figcaption>
        <strong>{name}</strong>
        <span>Photograph to be added</span>
      </figcaption>
    </figure>
  );
}
