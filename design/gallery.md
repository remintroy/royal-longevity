# Gallery

The landing-page gallery uses six coordinated AI-generated editorial beauty and wellness photographs in the existing ivory, espresso and restrained gold palette. These are illustrative demo assets, not photographs of Royal Longevity premises, products or clients. Files are local WebP assets at `public/assets/images/gallery/brand-*.webp`; generation prompts are in `design/gallery-image-prompts.md`. English and Arabic titles and alternative text live in `data/gallery.ts`.

The responsive bento grid uses two columns on mobile: a full-width salon image, two pairs of supporting tiles, then a full-width hair image. At 1000px it becomes four columns and three equal rows: the salon spans two columns and two rows; skincare spans two rows; ritual and product details fill the remaining smaller cells; massage and hair each span two columns across the final row. Gaps are 12–16px, with existing 24px corners. Native grid flow mirrors in RTL without changing content order. Quiet ink caption panels provide consistent contrast over every image.

Images remain lazy-loaded through Next Image with responsive sizes. The existing GalleryMotion hooks, reduced-motion support, server rendering, heading and reusable booking CTA are preserved. No dependencies or client boundaries are added.

## Service-detail gallery

Every service-detail route includes `components/inner/service-gallery.tsx` immediately after its hero and before pricing. This is an inline, server-rendered photo mosaic: one large lead image and four smaller frames. At 700px and above, the lead occupies two columns and two rows of a four-column grid. On mobile, it spans both columns above two pairs of supporting images. Frames use a 4:3 baseline, 12–16px gaps and the existing 20–24px rounded corners. The desktop lead stretches to align precisely with the supporting rows. No carousel, automatic motion or additional client JavaScript is introduced.

The preview uses the existing illustrative service image plus four generic Lorem Picsum photographs, explicitly labelled as layout placeholders rather than actual premises photography. The photographs are local 1200×900 WebP assets in `public/assets/images/service-gallery/`, optimized and lazily loaded through Next Image. Sources: `https://picsum.photos/seed/royal-gallery-{1..4}/1200/900`.

`data/catalogue/service-gallery.ts` owns the preview images and English/Arabic copy. Replace the preview for an individual service using its optional `gallery` array of `{ src, alt: localized(en, ar) }` records, ordered lead-first. Five images produce the intended mosaic. Update the preview notice when approved premises photography is supplied. The shared heading, spacing, colour tokens and RTL document direction preserve the existing inner-page design; the landing-page gallery is unchanged.
