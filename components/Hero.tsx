"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { BookButton } from "./BookButton";
import { IconArrowDown } from "./Icons";
import { TechGrid } from "./TechGrid";
import { HoverLetters } from "./HoverLetters";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const HEAD_LINE_1 = ["You", "create."];
const HEAD_LINE_2 = ["We", "build"];

export function Hero() {
  const reduce = useReducedMotionSafe();
  // The reveal mask must be clipped while the words rise, but once that's done
  // it has to be released — otherwise it crops the hover lift and glow into a
  // visible rectangle.
  const [revealed, setRevealed] = useState(false);

  // Masked word reveal — each word rises out from behind its own clip.
  // Starting states match the server HTML; reduced motion only zeroes timing.
  const word: Variants = {
    hidden: { y: "110%", opacity: 0 },
    show: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: reduce ? 0 : 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: reduce ? 0 : 0.35 + i * 0.09,
      },
    }),
  };

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 22, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      duration: reduce ? 0 : 0.85,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: reduce ? 0 : delay,
    },
  });

  let wordIndex = 0;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40"
    >
      {/* Animated circuit grid */}
      <TechGrid className="-z-10 opacity-[0.6]" />

      {/* Soft vignette so embers fade at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_60%_at_50%_35%,transparent_0%,rgba(60,18,1,0.55)_100%)]"
      />

      {/* Keyed on the motion setting: hydration has to use the server's animated
          timing, and framer-motion won't restart a running entrance when only
          its transition changes. Remounting replays it with zero duration. */}
      <div
        key={reduce ? "reduced" : "full"}
        className="container-brand flex flex-col items-center text-center"
      >
        {/* Emblem with rotating aura */}
        <motion.div
          {...rise(0)}
          className="relative isolate mb-9 flex items-center justify-center"
        >
          {/* rotating conic aura — sits behind the emblem */}
          <div
            aria-hidden
            className="hero-aura absolute -z-20 h-[280px] w-[280px] rounded-full sm:h-[360px] sm:w-[360px]"
          />
          {/* pulsing core glow */}
          <div
            aria-hidden
            className="hero-pulse absolute -z-20 h-[190px] w-[190px] rounded-full bg-gold/20 blur-[80px] sm:h-[240px] sm:w-[240px]"
          />
          {/* dark disc to separate the mark from the glow */}
          <div
            aria-hidden
            className="absolute -z-10 h-[168px] w-[168px] rounded-full bg-espresso/70 blur-[26px] sm:h-[210px] sm:w-[210px]"
          />
          <motion.div
            animate={
              reduce
                ? { y: 0, rotate: 0 }
                : { y: [0, -9, 0], rotate: [0, 0.6, 0] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative z-10"
          >
            <Image
              src="/emblem.png"
              alt="Kshudarth emblem"
              width={300}
              height={341}
              priority
              className="h-32 w-auto object-contain drop-shadow-[0_2px_10px_rgba(20,6,0,0.85)] sm:h-44"
            />
          </motion.div>
        </motion.div>

        <motion.p {...rise(0.12)} className="eyebrow mb-6">
          Content &amp; growth studio for creators &amp; brands
        </motion.p>

        {/* Masked, word-by-word headline reveal */}
        <h1 className="max-w-3xl font-cinzel text-4xl font-bold leading-[1.12] tracking-tight text-cream sm:text-5xl md:text-6xl">
          <span className="block">
            {HEAD_LINE_1.map((w) => (
              <span
                key={w}
                className="mr-[0.28em] inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  className="inline-block"
                  variants={word}
                  custom={wordIndex++}
                  initial="hidden"
                  animate="show"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block">
            {HEAD_LINE_2.map((w) => (
              <span
                key={w}
                className="mr-[0.28em] inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  className="inline-block"
                  variants={word}
                  custom={wordIndex++}
                  initial="hidden"
                  animate="show"
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <span
              className={`inline-block align-bottom ${
                revealed ? "overflow-visible" : "overflow-hidden"
              }`}
            >
              <motion.span
                className="inline-block"
                variants={word}
                custom={wordIndex++}
                initial="hidden"
                animate="show"
                onAnimationComplete={() => setRevealed(true)}
              >
                <HoverLetters text="content that lasts." />
              </motion.span>
            </span>
          </span>
        </h1>

        <motion.p
          {...rise(0.9)}
          className="mt-7 max-w-2xl text-pretty font-garamond text-lg leading-relaxed text-cream/85 sm:text-xl"
        >
          Kshudarth scripts, edits, posts, and grows your content — so you just
          show up and create. Not an agency. A partner that treats your brand
          like our own.
        </motion.p>

        <motion.div
          {...rise(1.02)}
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row"
        >
          <BookButton />
          <Link
            href="#work"
            className="group inline-flex items-center gap-2 font-inter text-sm font-semibold uppercase tracking-[0.12em] text-champagne transition-colors hover:text-cream"
          >
            See our work
            <IconArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </Link>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          {...rise(1.2)}
          aria-hidden
          className="mt-10 flex flex-col items-center gap-2"
        >
          <span className="font-inter text-[10px] uppercase tracking-[0.32em] text-champagne/50">
            Scroll
          </span>
          <span className="scroll-line block h-12 w-px bg-gradient-to-b from-champagne/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
