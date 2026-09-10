import Image from "next/image";
import { testimonials, type Testimonial } from "@/lib/content";
import { IconQuote } from "./Icons";
import { VideoPlayer } from "./VideoPlayer";
import { MotionSection } from "./MotionSection";
import { PinnedSection, PinnedHeader, PinnedItem } from "./PinnedSection";

/** Small avatar + name + role block, shared by both layouts. */
function Attribution({ t, large = false }: { t: Testimonial; large?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {t.avatar ? (
        <Image
          src={t.avatar}
          alt={t.name}
          width={large ? 56 : 44}
          height={large ? 56 : 44}
          className={`${
            large ? "h-14 w-14" : "h-11 w-11"
          } rounded-full border border-champagne/30 object-cover`}
        />
      ) : (
        <span
          className={`flex ${
            large ? "h-14 w-14 text-xl" : "h-11 w-11 text-lg"
          } items-center justify-center rounded-full border border-champagne/30 bg-espresso font-cinzel text-champagne`}
        >
          {t.name.charAt(0)}
        </span>
      )}
      <div>
        <p
          className={`font-inter font-semibold text-cream ${
            large ? "text-base" : "text-sm"
          }`}
        >
          {t.name}
        </p>
        <p className="font-inter text-xs uppercase tracking-[0.14em] text-champagne/70">
          {t.niche}
        </p>
      </div>
    </div>
  );
}

/**
 * Featured layout — used when there's exactly one testimonial.
 *
 * A single card sitting in a three-column grid looks unfinished, so one
 * testimonial gets the full-width treatment instead: video on the left,
 * attribution and quote on the right. Reads as a deliberate centrepiece
 * rather than an empty shelf.
 */
function FeaturedTestimonial({ t }: { t: Testimonial }) {
  return (
    <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-brand border border-champagne/20 bg-gradient-to-b from-rust/40 to-espresso/70 p-6 shadow-warm-lg sm:p-10">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-stretch md:gap-10">
        {t.video && (
          <div className="w-full max-w-[280px] shrink-0">
            <div className="relative aspect-[9/16] overflow-hidden rounded-brand border border-champagne/25 shadow-warm">
              <VideoPlayer
                src={t.video}
                poster={t.poster}
                label={`Video testimonial from ${t.name}`}
              />
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col justify-center text-center md:text-left">
          <IconQuote className="mx-auto h-10 w-10 text-gold/80 md:mx-0" />

          {t.quote ? (
            <p className="mt-5 font-garamond text-xl leading-relaxed text-cream/90 sm:text-2xl">
              &ldquo;{t.quote}&rdquo;
            </p>
          ) : (
            <p className="mt-5 font-garamond text-xl leading-relaxed text-cream/85 sm:text-2xl">
              In his own words — what it&apos;s like working with us.
            </p>
          )}

          <div className="mt-8 flex justify-center md:justify-start">
            <Attribution t={t} large />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Grid card — used once there are two or more testimonials. */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full flex-col rounded-brand border border-champagne/20 bg-rust/25 p-7 shadow-warm">
      {t.video ? (
        <div className="relative mb-5 aspect-[9/16] overflow-hidden rounded-brand border border-champagne/20">
          <VideoPlayer
            src={t.video}
            poster={t.poster}
            label={`Video testimonial from ${t.name}`}
          />
        </div>
      ) : (
        <IconQuote className="h-8 w-8 text-gold/80" />
      )}

      {t.quote && (
        <p className="mt-4 flex-1 font-garamond text-lg leading-relaxed text-cream/90">
          &ldquo;{t.quote}&rdquo;
        </p>
      )}

      <div className="mt-6">
        <Attribution t={t} />
      </div>
    </article>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;

  const heading = (
    <h2
      id="testimonials-heading"
      className="font-cinzel text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]"
    >
      Don&apos;t take our word for it.
    </h2>
  );

  // One testimonial: featured layout, no scroll-pinning. Pinning 200vh of
  // scroll to reveal a single card would just make the page longer for nothing.
  if (testimonials.length === 1) {
    return (
      <section
        className="py-14 sm:py-20"
        aria-labelledby="testimonials-heading"
      >
        <div className="container-brand">
          <MotionSection className="mx-auto max-w-2xl text-center">
            {heading}
          </MotionSection>
          <MotionSection delay={0.1} from="up">
            <FeaturedTestimonial t={testimonials[0]} />
          </MotionSection>
        </div>
      </section>
    );
  }

  return (
    <PinnedSection
      total={testimonials.length}
      scrollVh={210}
      aria-labelledby="testimonials-heading"
    >
      <PinnedHeader className="mx-auto max-w-2xl text-center">
        {heading}
      </PinnedHeader>

      <div
        className="mt-10 grid gap-5 md:grid-cols-3"
        style={{ perspective: 1200 }}
      >
        {testimonials.map((t, i) => (
          <PinnedItem key={`${t.name}-${i}`} index={i}>
            <TestimonialCard t={t} />
          </PinnedItem>
        ))}
      </div>
    </PinnedSection>
  );
}
