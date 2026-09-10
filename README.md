# Kshudarth — Marketing Site

A single-page, conversion-focused marketing site for **Kshudarth**, a premium
content & growth studio. Built with Next.js (App Router) + TypeScript, Tailwind
CSS, Framer Motion, and a Calendly inline booking widget.

The one goal of the site: get visitors to **book a 15-minute call**.

---

## 1. Run it locally

You need [Node.js 18.18+](https://nodejs.org) (Node 20+ recommended).

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
npm run lint       # lint
```

---

## 2. Add the logo and future photos

All static assets live in **`/public`**.

| File | What it is | Status |
|------|-----------|--------|
| `public/logo.png` | The Kshudarth emblem + wordmark. Used in the nav (small) and hero. | ✅ Already in place |
| `public/icon.svg` | Favicon (gold "K" on espresso). | ✅ Already in place |
| `public/founders.jpg` | Founders photo shown in the **About** section. | ⏳ Not added yet |

**To add the founders photo:** drop a file named exactly **`founders.jpg`** into
`/public`. It appears automatically — no code changes. Until then, the About
section shows a graceful "Photo coming soon" placeholder and the layout does not
break. A portrait crop (roughly 4:5, e.g. 1000×1250px) looks best.

**To replace the logo:** overwrite `public/logo.png` with a new file of the same
name.

---

## 3. Edit testimonials and work samples

Everything data-driven lives in **`lib/content.ts`**. Both start empty and render
tasteful placeholders; fill them and the real content appears automatically.

### Testimonials

```ts
export const testimonials: Testimonial[] = [
  {
    quote: "Kshudarth took content off my plate and my views tripled.",
    name: "Jane Doe",
    niche: "Fitness creator",
    avatar: "/testimonials/jane.jpg", // optional — put the image in /public/testimonials/
  },
  // add 2–3 total
];
```

- Empty array → 3 "Testimonial coming soon" placeholder cards.
- `avatar` is optional; without it, a champagne monogram (first initial) is shown.

### Work samples (reels / videos)

```ts
export const workSamples: WorkSample[] = [
  // Instagram Reel — use the /embed URL:
  { title: "Launch reel", embedUrl: "https://www.instagram.com/reel/REEL_CODE/embed" },
  // YouTube — use the /embed URL:
  { title: "Brand film", embedUrl: "https://www.youtube.com/embed/VIDEO_ID" },
  // Or a static thumbnail that links out:
  { title: "Case study", thumbnail: "/work/case-1.jpg", href: "https://instagram.com/p/..." },
];
```

- Empty array → 6 vertical (9:16) "Work sample coming soon" placeholder tiles.
- The grid is built for **vertical 9:16 reels**. Instagram and YouTube embeds both work.
- For Instagram: take the reel URL and append `/embed` (e.g.
  `https://www.instagram.com/reel/CxYz123/embed`).

### Other editable copy

Also in `lib/content.ts`: the Calendly URL (`CALENDLY_URL`), Instagram + email
(`INSTAGRAM_URL`, `CONTACT_EMAIL`), the 6 service cards (`services`), the 3 steps
(`steps`), and the FAQ (`faqs`). Edit the text there; the sections re-render.

---

## 4. Deploy to Vercel + connect kshudarth.com

### A. Push the code to GitHub

```bash
cd kshudarth-site
git init
git add .
git commit -m "Kshudarth marketing site"
# create an empty repo on github.com first, then:
git remote add origin https://github.com/<you>/kshudarth-site.git
git branch -M main
git push -u origin main
```

### B. Import into Vercel

1. Go to **https://vercel.com/new** and sign in with GitHub.
2. Click **Import** on your `kshudarth-site` repo.
3. Vercel auto-detects **Next.js** — leave all build settings at their defaults
   (Build Command `next build`, Output `.next`). No environment variables are
   needed.
4. Click **Deploy**. In ~1–2 minutes you get a live `*.vercel.app` URL.

> No GitHub? You can also run `npm i -g vercel` then `vercel` from the project
> folder and follow the prompts.

### C. Connect the domain kshudarth.com

1. In your Vercel project → **Settings → Domains**.
2. Enter `kshudarth.com` and click **Add**. Add `www.kshudarth.com` too and set
   it to redirect to the apex (Vercel offers this automatically).
3. Vercel shows the DNS records to set. At your domain registrar (where you
   bought kshudarth.com), add:
   - **A record** — `@` → `76.76.21.21`
   - **CNAME record** — `www` → `cname.vercel-dns.com`
   (Vercel always shows the exact current values — use whatever it displays.)
4. Alternatively, point your registrar's **nameservers** to Vercel's (shown in
   the dashboard) to let Vercel manage DNS entirely.
5. DNS propagates in minutes to a few hours. Vercel auto-provisions the SSL
   certificate — the site will be live on **https://kshudarth.com**.

Every future `git push` to `main` auto-deploys.

---

## Project structure

```
app/
  layout.tsx        fonts, metadata/SEO, favicon, global background
  page.tsx          assembles the sections in order
  globals.css       Tailwind + brand base styles, reduced-motion rules
components/
  Nav · Hero · ProofStrip · Problem · WhatWeDo · Work · HowItWorks
  About · Testimonials · Faq · BookingCTA · Footer
  MotionSection     reusable fade-up + stagger wrappers (reduced-motion aware)
  StickyMobileCTA · BookButton · FoundersImage · Icons
lib/
  content.ts        testimonials, workSamples, services, steps, faqs, links
public/
  logo.png · icon.svg   (add founders.jpg later)
tailwind.config.ts  brand colors + font families
```

## Brand

- **Colors:** terracotta `#862B01`, rust `#5C1C01`, espresso `#3C1201`, copper
  `#9D4714`, copperLight `#C0642A`, gold `#E08036`, champagne `#F0B36A`, cream
  `#F7E6CF`.
- **Type:** Cinzel (headings/wordmark), EB Garamond (body), Inter (UI).
- **Tagline:** _We help creators and brands build content that lasts._
