"use client";

import { motion } from "framer-motion";

/**
 * Splits a phrase into per-letter spans so it can react to the cursor.
 *
 * Each letter carries its own shimmer gradient with a negative animation-delay,
 * which keeps the gold highlight travelling continuously across the phrase
 * while still letting every letter transform independently.
 *
 * On hover the letters lift in a springy wave and the glow blooms.
 */
export function HoverLetters({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const letters = Array.from(text);

  return (
    <motion.span
      className={`letters-hover inline-block cursor-default ${className}`}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="shimmer-text inline-block will-change-transform"
          style={{ animationDelay: `${-i * 0.06}s` }}
          variants={{
            rest: { y: 0, scale: 1, rotate: 0 },
            hover: { y: -9, scale: 1.08, rotate: i % 2 === 0 ? -2 : 2 },
          }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 14,
            delay: i * 0.022,
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}
