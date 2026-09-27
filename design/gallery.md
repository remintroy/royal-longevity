# Gallery

Reference: https://stayscape.framer.website/ — centered introduction and pill booking action, staggered three-column photography, larger center frame, rounded corners, and numbered captions. Adapted for Royal Longevity with existing ivory, espresso and gold tokens.

The homepage gallery follows Experience. Six demo beauty/wellness images are served locally as WebP and lazily optimized with Next Image. Replace these with approved business photography before publication; they do not depict Royal Longevity premises. Copy and localized alternative text live in `data/gallery.ts`.

Mobile uses one column; tablet uses paired images; desktop (1000px+) uses three columns in a 1:1.35:1 ratio, with 120px and 158px side offsets. Logical alignment mirrors the composition in Arabic. White numbered captions sit directly over the lower image edge with 16px padding, matching the supplied reference. A localized dark gradient scrim preserves readability without a hard caption panel. The center and upper end-column images are square on desktop; the second start-column image is portrait.

GSAP settles each photograph from scale 1.12 to 1 over 700ms with power3.out easing when the frame enters view. Frames and captions stay stationary. The heading retains its 650ms fade and translation. Reduced motion disables these animations. Content is server-rendered and visible without JavaScript. The shared booking CTA uses the existing WhatsApp destination.

Demo image sources (images.unsplash.com/photo-ID):

- salon: 1560066984-138dadb4c035
- ritual: 1540555700478-4be289fbecef
- skincare: 1570172619644-dfd03ed5d881
- details: 1608571423902-eed4a5ad8108
- massage: 1544161515-4ab6ce6db874
- hair: 1521590832167-7bcbfaa6381f

## Service-detail gallery

Every service-detail route includes `components/inner/service-gallery.tsx` immediately after its hero and before pricing. This is an inline, server-rendered photo mosaic: one large lead image and four smaller frames. At 700px and above, the lead occupies two columns and two rows of a four-column grid. On mobile, it spans both columns above two pairs of supporting images. Frames use a 4:3 baseline, 12–16px gaps and the existing 20–24px rounded corners. The desktop lead stretches to align precisely with the supporting rows. No carousel, automatic motion or additional client JavaScript is introduced.

The preview uses the existing illustrative service image plus four generic Lorem Picsum photographs, explicitly labelled as layout placeholders rather than actual premises photography. The photographs are local 1200×900 WebP assets in `public/assets/images/service-gallery/`, optimized and lazily loaded through Next Image. Sources: `https://picsum.photos/seed/royal-gallery-{1..4}/1200/900`.

`data/catalogue/service-gallery.ts` owns the preview images and English/Arabic copy. Replace the preview for an individual service using its optional `gallery` array of `{ src, alt: localized(en, ar) }` records, ordered lead-first. Five images produce the intended mosaic. Update the preview notice when approved premises photography is supplied. The shared heading, spacing, colour tokens and RTL document direction preserve the existing inner-page design; the landing-page gallery is unchanged.
