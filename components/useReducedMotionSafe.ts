import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Hydration-safe replacement for framer-motion's useReducedMotion.
 *
 * The server can't know a visitor's motion setting, so it always renders the
 * animated markup. Reading matchMedia during the first client render made
 * reduced-motion visitors' markup differ from that HTML, and React doesn't
 * repair attribute mismatches — inline `opacity: 0` / blur styles stayed stuck
 * and content never appeared. useSyncExternalStore renders the server value
 * during hydration, then immediately re-renders with the real preference.
 */
export function useReducedMotionSafe() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
