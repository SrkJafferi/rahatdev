# Floor Plans implementation

Route: /floor-plans. Original brochures rendered at 4800px page width with Poppler, then their left/right drawing portions extracted without architectural edits. Each production WebP is ~2400px wide. All sixteen images were visually inspected together; dimensions and labels remain intact. No AI drawings or enhancements were used.

Source mapping:
- Rahat Heights (4 drawings): Brochure.pdf p7 lower ground, p8 ground, p9 first/second and third/fifth floor groups.
- Smart One Heights 2 (5 drawings): Smart One Hight re size (1).pdf p5 lower ground/ground, p6 first-floor offices and second/third apartments, p7 fourth floor (source label preserved).
- Rahat Heights II (7 drawings): Brochure RH2 PLOT # 11 final.pdf p7 basement/lower ground, p8 ground, p9 mezzanine/first offices, p10 second and third/sixth apartments.

Existing source data is reused by explorer-plans.ts. This page treats drawings as building-floor plans; it does not invent unit area, bedrooms or bathroom specifications. All requested source plans are available. Small technical labels require zoom; original proportions are preserved.

Browser verification: all 16 project/floor associations checked, zoom to 150%, keyboard pan, fit/reset to 100%, full-window accessible dialog and Escape, genuine WebP download (descriptive filename), floor-specific enquiry with correct project/floor/layout and official WhatsApp draft. No message sent. Valid/invalid deep-link fallback and thumbnail/next controls checked. Desktop 1440/1280/1920 and mobile390 inspected; no page overflow. Touch uses zoom buttons and drag pan when enlarged; custom two-finger pinch is not implemented. Ctrl/Command + wheel zoom prevents trapping normal page scrolling. Mouse drag and wheel paths implemented; keyboard pan verified in browser. Clean final tab had no console/hydration errors.

Shared header/footer visuals preserved; existing Floor plans slot now reaches the route. Projects page's existing first floor-plan thumbnail navigates to the selected project's explorer. Existing project enquiry modal extracted into a shared component, keeping its original styling and adding optional context. Homepage/About layouts untouched. No price tables, backend, push or deployment.

Created: src/app/floor-plans/page.tsx; src/components/floor-plans/{explorer.tsx,explorer.module.css,plan-viewer.tsx}; src/data/explorer-plans.ts; src/components/site/project-lead-modal.tsx; public/media/floorplans/*.webp.
Modified: ProjectsPortfolio imports/reuses shared modal and links to explorer; navigation helper/header current-page semantics. Screenshots: docs/screenshots/floor-plans/.

Typecheck and lint pass; final production build included in combined completion validation. Installed Next.js produces an existing security-upgrade reminder; retry is needed after the reminder. No dependencies upgraded.

## Blueprint hero update

Latest reference replaces architectural hero with decorative blueprint desk artwork, no breadcrumb, About-matched live typography/spacing, original-drawings viewer anchor, three feature badges and redesigned three-project selector. Original viewer, drawings, project/plan associations and downloads preserved. Selector tested switching to Smart One Heights 2. Asset public/media/floor-plans-blueprint-hero.webp: built-in imagegen edit removed all UI/text/cards from the supplied reference, preserving papers, rolled blueprint, pen, faint grid/orbit accents and foliage. Hero drawing is decorative only, not an available project layout.
