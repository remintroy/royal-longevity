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

## Directory and collections

The all-services directory uses six open sweeping contours on the dark hero, positioned toward the outer edge at 18% mobile / 28% larger-screen gold opacity. Each collection uses its category's existing line motif at 10% / 14% opacity, with swimming reusing the shared water paths. These compositions preserve the visual difference between the dark directory, open collection header and image-led service details.

`data/catalogue/catalogue-art.ts` owns directory geometry and animation settings and resolves collection artwork. `CatalogueArt` renders the server-side SVG through the existing reduced-motion-aware `ServiceArtMotion` wrapper. The wrapper accepts layout class overrides; existing service placement and timing remain unchanged. All artwork is clipped, decorative, non-interactive and mirrored for Arabic. No looping motion or new visual effects are introduced.

## Service-detail gallery and collection backgrounds

`ServiceSectionArt` pairs the supplied gold icon with the category's existing line illustration on the ivory gallery and “services in this collection” surfaces. The brand mark keeps its original proportions, orientation and gold treatment at 9% opacity. Line art uses the existing gold token at 20% opacity. Mobile uses a 112px mark and 440px illustration; larger screens expand these to 240px and 700px. Logical edge positioning follows Arabic layout while only the illustration mirrors.

The full-width decorative layer is clipped inside the solid portion of the existing elastic background, behind content and clear of the animated edges. It is non-interactive and hidden from assistive technology. The existing `ServiceArtMotion` wrapper accepts an optional one-time scroll reveal, using shared timing and reduced-motion handling. Only service-detail collection cards opt into the decoration; other uses of `ServiceCards` retain their existing appearance.

## Between-section art

Service details use two compact, centred chapter breaks in the whitespace: the category's line drawing after the gallery, then the supplied gold icon between the enquiry and collection. Fine gold rules connect each small illustration to the surrounding space. These form a visual sequence from treatment to brand, without adding copy or another content section. The breaks are 96px tall on mobile and 128px on larger screens, with negative block margins to preserve the page rhythm. Linework mirrors in RTL; the supplied icon never does. Both reuse the one-time reveal and remain static under reduced motion.

Two additional open contours now bookend that sequence: a rising line between the hero and gallery, and a settling line after the collection. These reuse the fine gold contour language without repeating the identity mark. Desktop placement alternates between logical start and end; mobile keeps both centred within the content width. Geometry lives in `interludeContours` and the existing animation boundary handles the entire composition as one restrained reveal.
