const base = { "aria-hidden": true, focusable: false, viewBox: "0 0 24 24" } as const;
const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const Arrow = () => (
  <svg {...base} className="ico-arrow">
    <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const Search = () => (
  <svg {...base}>
    <circle cx="10.5" cy="10.5" r="6.5" {...line} />
    <path d="m15.5 15.5 4.5 4.5" {...line} />
  </svg>
);

export const Pin = () => (
  <svg {...base}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" {...line} />
    <circle cx="12" cy="10" r="2.3" {...line} />
  </svg>
);

export const Bed = () => (
  <svg {...base}>
    <path d="M3 18.5V6.5M3 14h18v4.5M21 14v-2.5a3 3 0 0 0-3-3h-7V14" {...line} />
    <circle cx="7" cy="10.8" r="1.8" {...line} />
  </svg>
);

export const Bath = () => (
  <svg {...base}>
    <path d="M3.5 12h17v2.5a4.5 4.5 0 0 1-4.5 4.5H8a4.5 4.5 0 0 1-4.5-4.5V12zM6 12V6.2A2.2 2.2 0 0 1 10.2 5M7 19l-1 1.8M17 19l1 1.8" {...line} />
  </svg>
);

export const Size = () => (
  <svg {...base}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" {...line} />
  </svg>
);

export const Key = () => (
  <svg {...base}>
    <circle cx="8" cy="15" r="4" {...line} />
    <path d="m11 12 8.5-8.5M16 7l2.5 2.5M14 9l2 2" {...line} />
  </svg>
);

export const Building = () => (
  <svg {...base}>
    <path d="M4.5 20.5V5.5l8-2v17M12.5 8.5h7v12M3 20.5h18M7.5 8h2M7.5 11.5h2M7.5 15h2M15.5 12h1.5M15.5 15.5h1.5" {...line} />
  </svg>
);

export const Check = () => (
  <svg {...base}>
    <path d="m5 12.5 4.2 4.2L19 7" {...line} />
  </svg>
);

export const Chevron = () => (
  <svg {...base} className="ico-arrow">
    <path d="m9.5 5.5 6.5 6.5-6.5 6.5" {...line} />
  </svg>
);

export const ArrowUp = () => (
  <svg {...base}>
    <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" {...line} />
  </svg>
);

export const Phone = () => (
  <svg {...base}>
    <path d="M7.2 3.5h-2a1.7 1.7 0 0 0-1.7 1.9c.8 8 7.1 14.3 15.1 15.1a1.7 1.7 0 0 0 1.9-1.7v-2a1.5 1.5 0 0 0-1.2-1.5l-3-.7a1.5 1.5 0 0 0-1.5.5l-1.2 1.4a12 12 0 0 1-5.5-5.5L9.5 9.8a1.5 1.5 0 0 0 .5-1.5l-.7-3a1.5 1.5 0 0 0-1.5-1.2z" {...line} />
  </svg>
);

export const Mail = () => (
  <svg {...base}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" {...line} />
    <path d="m4.5 7 7.5 6 7.5-6" {...line} />
  </svg>
);

export const WhatsApp = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.06.89.9-2.98-.2-.31a8.18 8.18 0 1 1 6.84 3.73Zm4.49-6.12c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31 2.8 2.8 0 0 0-.87 2.07 4.85 4.85 0 0 0 1.02 2.58c.12.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.57.2-1.07.14-1.17-.06-.1-.23-.17-.48-.29Z"
    />
  </svg>
);
