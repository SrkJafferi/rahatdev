# Homepage verification

Checked 10 October 2026. Three passes are recorded: the original build, the
services/projects redesign, and the daylight-hero + services refresh (this pass).

## This pass — daylight hero and services refresh

`npm run typecheck`, `npm run lint` and `npm run build`: passed after the final edits.
The homepage and `/robots.txt` are prerendered statically. Production dependency audit:
zero vulnerabilities.

**Hero.** The homepage stage is now the reference's daylight composition: a photographic
sky plate, two cloud cut-outs, the tower shot from below and an oversized scrolling line
of type along the base behind it, with Rahat's eyebrow, headline, description and actions
in the open left column. Entrance animation and scroll depth are driven by GSAP.

Verified in headless Chrome over CDP at 1440×900 (`scripts/qa-scroll.mjs`, frames in
`outputs/qa-scroll`, state in `outputs/qa-scroll/state.json`):

- Hero entrance completes with no console errors; the copy, tower, clouds and marquee all
  resolve from the CSS entrance guard.
- Scroll depth recorded per frame: at y=420 the tower has risen 28 px and the clouds have
  drifted 64 px (left) and 95 px (right); at full exit the tower has risen 72 px and the
  clouds 168 / 248 px; the round trip back to y=0 restores every value to zero.
- `overflowX: 0` in all 16 desktop frames — no horizontal overflow.
- Reduced motion (`QA_REDUCED=1`, frames in `outputs/qa-reduced`): the entrance guard
  lives inside `prefers-reduced-motion: no-preference`, so nothing is hidden; the hero
  renders complete with the marquee frozen at its start position and no scrub movement.

**Services.** The section note now renders on two lines (620 px measure). Card titles are
47 px / 700 on desktop, 38 px below 1100 px and `clamp(28px, 8.4vw, 38px)` below 900 px.
The five card images are the supplied `reference/service*.avif` files — service6 →
Residential Developments, service5 → Commercial Developments, service3 → Real Estate
Development, service2 → Property Sales & Enquiries, service1 → Project Consultation —
copied unchanged into `public/media/service1–6.avif`. Frames 02–05 confirm the note,
titles and imagery; the mobile sweep (`outputs/qa-mobile`) confirms the same at 390×844.

## Checks carried over from earlier passes (areas untouched since)

- Every internal anchor resolves to a real section; the mobile navigation opens, selects
  and closes.
- Project dialog opens and closes with Escape; the native dialog contains focus. Gallery
  filters, lightbox controls and the enquiry copy flow behave as before. No network
  submission is simulated.
- Three brochure URLs and `/robots.txt` return HTTP 200 (re-checked against the running
  dev server this pass).
- Logo source and served files are byte-identical, SHA-256
  `BB9DD343C58F22A13BAF23B75D167E73E59F3788E3155F9EBC943712B2CD98A4` (re-checked).
- Development-tool audit findings through the Next ESLint plugin / fast-glob / micromatch
  / braces chain remain as recorded earlier; the suggested automatic remedy downgrades the
  Next ESLint configuration across major versions, so it is not applied.

## Limitations

- The in-app preview webview does not composite frames on this machine, so visual evidence
  comes from headless Chrome rather than the preview panel. The preview tab itself remains
  registered against the dev server.
- Two development-only `next/image` advisories remain: an LCP advisory for the lazy
  intro/gallery render (`rahat-heights-exterior.webp`) when scrolled into view, and no
  others. No errors or exceptions.
- The hero stage uses the supplied template demo art (sky, clouds, tower) and the service
  cards use the supplied AVIF photographs; see `docs/source-review.md` for provenance and
  the replacement note before production.
- Hero geometry is tuned so the copy stays over the sky and the tower's dark upper block;
  the description's last line may clip the tower's edge by a few pixels at some widths.

The project is an independent local Git repository. Nothing has been pushed or published.

## What we offer card redesign — 2026-10-11
Reference-style rounded cards, alternating blue/sage icon discs, serif heading, authentic Rahat Heights background and brochure links. Existing pinned GSAP horizontal timeline preserved. Forward and reverse scroll verified in browser at 1440px; no page overflow or console errors. Typecheck, lint and production build passed. Narrow screens retain native horizontal scrolling.


## Homepage quotation form — 2026-10-11
Added after Floor Plans, before Contact CTA. User-confirmed WhatsApp destination: +92 331 6556191. Form uses existing projects; Office is excluded for Rahat Heights, included for Smart One Heights 2 and Rahat Heights II. Rent disabled because no verified available rental inventory is configured. Required fields, email, consent and phone normalization tested. Prepared WhatsApp message opened with synthetic QA data; nothing sent, temporary preview closed. No backend or submission-success claim. Typecheck, lint and production build passed.


## Hero background — 2026-10-11
Supplied AVIF used through next/image; separate old tower removed. Clouds move above the image on scroll, marquee remains at 130s in foreground. Fresh-load entrance verified at 1440px, no page overflow. Typecheck, lint and production build passed.


## Hero cloud loop and copy design — 2026-10-11
Cloud wrappers use independent continuous left-to-right CSS animations (80s/100s, infinite); existing image entrance retained. Removed competing cloud scroll transforms. Cloud position advanced at fixed page scroll during browser QA. Marquee 130s, smaller type, 70% opacity. Hero copy follows supplied three-line title and blue pill CTA styling; secondary CTA links to company story because no overview video exists. Desktop 1440px and mobile 390px have no page overflow. Typecheck, lint, production build passed. Reduced motion disables cloud loops.


## Quotation visual update — 2026-10-11
Supplied Modern Apartment Façade in Sunlight (1).avif copied unchanged as section background. White rounded form card, icon fields and circular left highlights follow supplied composition. Existing validation and WhatsApp destination unchanged. Hero clouds raised to 15%/7%, opacity 60%, loops retained; marquee font max 122px, opacity 70%, 130s speed retained. Typecheck, lint and production build passed.


## Footer redesign — 2026-10-11
Removed Start a conversation section from homepage. Header Contact, Project enquiry, project dialog enquiries and footer Get in touch now link to quotation. Footer uses supplied Modern Residence Overlooking Faisal Mosque.avif, official logo, four columns, circular verified social links and bottom contact row. Confirmed WhatsApp and Facebook only; no fabricated email, address, social destinations or policy pages. Stay connected prepares a consented email update request in WhatsApp, with no subscription-success claim. Browser verified encoded destination and contact anchor. Typecheck, lint and production build passed.


## Rotating hero heading — 2026-10-11
Exact approved eyebrow, static first line/prefix and description implemented. Business / Investment / Work rotate in order, 3000ms hold and 600ms vertical fade/slide. Hidden Investment measuring span reserves width and height. Browser snapshots had identical heading height 114.265625px and description top 345.25px across Business and Investment at 1440px. 390px layout has no overflow or phrase clipping. Timer tests verified all three words, loop, reduced-motion static Business and cleanup. Typecheck/lint pass. Background, hero height, links, header, footer and scroll effects preserved.

