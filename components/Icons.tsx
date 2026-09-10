/**
 * Thin single-line gold icons — consistent 1.6 stroke, rounded ends, never filled.
 * Matches the brand iconography style.
 */
import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function IconSpark(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8.5 13.4 11l2.6 1-2.6 1L12 15.5 10.6 13 8 12l2.6-1L12 8.5Z" />
    </svg>
  );
}

export function IconPen(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      <path d="M14.5 5.5l3 3" />
    </svg>
  );
}

export function IconFilm(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4" />
    </svg>
  );
}

export function IconCalendar(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

export function IconChat(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M20 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" />
      <path d="M8 9h8M8 12.5h5" />
    </svg>
  );
}

export function IconChart(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M4 4v16h16" />
      <path d="M8 15l3-4 3 2 4-6" />
    </svg>
  );
}

export function IconCamera(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M4 8a2 2 0 0 1 2-2h1.5l1-1.5h5L15 6h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4Z" />
      <circle cx="12" cy="12.5" r="3.2" />
    </svg>
  );
}

export function IconPlay(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l6 3.5-6 3.5Z" />
    </svg>
  );
}

export function IconQuote(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p} strokeWidth={1.2}>
      <path d="M9 7c-2.5 1-4 3.2-4 6v4h5v-5H7c0-2 .8-3.5 2.6-4.4L9 7ZM19 7c-2.5 1-4 3.2-4 6v4h5v-5h-3c0-2 .8-3.5 2.6-4.4L19 7Z" />
    </svg>
  );
}

export function IconInstagram(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMail(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function IconArrowDown(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p} width={p.width ?? 18} height={p.height ?? 18}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function IconChevron(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p} width={p.width ?? 20} height={p.height ?? 20}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export const iconMap = {
  spark: IconSpark,
  pen: IconPen,
  film: IconFilm,
  calendar: IconCalendar,
  chat: IconChat,
  chart: IconChart,
} as const;

export type IconName = keyof typeof iconMap;
