# Gallery

`/en/gallery` and `/ar/gallery` use the interactive `PhotoGallery`. The former
`/en/our-space` and `/ar/our-space` addresses permanently redirect to Gallery.
Shared navigation, footers and contextual links use the Gallery destination.

The 31 supplied photographs live in `public/assets/images/gallery/photos/` as
WebP files, with their original dimensions and orientation preserved. They were
converted at quality 84, reducing the combined file size from 67.3 MB to 5.9 MB.
The original root `gallery-images/` folder was removed after conversion checks.
Localized titles, descriptive alt text and dimensions are maintained in
`data/inner/gallery-photos.ts`. The homepage and salon keep their existing data.

The Google Photos-inspired layout uses closely spaced justified rows, informed by
[Immich's layout approach](https://github.com/immich-app/justified-layout).
`lib/justified-gallery.ts` groups photos in source order by proximity to a target
row height (220px on mobile, 330px on wider containers), then fits each complete
row to the available width. Each photo retains its natural aspect ratio. A sparse
final row is capped to avoid enlarged leftovers. A ResizeObserver recalculates
the layout when its container changes; server-rendered flex rows remain available
before hydration and without JavaScript. Existing brand colours are retained,
with 10px frame radii on mobile and 20px from 700px, 8px/12px gaps, and
direction-aware flow for Arabic.

Each photo opens a full-screen React Aria modal using contained imagery, a
localized title and counter, close and previous/next controls. Navigation wraps
at either end. Arrow keys and horizontal touch swipes follow the page direction.
Escape closes the viewer and focus returns to the opening thumbnail. React Aria
provides modal focus containment and background scroll locking. Images remain
optimized through Next Image, with measured thumbnail sizes. Thumbnails gently
zoom to 1.025 on hover with a 650ms GSAP `power2.out` ease in both directions,
clipped within their frame. Paired `scaleX`/`scaleY` `quickTo` tweens retarget from the
current scale on rapid pointer entry/exit. The scoped `useGSAP` hook cleans up
listeners and transforms; GSAP matchMedia enables motion only for fine hover
pointers without reduced-motion preferences. Thumbnails have no
text overlays; titles remain in the viewer and accessible button labels.
No new dependencies are introduced.

Grid and viewer images include tiny embedded WebP blur placeholders, so a preview
appears without a separate request. The viewer eagerly loads the selected image
and shows a localized loading status until it has loaded. Each selected photo has
its own loading state; failed requests show a localized error instead of an
indefinite spinner. The spinner respects reduced-motion preferences.

The full-screen viewer reuses the browser-selected, cached grid thumbnail while
its larger image loads. Both layers share a frame sized from the source width
and height, fitted to the available viewer area with container query units. The
full image fades over the preview; reduced-motion users receive an immediate
replacement. Grid images also expose their intrinsic width and height, while
aspect-ratio frames reserve their layout space before loading.
