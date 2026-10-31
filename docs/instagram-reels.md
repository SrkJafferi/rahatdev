# Homepage Instagram reels — 28 October 2026

Implemented immediately before the existing Quotation / “Let's Connect” section. The homepage changes are one import and one component insertion. About, header/footer, existing project data, sections and motion components are not edited by this feature.

## Sources and playback

The official https://www.instagram.com/rahatassociates/reels/ profile was inspected in the user's browser. Twelve actual reel links and their matching original cover frames were visible. The browser asset export saved those already rendered cover images to public/media/reels/. No protected video extraction, private API, invented MP4 URL or stock media was used. Local reference/public directories contained no MP4/MOV/WebM/M4V files.

The typed src/data/instagram-reels.ts preserves observed profile order, URLs and matching posters. Labels use the verified account identity rather than inventing specific project associations or claims. The component also sorts, deduplicates by ID/URL and caps display at twelve.

- Actual reels integrated: 12.
- Native MP4s: 0.
- Instagram link fallback reels: 12.
- Genuine poster images: 12.
- Muted video autoplay: unavailable for the supplied Instagram-only content.
- Automatic carousel movement: verified in browser (scroll position advanced from 639 to 2238 without manual advance).

Cards open the original Instagram Reel in a new tab. No deceptive video play control is shown for link-only media, and no Instagram script/embed is loaded on the homepage. Playback/access remains controlled by Instagram.

The reusable component accepts optional videoSrc entries for authorized local MP4s. That mode includes active-only muted inline playback, nearby metadata loading, visibility/tab/reduced-motion pauses, preview pause and an accessible focused player with native sound controls. Native mode has not been browser-verified because no authorized source videos were supplied. Add videoSrc to curated entries when MP4s become available; it requires no CMS/backend.

## Carousel and verification

Seven-second auto-advance runs while the video track is sufficiently visible. Hover, focus, touch/manual navigation, a hidden tab, reduced motion and an open player stop it. Manual interactions leave an explicit resume control. Observers, preference/document listeners, video playback and timers clean up on unmount. Native scroll snap supports swipe; left/right keyboard controls and circular buttons provide manual movement.

Browser QA at 1440px, 1920px and 390px confirmed portrait 9:16 cards, four desktop cards, approximately 1.2 mobile cards, no horizontal page overflow, twelve entries and placement directly before #quotation. Manual advance and the resume state after manual interaction were verified. No failed loaded posters or console errors observed. Reduced-motion/tab/hover handling was code-reviewed; no automated browser preference emulation was performed.

Typecheck, lint, production build and diff whitespace checks passed. The first build was interrupted by the existing Next.js security recommendation; retry passed. Dependency upgrade remains separate from this feature.

## Files

- src/components/home/instagram-reels.tsx
- src/components/home/instagram-reels.module.css
- src/data/instagram-reels.ts
- src/app/page.tsx (insertion only)
- public/media/reels/ (twelve original covers)
- docs/instagram-reels.md

No deployment or push performed. Local preview: http://localhost:3101/#instagram-reels.
