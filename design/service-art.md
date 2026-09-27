# Service background art

Every service-detail hero includes restrained line artwork in the existing gold token. The system extends the original lap-swimming study without adding colours, gradients, dependencies or continuous motion. Drawings are decorative illustrations, not supplied identity assets or claims about facilities.

## Motifs

`data/catalogue/service-art.ts` holds category defaults and specific service overrides:

- Fitness: nested strength arches; cardio uses running-track contours.
- Yoga: expanding breath lines; meditation uses still concentric rings.
- Pilates: balanced flowing lines; reformer Pilates uses carriage, rail and spring details.
- Swimming: the original lane-like water contours and elliptical wake.
- Spa: stacked stones; hammam uses steam lines.
- Facials: a restrained face profile and care contours.
- Makeup: fine brush-fan lines.
- Hair: flowing strands.
- Nails and pedicure: rounded nail contours and fine tips.

Related services intentionally share motifs to keep the visual system consistent. New services inherit their category's illustration; explicit overrides belong in the same data file.

## Composition and motion

The artwork sits inside the existing ivory hero as an isolated decorative layer behind content. On desktop it runs along the lower edge. On stacked mobile layouts it moves to the upper text area so the service photograph does not hide it. The rounded hero clips the art to prevent horizontal overflow. Opacity is 13% on small screens and 18% from 700px; RTL mirrors the illustration. The layer ignores pointer events and is hidden from assistive technology.

`ServiceArt` selects and renders the SVG on the server. `SwimmingArt` preserves the original water drawing. The small `ServiceArtMotion` client wrapper uses scoped GSAP transforms and opacity: a 6px settling movement over 650ms with a total 180ms stagger, then stops. Reduced motion leaves the illustration static, and hook cleanup reverts animation on navigation. Each service has a keyed animation boundary so moving between services starts a fresh entry. There is no looping, parallax, pointer tracking or drawing animation.

The optional `PageHero.backgroundArt` slot leaves category pages, other supporting pages and the landing page unchanged. The existing hero content and actions remain server-rendered.

## Editing animation settings

`data/catalogue/service-art-motion.ts` contains the typed shared animation defaults and optional per-service overrides. For example, add `"lap-swimming": { offsetY: 4, duration: 0.7 }` to `serviceArtAnimationOverrides` to tune that service without editing a component. Unspecified values inherit the defaults. Timing values are seconds; vertical displacement is pixels. Current values preserve the original animation.

The server selects the configuration and passes only the resolved settings into `ServiceArtMotion`. GSAP execution, cleanup, reduced-motion handling and the one-time-only behavior remain in the component. Changes to settings revert the previous animation before applying the new one.
