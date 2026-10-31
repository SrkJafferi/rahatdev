# Services page completion

/services implemented with seven requested sections, shared header/footer, original typography and colors. Four detailed image-led service showcases reuse the exact homepage assets (residential-developments.avif, commercial-developments1.avif, service2.avif, project-consultation.avif). They are representative service illustrations, not completed-project photographs. Hero uses genuine Rahat Heights brochure frontage, distinct from homepage and Projects hero. Introduction uses genuine project renders. No new service photographs generated.

Created: src/app/services/page.tsx; src/components/services/services-portfolio.tsx; services-portfolio.module.css; src/data/service-portfolio.ts. The typed service extension derives IDs/images from the original services dataset. Existing Reveal and Parallax components provide reduced-motion-aware animation; no pinning added.

Existing shared ProjectLeadModal now accepts optional service context, shown read-only and included in the official WhatsApp draft. All four service selections tested. Property sales draft verified with project and service; no message sent. Primary residential/commercial discovery links reach the documented residential/commercial plan groups, with adjacent contextual enquiry buttons. Three related project links reach the correct /projects anchors. Consultation opens the existing modal and permits project selection. No backend, pricing tables or invented business claims.

Shared header/footer visuals, menu labels, logo, styling and contacts preserved. Navigation helper routes the existing Our Services slot to /services; existing explicit homepage #service-* anchors remain valid. Necessary shared integration only. Approved layouts not redesigned.

Browser QA: desktop1440,1280,1920 and mobile390 inspected; no horizontal overflow or failed loaded images. All sections inspected, service context tested for all four categories, official WhatsApp draft verified, no console/hydration errors on final tab. Screenshots of hero, introduction, four core services, interests, journey and final CTA saved under docs/screenshots/services/. Typecheck, ESLint and production build passed; installed Next.js security reminder required a build retry. No dependency upgrade performed.

Remaining business verification: current unit availability, pricing, site visits and consultation arrangements must be confirmed by the team; no guarantees or live inventory claims are published. No missing approved service images. No push or deployment.

## Reference hero and What We Offer update

Latest reference replaces hero and introductory/core-service area with model-on-desk hero and four alternating image/text showcases: Residential Developments, Commercial Spaces, Project Consultation and After Sales Support. No breadcrumb. Hero typography and responsive spacing mirror About. Existing header/footer and lower sections retained. CTAs use existing project/floor-plan routes and contextual enquiry modal, including support enquiries without promising guaranteed outcomes. Generated service visuals are representative illustrations, not photographs of staff or completed developments.

Built-in imagegen edit mode: hero prompt extracted only top background, removed all text/UI/trust badge, retained model, plans, laptop, plants and mountain window with empty pale left half; residential prompt extracted first warm living-room photograph, removed label/UI; consultation prompt extracted consultant/couple discussing plans, removed label/UI and retained window/model/table composition. Assets: public/media/services-reference-{hero,residential,consultation}.webp. Commercial and key-handover visuals reuse existing homepage assets.

Height follow-up: Services hero now shares the exact About height and responsive min-height rules, including 693px at 1440x900; other service sections unchanged.
