"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Scroll-pinned reveal.
 *
 * The section sticks to the viewport while the page keeps scrolling, and that
 * scroll distance is spent dealing the cards in one at a time — alternating
 * from the left and the right. Once the sequence finishes, the page releases
 * and carries on normally.
 *
 * Pinning is desktop-only (see .pin-track / .pin-stage in globals.css); on
 * small screens the cards simply reveal as they scroll past. Reduced-motion
 * users get everything rendered statically.
 */

type PinContext = {
  progress: MotionValue<number>;
  total: number;
  enabled: boolean;
};

const Ctx = createContext<PinContext | null>(null);

export function PinnedSection({
  children,
  total,
  id,
  scrollVh = 240,
  className = "",
  ...rest
}: {
  children: ReactNode;
  total: number;
  id?: string;
  /** How much scroll distance the pinned sequence consumes. */
  scrollVh?: number;
  className?: string;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smoothing so the cards glide rather than track the wheel 1:1.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${className}`}
      style={{ ["--pin-h" as string]: `${scrollVh}vh` }}
      {...rest}
    >
      <div className="pin-track">
        <div className="pin-stage">
          <div className="container-brand w-full py-12">
            <Ctx.Provider
              value={{ progress: smooth, total, enabled: !reduce }}
            >
              {children}
            </Ctx.Provider>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Heading block — settles in before the cards start dealing. */
export function PinnedHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(Ctx);
  const fallback = useMotionValue(1);
  const progress = ctx?.progress ?? fallback;
  const enabled = ctx?.enabled ?? false;

  const opacity = useTransform(progress, [0, 0.08], [0, 1]);
  const y = useTransform(progress, [0, 0.08], [26, 0]);

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

/**
 * One card. Its entrance is mapped to a slice of the section's scroll
 * progress, so cards arrive strictly one after another as you scroll.
 */
export function PinnedItem({
  children,
  index,
  className = "",
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) {
  const ctx = useContext(Ctx);
  const fallback = useMotionValue(1);
  const progress = ctx?.progress ?? fallback;
  const total = ctx?.total ?? 1;
  const enabled = ctx?.enabled ?? false;

  // Cards deal between 12% and 88% of the pinned scroll, overlapping slightly
  // so the motion stays continuous instead of stepping.
  const span = 0.76 / total;
  const start = 0.12 + index * span;
  const end = Math.min(1, start + span * 1.45);

  const dir = index % 2 === 0 ? -1 : 1;

  const x = useTransform(progress, [start, end], [dir * 130, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.88, 1]);
  const rotateY = useTransform(progress, [start, end], [dir * -12, 0]);
  const blur = useTransform(progress, [start, end], [14, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={{
        x,
        opacity,
        scale,
        rotateY,
        filter,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

/** Trailing element (CTA / closing line) that arrives after the last card. */
export function PinnedOutro({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(Ctx);
  const fallback = useMotionValue(1);
  const progress = ctx?.progress ?? fallback;
  const enabled = ctx?.enabled ?? false;

  const opacity = useTransform(progress, [0.86, 0.97], [0, 1]);
  const y = useTransform(progress, [0.86, 0.97], [24, 0]);

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
