"use client";

import { motion, type Variants } from "framer-motion";
import type { ComponentType, ElementType, ReactNode } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/**
 * Cache one motion component per HTML tag so we don't recreate (and remount)
 * them on every render, and to avoid the deprecated motion(string) call path.
 */
const motionCache = new Map<string, ComponentType<Record<string, unknown>>>();
function getMotion(as: ElementType) {
  if (typeof as !== "string") {
    return motion.create(as as ComponentType) as ComponentType<Record<string, unknown>>;
  }
  let cached = motionCache.get(as);
  if (!cached) {
    cached = motion.create(as) as ComponentType<Record<string, unknown>>;
    motionCache.set(as, cached);
  }
  return cached;
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export type Direction = "left" | "right" | "up";

/** Starting offset for a given entrance direction. */
function offset(dir: Direction, distance = 64) {
  if (dir === "left") return { x: -distance, y: 0 };
  if (dir === "right") return { x: distance, y: 0 };
  return { x: 0, y: 42 };
}

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  from?: Direction;
  id?: string;
  "aria-label"?: string;
};

/**
 * Section reveal: content glides in from the side (default: left), un-blurring
 * as it settles. Directional movement reads far more deliberate than a fade.
 *
 * The starting state never depends on reduced motion — it's rendered into the
 * server HTML, so it must match on the client. Reduced motion is handled by a
 * zero-duration transition instead.
 */
export function MotionSection({
  children,
  className,
  as = "div",
  delay = 0,
  from = "left",
  id,
  ...rest
}: MotionSectionProps) {
  const reduce = useReducedMotionSafe();
  const MotionTag = getMotion(as);
  const { x, y } = offset(from, 56);

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, x, y, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -90px 0px" }}
      transition={{
        duration: reduce ? 0 : 0.9,
        ease: EASE,
        delay: reduce ? 0 : delay,
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger container — children animate in one after another.
 */
export function MotionStagger({
  children,
  className,
  as = "div",
  id,
  ...rest
}: MotionSectionProps) {
  const reduce = useReducedMotionSafe();
  const MotionTag = getMotion(as);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.14,
        delayChildren: reduce ? 0 : 0.08,
      },
    },
  };

  return (
    <MotionTag
      id={id}
      className={className}
      style={{ perspective: 1200 }}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -90px 0px" }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Items enter one by one, alternating from the left and right with a slight
 * 3D turn — pass `index` so the alternation follows the visual order.
 * Override with `from` when a specific direction is wanted.
 */
export function MotionItem({
  children,
  className,
  as = "div",
  index = 0,
  from,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  index?: number;
  from?: Direction;
}) {
  const reduce = useReducedMotionSafe();
  const MotionTag = getMotion(as);

  const dir: Direction = from ?? (index % 2 === 0 ? "left" : "right");
  const { x, y } = offset(dir, 76);
  const turn = dir === "left" ? -7 : dir === "right" ? 7 : 0;

  const item: Variants = {
    hidden: {
      opacity: 0,
      x,
      y,
      rotateY: turn,
      scale: 0.95,
      filter: "blur(9px)",
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0 : 0.8, ease: EASE },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={item}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </MotionTag>
  );
}
