# Kshudarth — Marketing Site

A single-page, conversion-focused marketing site for **Kshudarth**, a premium
content & growth studio. Built with Next.js 16 (App Router) + TypeScript,
Tailwind CSS, Framer Motion, and a Calendly booking popup.

The one goal of the site: get visitors to **book a 15-minute call**.

- **Live:** deployed on Vercel from `main`
- **Repo:** https://github.com/krish24237-sketch/Kshudarth (private)

---

## 1. Run it locally

You need [Node.js 20.9+](https://nodejs.org) (Node 22 or newer recommended).

```bash
# from the project folder: kshudarth-site/
npm install        # first time only — installs dependencies
npm run dev        # start the dev server
```

Open **http://localhost:3000**.

> The first run downloads the Google Fonts (Cinzel, EB Garamond, Inter). If you
> have no internet on first build it will hang on fonts — just run it once while
> online and they're cached.

Other commands:

```bash
npm run build      # production build (run this before deploying)
npm start          # serve the production build locally
npm run typecheck  # check TypeScript types
```

---

## 2. Add the logo and future photos

All static assets live in **`/public`**.

| File | What it is | Status |
|------|-----------|--------|
| `public/emblem.png` | The Kshudarth emblem. Used in the hero, nav, footer and booking card. | ✅ In place |
| `public/logo.png` | Full logo with wordmark. Used for social share previews. | ✅ In place |
| `public/icon.svg` | Favicon (gold "K" on espresso). | ✅ In place |
| `public/founders.jpg` | Founders photo shown in the **About** section. | ⏳ Not added yet |

**To add the founders photo:** drop a file named exactly **`founders.jpg`** into
`/public`, then set `HAS_FOUNDERS_PHOTO = true` in `lib/content.ts`. Until then
the About section shows a "Photo coming soon" placeholder. A portrait crop
(roughly 4:5, e.g. 1000×1250px) looks best.

**To replace the logo:** overwrite the file with a new one of the same name.

---

## 3. Edit testimonials and work samples

Everything data-driven lives in **`lib/content.ts`**. If an array is empty, its
section is hidden; add entries and the section appears automatically.

### Work samples

Drop the video in `public/work/` (lowercase, hyphens, no spaces), then add an
entry:

```ts
export const workSamples: WorkSample[] = [
  { title: "AI Call Agent", tag: "SaaS · Motion graphics", video: "/work/ai-call-agent.mp4", aspect: "wide" },
  { title: "Leaving A Job", tag: "Personal brand · Talking head", video: "/work/leaving-a-job.mp4", aspect: "vertical" },
];
```

- `aspect`: `"wide"` for 16:9, `"vertical"` for 9:16 reels.
- `tag` is the small caption under the tile; `title` is used for accessibility only.

### Testimonials

```ts
export const testimonials: Testimonial[] = [
  {
    name: "Aryan",
    niche: "Founder, Ace Digi Hub",
    video: "/work/aryan-testimonial.mp4", // optional
    quote: "The single best line they said.",
  },
];
```

- One testimonial renders as a large featured card; two or more switch to a grid.

### Other editable copy

Also in `lib/content.ts`: the Calendly URL (`CALENDLY_URL`), Instagram + email
(`INSTAGRAM_URL`, `CONTACT_EMAIL`), proof-strip handles (`clientHandles`), the 6
service cards (`services`), the 3 steps (`steps`), and the FAQ (`faqs`).

---

## 4. Videos — keep them small

GitHub rejects any file over **100 MB**, and large videos make the page slow.
Phone and screen recordings are often 10–20× bigger than they need to be, so
compress before adding:

```bash
# Wide 16:9 (motion graphics / SaaS) — keeps 60fps
ffmpeg -i input.mp4 -vf "scale=1920:1080:flags=lanczos" -c:v libx264 -preset slow -crf 24 -maxrate 4M -bufsize 8M -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart output.mp4

# Vertical 9:16 talking head — 30fps is plenty
ffmpeg -i input.mp4 -vf "scale=1080:1920:flags=lanczos,fps=30" -c:v libx264 -preset slow -crf 24 -maxrate 2M -bufsize 4M -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart output.mp4
```

`-movflags +faststart` lets a video start playing before it has fully
downloaded. Aim for under ~40 MB per file.

---

## 5. Publishing changes

The site deploys automatically: every push to `main` builds and goes live on
Vercel in about a minute.

```bash
git add .
git commit -m "Describe what changed"
git push
```

If a build fails, Vercel keeps the previous version live, so a mistake never
takes the site down. Check the **Deployments** tab for the error.

### Connect the domain kshudarth.com

1. In your Vercel project → **Settings → Domains**.
2. Add `kshudarth.com` and `www.kshudarth.com` (Vercel offers to redirect `www`
   to the main domain).
3. At your domain registrar, add the DNS records Vercel shows — typically an
   **A record** `@` → `76.76.21.21` and a **CNAME** `www` → `cname.vercel-dns.com`.
   Always use the exact values Vercel displays.
4. DNS takes minutes to a few hours. Vercel issues the SSL certificate
   automatically.

---

## 6. Security & maintenance

- **`vercel.json`** pins the framework to Next.js, so a dashboard setting can't
  accidentally turn the site into a static folder (which caused a 404 once).
- **`next.config.mjs`** sends security headers on every response (clickjacking
  protection, MIME-sniffing protection, referrer and permissions policies).
  Vercel adds HTTPS/HSTS.
- **Dependabot** (`.github/dependabot.yml`) opens one grouped pull request a
  month with safe minor/patch updates. Vercel builds a preview for each PR —
  merge it if the check is green. Also turn on **Dependabot security updates**
  in the GitHub repo under **Settings → Code security**.
- **`.gitattributes`** keeps line endings consistent between Windows and Vercel.
- No secrets or API keys are stored in this project.

---

## Project structure

```
app/
  layout.tsx        fonts, metadata/SEO, favicon, global background
  page.tsx          assembles the sections in order
  globals.css       Tailwind + brand base styles, reduced-motion rules
  robots.ts · sitemap.ts
components/
  Nav · Hero · ProofStrip · Problem · WhatWeDo · Work · HowItWorks
  About · Testimonials · Faq · BookingCTA · Footer
  MotionSection · PinnedSection   scroll animation wrappers (reduced-motion aware)
  VideoPlayer · FoundersImage · StickyMobileCTA · BookButton · Icons · …
lib/
  content.ts        all editable content and links
public/
  emblem.png · logo.png · icon.svg · work/ (videos)
next.config.mjs     security headers, image settings
vercel.json         pins the Next.js framework preset
tailwind.config.ts  brand colors + font families
```

## Brand

- **Colors:** terracotta `#862B01`, rust `#5C1C01`, espresso `#3C1201`, copper
  `#9D4714`, copperLight `#C0642A`, gold `#E08036`, champagne `#F0B36A`, cream
  `#F7E6CF`.
- **Type:** Cinzel (headings/wordmark), EB Garamond (body), Inter (UI).
- **Tagline:** _We help creators and brands build content that lasts._
