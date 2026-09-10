import { services } from "@/lib/content";
import { iconMap } from "./Icons";
import {
  PinnedSection,
  PinnedHeader,
  PinnedItem,
  PinnedOutro,
} from "./PinnedSection";

export function WhatWeDo() {
  return (
    <PinnedSection
      total={services.length}
      scrollVh={300}
      aria-labelledby="whatwedo-heading"
    >
      <PinnedHeader className="mx-auto max-w-2xl text-center">
        <h2
          id="whatwedo-heading"
          className="text-balance font-cinzel text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]"
        >
          We run your entire content engine.
        </h2>
        <p className="mt-5 font-garamond text-lg text-cream/75 sm:text-xl">
          One small team. Everything from idea to posted.
        </p>
      </PinnedHeader>

      <div
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        style={{ perspective: 1200 }}
      >
        {services.map((s, i) => {
          const Icon = iconMap[s.icon];
          return (
            <PinnedItem key={s.title} index={i}>
              <article className="group h-full rounded-brand border border-champagne/20 bg-rust/25 p-6 shadow-warm transition-colors duration-300 hover:border-gold/40 hover:bg-rust/40">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-espresso/60 text-gold transition-transform duration-300 group-hover:scale-105">
                  <Icon />
                </span>
                <h3 className="font-cinzel text-lg font-semibold tracking-wide text-cream">
                  {s.title}
                </h3>
                <p className="mt-2.5 font-garamond text-base leading-relaxed text-cream/75">
                  {s.body}
                </p>
              </article>
            </PinnedItem>
          );
        })}
      </div>

      <PinnedOutro className="mt-9 text-center">
        <p className="font-cinzel text-2xl font-bold tracking-wide text-champagne sm:text-3xl">
          You create. We handle the rest.
        </p>
      </PinnedOutro>
    </PinnedSection>
  );
}
