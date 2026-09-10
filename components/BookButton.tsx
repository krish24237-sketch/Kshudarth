import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Every primary CTA says "Book a 15-min call" and jumps to the #booking section.
 * Smooth scrolling + heading offset are handled in globals.css.
 */
export function BookButton({
  className = "",
  children = "Book a 15-min call",
  variant = "primary",
}: {
  className?: string;
  children?: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href="#booking"
      className={`${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`}
    >
      {children}
    </Link>
  );
}
