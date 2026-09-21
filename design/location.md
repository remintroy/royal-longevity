# Location

Uses the supplied Stayscape location screenshot as the layout reference: a continuous dark section after curated services, centred eyebrow and heading, three detail columns with fine dividers, and a large rounded map. Existing ink and ivory tokens, typography and spacing preserve the theme.

The map is a lazy-loaded Google Maps iframe with a muted dark CSS treatment. An external Open in Maps link remains available below the frame so map controls and attribution are unobstructed and visitors can open directions even if the embed is unavailable. No API client, key, dependency or client component is added.

Details stack on mobile with horizontal dividers and become three columns with logical vertical borders on larger screens. Arabic copy, map language and directional icons are localized. The iframe has a localized accessible title, and links have visible focus indicators.

The user approved an arbitrary Ajman location for the demo. Al Nuaimiya, Ajman is used as a neighbourhood-level map query, with a visible demo-location note. It is not the confirmed business address. Localized details and both map URLs are centralized in data/location.ts for replacement. Arrival enquiries use the shared homepage WhatsApp destination; no floor, parking or opening hours are invented.
