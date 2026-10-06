# Goyals Group website

Static marketing site for Goyals Group, Indore (est. 1984): residential, commercial and hospitality.
Next.js 16 (App Router, `output: "export"`), TypeScript, Tailwind v4 for utilities, and a design system
ported from the Hamd Properties premium redesign (`app/design.css`; Goyals additions in `app/goyals.css`).
No database and no server: `npm run build` writes plain files to `out/`.

## Commands

```bash
npm install
npm run dev        # http://localhost:4627 (generates responsive images first)
npm run build      # static site in out/
npm run typecheck
npm run lint
```

## Where things live

- `lib/site.ts`: company facts and **contact details. Phone, WhatsApp, email, address and Instagram are
  `null` because the brief document did not include them.** The site shows "to be added" markers until
  they are filled in; every page, the floating WhatsApp button and the schema update from this one file.
- `lib/content.ts`: all copy from the brief (about, vision, mission, legacy, journey, founder's note).
  Testimonials are illustrative placeholders and are labelled as such on the page.
- `lib/projects.ts`: the four projects. Unit mix, sizes, possession, amenities, RERA and price are `null`
  (not in the brief) and render as "On request" / "Price on Request". Fill them in to drive search filters.
- `assets/photos/`: source photography (free Unsplash licence, see `CREDITS.md`). `scripts/images.mjs`
  turns it into responsive WebP in `public/img/` (generated, git-ignored).

## Environment

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL`: canonical URL used in metadata, sitemap and Open Graph.
- `NEXT_PUBLIC_SITE_LIVE=true` only for the live production build (otherwise noindex + robots disallow).
- `NEXT_PUBLIC_ENQUIRY_ENDPOINT`: a form service or CRM webhook that accepts JSON POSTs. Without it the
  forms hand off to WhatsApp (once a number is set) or say they are not connected yet.
