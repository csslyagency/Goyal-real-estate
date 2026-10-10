// Cloudflare Pages Function: POST /api/enquiry (and /api/enquiry/)
// Emails every website form (enquiry, careers) to the Goyals Group inbox through Resend.
// Same behaviour as api/enquiry.js (the Vercel version used by the preview). The Resend key
// lives only in the Cloudflare Pages project settings, never in the site code:
//   RESEND_API_KEY  required (add as an encrypted "Secret")
//   MAIL_TO         inbox, default info@goyalsgroup.co.in
//   MAIL_FROM       sender on a domain verified in Resend, e.g. "Goyals Group Website <website@goyalsgroup.co.in>";
//                   until a domain is verified, Resend's onboarding@resend.dev is used.

const LABELS = [
  ["source", "Form"],
  ["name", "Name"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["interest", "Interested in"],
  ["project", "Project"],
  ["location", "Preferred location"],
  ["budget", "Budget"],
  ["team", "Area of interest"],
  ["message", "Message"],
];

const ALLOWED_HOSTS = [/(^|\.)goyalsgroup\.co\.in$/, /\.pages\.dev$/, /\.vercel\.app$/, /^localhost(:\d+)?$/, /^127\.0\.0\.1(:\d+)?$/];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...headers } });

export async function onRequestPost({ request, env }) {
  // Only accept posts from the site itself.
  const origin = request.headers.get("Origin");
  if (origin) {
    let host = "";
    try {
      host = new URL(origin).host;
    } catch {}
    if (!ALLOWED_HOSTS.some((re) => re.test(host))) return json({ ok: false, error: "Forbidden" }, 403);
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }
  if (!body || typeof body !== "object") body = {};
  if (body.website) return json({ ok: true }); // honeypot: pretend success to bots

  const data = {};
  for (const [key] of LABELS) data[key] = clean(body[key], key === "message" ? 4000 : 200);
  const digits = data.phone.replace(/\D/g, "");
  if (data.name.length < 2 || digits.length < 10 || digits.length > 13) {
    return json({ ok: false, error: "Name and a valid phone number are required" }, 400);
  }
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email) ? data.email : "";

  if (!env.RESEND_API_KEY) return json({ ok: false, error: "Mail is not configured" }, 500);

  const rows = LABELS.filter(([k]) => data[k]);
  const html = `<div style="font-family:Arial,sans-serif;color:#12213d">
<h2 style="margin:0 0 16px;font-weight:500">New enquiry from the Goyals Group website</h2>
<table cellpadding="8" style="border-collapse:collapse;font-size:14px">${rows
    .map(([k, label]) => `<tr><td style="border:1px solid #e6dfd2;background:#f5f0e6;font-weight:bold;white-space:nowrap">${label}</td><td style="border:1px solid #e6dfd2">${esc(data[k]).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table></div>`;
  const text = rows.map(([k, label]) => `${label}: ${data[k]}`).join("\n");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.MAIL_FROM || "Goyals Group Website <onboarding@resend.dev>",
      to: [env.MAIL_TO || "info@goyalsgroup.co.in"],
      subject: `Website enquiry (${data.source || "form"}): ${data.name}`,
      html,
      text,
      ...(email ? { reply_to: email } : {}),
    }),
  });
  if (!r.ok) {
    console.error("Resend error", r.status, await r.text().catch(() => ""));
    return json({ ok: false, error: "Could not send" }, 502);
  }
  return json({ ok: true });
}

export function onRequest() {
  return json({ ok: false, error: "Method not allowed" }, 405, { Allow: "POST" });
}
