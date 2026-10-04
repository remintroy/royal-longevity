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

The Google Photos-inspired layout uses closely spaced, wrapping justified rows.
Each photo's natural aspect ratio determines its width, preserving portrait and
landscape compositions. A flexible end spacer keeps the last row from stretching
across the page. Existing brand colours and 20px frame radii are retained.

Each photo opens a full-screen React Aria modal using contained imagery, a
localized title and counter, close and previous/next controls. Navigation wraps
at either end. Arrow keys and horizontal touch swipes follow the page direction.
Escape closes the viewer and focus returns to the opening thumbnail. React Aria
provides modal focus containment and background scroll locking. Images remain
optimized through Next Image. The only decorative motion is the grid hover
scale, disabled for reduced-motion users. No new dependencies are introduced.

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
