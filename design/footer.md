# Footer

The landing-page footer sits outside the main landmark and owns its location section. Its map, layout and content retain their existing composition. The supplied screenshot guides a dark three-column composition: editorial heading and light booking pill, section navigation, then exploration and contact links. A copyright/back-to-top row sits above a wide rounded photographic brand panel.

Uses existing ink/ivory colours, typography, shared BookingCta and a dedicated generated espresso architectural background (`public/assets/images/footer-espresso.webp`). The matte wall and subdued warm edge lighting follow the ink/espresso palette; the existing ink overlay preserves contrast for both supplied white wordmarks. Footer copy and links are localized in data/footer.ts. Navigation targets localized inner pages; exploration includes all services, the salon, FAQ and the alternate language. Contact uses the existing WhatsApp destination without inventing email addresses, phone numbers or social profiles. The existing WhatsApp URL still requires the business recipient number before launch.

Supplied white PNG icon and English/Arabic wordmarks were copied to public/branding as trimmed derivatives to remove transparent source margins. Artwork colours and proportions are preserved; originals remain unchanged. The supplied Arabic white SVG appears to contain black paths, so the white PNG is used. The full logo has one localized accessible label, and background imagery is decorative.

The footer stacks on mobile, uses two navigation columns at tablet width, and expands to three columns on desktop. Text and links respect RTL; the brand composition preserves its physical arrangement. Links have 44px minimum targets and visible focus outlines. Back to top uses the existing anchor and site scrolling/reduced-motion behavior. The footer is a Server Component and adds no new dependency or animation.

## Inner pages

All supporting, category and service pages use `components/inner/footer.tsx` through `SiteFrame`. This compact dark footer replaces the repeated closing booking banner, full location embed and large photographic panel on inner pages. It uses the existing supplied white logo assets, theme tokens and reusable WhatsApp booking action.

Navigation is grouped into exploration and useful information, derived from the catalogue navigation. Localized copy lives in `data/inner/footer.ts`. Contact and location details remain accessible through the contact page; no unconfirmed address or opening hours are repeated in the footer. The alternate-language link retains the current page path, and exact current links expose `aria-current`. Links have 44px touch targets and inherit the frame’s visible keyboard focus treatment. Layout stacks on mobile and expands to three columns on desktop with logical alignment for Arabic.
