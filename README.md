# Rahat Associates

Frontend-only developer homepage built with Next.js 16, React 19 and TypeScript.

## Run

```sh
npm ci
npm run dev
```

Local preview: http://127.0.0.1:3000/

## Validate

```sh
npm run typecheck
npm run lint
npm run build
```

## Homepage

Cinematic hero, editorial introduction, sticky service cards, three scroll-controlled project panels, horizontal amenities showcase, original brochure floor plans, WhatsApp quotation form and contact footer.

GSAP ScrollTrigger coordinates animations; Lenis provides smooth wheel scrolling. Reduced-motion preferences and native touch scrolling are respected. Fonts: Involve, Poppins and Playfair Display.

Project information stays in typed local data under `src/data`. Authentic supplied assets are in `public/media` and original brochures in `public/brochures`. Reference originals, local logs and QA screenshots are excluded from Git.

Enquiry forms prepare a message for the visitor to review and send through WhatsApp. There is no CMS, database, authentication, payment processing or automatic newsletter subscription. The Gallery menu is reserved for a future page.

## Vercel

Import the GitHub repository, select Next.js, leave the root directory at repository root, and use `npm run build`. Set `SITE_URL` to the deployment's public URL for metadata. No other environment variables are required.

Search indexing is intentionally disabled while this homepage is a preview. Review indexing and metadata before the public production launch.