# Booking banner

Reference: https://stayscape.framer.website/ — the panoramic special-offer section with centred copy, rounded image frame and an inset-icon pill action.

Placed after Highlights. Uses the existing ivory and espresso palette, site typography, 24–28px corners and shared booking CTA with an inverted colour treatment. A solid espresso scrim keeps text readable over the existing demo ritual photograph. No new dependencies or animation are introduced.

The frame is at least 400px tall on mobile, 480px on tablet and 530px on desktop, with flexible height for wrapping and text zoom. Content is server-rendered; the shared CTA retains its RTL and reduced-motion behaviour. The image is lazy-loaded through Next Image with responsive sizes.

English and Arabic demo copy live in `data/booking-banner.ts`. No promotional discount is asserted; replace copy with an approved offer when available. Image provenance is documented in `design/gallery.md`; it does not depict Royal Longevity premises. Booking uses the same destination as the hero, which currently has no business phone number configured.
