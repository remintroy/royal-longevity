# Reviews

Reference: https://stayscape.framer.website/ and the supplied screenshots. Centred rating flanked by laurels, a short heading, four category scores separated by fine rules and nine review cards in three staggered columns. Each desktop column contains three independently sized cards, followed by a centred espresso “View All” pill with 64px top spacing (40px on mobile).

The localized View All action reads its destination from `viewAllHref`, currently `#` as requested for the design preview. Replace it with the future reviews page URL when that page is added.

The section follows the booking banner. Existing typography, white surfaces, espresso text, ivory avatar circles, gold eyebrow dot and 24px card radii preserve the site's design system. Existing laurel assets are reused. Initials stand in for customer portraits until approved imagery is supplied.

The preview is capped at three cards per column: below 700px, show one column (3 reviews); from 700px, show two columns (6 reviews); from 1000px, show three columns (9 reviews). Additional columns use CSS display hiding, so hidden reviews are also excluded from the accessibility tree. The View All pill remains visible at every size and will link to the full reviews page later. Category scores use a two-by-two grid below 700px and a single row above. Desktop side columns are offset by 32px and 20px. Cards grow with their content; Arabic uses logical borders/alignment and additional line height. The laurel composition preserves its physical direction, and numeric scores are isolated LTR.

All copy is in `data/reviews.ts`, including English and Arabic testimonials and date labels. Names, quotes, dates and scores are fictional placeholders, visibly identified as sample reviews. Replace with approved real reviews and verified aggregate/category scores before publication. No review structured data or external rating-platform attribution is added.

The section is a Server Component with no new dependency or animation. Reviews use figures, attributed blockquotes and machine-readable dates; screen readers receive score denominators and decorative symbols are hidden.
