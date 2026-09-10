import { steps } from "@/lib/content";
import { BookButton } from "./BookButton";
import {
  PinnedSection,
  PinnedHeader,
  PinnedItem,
  PinnedOutro,
} from "./PinnedSection";

export function HowItWorks() {
  return (
    <PinnedSection
      id="how-it-works"
      total={steps.length}
      scrollVh={220}
      aria-labelledby="how-heading"
    >
      <PinnedHeader className="mx-auto max-w-2xl text-center">
        <h2
          id="how-heading"
          className="text-balance font-cinzel text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]"
        >
          How it works — three steps.
        </h2>
      </PinnedHeader>

      <div
        className="mt-10 grid gap-6 md:grid-cols-3"
        style={{ perspective: 1200 }}
      >
        {steps.map((s, i) => (
          <PinnedItem key={s.title} index={i}>
            <article className="relative h-full rounded-brand border border-champagne/20 bg-rust/25 p-8 shadow-warm">
              <span
                aria-hidden
                className="font-cinzel text-5xl font-bold text-gold/90"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-cinzel text-xl font-semibold tracking-wide text-cream">
                {s.title}
              </h3>
              <p className="mt-3 font-garamond text-base leading-relaxed text-cream/75">
                {s.body}
              </p>
            </article>
          </PinnedItem>
        ))}
      </div>

      <PinnedOutro className="mt-12 flex justify-center">
        <BookButton />
      </PinnedOutro>
    </PinnedSection>
  );
}
