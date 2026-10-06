import { Fragment } from "react";
import { Pic } from "./Pic";
import type { PhotoName } from "@/lib/photos";

/** Four rows of moments, each with one word of the line set into it (the word sits at `word`). */
const ROWS: { tiles: PhotoName[]; word: number }[] = [
  { tiles: ["balcony-dusk", "interior-living", "rooftop-pool", "venue-mandap", "villa-modern"], word: 2 },
  { tiles: ["residence-lawn", "interior-dining", "hotel-lounge", "hero-penthouse", "rooftop-terrace"], word: 3 },
  { tiles: ["venue-lawn", "interior-courtyard", "commercial-lounge", "residence-garden-tower", "interior-bedroom"], word: 1 },
  { tiles: ["hotel-suite", "heritage-jaali-corridor", "hero-sunrise-tower", "venue-archway", "hotel-lobby"], word: 3 },
];

/**
 * A line in large type woven through rows of photographs, the rows drifting past each other as
 * the page scrolls. The line is the section's heading for readers; the pictures are decoration.
 */
export function DreamRows({ words, children }: { words: [string, string, string, string]; children?: React.ReactNode }) {
  return (
    <section className="dream dark" aria-labelledby="dream-h">
      <h2 id="dream-h" className="sr">
        {words.join(" ")}
      </h2>
      <div className="dream-rows" aria-hidden="true">
        {ROWS.map((row, r) => (
          <div key={r} className="dream-row" style={{ "--r": r } as React.CSSProperties}>
            {row.tiles.map((tile, i) => (
              <Fragment key={i}>
                {i === row.word && <span className={`dream-word${r === ROWS.length - 1 ? " is-last" : ""}`}>{words[r]}</span>}
                <span className="dream-tile">
                  <Pic name={tile} sizes="(max-width: 700px) 60vw, 360px" alt="" />
                </span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
      {children && <div className="wrap dream-foot rv">{children}</div>}
    </section>
  );
}
