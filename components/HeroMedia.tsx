"use client";

import { useEffect, useState } from "react";
import { Pic } from "./Pic";
import type { PhotoName } from "@/lib/photos";
import { useReducedMotion } from "@/lib/useReducedMotion";

const STEP = 7000;

/**
 * The hero's photographs. One shows on its own; several crossfade slowly, each drifting in a
 * little as it arrives. Without JavaScript (or with reduced motion) the first one simply stays.
 */
export function HeroMedia({ images, positions = [] }: { images: PhotoName[]; positions?: (string | undefined)[] }) {
  const [i, setI] = useState(0);
  // Choosing a photograph stops the rotation, so a visitor can keep the one they picked.
  const [held, setHeld] = useState(false);
  const reduced = useReducedMotion();
  const live = images.length > 1 && !reduced;

  useEffect(() => {
    if (!live || held) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % images.length), STEP);
    return () => window.clearTimeout(t);
  }, [i, live, held, images.length]);

  return (
    <>
      <div className={`hero-media${live ? " is-live" : ""}`}>
        {images.map((name, n) => (
          <Pic
            key={name}
            name={name}
            priority={n === 0}
            // Portrait screens crop the sides of these wide photographs, so ask for a larger file.
            sizes="(max-aspect-ratio: 1/1) 160vw, 100vw"
            className={`hero-slide${n === i ? " is-on" : ""}`}
            alt={n === 0 ? undefined : ""}
            position={positions[n]}
          />
        ))}
      </div>
      {live ? (
        <div className="hero-dots" role="group" aria-label="Choose a photograph">
          {images.map((name, n) => (
            <button
              key={name}
              type="button"
              className={n === i ? "is-on" : undefined}
              aria-label={`Photograph ${n + 1} of ${images.length}`}
              aria-current={n === i ? "true" : undefined}
              onClick={() => {
                setI(n);
                setHeld(true);
              }}
            >
              <span />
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}
