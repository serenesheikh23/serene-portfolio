# Serene Sheikhalard — Portfolio

Editorial portfolio for a full-stack software engineer in Dallas–Fort Worth.

**Live:** [serene-sheikhalard-portfolio.vercel.app](https://serene-sheikhalard-portfolio.vercel.app)

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Vercel

---

## Lighthouse

| | Mobile | Desktop |
|---|---|---|
| Performance | **100** | **100** |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |

Mobile LCP **1.2s** · TBT **0ms** · CLS **0**.

---

## What it is

A working portfolio set like a studio field guide. Warm paper ground, near-black ink, one vermilion accent. Oversized editorial type, numbered sections, thin rules. The projects are the argument — the design stays out of the way.

Four case studies, each with a real interface, a real API, and a deployment behind it:

- **Marketly** — multi-role digital services store, 3 payment gateways, 86 API routes
- **Ismail Cosmetics** — bilingual Arabic/English RTL e-commerce, 110 API routes, 38-page SPA
- **Code Craft** — Next.js agency site with a full admin CMS
- **drama.gov.sy** — live government institutional CMS, all-Arabic RTL, full admin dashboard

---

## Stack

| Layer | Tools |
|---|---|
| **Framework** | Next.js 15 (App Router), React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Fonts** | Instrument Serif (display), Manrope (body), JetBrains Mono (technical details) |
| **Deployment** | Vercel |

---

## Interactions

Every interaction is native and touch-first:

- Tap-to-expand numbered work index — `aria-expanded`, keyboard operable
- Native scroll-snap case-study gallery — no carousel library
- Draggable before/after performance slider — Pointer Events + arrow keys
- Step-through payment flow with Back / Next
- Webhook idempotency simulation
- Draggable responsive-layout demo with container queries
- Command palette on desktop (`Cmd/Ctrl+K`), never required

No smooth-scroll library. No motion library on the critical path. `prefers-reduced-motion` gets a static alternative everywhere.

---

## Run locally

```bash
git clone https://github.com/serenesheikh23/serene-portfolio.git
cd serene-portfolio
npm install
npm run dev
