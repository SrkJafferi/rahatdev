# Contact page completion

`/contact` implemented with the existing shared header/footer, brand typography, colors and motion system. Desktop hero is 450px high with genuine Rahat Heights II architecture, followed by three contact methods, an editorial office panel and enquiry form, the shared office/map section, official social links and a compact project CTA. Mobile fields stack with 16px input text. No backend, database, new form service, deployment or push.

## Functional status

- WhatsApp: existing client-confirmed `+92 331 6556191`, centralized helper, URL-encoded professional draft. Required name/phone/project/enquiry type/message and sharing acknowledgement validated. Optional email checked when present. No fake submission success and no automatic message sending or storage. Draft fallback link remains available if a popup is blocked, and clears when fields change.
- Project preselection: all three `/contact?project=...` routes tested; invalid values require an explicit selection. Categories derive from existing project/quotation data. Rental enquiry only appears for Rahat Heights, supported by the supplied inventory, with current availability subject to confirmation. Changing projects clears incompatible type/property values.
- Browser checks: empty required fields, invalid phone/email, valid Smart One floor-plan draft and correct destination/message, Rahat Heights rental availability, removal/reset on switching to Rahat Heights II, and final project enquiry modal opening/closing all verified. No message sent during testing.
- Social links: official Facebook and Instagram from centralized contact configuration; external links use safe new-tab attributes. Email action is a `mailto:` link to the existing configured inbox.
- Directions: exact client-provided address retained centrally and URL-encoded; link opened Google Maps and resolved to the Rahat Associates listing at that exact address.
- Map: real Google-generated Share → Embed iframe, lazy loading, responsive dimensions, descriptive title, no new API key. Obtained after an address query resolved the matching listing. Earlier abbreviated address-query embeds stayed blank in Chrome; the full Google-generated embed now visibly renders map tiles, the Rahat Associates label, address and interactive map controls. Coordinates/listing ID were supplied by Google, not invented. Client confirmation of the physical pin remains outstanding; the page keeps its address-based-map qualification. The shared office component is reused without changing its layout or its About-page text defaults.

## Contact details requiring confirmation

The central telephone field remains unset: Call Our Team clearly says confirmation pending and provides the verified WhatsApp fallback. Google Maps currently displays `+92 323 2741560`, but an unclaimed third-party listing alone is insufficient to replace the client-approved configuration. The existing `info@rahatassociates.com.pk` email is clearly marked as awaiting inbox confirmation. Shared footer/floating contact information remains as previously approved.

## QA and files

Browser visual checks at 1440×900, 1280×720, 1920×1080 and 390×844: no horizontal overflow or failed loaded images; hero remains within the 500px limit. Form, hero, office/map and social/CTA layouts inspected. No JavaScript or hydration errors. One existing shared-footer image LCP advisory appeared after hash navigation; footer visuals unchanged. Screenshots saved locally under `docs/screenshots/contact/` (ignored QA artifacts).

TypeScript, ESLint and production build pass. Installed Next.js reports a known security vulnerability; its build reminder required a retry. No dependency upgrade was performed within this page task.

Created: `src/app/contact/page.tsx`, `src/components/contact/contact-portfolio.tsx`, `contact-portfolio.module.css`, `contact-enquiry-form.tsx`, `src/lib/contact-enquiry.ts`, this report. Minimal shared integration: existing Contact navigation destination/active state, reusable office-section text props and centralized Google-generated embed URL. Existing lead modal, project data and WhatsApp helpers reused. Header/footer design, homepage and approved page layouts preserved. Development server remains on port 3101.
