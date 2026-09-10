import { FoundersImage } from "./FoundersImage";
import { MotionSection } from "./MotionSection";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-cream py-14 text-espresso sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="container-brand">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <MotionSection>
            <h2
              id="about-heading"
              className="text-balance font-cinzel text-3xl font-bold leading-tight text-espresso sm:text-4xl"
            >
              You&apos;ll always talk to the people doing the work.
            </h2>
            <p className="mt-7 text-pretty font-garamond text-lg leading-relaxed text-espresso/80 sm:text-xl">
              We&apos;re Krish and Sneha, the two founders behind Kshudarth. No
              account managers, no hand-offs, no agency machine. When you message
              us, you&apos;re talking to the people actually scripting and editing
              your content. We treat your brand like it&apos;s ours — because when
              you grow, we grow. That&apos;s the whole model.
            </p>

            <dl className="mt-9 flex gap-10">
              {[
                { name: "Krish", role: "Founder" },
                { name: "Sneha", role: "Founder" },
              ].map((f) => (
                <div key={f.name}>
                  <dt className="font-cinzel text-2xl font-bold tracking-wide text-copper">
                    {f.name}
                  </dt>
                  <dd className="mt-1 font-inter text-xs uppercase tracking-[0.22em] text-espresso/60">
                    {f.role}
                  </dd>
                </div>
              ))}
            </dl>
          </MotionSection>

          <MotionSection delay={0.12} from="right" className="mx-auto w-full max-w-sm md:ml-auto">
            <FoundersImage />
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
