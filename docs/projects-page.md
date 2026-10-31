# Projects page implementation and verification

Route: http://localhost:3101/projects

## Implemented

Three editorial showcases with alternating compositions, authentic project brochure renders, compact anchor navigation (88px Lenis offset), category labels, aggregate starting-price panels, verified specifications disclosures, brochure amenities, curated architectural galleries, all ten original floor plans in project-scoped lightboxes, and a final enquiry CTA. Existing Header/Footer components and their visual design are reused. Only navigation destinations and current-page semantics changed in shared code. The Projects wrapper reveals the existing header, which the homepage normally reveals through its hero timeline.

The enquiry dialog uses the existing accessible native-dialog Modal primitive. All projects are preselected correctly, the selector can change projects, and renting appears only for Rahat Heights. Name, phone, optional email and explicit draft acknowledgement are validated. Draft links clear when fields change. WhatsApp opens the centralized +92 331 6556191 destination with an encoded project-specific message. The website never sends or stores a lead, and opening a draft is not a successful submission.

## Pricing provenance and limits

Only sanitized project-level minimum summaries enter rendered HTML and client bundles. Detailed inventory rows, unit prices, installment amounts and payment tables remain in the unchanged local reference sources; no raw inventory was imported into application code.

- Rahat Heights commercial resale: PKR 9 Million; commercial long-term rent: PKR 30,000/month. From `reference/Rahat heights detail.xlsx`, Sheet1 rows 8–13, explicitly vacant and Rent / Sale. Source is undated and current availability still needs client confirmation. Rows marked rented out are excluded from rental eligibility; row 25 Airbnb is excluded entirely; incomplete lower-ground data is excluded. No individual unit identifiers/prices are published.
- Smart One Heights 2 offices: indicative PKR 10.848 Million, minimum office total in `reference/PRICE LIST.pdf`, page 1. The original source contains 30% down payment and eight quarterly installments; these detailed amounts are not published. Office sizes 452–570 sq ft; apartment sizes 880–1,060 sq ft. Brochure layouts and price-schedule shop areas differ; the specification explicitly labels shop areas as price-schedule values. No unsold status is inferred.
- Rahat Heights II apartments: indicative PKR 4.845 Million, minimum apartment total on page 2 of `reference/RAHAT HEIGHTS 2 (PRICE LIST 2025).pdf`. Both pages were rendered and visually inspected, including other categories to establish the correct minimum. This is a 2025 source, not a confirmed current offer. Client approval is required before public launch.

All price panels state that pricing and availability require current confirmation. No ROI, possession, approval or completion claims have been introduced.

## Media provenance

The reference directory was inspected recursively. No separate unit 203/301/304/401 photographs or videos exist there; no fake interiors or videos were added. Architectural renders are explicitly labeled. Rahat Heights render/detail are from Brochure.pdf; Smart One uses its original brochure render `/media/smart-one-exterior.webp`, rather than associating the homepage's illustrative replacement with a genuine project. Rahat Heights II render/detail and facilities are from its brochure, including page 6. Smart One amenity labels describe actual brochure floor arrangements and lift drawings rather than borrowing Rahat Heights facilities. Existing optimized floor-plan assets are reused.

The hero follows the supplied split editorial composition with genuine Rahat Heights II architecture and an existing illustrative skyline backdrop. It does not misrepresent the mockup's invented buildings as project imagery.

## Browser verification

- Inspected approved shared styling and all three original project renders.
- Desktop layouts inspected at 1440x900, 1280x720 and 1920x1080; mobile fallback checked at 390x844. No horizontal overflow observed.
- All three navigation anchors tested; final section tops settle at approximately 88px under the fixed header. Removed additive native offsets when Lenis is active.
- All three lead buttons tested: correct project selected; renting only in Rahat Heights.
- Empty-form validation tested, and valid draft generation tested for all three developments. Official WhatsApp draft destinations opened; no message was sent.
- Project switching updates categories/interests and clears the stale draft link.
- Each project's floor-plan lightbox tested; next-image, keyboard arrows and Escape tested. Architectural gallery tested with keyboard navigation.
- Clean verification tab had no console or hydration errors. An intermediate development hot-refresh mismatch was resolved; final shared navigation renders consistently.
- Header/footer layout, logo, contact details, colors and styling preserved. Shared Projects navigation now reaches /projects.
- Screenshots saved in `docs/screenshots/projects/`: hero, each of the three showcases, and enquiry modal.
- TypeScript, ESLint and production build pass. Installed Next.js 16.4.0 emits an existing security upgrade reminder; the first build was stopped by that reminder, and retry passed. No dependency upgrade performed.

## Files

Created: `src/app/projects/page.tsx`, `src/components/projects/projects-portfolio.tsx`, `src/components/projects/projects-portfolio.module.css`, `src/data/project-portfolio.ts`, this report.
Updated: `src/lib/navigation.ts` (Projects route), shared Header/Footer current-page semantics. No homepage/About layout changes, database, API, authentication, deployment or push.
