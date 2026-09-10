"use client";

import Image from "next/image";
import { useState } from "react";
import { HAS_FOUNDERS_PHOTO } from "@/lib/content";
import { IconCamera } from "./Icons";

/**
 * Shows /founders.jpg once it exists. Until then renders a warm placeholder so
 * the layout never breaks — and we never request a missing file (which would
 * log a 404 in the console).
 *
 * To add the real photo:
 *   1. Save it as /public/founders.jpg
 *   2. Set HAS_FOUNDERS_PHOTO = true in lib/content.ts
 */
export function FoundersImage() {
  const [failed, setFailed] = useState(false);
  const showPhoto = HAS_FOUNDERS_PHOTO && !failed;

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-brand border border-champagne/20 bg-espresso shadow-warm">
      {showPhoto ? (
        <Image
          src="/founders.jpg"
          alt="Krish and Sneha, the founders of Kshudarth"
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-rust/40 to-espresso"
          role="img"
          aria-label="Founders photo coming soon"
        >
          <IconCamera className="h-12 w-12 text-champagne/70" />
          <p className="font-inter text-sm uppercase tracking-[0.2em] text-champagne/70">
            Photo coming soon
          </p>
        </div>
      )}
      {/* Warm color-treatment overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
    </div>
  );
}
