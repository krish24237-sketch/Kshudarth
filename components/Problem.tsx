import { MotionSection } from "./MotionSection";

export function Problem() {
  return (
    <section className="py-14 sm:py-20" aria-labelledby="problem-heading">
      <div className="container-brand max-w-3xl text-center">
        <MotionSection>
          <h2
            id="problem-heading"
            className="text-balance font-cinzel text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]"
          >
            Your content is quietly{" "}
            <span className="text-gold">costing you growth.</span>
          </h2>
        </MotionSection>
        <MotionSection delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty font-garamond text-lg leading-relaxed text-cream/80 sm:text-xl">
            You&apos;re great at what you make. But you&apos;re posting
            inconsistently, editing at midnight, guessing at hooks — and
            watching people with half your talent get all the attention. The
            problem isn&apos;t you. It&apos;s that content has become a second
            full-time job. So it slips. And every week it slips, someone else
            grows the audience that should&apos;ve been yours.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
