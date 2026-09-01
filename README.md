# Dr. Hafez Mohamed Farid — Academic Portfolio

A bilingual (English / Arabic, with full RTL), motion-rich portfolio for
Dr. Hafez Mohamed Farid, Ph.D. — Assistant Professor of Business Administration
and Certified Trainer. Built with **Next.js 15 (App Router)**, **TypeScript**,
**Tailwind CSS v4** and **Framer Motion**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production
```

## What's inside

| Section | Route id | Notes |
| --- | --- | --- |
| Hero | `#top` | Word-by-word headline reveal, rotating specialisation, pointer spotlight, node-graph "constellation" backdrop, live **doctoral research model** diagram card (`MediationDiagram`) |
| Institutions marquee | — | Infinite ticker, pauses on hover, direction-aware for RTL, brand-glyph separators |
| About | `#about` | **"FIG. 1" research-model plate** in place of a photo — the mediation diagram with the monogram in the mediator node — plus pull-quote, quick-facts list, focus-area chips |
| At a glance | `#metrics` | Scroll-triggered count-up metrics |
| Research | `#research` | **Interactive**: live search, theme filter, EN/AR filter, sort, "publications by year" bar chart, **methodological-mix panel** (mediation / moderation / direct-effect glyphs), per-paper model glyph, animated list re-flow, research-in-progress card |
| Experience | `#experience` | Scroll-drawn timeline rail, "current" pulse markers |
| Education | `#education` | Featured doctorate card with dissertation, degree grid |
| Teaching | `#teaching` | Per-tile pointer spotlight grid of 9 courses |
| Training | `#training` | Featured international engagement, engagement grid, training-area chips, availability CTA (opens email) |
| Credentials | `#credentials` | Certification grid |
| Speaking | `#speaking` | Conference / workshop list |
| Recognition | `#recognition` | Award highlight |
| Contact | `#contact` | Copy-to-clipboard details + form that composes a pre-filled email (no backend) |

## Language & direction

- Toggle in the header (`EN` ⇄ `العربية`). Preference is saved to `localStorage`
  and applied before hydration by a small inline boot script to avoid a flash.
- All copy lives in [`lib/content.ts`](lib/content.ts) as `L(en, ar)` pairs —
  edit once, both languages update. `<html dir>` / fonts switch automatically
  (Latin: Space Grotesk / Inter / JetBrains Mono; Arabic: Cairo).

## "Download CV"

The header button calls `window.print()`; a dedicated `@media print` stylesheet
in [`app/globals.css`](app/globals.css) flattens the page to a clean document so
the browser's *Save as PDF* produces a usable CV. To serve a real file instead,
drop `public/hafez-farid-cv.pdf` and point the button there in
[`components/layout/Header.tsx`](components/layout/Header.tsx).

## Identity system (no photo)

There is no headshot. The visual identity is built instead from Dr. Farid's
research method — mediation / moderation models:

- **Logo** — `components/ui/Brand.tsx` (and `app/icon.svg`): a path-diagram
  glyph — two predictor nodes rising to a mediator apex over a dashed
  "direct effect" baseline.
- **Research-model diagram** — `components/ui/MediationDiagram.tsx`: a reusable,
  animated SVG of the antecedent → mediator → outcome path with `a` / `b` / `c′`
  notation. Rendered large in the hero (doctoral model: Ethical Climate → Job
  Satisfaction → HR Sustainability) and as the "FIG. 1" plate that replaces the
  About portrait, with the `HF` monogram sitting in the mediator node.
- **Research section** tags each paper with a mediation / moderation / direct
  glyph and summarises the mix.

If a photo is added later, drop it in `public/` and render it with `next/image`
inside the About plate — keep the plate's frame, caption and corner ticks so the
academic framing is preserved.

## Accessibility & motion

- Respects `prefers-reduced-motion` (Framer `useReducedMotion` + a CSS fallback).
- Skip-to-content link, focus-visible rings, semantic landmarks, `aria` labels
  on icon-only controls.
