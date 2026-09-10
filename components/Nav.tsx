"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookButton } from "./BookButton";

const links = [
  { label: "Work", href: "#work" },
  { label: "How it works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-champagne/15 bg-espresso/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="container-brand flex h-[72px] items-center justify-between"
        aria-label="Primary"
      >
        <Link
          href="#top"
          className="flex items-center gap-3"
          aria-label="Kshudarth home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/emblem.png"
            alt="Kshudarth"
            width={40}
            height={40}
            priority
            className="h-10 w-auto object-contain"
          />
          <span className="font-cinzel text-lg font-bold tracking-[0.18em] text-cream">
            KSHUDARTH
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-inter text-sm font-medium tracking-wide text-cream/80 transition-colors hover:text-champagne"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <BookButton className="!px-5 !py-3 !text-xs" />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-champagne/25 text-cream md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <div className="flex w-5 flex-col items-center gap-[5px]">
            <span
              className={`h-0.5 w-5 bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"}`}
      >
        <div className="container-brand flex flex-col gap-2 border-t border-champagne/10 pb-8 pt-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-brand px-2 py-3 font-cinzel text-lg tracking-wide text-cream/90 transition-colors hover:bg-rust/40 hover:text-champagne"
            >
              {l.label}
            </Link>
          ))}
          <BookButton className="mt-3 w-full" />
        </div>
      </div>
    </header>
  );
}
