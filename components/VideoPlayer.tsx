"use client";

import { useEffect, useRef } from "react";

/**
 * Shared self-hosted video player used by the Work grid and the Testimonials
 * section, so playback behaviour and download deterrence stay identical.
 *
 * - Plays muted + looping ONLY while on screen. Autoplaying every clip at once
 *   would hammer bandwidth and make the page feel chaotic.
 * - muted + playsInline is what allows autoplay at all on mobile browsers.
 * - controlsList="nodownload" removes the download button and right-click is
 *   blocked. NOTE: this deters casual saving, it cannot truly prevent it —
 *   the file must reach the browser to play, so it's always in the network tab.
 */
export function VideoPlayer({
  src,
  poster,
  label,
  autoPlayInView = true,
  className = "",
}: {
  src: string;
  poster?: string;
  label: string;
  autoPlayInView?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !autoPlayInView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            /* autoplay blocked by browser — poster stays, controls still work */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [autoPlayInView]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      controls
      controlsList="nodownload noplaybackrate noremoteplayback"
      disablePictureInPicture
      onContextMenu={(e) => e.preventDefault()}
      aria-label={label}
      className={`h-full w-full bg-espresso object-cover ${className}`}
    />
  );
}
