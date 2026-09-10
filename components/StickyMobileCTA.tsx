"use client";

import { useEffect, useState } from "react";
import { BookButton } from "./BookButton";

/**
 * Sticky "Book a 15-min call" bar on mobile only.
 * Appears after the user scrolls past the hero, hides near the booking section
 * so it never overlaps the widget's own CTA.
 */
export function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const booking = document.getElementById("booking");
      const nearBooking =
        booking &&
        booking.getBoundingClientRect().top < window.innerHeight * 0.9;
      setShow(y > 640 && !nearBooking);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-champagne/15 bg-espresso/95 p-4 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <BookButton className="w-full" />
    </div>
  );
}
