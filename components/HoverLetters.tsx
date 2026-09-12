"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

/**
 * Splits a phrase into per-letter spans so it can react to the cursor.
 *
 * Each letter carries its own shimmer gradient with a negative animation-delay,
 * which keeps the gold highlight travelling continuously across the phrase
 * while still letting every letter transform independently.
 *
 * On hover the letters lift in a springy wave and the glow blooms.
 *
 * Letters are grouped into non-wrapping word spans. Every inline-block letter
 * is a line-break opportunity, so on narrow screens a word used to split
 * mid-way ("LAS / TS."); now lines can only break between words.
 */
export function HoverLetters({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  // Running index across the whole phrase (spaces included), so the shimmer
  // phase and hover wave flow continuously from word to word.
  let i = 0;

  return (
    <motion.span
      className={`letters-hover inline-block cursor-default ${className}`}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {words.map((word, w) => {
        if (w > 0) i++; // the space before this word
        return (
          <Fragment key={`${word}-${w}`}>
            {w > 0 && " "}
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((ch) => {
                const idx = i++;
                return (
                  <motion.span
                    key={idx}
                    className="shimmer-text inline-block will-change-transform"
                    style={{ animationDelay: `${-idx * 0.06}s` }}
                    variants={{
                      rest: { y: 0, scale: 1, rotate: 0 },
                      hover: {
                        y: -9,
                        scale: 1.08,
                        rotate: idx % 2 === 0 ? -2 : 2,
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 14,
                      delay: idx * 0.022,
                    }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </span>
          </Fragment>
        );
      })}
    </motion.span>
  );
}
