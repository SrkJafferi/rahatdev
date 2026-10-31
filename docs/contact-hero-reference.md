# Contact hero reference update

Follow-up request: match `Rahat Associates Contact Hero Banner.png` and omit the breadcrumb. This supersedes the earlier architectural hero and 450px height. Header/footer components and the rest of the contact page are unchanged.

The new hero uses the supplied white/ice-blue 3D contact-art composition, live accessible HTML title and copy, a 697px hero at the 1672px reference width, and three overlapping live contact-method cards. Text tracking, line heights, artwork offset, icon sizes, card spacing and surface treatment were compared at the reference viewport. Breadcrumb markup is removed entirely. Existing telephone/inbox confirmation states, WhatsApp URL and email link remain intact.

Asset: `public/media/contact-connect-hero.webp` (1942×809, 65,222 bytes). Built-in imagegen edit mode used, then ordinary WebP encoding. Input: `C:/Users/Shahrukh/Downloads/Rahat Associates Contact Hero Banner.png`. Original generated PNG retained in the Codex generated-images directory.

## Final image prompt

Edit target: attached contact page mockup. Produce ONLY the clean background artwork for use behind a real HTML website. Preserve the existing pale ice-blue/white sweeping circular arcs, thin blue/green orbital lines and dots, and the EXACT arrangement/style of the right-side frosted glass 3D panels with blue map location pin, blue telephone, green chat bubble, blue envelope, and blurred green leaves in bottom-right. Remove ALL website UI and ALL typography: remove top logo, header menu, social icons and blue enquiry button; remove breadcrumb; remove eyebrow, headline and paragraph on the left; remove all THREE bottom contact cards including their text, circular icons, borders and shadows. Seamlessly reconstruct the same very pale white/blue background behind removed UI. Keep left 45% mostly white and empty for HTML heading overlay. Preserve the right-side 3D artwork composition with its map panel and contact symbols closely, no redesign. Output a wide 1672 by 697 composition corresponding to the TOP HERO region of the reference; omit the bottom area below y=697, no cards. No letters, words, logos, watermark, buttons or additional objects. This is a precise UI-removal edit, not a new mockup.

## Validation

Desktop reference 1672×941, standard desktop and mobile inspected for typography, artwork, card layout and horizontal overflow. No breadcrumb remains. Contact actions preserve the configured destinations. TypeScript, ESLint and production build pass; the existing installed-Next security reminder requires a build retry. Screenshot: `docs/screenshots/contact/hero-reference-match.png`. Development server kept running on 3101. No deployment or push.

## Enquiry panel follow-up

The two-panel enquiry area now follows Modern Real Estate Contact Form.png: balanced columns, pale architectural left panel, feature icon tiles, icon inputs and refined form surface. Existing Involve/Playfair heading families and validation/WhatsApp logic retained. Official repository logo reused rather than introducing the mockup logo. Hero typography and spacing now use the About page values and breakpoints, with breadcrumb still omitted.

Built-in imagegen edited the supplied form mockup to extract only its left background, removing all text/UI/right form and retaining pale sky, translucent geometric tower, green orbit and lower architectural building/foliage. Saved asset: public/media/contact-office-panel.webp. This is illustrative artwork, not a project photograph.

## Latest conversation reference

Hero now follows Lets Start the Right Conversation.png: decorative pale blue topographic-map artwork, four live floating contact cards, Islamabad label, no breadcrumb and About-matched heading/copy/eyebrow rhythm. Replaces the earlier glass-icon artwork and three-card row. Approved enquiry form and shared header/footer retained. Call card uses configured telephone when available, otherwise anchors to the form with confirmation-pending text; WhatsApp uses verified configured number; email remains clearly pending confirmation; office card anchors to the existing office section.

Asset public/media/contact-conversation-map.webp. Built-in imagegen edit prompt: remove all header/logo/menu/buttons, breadcrumb, eyebrow/headline/paragraph/signature, four floating white cards and Islamabad label; preserve pale blue/white right-half 3D topographic map, orbital arcs/dots, glossy blue large pin, small green/blue pins, terrain/road lines and lower-left ribbon; left 43% near-white for HTML; no text/UI/watermark; decorative, not real geography.

Height refinement: Contact now uses the exact About hero height rules: min-height 620px and min(780px,77vh); >=1600px min(800px,79vh); short desktop min-height580px/81vh; tablet min-height700px/auto; phone min-height760px/auto. At 1440x900 the Contact hero measures 693px, matching About. Mobile cards use a compact two-column layout within that hero rhythm.
