# Our spaces gallery

Only `/en/our-space` and `/ar/our-space` use the interactive `SpaceGallery`.
The homepage, legacy gallery route and salon gallery retain their existing layouts.

The six existing localized images come from `getGalleryContent`. A compact
photo grid uses two columns on mobile with full-width first/last photographs.
Desktop uses two balanced rows with 5/3/4 and 3/4/5 column spans. Existing brand
colours and 20px frame radii are retained. The illustrative-image notice stays
visible; these images do not represent verified premises photography.

Each photo opens a full-screen React Aria modal using contained imagery, a
localized title and counter, close and previous/next controls. Navigation wraps
at either end. Arrow keys and horizontal touch swipes follow the page direction.
Escape closes the viewer and focus returns to the opening thumbnail. React Aria
provides modal focus containment and background scroll locking. Images remain
optimized through Next Image. The only decorative motion is the grid hover
scale, disabled for reduced-motion users. No new dependencies are introduced.
