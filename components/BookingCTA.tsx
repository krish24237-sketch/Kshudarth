"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";
import { CALENDLY_URL } from "@/lib/content";
import { MotionSection } from "./MotionSection";

/**
 * The booking section stays fully on-brand: a warm card with the emblem
 * watermark. Calendly opens in a modal on click, so its white UI never
 * interrupts the dark page.
 */
export function BookingCTA() {
  const [open, setOpen] = useState(false);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.body);
  }, []);

  return (
    <section
      id="booking"
      className="scroll-mt-24 py-14 sm:py-20"
      aria-labelledby="booking-heading"
    >
      <div className="container-brand">
        <MotionSection className="relative mx-auto max-w-4xl overflow-hidden rounded-brand border border-champagne/25 bg-gradient-to-b from-rust/50 to-espresso/80 px-6 py-14 text-center shadow-warm-lg sm:px-12 sm:py-16">
          {/* emblem watermark */}
          <Image
            src="/emblem.png"
            alt=""
            aria-hidden
            width={420}
            height={478}
            className="pointer-events-none absolute -right-16 -top-12 w-64 select-none opacity-[0.06] sm:w-80"
          />
          {/* warm glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/20 blur-[90px]"
          />

          <div className="relative">
            <h2
              id="booking-heading"
              className="text-balance font-cinzel text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]"
            >
              Ready to <span className="text-gold">stop drowning</span> in
              content?
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-garamond text-lg text-cream/85 sm:text-xl">
              Book a free 15-minute call. We&apos;ll look at your content and
              show you exactly what we&apos;d do — no pitch, no pressure.
            </p>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn-primary mt-10 !px-9 !py-4 !text-base"
            >
              Book my call
            </button>

            <p className="mt-6 font-inter text-xs uppercase tracking-[0.2em] text-champagne/60">
              15 minutes · Free · No obligation
            </p>
          </div>
        </MotionSection>
      </div>

      {root && (
        <PopupModal
          url={CALENDLY_URL}
          open={open}
          onModalClose={() => setOpen(false)}
          rootElement={root}
          pageSettings={{
            backgroundColor: "3C1201",
            textColor: "F7E6CF",
            primaryColor: "E08036",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            hideGdprBanner: true,
          }}
        />
      )}
    </section>
  );
}
