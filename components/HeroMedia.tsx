"use client";

import { useEffect, useRef, useState } from "react";
import { Pic } from "./Pic";
import type { PhotoName } from "@/lib/photos";
import { useReducedMotion } from "@/lib/useReducedMotion";

const STEP = 7000;

export type Film = {
  /** Wide screens: a 2:1 cut that fills the desktop hero behind the words. */
  wide: string;
  /** Phones and tablets: a 3:4 portrait cut, so it stays sharp filling a tall hero. */
  narrow: string;
};

/**
 * The hero's photographs. One shows on its own; several crossfade slowly, each drifting in a
 * little as it arrives. Without JavaScript (or with reduced motion) the first one simply stays.
 * With a film, the first photograph is its poster and the silent loop fades in once it plays.
 */
export function HeroMedia({ images, positions = [], film }: { images: PhotoName[]; positions?: (string | undefined)[]; film?: Film }) {
  const [i, setI] = useState(0);
  // Choosing a photograph stops the rotation, so a visitor can keep the one they picked.
  const [held, setHeld] = useState(false);
  const reduced = useReducedMotion();
  const live = !film && images.length > 1 && !reduced;

  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!live || held) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % images.length), STEP);
    return () => window.clearTimeout(t);
  }, [i, live, held, images.length]);

  useEffect(() => {
    const v = video.current;
    if (!v || reduced) return;
    v.play().catch(() => {});
  }, [reduced]);

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
        {film && !reduced ? (
          <video
            ref={video}
            className={`film${playing ? " is-on" : ""}`}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onPlaying={() => setPlaying(true)}
          >
            <source src={film.wide} type="video/mp4" media="(min-width: 901px)" />
            <source src={film.narrow} type="video/mp4" />
          </video>
        ) : null}
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
