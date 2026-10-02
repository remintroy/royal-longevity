# Supporting pages

The supporting pages follow the supplied salon and pedicure references: split photographic heroes, four quiet care values, alternating editorial sections, treatment cards, galleries, appointment enquiries, FAQs and a closing booking action. They retain the current approved Figtree typography and ivory/espresso/gold tokens.

## Routes

Each route exists under both `/en` and `/ar`:

- `/services`, `/beauty`, `/wellness`
- `/services/pedicure`, `/services/hair`, `/services/skincare`, `/services/massage`, `/services/body-care`
- `/salon`, `/our-space`, `/about`, `/packages`, `/contact`, `/faq`

The landing page and its shared components are unchanged. Access the new pages directly; their header and footer connect the supporting routes. Connecting the homepage menu can be handled when editing the landing page is authorized.

## Content and assets

Content is separated by responsibility:

- `data/inner-pages.ts`: page introductions and editorial copy.
- `data/inner/services.ts`: treatment catalogue and discovery categories.
- `data/inner/packages.ts`: packages and their referenced services.
- `data/inner/ui.ts`: interface labels, navigation and care values.
- `data/inner/localization.ts`: `LocalizedText` and the shared `localized(en, ar)` helper.

Use Prettier to format content and components. Long translation calls wrap naturally without changing the bilingual data model. FAQs, location and photo descriptions consume existing shared data. Existing supplied logo assets are used in the appropriate language. Gallery photography remains illustrative, rather than verified premises photography. No new font or dependency is introduced.

Replace demo treatment descriptions, package contents, imagery and the demo Ajman address with confirmed business information before publication. Prices and durations are intentionally not asserted.

## Appointment enquiries

The small client component accepts a service and optional preferred date/time. It passes these preferences through the shared booking URL helper to WhatsApp. It does not expose available slots or confirm a booking. The team confirms appointments in conversation.

Set the existing `NEXT_PUBLIC_WHATSAPP_NUMBER` environment variable to the verified international business number (digits only). Without it, the existing generic WhatsApp sharing link is retained; it does not address the business directly.

## Implementation

Pages render statically through App Router `generateStaticParams`. The routes validate locales and content identifiers and provide localized page metadata. Supporting components use Tailwind utilities directly. Shared section headings live in `components/inner/section-heading.tsx`; editorial, service, package, gallery, FAQ and contact components have their own files. There is no page-specific stylesheet. Arabic follows logical layout properties and mirrored directional arrows. Native disclosure controls provide menus and FAQs without extra client JavaScript. Images use Next Image, responsive sizes and lazy loading below the hero.

## Flow-tree catalogue update

The supplied website flow tree now defines the inner-site structure. The original landing page, shared landing components, and landing data remain unchanged.

`data/catalogue/README.md` is the editing guide. Nine categories contain 37 separately addressable services. Category and service pages render from the typed catalogue; `page-layouts.ts` controls the section sequence on supporting pages. The old `data/inner/services.ts` catalogue has been replaced by category-specific files under `data/catalogue/services/`.

Inner navigation follows Home, About, Services, Memberships, Appointments, Our Spaces, Gallery and Contact. Packages & Offers, FAQ, Terms, Privacy, Careers and Blog remain reachable through inner navigation/footer links. Existing beauty, wellness, salon and five original service URLs remain valid.

Memberships compare illustrative plans and send contextual WhatsApp enquiries. Appointment options are grouped by category and exclude membership-only services. The pool supports both paths. The diagram's sign-up/payment/confirmation stages remain operational discussions with the team; no backend or payment system is introduced. Terms, Privacy, Careers and Blog await supplied content and are marked noindex.

Each service has `published` and `homepageOrder`. The homepage selection helper is ready for future use, but is deliberately not connected to the existing landing page. Images remain illustrative; categories without relevant supplied imagery use category icons.

## Catalogue hero hierarchy

The service discovery routes use three distinct visual levels:

- `/services`: a dark ink directory hero with a large editorial title and direct links to all nine collections.
- `/services/categories/[category]`: a compact, open editorial header between fine rules, with a live published-service count, access label and an anchor to the collection's service list. It has no large hero image, so it reads as a browsing page.
- `/services/[slug]`: the ivory image-led hero, service artwork and appointment actions remain, with an explicit selected-service label.

All three levels use `CatalogueBreadcrumbs`: Home → All services → Collection → Service, as applicable. The last item is non-interactive and marked `aria-current="page"`. Ancestor links have touch-sized targets; wrapping and direction-aware separators support mobile and Arabic. `data/catalogue/hero.ts` owns bilingual hero labels and directory copy. Directory and collection presentation is in `components/inner/catalogue-heroes.tsx`. Other supporting-page heroes and the landing page retain their existing presentation.

## Explore more after FAQs

Collection and individual service pages show an eight-card discovery carousel after the FAQ and before the footer. This keeps the selected collection or service, its details and booking options ahead of alternative destinations. `data/catalogue/explore-more.ts` selects the next four nonempty collections in catalogue order, wrapping at the end and excluding the current collection, and pairs each with its first published service. No popularity or recommendation claims are inferred.

`ExploreMore` renders linked cards on the server using existing imagery or category icons. `ExploreCarousel` provides native horizontal scrolling, snap positions, touch swiping and 48px previous/next buttons. It accounts for RTL scroll direction, disables controls at the ends and respects reduced motion. Cards show a partial next card on mobile and four cards on desktop. The scrollbar is hidden while native scrolling, touch swiping and arrow controls remain available. Images are lazy-loaded; no new dependency or autoplay is introduced. Only the small scroll wrapper is a Client Component.

The Explore more section sits on a full-width soft ivory band with fine top and bottom borders, separating discovery from the preceding FAQ. The decorative layer uses the site frame’s container width (`100cqw`) so the content stays aligned without viewport-scrollbar overflow; logical positioning handles RTL.

## Contact enquiries

The contact page uses a compact introduction and a mobile-first enquiry form beside direct contact and location details. On mobile, a Maps link remains available before the form. Name is optional; topic defaults to a general enquiry; a nonblank message is required. English and Arabic copy lives in `data/inner/contact.ts`.

The form prepares a message through the shared booking URL helper and opens WhatsApp for review and sending. It never claims that an enquiry was sent or an appointment confirmed. An accessible status and fallback link remain available if the new tab is blocked; editing the form clears the previous prepared link. No phone or email is collected because the conversation continues through WhatsApp. Location continues to use shared location data; unverified hours are not invented.

### Simplified mobile contact layout

The contact page now keeps just two main sections: an unboxed enquiry form followed by location details and an embedded Google map. These stack on mobile and become equal columns at 1024px. The header provides direct chat and an in-page “Find us” shortcut. The map is lazy-loaded, has a localized accessible title, reserves 288px height on mobile (384px from 640px), and retains an external Maps link with unobstructed controls and attribution. It uses the shared coordinates and Arabic map language.

The contact hero is text-only, without decorative artwork. Redundant enquiry introductions, contact cards and the separate FAQ prompt have been removed from this page.

The contact introduction uses the same rounded ivory card surface as the shared page heroes, with 20px mobile padding expanding to 48px on desktop. Its compact content retains the mobile-first contact flow.

## About page

About uses the shared text-led ivory `PageHero` through the intro layout. `AboutContent` follows with the existing brand story, one illustrative detail photograph, the four shared care values, and a quiet closing panel linking to services and contact. Copy is sourced from `data/inner-pages.ts`, `data/inner/ui.ts` and `data/inner/about.ts`; it introduces no company history or credential claims.

The story reads before its image on mobile, values stack into a readable list before expanding to two and four columns, and the closing actions wrap beneath the copy. English and Arabic use the same server-rendered structure and logical layout properties. Existing shared colours, typography, rounded frames and action components are reused. Other editorial routes retain their existing layouts.
