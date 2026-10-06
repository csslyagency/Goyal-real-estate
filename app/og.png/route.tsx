import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/** The default social sharing card, written to out/og.png by the static export. */

export async function GET() {
  const root = process.cwd();
  const [light, medium, photo] = await Promise.all([
    readFile(path.join(root, "assets/fonts/IBMPlexSans-300.ttf")),
    readFile(path.join(root, "assets/fonts/IBMPlexSans-500.ttf")),
    sharp(path.join(root, "assets/photos/hero-sunrise-tower.jpg")).resize(420, 630, { fit: "cover", position: "centre" }).jpeg({ quality: 72 }).toBuffer(),
  ]);
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#26060c", fontFamily: "Plex" }}>
        <img src={src} alt="" width={420} height={630} style={{ position: "absolute", left: 780, top: 0, width: 420, height: 630 }} />
        <div
          style={{
            position: "absolute",
            left: 760,
            top: 0,
            width: 200,
            height: 630,
            display: "flex",
            background: "linear-gradient(90deg, #3d0a13 0%, rgba(61,10,19,0.6) 45%, rgba(61,10,19,0) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px", width: 800 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, color: "#f5f0e6", fontSize: 24, letterSpacing: 6 }}>
            <span style={{ fontWeight: 500 }}>GOYALS</span>
            <span style={{ fontWeight: 300 }}>GROUP</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", color: "#d9bf8a", fontSize: 18, fontWeight: 500, letterSpacing: 4 }}>INDORE · SINCE 1984</div>
            <div style={{ display: "flex", marginTop: 18, fontSize: 84, fontWeight: 300, lineHeight: 1.04, color: "#f5f0e6", letterSpacing: -1.5 }}>We build what lasts.</div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 26, fontWeight: 300, color: "rgba(245,240,230,0.82)" }}>
              Residential · Commercial · Hospitality
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plex", data: light, weight: 300, style: "normal" },
        { name: "Plex", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
