/**
 * Kshudarth — site content data.
 *
 * These arrays are intentionally easy to fill. Leave them empty and the site
 * renders tasteful "coming soon" placeholders in the final styling. Add items
 * and the real content populates automatically — no layout changes needed.
 */

export type Testimonial = {
  /** Written quote. Optional when there's a video — a pull-quote still helps. */
  quote?: string;
  name: string;
  /** Role/company line, e.g. "Founder, Ace Digi Hub" */
  niche: string;
  avatar?: string; // optional path in /public, e.g. "/testimonials/jane.jpg"
  /** Self-hosted video testimonial, e.g. "/work/aryan-testimonial.mp4" */
  video?: string;
  /** Poster frame for the video, e.g. "/work/aryan-poster.jpg" */
  poster?: string;
};

export type WorkSample = {
  title: string;
  /**
   * Self-hosted video file in /public — the preferred option. No third-party
   * branding, no embed chrome, much faster than an Instagram iframe.
   *   e.g. "/work/ai-call-agent.mp4"
   */
  video?: string;
  /**
   * Shape of the clip. Vertical fills one grid cell; wide spans two so 16:9
   * SaaS/demo work isn't cropped into a phone-shaped box.
   */
  aspect?: "vertical" | "wide" | "square";
  /** Optional poster frame shown before the video loads, e.g. "/work/poster.jpg" */
  poster?: string;
  /** Short label under the tile, e.g. "SaaS · Motion graphics" */
  tag?: string;
  /**
   * A vertical (9:16) embed URL. Supports Instagram Reels and YouTube.
   *   Instagram: "https://www.instagram.com/reel/CODE/embed"
   *   YouTube:   "https://www.youtube.com/embed/VIDEO_ID"
   */
  embedUrl?: string;
  thumbnail?: string; // optional image path in /public used when there's no embed
  href?: string; // optional external link (opens the original post)
};

/**
 * Testimonials.
 *
 * One entry renders as a large featured layout (video beside the attribution).
 * Two or more switch automatically to a grid. Video and written testimonials
 * can be mixed freely.
 *
 * A written `quote` is optional when there's a video — but adding the single
 * best line they say makes it far stronger, because most people read before
 * they press play.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Aryan",
    niche: "Founder, Ace Digi Hub",
    video: "/work/aryan-testimonial.mp4",
    quote:
      "You just give him a general idea, he understands you, and he delivers it within two days. That's the reason we were able to grow our presence so much.",
  },
];

/**
 * The Work grid.
 *
 * TO ADD A NEW PIECE: drop the .mp4 in /public/work/ (lowercase, hyphens, no
 * spaces) and add one entry below. That's it — the grid arranges itself.
 *
 *   title   — not shown on screen; used for accessibility labels only
 *   tag     — the small caption under the tile, e.g. "AI video"
 *   aspect  — "wide" for 16:9, "vertical" for 9:16 reels
 *
 * Order matters: items appear in the order listed, grouped by shape.
 */
export const workSamples: WorkSample[] = [
  {
    title: "AI Call Agent",
    tag: "SaaS · Motion graphics",
    video: "/work/ai-call-agent.mp4",
    aspect: "wide",
  },
  {
    title: "I Quit Everything",
    tag: "Personal brand · Design",
    video: "/work/i-quit-everything.mp4",
    aspect: "vertical",
  },
  {
    title: "Leaving A Job",
    tag: "Personal brand · Talking head",
    video: "/work/leaving-a-job.mp4",
    aspect: "vertical",
  },
];

/**
 * Client handles shown in the proof strip under the hero.
 * Add a handle here and a new chip appears — no other changes needed.
 */
export const clientHandles: string[] = [
  "@growwithprabin",
  "@balrajfarms",
];

/** Static site content (safe to edit copy here). */
export const CALENDLY_URL = "https://calendly.com/krish-24237/new-meeting";

export const INSTAGRAM_URL = "https://instagram.com/thekrisharma_";
export const INSTAGRAM_HANDLE = "@thekrisharma_";
export const CONTACT_EMAIL = "krish.24237@gmail.com";

export const services = [
  {
    title: "Ideation & hooks",
    body: "A steady pipeline of ideas built to stop the scroll.",
    icon: "spark",
  },
  {
    title: "Scripting",
    body: "Written in your voice, so it still sounds like you.",
    icon: "pen",
  },
  {
    title: "Editing",
    body: "Reels that match the quality of your work.",
    icon: "film",
  },
  {
    title: "Posting & scheduling",
    body: "Consistent, on time, every week.",
    icon: "calendar",
  },
  {
    title: "Engagement",
    body: "We keep your comments and DMs warm.",
    icon: "chat",
  },
  {
    title: "Strategy & reporting",
    body: "Monthly review so it keeps improving.",
    icon: "chart",
  },
] as const;

export const steps = [
  {
    title: "Book a 15-min call.",
    body: "We look at your content live and tell you exactly what we'd do. No pitch.",
  },
  {
    title: "We build your content engine.",
    body: "Scripts, edits, calendar — fully done-for-you, in your voice.",
  },
  {
    title: "You show up and grow.",
    body: "Create, approve, and watch it compound week after week.",
  },
] as const;

export const faqs = [
  {
    q: "Do I have to be on camera?",
    a: "For most creators, yes — your face builds trust and connection. But we make it painless: tight scripts, minimal takes, and we handle everything after you hit record.",
  },
  {
    q: "What if I don't have time to film?",
    a: "Filming a week of content takes ~30–45 minutes once we hand you the scripts. That's the only time we ask of you.",
  },
  {
    q: "How soon will I see results?",
    a: "Consistency compounds — most accounts feel the shift within the first 4–8 weeks. We track it and adjust monthly.",
  },
  {
    q: "Do you work with my niche?",
    a: "We work with creators and brands across niches. On the call we'll tell you honestly if we're a fit.",
  },
  {
    q: "How is this different from hiring an editor?",
    a: "An editor cuts what you give them. We run the whole engine — ideas, hooks, scripts, posting, and strategy — so the growth is the point, not just the edit.",
  },
] as const;

/**
 * The two founders, shown in the About section as a slow crossfade.
 *
 * IMPORTANT: both photos must share the same crop and framing (e.g. both
 * waist-up, same aspect ratio) or the crossfade looks like the person shrinks
 * mid-transition. Same background and lighting helps too.
 *
 * Drop the files in /public/founders/ and set `photo` below. While a photo is
 * missing the section falls back to a tasteful placeholder.
 */
export const founders: { name: string; role: string; photo?: string }[] = [
  // Filenames are case-sensitive on Vercel (Linux) even though Windows ignores
  // case, so these must match the files in /public/founders/ exactly.
  { name: "Krish", role: "Founder", photo: "/founders/krish.png" },
  { name: "Sneha", role: "Founder", photo: "/founders/sneha.png" },
];

/** Set true once BOTH founder photos are in /public/founders/. */
export const HAS_FOUNDERS_PHOTO = true;
