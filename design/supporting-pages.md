# Supporting pages

The supporting pages follow the supplied salon and pedicure references: split photographic heroes, four quiet care values, alternating editorial sections, treatment cards, galleries, appointment enquiries, FAQs and a closing booking action. They retain the current approved Figtree typography and ivory/espresso/gold tokens.

## Routes

Each route exists under both `/en` and `/ar`:

- `/services`, `/beauty`, `/wellness`
- `/services/pedicure`, `/services/hair`, `/services/skincare`, `/services/massage`, `/services/body-care`
- `/salon`, `/our-space`, `/about`, `/packages`, `/contact`, `/faq`

The landing page and its shared components are unchanged. Access the new pages directly; their header and footer connect the supporting routes. Connecting the homepage menu can be handled when editing the landing page is authorized.

## Content and assets

`data/inner-pages.ts` contains the typed bilingual demo catalogue, packages, navigation and page copy. FAQs, location and photo descriptions consume existing shared data. Existing supplied logo assets are used in the appropriate language. Gallery photography remains illustrative, rather than verified premises photography. No new font or dependency is introduced.

Replace demo treatment descriptions, package contents, imagery and the demo Ajman address with confirmed business information before publication. Prices and durations are intentionally not asserted.

## Appointment enquiries

The small client component accepts a service and optional preferred date/time. It passes these preferences through the shared booking URL helper to WhatsApp. It does not expose available slots or confirm a booking. The team confirms appointments in conversation.

Set the existing `NEXT_PUBLIC_WHATSAPP_NUMBER` environment variable to the verified international business number (digits only). Without it, the existing generic WhatsApp sharing link is retained; it does not address the business directly.

## Implementation

Pages render statically through App Router `generateStaticParams`. The routes validate locales and content identifiers and provide localized page metadata. CSS Modules scope all new styles to supporting pages. Arabic follows logical layout properties and mirrored directional arrows. Native disclosure controls provide menus and FAQs without extra client JavaScript. Images use Next Image, responsive sizes and lazy loading below the hero.
