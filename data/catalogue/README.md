# Royal Longevity catalogue

This is the inner website's content source, transcribed from the supplied website flow tree. The landing page and its data are intentionally unchanged.

## Where to edit

| File                     | Responsibility                                                               |
| ------------------------ | ---------------------------------------------------------------------------- |
| `categories.ts`          | Nine categories, their order, names, descriptions and default access model   |
| `services/<category>.ts` | Individual services, grouped into one file per category                      |
| `experience.ts`          | Example membership plans, pool inclusion, bilingual labels and enquiry steps |
| `navigation.ts`          | Main and supporting navigation for inner pages only                          |
| `page-layouts.ts`        | Ordered sections rendered on each inner page                                 |
| `supporting.ts`          | Awaiting-content Terms, Privacy, Careers and Blog destinations               |
| `questions.ts`           | Membership, pool and appointment FAQs                                        |
| `../inner-pages.ts`      | Page introductions and editorial copy                                        |
| `../inner/packages.ts`   | Service packages, linked by service slug                                     |

Each service has a stable `slug`, a `category` ID, English/Arabic `title` and `description`, an `access` model (`membership`, `appointment`, or `both`), an optional gallery `image`, `published`, and `homepageOrder`. Service order within its file is its display order. Do not change an existing slug without planning a redirect; package references and shared links rely on it.

Use `localized("English", "العربية")` for every visitor-facing content field. Russian can be added by extending the shared localization and language types in a later stage.

## Select services for the homepage

In the service's category file, set:

```ts
published: true,
homepageOrder: 10,
```

Use `20`, `30`, etc. for later positions. Set `homepageOrder: null` to remove it from the selection. `getHomepageServices()` returns only published, selected services in ascending order without modifying the source array. Equal positions use slug order.

**The current landing page does not consume this selector.** These settings prepare the selection; displaying it on the landing page requires a separately authorized change to that page. No homepage content is changed by this work.

## Add, hide or move a service

1. Add a typed record to the appropriate `services/<category>.ts` file with a unique slug and complete translations.
2. Match `access` to the category. Pool services may use either route; membership-only pool access is explicitly marked.
3. Use an existing gallery image ID when it is appropriate, or omit `image` to show the category icon.
4. Set `published: false` to hide a service from discovery, route generation, enquiries and homepage selection. Remove it from any package references at the same time.
5. Rebuild the static site after content edits. The category cards, detail routes and enquiry groups are generated from this catalogue.

The compatibility URLs `/services/hair`, `/services/skincare`, `/services/pedicure`, `/services/massage` and `/services/body-care` are retained. Categories live at `/[lang]/services/categories/[category]`; individual services live at `/[lang]/services/[slug]`.

## Current operation

Memberships are illustrative comparisons with contextual WhatsApp enquiries. Appointment date/time inputs express preferences, not available slots. Pool access offers membership and separate-session paths. No payment, sign-up, booking confirmation, customer storage or Altegio integration is implemented.

Plan prices, duration, schedules and inclusions require confirmation. Legal pages are explicitly awaiting approved content and are marked `noindex`. Careers and Blog have honest empty states, without invented vacancies or articles. New fitness categories use existing category icons rather than unrelated premises imagery.

## Validate content changes

```sh
npx --yes tsx --test tests/catalogue.test.ts
npx tsc --noEmit
npm run build
```

The catalogue checks cover category/service integrity, navigation targets, package and membership references, homepage selection and existing service URLs. `tsx` is a temporary runner, not a project dependency.
