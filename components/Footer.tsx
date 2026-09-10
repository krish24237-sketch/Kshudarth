import Image from "next/image";
import {
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "@/lib/content";
import { IconInstagram, IconMail } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t border-champagne/15 bg-espresso py-12">
      <div className="container-brand">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="max-w-md">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <Image
                src="/emblem.png"
                alt="Kshudarth"
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-cream">
                KSHUDARTH
              </span>
            </div>
            <p className="mt-4 font-garamond text-base italic text-cream/70">
              We help creators and brands build content that lasts.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col items-center gap-4 md:items-end">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-inter text-sm text-cream/80 transition-colors hover:text-champagne"
            >
              <IconInstagram className="h-5 w-5 text-gold" />
              {INSTAGRAM_HANDLE}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 font-inter text-sm text-cream/80 transition-colors hover:text-champagne"
            >
              <IconMail className="h-5 w-5 text-gold" />
              {CONTACT_EMAIL}
            </a>
          </nav>
        </div>

        <div className="hairline my-10" />

        <p className="text-center font-inter text-xs uppercase tracking-[0.2em] text-cream/50">
          © 2026 Kshudarth. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
