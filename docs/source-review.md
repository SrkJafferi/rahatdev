# Reference review — 10 October 2026

The reference directory was recursively inspected before homepage design and implementation, and again for the latest design pass. It holds the supplied brochures, price lists, inventory workbook, official logo and the imagery supplied for the daylight hero and service cards. There are no nested asset folders, separate unit photographs, architectural image files, or videos. Source files are retained unchanged.

## Project associations

| Source | Project | Use |
| --- | --- | --- |
| `logo.png` | Rahat Associates | Replacement official horizontal PNG (800 × 300), displayed without alteration; original JPEG remains in the reference archive only |
| `Brochure.pdf` (17 pages) | Rahat Heights, Faisal Margalla City | Exterior render from page 3; façade detail from page 3; floor-plan spread from page 9; unchanged downloadable brochure |
| `Smart One Hight re size (1).pdf` (8 pages) | Smart One Heights 2, Bahria Enclave, Islamabad | Full exterior image embedded on page 1 (also shown on page 2); floor-plan spread from page 6; unchanged downloadable brochure |
| `Brochure RH2 PLOT # 11 final.pdf` (16 pages) | Rahat Heights II, Grand City, Kharian | Exterior render from page 2; façade view from page 4; floor-plan spread from page 10; unchanged downloadable brochure |
| `PRICE LIST.pdf` (1 page) | Smart One Heights 2 | Historical payment schedule reviewed; no price or availability imported into homepage |
| `RAHAT HEIGHTS 2 (PRICE LIST 2025).pdf` (2 pages) | Rahat Heights II, Kharian | 2025 financial plan reviewed; not presented as current pricing |
| `Rahat heights detail.xlsx` (`Sheet1`, rows 1–31) | Rahat Heights, FMC | Latest supplied inventory; takes precedence over older Rahat Heights brochure data for later unit integration |

Brochure exteriors are architectural renders, not verified completed-building photographs. The same illustrative bedroom, kitchen and retail images recur in multiple brochures; these were deliberately not used as unit photographs or claimed project interiors. Other projects shown in brochure portfolio pages are not added to this website.

## Supplied service imagery

The AVIF files added to `reference/` are used unchanged as the service-card imagery and copied to `public/media/service1–6.avif`:

| Source | Card |
| --- | --- |
| `service6-1024x683.avif` | Residential Developments |
| `service5-1024x683.avif` | Commercial Developments |
| `service3-1024x683.avif` | Real Estate Development |
| `service2-1024x683.avif` | Property Sales & Enquiries |
| `service1-1024x683.avif` | Project Consultation |

These are illustrative service photographs rather than project renders, which is why the card alt text reads "representative image".

## Hero stage art

The hero uses four assets requested from the public Spaciaz home-6 demo and copied to `public/media`: `hero-sky.jpg` (sky plate), `hero-cloud-left.png` and `hero-cloud-right.png` (cloud cut-outs, transparent palette PNGs) and `hero-building.png` (tower cut-out). They stand in for the reference design only and must be replaced with licensed or client-owned photography before production.

## Inventory handling

- Homepage does not publish unit listings, prices, sale status, construction status or occupancy claims.
- Spreadsheet row 25, unit 304, is explicitly marked `Air BNB` and must be excluded from any later import, including ordinary sale/rental cards unless separately clarified.
- Rows marked `Rented out` are not vacant rental inventory. Purpose and occupancy are separate fields; row 18 and row 20 contain both rented occupancy and rent/sale purposes.
- Records are marked `Resale`; do not describe them as newly released developer stock.
- Lower ground row 3 lacks a unit identifier, purpose and occupancy, despite containing numeric price/rent data. Do not infer availability.
- Zero rent for penthouses 501 and 502 does not mean free rent; the supplied purpose is sale.
- No explicit effective date is supplied in the workbook. File modification times are not treated as an inventory date.
- Unknown bathrooms, approvals, delivery dates and availability are left unknown.

## Contact conflicts and missing facts

The Rahat Heights brochure lists an F-10 Markaz office and `info@rahatassociates.com.pk`. The Smart One brochure lists Northern Heights, E-11/3 and a Yahoo email. The Rahat Heights II brochure lists Alzeh Heights, E-11/2 plus B-17 and Kharian offices. Multiple phone numbers appear. These are historical printed details, not confirmed current contacts.

`src/data/projects.ts` intentionally leaves phone, WhatsApp, email and office unset. The official Facebook URL supplied in the brief is the only active contact destination. The enquiry widget copies a message locally and does not send or store it. It never claims a successful submission.

Confirm current official phone, WhatsApp number, email, office address, company legal name and any approved history before publication. The supplied target domain is `rahatassociates.pk`; older brochure domain `rahatassociates.com.pk` is not silently substituted.

## Research and phase boundary

Reviewed the accessible Spaciaz homepage and home-2/home-6 references for hierarchy and project composition. Realexa, Villahub and Quere reference URLs failed through web retrieval. Facebook profile, photos and reels could not be retrieved; no extra factual claims or media were imported. No access restrictions were bypassed.

This is a local homepage design review in the provided independent workspace. No additional content routes, CMS, database, admin, authentication, checkout or booking system have been added. Project buttons open inline project previews and real brochure downloads. Navigation links reach homepage sections. Demo metadata and robots block indexing; production canonical and sitemap await the actual domain launch.

Next phase is contingent on homepage design approval: dedicated portfolio, three project routes, About, Gallery and Contact; then carefully reconciled sale and long-term rental inventory with correctly associated unit media when supplied.

## Homepage amenities section — 11 October 2026

The What we offer section replaces Our approach. Its six features are scoped to Rahat Heights, Faisal Margalla City (FMC), and were checked against Brochure.pdf page 6: gymnasium; elevator with smart-card security; CCTV surveillance; front/back parking; fire alarm and wide emergency stairs; tiles/marble, sanitary fittings and copper electrical wiring. They are presented as planned brochure specifications, without claims of current operation. The faint background uses the same Rahat Heights exterior render already extracted from page 3. The layout was inspected in the Quere homepage-2 browser reference; no reference imagery or amenity claims were imported.


## Floor plans section — 11 October 2026

Replaced A closer look with the Floor Plans composition inspected in the live Realexa home5-video browser reference: project pill tabs, left-hand details, a large original plan and a project-specific exterior. The reference tabs were tested in the browser; its names, metrics and imagery were not imported. Added 10 optimized full-page images rendered directly from the supplied PDFs at 2400px: Brochure.pdf pages 7–9; Smart One Hight re size (1).pdf pages 5–7; Brochure RH2 PLOT # 11 final.pdf pages 7–10. Rendered pages were visually inspected together. Cross-checked the floor grouping against the three supplied marketing.safiz.pk project pages. Smart One page 7 is called Fourth floor in this site because that is the label in the actual PDF, despite the external page calling it a penthouse plan. Details describe floor groups and uses rather than assigning whole-floor drawings invented unit areas or bedroom counts. Floor selection updates the original plan and brochure page link; enlargement and arrow navigation are scoped to the active project.

Validation: typecheck, ESLint and production build passed. Live browser checked all ten project/floor combinations, project-specific image and brochure page associations, modal opening/closing and arrow wraparound, keyboard project selection, desktop at 1440px and mobile at 390px. No horizontal overflow or console errors observed. Existing service/project scroll components were not modified.


## Selected Projects panel UI — 11 October 2026

Updated only the project panel presentation to match the supplied Rahat Heights design direction: dark architectural surface, rounded authentic renders, floating location/category badges, outlined project number, pill CTAs and a three-part project detail row. Kept the existing 1128px minimum stage geometry and GSAP bottom/bottom pin, scrub, pinSpacing and sequential whole-panel yPercent -100 transitions. Previous/next controls seek the existing scroll range; no autoplay carousel or new scroll system. The progress count uses the actual three projects. All copy and renders remain tied to the corresponding local project data. Typecheck, lint and production build passed. Browser at 1440px confirmed project 1/2/3, scroll-linked partial transition, backward reversal and release to the following features section; 390px confirmed pinning is disabled and no horizontal overflow.


## What we offer horizontal scroll — 11 October 2026

Inspected Express Advertising WHY CHOOSE US in the real browser. Observed a pinned section with its single track translating left as vertical scroll advanced and reversing on scroll up (observed x -994px, then -490px). Applied that interaction to the existing six Rahat Heights brochure features without importing reference imagery or facts. Desktop uses scoped GSAP ScrollTrigger, measured overflow distance, pinSpacing and scrub 0.8; a progress line shares the timeline. Mobile/reduced-motion/no-JavaScript keep a single native horizontal row. Keyboard arrows are supported. Browser QA at 1440px verified all six articles share one row, x -47 to -618 on downward scroll and back to -275 on upward scroll, final x -1295 with the final feature in view, and normal vertical release afterwards. At 390px, pinning cleaned up and the native row scrolled with arrow input; no page overflow or console errors observed. Typecheck, lint and production build passed.

## Hero background update — 2026-10-11
User-supplied Modern Red-Accented High-Rise Overlooking Mountains.avif copied unchanged to public/media/hero-mountain-residence.avif. Replaces the old sky and separate tower presentation. Clouds and marquee retained as foreground layers. No project identity inferred from the new image.

