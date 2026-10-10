// Vercel Function: POST /api/enquiry
// Emails every website form (enquiry, careers) to the Goyals Group inbox through Resend.
// The Resend key lives only in Vercel's environment (RESEND_API_KEY), never in the site code.
//   RESEND_API_KEY  required
//   MAIL_TO         inbox, default info@goyalsgroup.co.in
//   MAIL_FROM       sender on a domain verified in Resend, e.g. "Goyals Group Website <website@glcc.in>";
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

const ALLOWED_HOSTS = [/\.vercel\.app$/, /^localhost(:\d+)?$/, /^127\.0\.0\.1(:\d+)?$/, /goyalsgroup/];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Only accept posts from the site itself.
  const origin = req.headers.origin;
  if (origin) {
    let host = "";
    try {
      host = new URL(origin).host;
    } catch {}
    if (!ALLOWED_HOSTS.some((re) => re.test(host))) return res.status(403).json({ ok: false, error: "Forbidden" });
  }

  const body = typeof req.body === "object" && req.body ? req.body : {};
  if (body.website) return res.status(200).json({ ok: true }); // honeypot: pretend success to bots

  const data = {};
  for (const [key] of LABELS) data[key] = clean(body[key], key === "message" ? 4000 : 200);
  const digits = data.phone.replace(/\D/g, "");
  if (data.name.length < 2 || digits.length < 10 || digits.length > 13) {
    return res.status(400).json({ ok: false, error: "Name and a valid phone number are required" });
  }
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email) ? data.email : "";

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ ok: false, error: "Mail is not configured" });

  const rows = LABELS.filter(([k]) => data[k]);
  const html = `<div style="font-family:Arial,sans-serif;color:#12213d">
<h2 style="margin:0 0 16px;font-weight:500">New enquiry from the Goyals Group website</h2>
<table cellpadding="8" style="border-collapse:collapse;font-size:14px">${rows
    .map(([k, label]) => `<tr><td style="border:1px solid #e6dfd2;background:#f5f0e6;font-weight:bold;white-space:nowrap">${label}</td><td style="border:1px solid #e6dfd2">${esc(data[k]).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table></div>`;
  const text = rows.map(([k, label]) => `${label}: ${data[k]}`).join("\n");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || "Goyals Group Website <onboarding@resend.dev>",
      to: [process.env.MAIL_TO || "info@goyalsgroup.co.in"],
      subject: `Website enquiry (${data.source || "form"}): ${data.name}`,
      html,
      text,
      ...(email ? { reply_to: email } : {}),
    }),
  });
  if (!r.ok) {
    const detail = await r.text().catch(() => "");
    console.error("Resend error", r.status, detail);
    return res.status(502).json({ ok: false, error: "Could not send" });
  }
  return res.status(200).json({ ok: true });
};
