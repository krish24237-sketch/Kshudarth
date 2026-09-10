"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqs } from "@/lib/content";
import { IconChevron } from "./Icons";
import { MotionSection } from "./MotionSection";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="py-14 sm:py-20" aria-labelledby="faq-heading">
      <div className="container-brand max-w-3xl">
        <MotionSection className="text-center">
          <h2
            id="faq-heading"
            className="font-cinzel text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]"
          >
            Questions, answered.
          </h2>
        </MotionSection>

        <MotionSection delay={0.08} className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-btn-${i}`;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-brand border border-champagne/20 bg-rust/25"
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-rust/40"
                  >
                    <span className="font-cinzel text-lg font-semibold tracking-wide text-cream">
                      {item.q}
                    </span>
                    <IconChevron
                      className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pt-0 font-garamond text-base leading-relaxed text-cream/80">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </MotionSection>
      </div>
    </section>
  );
}
