"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { founders, HAS_FOUNDERS_PHOTO } from "@/lib/content";
import { IconCamera } from "./Icons";

const INTERVAL_MS = 4200;

/**
 * Founder portraits shown as a slow, continuous crossfade — one face, then the
 * other, in the same frame. Keeps the "two people, one team" idea intact
 * without needing a photo of them together.
 *
 * Both images must share the same crop/framing, or the swap reads as the
 * subject changing size. See the note on `founders` in lib/content.ts.
 *
 * Falls back to a warm placeholder until HAS_FOUNDERS_PHOTO is true, so the
 * layout never breaks and Next/Image never requests a missing file.
 */
export function FoundersImage() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);

  const ready = HAS_FOUNDERS_PHOTO && !failed && founders.some((f) => f.photo);

  useEffect(() => {
    if (!ready || paused || founders.length < 2) return;

    // Respect reduced-motion: hold on the first portrait instead of cycling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(
      () => setIndex((i) => (i + 1) % founders.length),
      INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [ready, paused]);

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-brand border border-champagne/20 bg-espresso shadow-warm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {ready ? (
        <>
          {founders.map((f, i) =>
            f.photo ? (
              <Image
                key={f.name}
                src={f.photo}
                alt={`${f.name}, ${f.role} of Kshudarth`}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                priority={i === 0}
                onError={() => setFailed(true)}
                className={`object-cover transition-opacity duration-[1200ms] ease-in-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : null
          )}

          {/* Name badge, swapping with the portrait */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-espresso/90 via-espresso/50 to-transparent p-5">
            <p className="font-cinzel text-lg font-bold tracking-wide text-cream">
              {founders[index].name}
            </p>
            <p className="font-inter text-[11px] uppercase tracking-[0.22em] text-champagne/80">
              {founders[index].role}
            </p>
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-5 right-5 z-10 flex gap-1.5">
            {founders.map((f, i) => (
              <span
                key={f.name}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-5 bg-gold" : "w-1.5 bg-champagne/40"
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-rust/40 to-espresso"
          role="img"
          aria-label="Founder photos coming soon"
        >
          <IconCamera className="h-12 w-12 text-champagne/70" />
          <p className="font-inter text-sm uppercase tracking-[0.2em] text-champagne/70">
            Photo coming soon
          </p>
        </div>
      )}

      {/* Warm treatment overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
    </div>
  );
}
