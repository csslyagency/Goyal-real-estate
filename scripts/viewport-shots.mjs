#!/usr/bin/env node
/**
 * Dev QA: screenshots of each page, one viewport at a time, scrolling like a visitor.
 *   node scripts/viewport-shots.mjs http://localhost:4627 <out-dir> [desktop|mobile|both]
 * Drives headless Chrome over the DevTools protocol (adapted from the
 * hamdproperties repo). ROUTES=/,/about/ limits the run.
 */
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DEBUG_PORT = 9467;
const [base, outDir, which = "both"] = process.argv.slice(2);
const ALL_ROUTES = ["/", "/properties/", "/properties/residential/", "/projects/", "/projects/goyal-hills/", "/projects/fortune-select-nipania/",
  "/hospitality/", "/locations/indore/", "/about/", "/contact/", "/disclaimer/"];
const ROUTES = process.env.ROUTES ? process.env.ROUTES.split(",") : ALL_ROUTES;
const DEVICES = {
  desktop: { width: 1440, height: 900, mobile: false },
  mobile: { width: 390, height: 844, mobile: true },
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

mkdirSync(outDir, { recursive: true });
const profile = mkdtempSync(join(tmpdir(), "gg-cdp-"));
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  "--disable-extensions", "--force-color-profile=srgb", `--user-data-dir=${profile}`,
  `--remote-debugging-port=${DEBUG_PORT}`, "about:blank"], { stdio: "ignore" });

let ws;
try {
  let url;
  for (let i = 0; i < 100 && !url; i++) {
    try { url = (await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`)).json()).webSocketDebuggerUrl; }
    catch { await sleep(100); }
  }
  if (!url) throw new Error("Chrome never opened its debugging port");
  ws = new WebSocket(url);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let seq = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      if (m.error) reject(new Error(m.error.message));
      else resolve(m.result);
    }
  };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

  const selected = which === "both" ? Object.keys(DEVICES) : [which];
  for (const device of selected) {
    const { width, height, mobile } = DEVICES[device];
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
    await send("Page.enable", {}, sessionId);
    await send("Runtime.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile }, sessionId);
    for (const route of ROUTES) {
      const name = route.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home";
      await send("Page.navigate", { url: base + route }, sessionId);
      await sleep(3500);
      const { result } = await send("Runtime.evaluate",
        { expression: "document.documentElement.scrollHeight", returnByValue: true }, sessionId);
      const total = result.value;
      const steps = Math.min(24, Math.ceil(total / height));
      for (let i = 0; i < steps; i++) {
        await send("Runtime.evaluate", { expression: `window.scrollTo({top: ${i * height}, behavior: "instant"})` }, sessionId);
        await sleep(1700);
        const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 70 }, sessionId);
        writeFileSync(join(outDir, `${device}-${name}-${String(i).padStart(2, "0")}.jpg`), Buffer.from(data, "base64"));
      }
      const overflow = await send("Runtime.evaluate", { returnByValue: true, expression:
        "(() => { const w = document.documentElement.clientWidth; return [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.right > w + 1 && getComputedStyle(e).position !== 'fixed'; }).slice(0, 5).map(e => e.tagName + '.' + String(e.className).slice(0, 60)); })()" }, sessionId);
      console.log(`${device.padEnd(8)} ${route.padEnd(36)} height ${total}  shots ${steps}  overflow ${JSON.stringify(overflow.result.value)}`);
    }
  }
} finally {
  try { ws?.close(); } catch {}
  chrome.kill("SIGKILL");
  await sleep(500);
  rmSync(profile, { recursive: true, force: true });
}
