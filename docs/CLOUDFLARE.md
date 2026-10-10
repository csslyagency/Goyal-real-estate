# Hosting goyalsgroup.co.in on Cloudflare Pages (free)

The site is a static export (`out/`) plus one small Cloudflare Pages Function,
`functions/api/enquiry.js`, which emails every form to the inbox through Resend.
The Vercel preview keeps using `api/enquiry.js`; both behave the same.

## 0. Before you start

- Merge pull request #1 (and any later commits) into `main`. Cloudflare builds from `main`.
- Create a **new** Resend API key (the old one was shared in chat) and keep it ready.
- If a website is already live on goyalsgroup.co.in, note it: switching over replaces it.

## 1. Cloudflare account and the domain

1. Sign up (free) at <https://dash.cloudflare.com/sign-up>.
2. **Add a domain**, enter `goyalsgroup.co.in`, choose the **Free** plan.
3. Cloudflare scans the existing DNS records. Check the list contains:
   - `MX` `goyalsgroup.co.in` → `mx1.hostinger.com` (5) and `mx2.hostinger.com` (10). These run info@goyalsgroup.co.in.
   - `TXT` `goyalsgroup.co.in` → `v=spf1 include:_spf.mail.hostinger.com ~all`
   - `TXT` `_dmarc` → `v=DMARC1; p=none`
   - The Resend records: `TXT resend._domainkey`, `CNAME send`, `CNAME rsend`.
     Set both `CNAME`s to **DNS only** (grey cloud), not proxied.
   Add any that are missing, exactly as they appear in Hostinger, before continuing.
4. Cloudflare shows two nameservers. In **Hostinger hPanel → Domains → goyalsgroup.co.in →
   DNS / Nameservers → Change nameservers**, choose custom nameservers and paste both.
   Cloudflare emails you when the domain is active (usually within an hour, at most 24h).
   Email keeps working throughout, because the MX records were copied.

## 2. The Pages project

1. **Workers & Pages → Create → Pages → Connect to Git**, authorise GitHub as
   **csslyagency**, pick **Goyal-real-estate**.
2. Build settings:

   | Setting | Value |
   |---|---|
   | Production branch | `main` |
   | Framework preset | None |
   | Build command | `npm run build:live` |
   | Build output directory | `out` |

3. **Environment variables (Production)**, before the first deploy:

   | Name | Value | Type |
   |---|---|---|
   | `NODE_VERSION` | `22` | Text |
   | `RESEND_API_KEY` | your new Resend key | **Secret** |
   | `MAIL_TO` | `info@goyalsgroup.co.in` | Text |
   | `MAIL_FROM` | `Goyals Group Website <website@goyalsgroup.co.in>` (only once the domain shows **Verified** in Resend) | Text |

4. **Save and deploy.** The site appears at `https://<project>.pages.dev`; check it there first.

## 3. Your domain

1. In the Pages project: **Custom domains → Set up a custom domain**, add `goyalsgroup.co.in`,
   then add `www.goyalsgroup.co.in` too. Cloudflare creates the records and the HTTPS certificate.
2. Send `www` to the main address: **Rules → Redirect Rules → Create from template →
   "Redirect from WWW to root"**.

## What the live build changes

`npm run build:live` builds with `NEXT_PUBLIC_SITE_URL=https://goyalsgroup.co.in` and
`NEXT_PUBLIC_SITE_LIVE=true`, so search engines may index the site: `robots.txt` allows
crawling, the sitemap and canonical links use goyalsgroup.co.in, and pages carry
`index, follow`. `public/_headers` sets long caching for images, fonts and the video
(image URLs carry a content hash, so replacing a photo still shows straight away).

## Test locally the way Cloudflare runs it

```bash
npm run build:live
npm run preview:cloudflare
```

Then open <http://localhost:8788>. Forms need `--binding RESEND_API_KEY=...` added to the
`preview:cloudflare` command to actually send.
