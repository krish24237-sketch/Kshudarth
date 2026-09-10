"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gold progress bar pinned to the very top of the viewport.
 * Useful orientation on a long single-page site, and it reads as a premium
 * detail rather than a gimmick because it's 2px and brand-coloured.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold via-champagne to-gold"
    />
  );
}
