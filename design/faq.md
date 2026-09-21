# FAQ

Reference: https://stayscape.framer.website/ and the supplied FAQ screenshot. A two-column section follows reviews: a small eyebrow, editorial heading and shared booking CTA beside four outlined, pill-shaped accordion rows with circular photographs and downward arrows.

Uses the theme's warm ivory at 50% opacity over the white page for a lighter section background, white question pills, espresso text, gold eyebrow dot, border token and heading typography. Below 900px, the heading and CTA sit above the questions. Rows grow for wrapped questions; thumbnails scale from 52px to 80px at 700px. Logical padding and natural grid/flex direction mirror the layout for Arabic.

The expanded-card reference keeps the white, outlined question pill above a softly tinted answer area inside the rounded outer border. Answer typography is larger and aligns with the question on desktop.

The section and content remain server-rendered, with a small FaqAccordion client wrapper using GSAP and useGSAP context cleanup. Native details/summary disclosures remain functional without JavaScript. After hydration, clicks and native keyboard activation animate the answer height and arrow over 600ms with a gentle GSAP power3.out ease, pushing subsequent rows downward. The small text fade/translation uses the same ease over 500ms. Opening a question closes the previous answer. Interrupted tweens are killed and restarted from their current height so rapid clicks can reverse direction. Height returns to natural sizing on completion for responsive wrapping. Reduced-motion users receive immediate state changes. The summary exposes its requested expanded state during transitions and retains a visible focus outline; decorative images and arrows are hidden from screen readers.

English and Arabic copy live in data/faq.ts. Answers are draft content pending business approval and deliberately avoid specific cancellation fees, preparation requirements or unverified operational claims. Thumbnails reuse the existing gallery demo imagery; see design/gallery.md for source details. The shared BookingCta receives the homepage's existing WhatsApp destination.
