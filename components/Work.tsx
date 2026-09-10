"use client";

import Image from "next/image";
import { workSamples, type WorkSample } from "@/lib/content";
import { IconPlay } from "./Icons";
import { VideoPlayer } from "./VideoPlayer";
import { MotionSection, MotionStagger, MotionItem } from "./MotionSection";

const ASPECT: Record<string, string> = {
  vertical: "aspect-[9/16]",
  wide: "aspect-video",
  square: "aspect-square",
};

function WorkTile({ sample }: { sample: WorkSample }) {
  const ratio = ASPECT[sample.aspect ?? "vertical"] ?? ASPECT.vertical;

  return (
    <figure className="flex h-full flex-col">
      <div
        className={`group relative ${ratio} w-full overflow-hidden rounded-brand border border-champagne/20 bg-espresso shadow-warm`}
      >
        {sample.video ? (
          <VideoPlayer
            src={sample.video}
            poster={sample.poster}
            label={sample.title}
            className="absolute inset-0"
          />
        ) : sample.thumbnail ? (
          <>
            <Image
              src={sample.thumbnail}
              alt={sample.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center text-champagne">
              <IconPlay className="h-12 w-12 drop-shadow" />
            </span>
          </>
        ) : null}
      </div>

      {/* Category label only — no titles, no view counts. */}
      {sample.tag && (
        <figcaption className="mt-3 px-1 font-inter text-xs uppercase tracking-[0.16em] text-champagne/65">
          {sample.tag}
        </figcaption>
      )}
    </figure>
  );
}

export function Work() {
  if (workSamples.length === 0) return null;

  // Grouped by shape so the grid reads as deliberate rather than random.
  // Wide 16:9 pieces get their own full-width rows; vertical reels sit in a
  // uniform 3-up row. Mixing them in one grid leaves ragged gaps.
  const wide = workSamples.filter((s) => s.aspect === "wide");
  const vertical = workSamples.filter((s) => s.aspect !== "wide");

  return (
    <section id="work" className="py-14 sm:py-20" aria-labelledby="work-heading">
      <div className="container-brand">
        <div className="mx-auto max-w-2xl text-center">
          <MotionSection>
            <h2
              id="work-heading"
              className="font-cinzel text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]"
            >
              The work speaks first.
            </h2>
          </MotionSection>
          <MotionSection delay={0.08}>
            <p className="mt-5 font-garamond text-lg text-cream/75 sm:text-xl">
              A few things we&apos;ve made.
            </p>
          </MotionSection>
        </div>

        {wide.length > 0 && (
          <MotionStagger className="mt-10 grid gap-6 md:grid-cols-2">
            {wide.map((sample, i) => (
              <MotionItem key={`w-${i}`} index={i}>
                <WorkTile sample={sample} />
              </MotionItem>
            ))}
          </MotionStagger>
        )}

        {vertical.length > 0 && (
          <MotionStagger className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3">
            {vertical.map((sample, i) => (
              <MotionItem key={`v-${i}`} index={i}>
                <WorkTile sample={sample} />
              </MotionItem>
            ))}
          </MotionStagger>
        )}
      </div>
    </section>
  );
}
