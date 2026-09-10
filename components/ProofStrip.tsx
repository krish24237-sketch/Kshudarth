import { clientHandles } from "@/lib/content";
import { MotionSection } from "./MotionSection";

export function ProofStrip() {
  if (clientHandles.length === 0) return null;

  return (
    <MotionSection
      as="section"
      from="up"
      className="border-y border-champagne/10 bg-espresso/40 py-10"
      aria-label="Social proof"
    >
      <div className="container-brand flex flex-col items-center gap-7">
        <p className="max-w-2xl text-center font-garamond text-base italic text-cream/60 sm:text-lg">
          The creators and brands we work with would rather create than edit at
          midnight.
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {clientHandles.map((handle) => (
            <li
              key={handle}
              className="flex h-10 items-center gap-2 rounded-full border border-champagne/30 bg-espresso/40 px-5"
            >
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span className="font-inter text-xs uppercase tracking-[0.18em] text-champagne">
                {handle}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
