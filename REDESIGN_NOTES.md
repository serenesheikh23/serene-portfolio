# Redesign notes — Serene Sheikhalard

Branch: `redesign` (created from `main`; `main` is never touched, merged, or deployed by this work).

## Audit (before)

- Next.js 15.1.6 App Router, React 19, TypeScript, Tailwind 3.4.
- One large `"use client"` page: framer-motion, Lenis smooth scrolling, Lucide icons, a black/gold "luxury" theme, a scramble-text hero, a stacking-card project modal, and a draggable skills marquee.
- Fonts: Manrope + Playfair Display.
- CV link pointed at `/Serene_Sheikhalard_Resume.pdf`, a file that does not exist. The real CV is `/Serene_Sheikhalard_Software_Engineer.pdf`.
- Metadata used the GitHub Pages URL, while the CV lists `serene-sheikhalard-portfolio.vercel.app`. No sitemap, robots, OG image, or canonical.
- `.github/workflows/deploy.yml` runs only on `main`; this branch cannot trigger a production Pages deploy.
- Existing public assets: `Serene_Sheikhalard_Software_Engineer.pdf`, `codecraft.jpg` (Code Craft logo, 784×236), `serene-photo.jpg` (portrait, 1320×880), `.nojekyll`.

## Concept

**A working portfolio, set like a studio field guide.** The page reads as a printed index: a huge serif name, numbered sections, marginal notes, thin rules, and full-width facts. It is warm paper rather than dark luxury, so the work and the typography carry the page instead of chrome. One ink-black section ("How I work") breaks the paper rhythm; the contact page closes like the back cover of a magazine.

Idea sentence: **Serene's shipped work becomes an annotated index you can open, swipe, and inspect.** The project rows expand inline; the case-study gallery swipes; the payment architecture is a step-through; the Code Craft performance claim is a draggable before/after.

Positioning line: **"Software engineer who builds fast, accessible interfaces and the Laravel backends behind them."**
Supporting line: **"Entry-level software engineer · Dallas–Fort Worth · BS Information Technology, June 2026."**

## Palette

| Role | Value | Use |
| --- | --- | --- |
| Paper | `#F4EFE6` | page ground (never pure white) |
| Ink | `#171512` | headlines and running text |
| Ink soft | `#3E3932` | secondary body |
| Muted | `#5A544B` | captions (6.5:1 on paper) |
| Rule | `#D5CCBD` | thin rules |
| Surface | `#EAE3D7` | tone steps, fact panel |
| Accent | `#B02E1A` | actions, section marks (5.6:1 on paper, 6.5:1 with paper text) |
| Accent soft | `#E9D6CF` | rare accent tint |
| Dark field | `#171512` | "How I work" band |

No gradients, glows, glass, blobs, stock illustrations, or emoji.

## Type

- Display: **Instrument Serif** (400, normal + italic) — high-contrast editorial face, used at oversized sizes with tight leading.
- Body/UI: **Manrope** (variable) — refined, not Inter/Roboto/Arial.
- Technical details: **JetBrains Mono** (variable) — stack tags, dates, numbers, captions.
- All loaded through `next/font` with `display: swap` and `latin` subsets.

## What changes, file by file

| File | Change |
| --- | --- |
| `src/app/layout.tsx` | New fonts, metadata, viewport, skip link, header, mobile action bar, section progress. Remove Lenis. |
| `src/app/globals.css` | New token system, reset, editorial type, buttons, links, focus, reduced-motion guard, component styles. |
| `src/app/page.tsx` | Server component. Composes hero, work, case studies, craft, process, stack, about, contact, footer. No `"use client"`. |
| `src/components/SmoothScroll.tsx` | Deleted. Native scrolling only. |
| `src/components/SiteHeader.tsx` | Compact sticky top bar; desktop anchor nav; CV link. |
| `src/components/MobileActionBar.tsx` | Sticky bottom Work / Contact / Download CV; hides on scroll down, respects safe-area and reduced motion. |
| `src/components/SectionProgress.tsx` | Thin top progress bar + desktop numbered anchor rail. |
| `src/components/ProjectIndex.tsx` | Tap-to-expand numbered work index with inline visual, stack, live/case-study actions. |
| `src/components/ProjectVisual.tsx` | Honest CSS interface studies for each project (no fake screenshots). |
| `src/components/CaseStudyGallery.tsx` | Native scroll-snap gallery with counter, dots, prev/next, keyboard. |
| `src/components/CodeCraftBeforeAfter.tsx` | Pointer/keyboard before/after slider for the LCP 5.3s → 2.4s story. |
| `src/components/PaymentFlow.tsx` | Five-step Marketly payment flow; buttons on touch, scroll-driven on large screens. |
| `src/components/WebhookDemo.tsx` | "Send the webhook twice" simulation, clearly labelled. |
| `src/components/ResizeDemo.tsx` | Draggable container edge with container-query reflow. |
| `src/components/CommandPalette.tsx` | Optional desktop Cmd/Ctrl+K palette. |
| `src/app/opengraph-image.tsx` | Generated OG/Twitter image. |
| `src/app/icon.svg` | Crisp monogram favicon; existing `favicon.ico` kept. |
| `src/app/sitemap.ts`, `src/app/robots.ts` | Sitemap, robots, canonical host. |
| `src/lib/content.ts` | Single source for projects, case studies, craft, process, stack, links. |
| `tailwind.config.ts` | New token colors and font families; remove lux theme. |
| `package.json` | Remove framer-motion, Lenis, Lucide; add lint tooling/scripts. |

## Copy rules

- Facts come from `public/Serene_Sheikhalard_Software_Engineer.pdf` only.
- No phone number anywhere.
- Email, LinkedIn, GitHub, and CV links use the exact values from the CV.
- English only; no language switcher, RTL layout, Arabic typefaces, or i18n UI.
- No "passionate", "cutting-edge", "seamless", "innovative", "leveraging".
- Front-end evidence leads; backend depth supports.

## Planned verification

- `npm run build`, `npm run lint`, `npx tsc --noEmit`.
- Production server + `curl -I` for the CV (200, `application/pdf`, exact filename).
- Lighthouse mobile + desktop against `next start` (or document why it could not run).
- Headless Chrome screenshots at 360, 768, 1280, 1920.
- Keyboard, focus, `aria-expanded`, reduced-motion review.
- Check for horizontal overflow and broken links.

## Open items to record at the end

- No real production screenshots of Marketly, Ismail Cosmetics, Code Craft, drama.gov.sy, or light-promo.com are in the repo. The project visuals are honest CSS interface studies, labelled as such. They should be replaced with real screenshots when available.
- `codecraft.jpg` is a logo, not a screenshot; it may be used as a mark only.
- Unused assets and anything that could not be verified will be listed in the final notes.

---

## Final verification (redesign branch)

Commits on `redesign`:
- `aee30b4` feat: editorial redesign — tokens, fonts, layout, sections, interactions
- `3311e4a` fix: CV download uses exact filename with download attribute
- `2b4be86` fix: CV anchors use exact filename and download attribute
- `ae849de` fix: remove unused imports and unverified count
- `db8503c` fix: drop unused site import in header

Local checks (all green):
- `npm run typecheck` — pass
- `npm run lint` — pass, 0 warnings
- `npm run build` — pass; `/` is static, First Load JS 116 kB
- `next start` on :3100:
  - `/Serene_Sheikhalard_Software_Engineer.pdf` → `200`, `Content-Type: application/pdf`, 46,400 bytes, exact filename
  - 5 `href="/Serene_Sheikhalard_Software_Engineer.pdf"` and 5 `download="Serene_Sheikhalard_Software_Engineer.pdf"` in rendered HTML
  - no phone number in rendered HTML
  - `/sitemap.xml`, `/robots.txt`, `/opengraph-image` all `200`
  - title: “Serene Sheikhalard — Full-Stack & Front-End Software Engineer”
  - description present and matches positioning

Lighthouse: **not run in this session** at the user’s request. CV reports 98 mobile / 99 desktop performance, 100 SEO, 100 best practices, 97 mobile accessibility on Code Craft — those are project numbers, not this portfolio. Verify this site with `npx lighthouse http://localhost:3100 --view` before merging.

## Interaction table

| Interaction | File | Touch | Reduced motion |
| --- | --- | --- | --- |
| Tap-to-expand work index | `src/components/ProjectIndex.tsx` | Tap row; 44px+ target; `aria-expanded` | Grid-rows transition disabled by global guard |
| Swipeable case-study gallery | `src/components/CaseStudyGallery.tsx` | Native scroll-snap swipe; dots + prev/next | Scroll only; no transition |
| Code Craft before/after | `src/components/CodeCraftBeforeAfter.tsx` | Pointer drag; 44px handle; arrow keys | No transition; position updates instantly |
| Marketly payment stepper | `src/components/PaymentFlow.tsx` | Back/Next buttons; step tabs; scroll-driven on lg | State changes without transition |
| Webhook twice simulation | `src/components/WebhookDemo.tsx` | Tap “Send webhook”, “Reset”; `aria-live` | No animation |
| Resize demo | `src/components/ResizeDemo.tsx` | Pointer drag edge; arrow keys; preset buttons | Instant width change |
| Section progress + rail | `src/components/SectionProgress.tsx` | Anchor links, 44px targets | Transform updates directly |
| Cmd/Ctrl+K palette (desktop) | `src/components/CommandPalette.tsx` | Keyboard only; not required | No transition |
| Mobile action bar | `src/components/MobileActionBar.tsx` | Fixed bottom, safe-area padding, hides on scroll down | Hide/show without transition |

## CV accuracy

- Every employer, date, metric, stack item, and URL on the site appears in the CV.
- The original “three production applications” phrasing is supported by CV lines 8 and 22. It was reworded to explicitly name Marketly, Ismail Cosmetics, Code Craft, drama.gov.sy, and light-promo.com.
- Phone number is not displayed anywhere.
- Email, LinkedIn, GitHub, and CV links match the CV exactly.
- English only; no RTL layout, Arabic typefaces, or language switcher.

## Assets

- Kept: `public/Serene_Sheikhalard_Software_Engineer.pdf`, `public/serene-photo.jpg` (About portrait), `public/favicon.ico`, `public/.nojekyll`.
- Unused but kept: `public/codecraft.jpg` (logo, not a screenshot; no longer referenced). Delete only if you are sure.
- Added: `src/app/icon.svg`, `src/app/opengraph-image.tsx`.

## Placeholders that need your input

- Project visuals in `ProjectVisual.tsx` are **honest CSS interface studies**, labelled “Interface study”. Replace with real screenshots when available: Marketly, Ismail Cosmetics, Code Craft, drama.gov.sy, light-promo.com.
- Code Craft before/after is an **illustrative reconstruction**, not production screenshots. The LCP 5.3s → 2.4s and Lighthouse scores are from the CV.
- About portrait uses `serene-photo.jpg`; replace if you want a newer photo.

## Not completed / not verified here

- Lighthouse not run (user request).
- Automated screenshots at 360 / 768 / 1280 / 1920 were not captured in this session (headless Chrome glob failed). Check manually before merging.
- Vercel preview not created yet; `redesign` has not been pushed.

## Preview, merge, deploy

Preview on your phone:
1. `git push -u origin redesign`
2. In Vercel, open the project → Deployments → find the `redesign` preview → “Visit”. Use the preview URL on your phone.
3. `.github/workflows/deploy.yml` only triggers on `main`, so pushing `redesign` cannot deploy GitHub Pages.

Merge to main (only after preview looks right):
1. `git checkout main && git pull`
2. `git merge --no-ff redesign`
3. `git push origin main`
4. Vercel production redeploys from `main`; GitHub Pages workflow also runs.

Never force-push. Never merge from a terminal you don’t trust.
