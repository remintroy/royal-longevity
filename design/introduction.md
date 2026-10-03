# Homepage introduction

The section follows the supplied Stayscape introduction reference:
https://stayscape.framer.website/#introduction

Edge-to-edge viewport-width photography without outer rounding, an editorial heading at the start, and a three-row
statistics panel at the bottom end. Mobile keeps the heading and panel in normal
flow; Arabic mirrors their alignment. Colours and geometry use the existing
Royal Longevity tokens.

The reference source includes a 20px fade-up and count-up figures. The local GSAP
implementation triggers reveals and counters once on viewport entry, with a
small panel reveal. An oversized image layer moves vertically with scroll to
reproduce the reference parallax without exposing empty edges. The section is
at least one viewport tall and grows as needed for its content. Reduced-motion
users see the final content immediately, with a stationary image.
Content is server-rendered; the client wrapper controls animation only.

## Implementation

- `components/introduction.tsx` owns the server-rendered layout and Tailwind
  styling, including the shared statistic row and responsive/RTL variants.
- `components/ui/introduction-motion.tsx` owns GSAP through a scoped `useGSAP`
  hook. Separate functions handle parallax, eyebrow entry, and a single panel
  timeline shared by the statistics. `gsap.matchMedia` handles reduced motion
  and cleanup, including restoration of the counter text.
- Parallax travels from -2% to +2% of the image layer's height. The layer
  extends 3% above and below the section to keep both edges covered without
  heavily cropping the room. Reduced motion removes this overscan and movement.
- `getImageProps` and a native `picture` select mobile (below 700px), tablet
  (700–1199px), and desktop (1200px+) compositions. Only the selected source is
  requested; Next.js supplies responsive optimized sizes.
- Images align to the top to preserve wall signage. Mobile favours the reception
  side slightly when cropping. Desktop headings occupy the left furniture side
  in both languages, with Arabic text retaining RTL alignment, so the signage
  on the right stays visible. The statistics panel retains its locale alignment.

## Demo content

Copy and sample figures live in `data/introduction.ts` and require business
confirmation. They are not verified Royal Longevity statistics.

The current images are generated demo interiors, not photographs of Royal
Longevity premises. The existing `introduction-lounge.png` was the visual reference.
The original remains unchanged. Final optimized assets:

- `public/assets/images/introduction-lounge-mobile.webp` — 940 × 1672.
- `public/assets/images/introduction-lounge-tablet.webp` — 1122 × 1402.
- `public/assets/images/introduction-lounge-desktop.webp` — 1672 × 941.

Generated with the built-in image generation tool. The supplied Beauty vertical
PNG from `branding/ROYAL LONGEVITY LOGO BOOK/ROYAL LONGEVITY VERTICAL LOGO/ROYAL LONGEVITY BEAUTY LOGO/`
was provided as the branding reference for the final image edits. See
`introduction-image-prompts.md` for the final edit prompts.

Replace it with approved Royal Longevity photography before publication.

The locale proxy excludes `/assets/` and static file requests so images are
served directly rather than redirected into `/en` or `/ar` routes.

The main heading uses the shared `RevealHeading` word-by-word blur-and-rise
animation on viewport entry, with a 100ms stagger, reduced blur on mobile, and
no motion when reduced motion is requested. Words stay intact for Arabic shaping,
authored whitespace and line breaks are preserved, and screen readers receive
the complete heading once.
