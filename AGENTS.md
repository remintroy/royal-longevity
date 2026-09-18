<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# AGENT.md

## 1. Project Overview

This project is a premium digital experience website for a luxury Dubai-based business offering salon, skincare, wellness, spa, beauty, and treatment services.

The website must communicate a high-end, refined, trustworthy, and modern brand experience while remaining fast, accessible, maintainable, and easy to extend.

The current phase is intentionally focused on the **frontend website experience and architecture**.

The project is being built as a static/data-driven Next.js application now, while the implementation must remain compatible with future integrations such as a CMS and Altegio.

---

## 2. Current Phase Scope

### In Scope

The current phase includes:

- Website UI/UX implementation
- Next.js frontend development
- Mobile-first responsive design
- Premium visual design implementation
- English language support
- Arabic language support
- RTL support
- Structured local static data
- Reusable UI components
- Service discovery and service detail experiences
- Packages
- About / brand experience
- Contact / location experience
- WhatsApp-based calls to action
- Basic SEO foundations
- Accessibility foundations
- Performance foundations
- Maintainable and extensible frontend architecture

### Out of Scope

The agent must **not** implement the following unless explicitly requested in a later approved stage:

- CMS
- Custom admin panel
- Database
- Express backend
- MongoDB or another application database
- Custom booking system
- Custom availability/calendar engine
- Authentication
- Customer management system
- CRM
- Payment processing
- Full Altegio API integration
- Server-side business logic unrelated to the approved frontend requirements

The current application is a frontend-first website.

---

## 3. Static Data Architecture

The current phase must use **structured TypeScript data files** rather than hardcoded content inside UI components.

Examples of content that should be data-driven include:

- Services
- Service categories
- Packages
- Products
- Team members
- Testimonials
- FAQs
- Navigation content
- Page content
- Other repeated or structured business content

Components must consume structured data instead of embedding business content directly into JSX/TSX wherever practical.

### Example principle

Do not build:

```tsx
<h1>Signature Facial</h1>
<p>Experience our...</p>
```

inside a reusable service component.

Prefer:

```tsx
<ServiceCard service={service} />
```

with the content supplied by structured data.

---

## 4. Future CMS Compatibility

The current project does **not** contain a CMS.

However, the frontend must not become tightly coupled to the current TypeScript data source.

The intended evolution is:

```text
Current

UI
 ↓
Structured TypeScript Data
```

and later:

```text
Future

UI
 ↓
Content/Data Layer
 ↓
CMS
```

The UI should therefore consume well-defined data structures and interfaces rather than depending on implementation details of where the data originates.

Do not introduce CMS-specific assumptions into the current frontend.

Do not build a fake CMS or unnecessary abstraction solely for the sake of future migration.

The architecture should be **CMS-compatible, not CMS-driven**.

---

## 5. Altegio Integration Boundary

Altegio is planned as the future operational/booking platform.

The current phase must **not implement Altegio integration**.

Do not:

- Call Altegio APIs
- Store Altegio credentials
- Build an Altegio API client
- Implement Altegio availability logic
- Recreate Altegio booking logic
- Build an Altegio synchronization system
- Couple UI components directly to Altegio

The current booking CTA behavior is WhatsApp-based.

The UI should nevertheless be designed so that booking behavior can later be replaced or extended without redesigning the entire application.

For example, a reusable booking action should conceptually represent:

```text
Book Appointment
```

rather than exposing implementation-specific behavior throughout the UI.

Current:

```text
Book Appointment
        ↓
WhatsApp
```

Future:

```text
Book Appointment
        ↓
Altegio
```

The current phase should prepare for this transition without implementing it prematurely.

---

## 6. WhatsApp CTA

WhatsApp is the primary appointment/contact mechanism for the current phase.

Booking and enquiry CTAs should be reusable and consistent throughout the website.

Where appropriate, the CTA should retain contextual information such as the selected service so that the customer can clearly communicate their intent through WhatsApp.

Do not create different booking behaviors for different pages unless the requirement explicitly calls for it.

The visual language of the CTA should remain brand-consistent.

---

## 7. Mobile-First Development

The website must be designed and developed **mobile-first**.

Mobile is not a reduced version of desktop.

Every major experience must be intentionally considered for smaller screens before expanding to tablet and desktop layouts.

The agent must consider:

- Touch targets
- Readability
- Navigation
- Content hierarchy
- Image cropping
- CTA placement
- Forms
- Service discovery
- Arabic RTL behavior
- Performance on mobile networks
- Vertical spacing
- Sticky/fixed elements
- Interaction patterns

Desktop layouts should be an intentional extension of the mobile experience rather than the source of truth.

---

## 8. Premium Design Direction

The website represents a luxury/premium business.

The design must communicate:

- Elegance
- Restraint
- Confidence
- Sophistication
- Cleanliness
- Exclusivity
- Trust
- High attention to detail

The implementation should favor:

- Generous whitespace
- Strong typography
- High-quality imagery
- Clear hierarchy
- Refined spacing
- Subtle interaction
- Consistent alignment
- Clean composition

Avoid design patterns that make the website feel generic, crowded, overly promotional, or visually noisy.

---

## 9. Brand Consistency

The brand colors and branding have already been selected.

The agent must **not introduce new brand colors, fonts, visual styles, gradients, shadows, or design patterns without explicit approval**.

Do not:

- Invent additional primary brand colors
- Replace approved fonts
- Introduce unrelated visual styles
- Add decorative gradients without approval
- Add excessive shadows
- Introduce arbitrary component styling
- Mix unrelated design systems

When a design decision is not specified, prefer the simplest solution that remains consistent with the existing brand system.

If a decision would materially change the visual identity, stop and ask for approval.

---

## 10. Animation Philosophy

Animations must be minimal, intentional, and refined.

Animation exists to improve:

- Perceived quality
- Spatial understanding
- Navigation
- Interaction feedback
- Content transitions

Animation must not become the primary visual feature of the website.

Prefer:

- Subtle fades
- Small translations
- Gentle image scaling
- Smooth hover states
- Refined page transitions
- Carefully timed reveals

Avoid:

- Excessive parallax
- Bouncing elements
- Aggressive motion
- Constant floating animations
- Excessive cursor effects
- Distracting scroll effects
- Animation applied to everything

Animations must also respect reduced-motion preferences.

---

## 11. Multilingual Requirement

The website currently supports:

- English
- Arabic

Russian is planned for a future phase.

The architecture must therefore support the addition of Russian without requiring a fundamental rewrite.

English and Arabic must be treated as first-class languages.

Do not build the English version first and retrofit Arabic afterward.

All relevant UI and content structures must be capable of supporting localization.

---

## 12. Arabic and RTL

Arabic requires proper RTL support.

RTL must be considered during component and layout implementation rather than added as a final styling step.

The agent must verify RTL behavior for:

- Navigation
- Menus
- Cards
- Forms
- Buttons
- Icons
- Directional indicators
- Breadcrumbs
- Sliders
- Modals
- Booking actions
- Mobile layouts
- Typography
- Spacing
- Alignment
- Animations

Prefer CSS logical properties and layout systems that naturally support both directions where practical.

Do not assume that applying `direction: rtl` alone constitutes complete RTL support.

---

## 13. Service and Product Content

The business offers a large number of services and products.

The website must therefore prioritize **structured and scalable content presentation**.

Do not solve a large catalog by placing every item directly on a single page.

Services should be organized into meaningful categories and presented through clear discovery patterns.

The UI should support future expansion without requiring structural redesign whenever a new service or product is added.

Repeated content must be data-driven.

Service and product pages should follow consistent templates while allowing the content model to grow as requirements become clearer.

---

## 14. Separation of Content and Presentation

UI components are responsible for presentation and interaction.

Data structures are responsible for content.

Do not mix large amounts of business content directly into reusable components.

Avoid duplicated content across multiple components when it can be represented once in structured data.

If the same service, package, product, or other entity appears in multiple locations, it should have a consistent underlying data representation.

---

## 15. Code Quality

Code must prioritize:

- Readability
- Maintainability
- Type safety
- Reusability
- Predictability
- Clear responsibility boundaries
- Minimal duplication

Do not introduce abstractions merely to make the architecture appear sophisticated.

Prefer simple, understandable solutions over unnecessary patterns.

Avoid premature optimization and premature architectural complexity.

Code should be easy for another developer to understand without needing extensive explanation.

---

## 16. TypeScript

TypeScript must be used consistently.

Avoid `any` unless there is a documented and justified reason.

Prefer explicit, meaningful types for:

- Services
- Products
- Packages
- Localized content
- Component props
- Configuration
- External integration boundaries

Types should represent actual domain concepts rather than generic objects.

Do not use overly broad types simply to make implementation faster.

---

## 17. Component Reusability

Reusable components should be created when a pattern is genuinely repeated or represents a meaningful domain/UI concept.

Examples include:

- Service cards
- Package cards
- Section headers
- CTA buttons
- Navigation
- Language switchers
- Gallery items
- Testimonials
- Booking actions

Do not create a separate component for every tiny piece of markup without a clear reason.

Avoid both extremes:

```text
One giant component
```

and:

```text
Hundreds of meaningless micro-components
```

Components should have clear responsibilities.

---

## 18. Agent Decision Rules

The agent has limited autonomy.

The agent may independently make **minor implementation decisions** when they do not materially affect:

- Architecture
- Visual identity
- Data model
- Dependencies
- Scope
- User experience principles

The agent must ask for approval before making a material decision in any of those areas.

Examples requiring approval:

- Adding a new framework/library
- Changing the architectural approach
- Introducing backend functionality
- Changing the data model significantly
- Adding a new major page or feature
- Changing the approved brand system
- Introducing a new design language
- Implementing Altegio
- Introducing a CMS
- Changing the project scope

When requirements are ambiguous but the decision is minor, choose the simplest implementation consistent with this document and continue.

---

## 19. Scope Discipline

Do not add features simply because they may be useful in the future.

The current project must remain focused on creating a high-quality frontend foundation.

Future requirements should influence architecture only where doing so is inexpensive and clearly beneficial.

Do not build speculative systems.

The principle is:

> **Prepare for the future without implementing the future prematurely.**

---

## 20. Current Stage Definition of Done

The current frontend stage is considered complete when the following outcomes are achieved:

### Core Website

- Mobile-first homepage
- Services listing
- Service detail page
- Packages
- About / brand experience
- Contact / location experience

### Localization

- English support
- Arabic support
- Proper RTL support
- Architecture ready for future Russian support

### Architecture

- Structured TypeScript data
- Reusable components
- UI separated from content/data
- No CMS dependency
- No Altegio dependency
- No unnecessary backend

### Conversion

- Consistent booking CTAs
- WhatsApp appointment/enquiry flow
- Service context retained where appropriate

### Quality

- Responsive layouts
- Premium visual consistency
- Minimal/refined animation
- Accessibility foundations
- SEO foundations
- Performance foundations
- Clean and maintainable TypeScript

---

## 21. Future Stages

The current implementation must leave room for later stages, including but not limited to:

```text
Current
  ↓
Static Next.js Website
  ↓
Altegio Booking Integration
  ↓
CMS Integration
  ↓
Live Operational Data
  ↓
Advanced Booking / Business Integrations
  ↓
Additional Languages
```

The exact implementation of these stages must be separately approved before development begins.

---


---

# 24. Next.js Architecture & Conventions

## 24.1 Next.js Version

Use the latest stable Next.js version available when the project is started, unless the project explicitly specifies another version.

Do not downgrade or pin to an older major version without an explicit project requirement.

---

## 24.2 App Router

The project must use the **Next.js App Router**.

The Pages Router must not be introduced.

All routing and page architecture should follow current App Router conventions.

---

## 24.3 Rendering Strategy

The application should be **server-first and mostly static**.

Prefer Server Components and static rendering wherever practical.

The current website primarily contains stable brand, service, package, product, and editorial content, so this content should be rendered on the server whenever possible.

The goal is to avoid making the browser wait for static content to be fetched or assembled unnecessarily after the initial page loads.

Preferred direction:

```text
Request
  ↓
Next.js Server
  ↓
Local structured data
  ↓
Server-rendered HTML
  ↓
Browser
```

Avoid unnecessary client-side fetching for content that is already available locally at build/request time.

When future CMS or external integrations are introduced, server-side data fetching should remain the preferred approach where appropriate.

---

## 24.4 Server Components by Default

React Server Components are the default.

A component should become a Client Component only when it genuinely requires client-side functionality such as:

- Browser APIs
- React state
- Effects
- Event-driven interaction
- Client-only libraries
- Interactive UI behavior that cannot be implemented appropriately on the server

Do not add `"use client"` by default.

Do not convert large component trees into Client Components merely because one small interaction requires client-side behavior.

Keep the client boundary as small as reasonably possible.

---

## 24.5 Static Data Rendering

Current static content is stored in structured TypeScript data.

When data is already available locally, do not create an unnecessary API request merely to retrieve it.

Prefer:

```text
Structured TypeScript Data
        ↓
Server Component
        ↓
Rendered HTML
```

over:

```text
Structured TypeScript Data
        ↓
API Route
        ↓
Client fetch()
        ↓
Render
```

The latter should only be used when there is a genuine architectural requirement.

The browser should not wait for an avoidable client-side request before displaying core website content.

---

## 24.6 Client-Side State

Avoid global client-side state unless there is a demonstrated requirement.

Do not introduce Redux, Zustand, or another global state library merely because the application may need one in the future.

Prefer, in order where appropriate:

1. Server-rendered data
2. URL state
3. Local component state
4. Context for genuinely shared local UI concerns
5. Global state only when a real cross-application client-state requirement exists

Future requirements may justify a state-management solution, but it must be introduced intentionally.

---

## 24.7 API Routes / Route Handlers

Do not create Next.js API routes or Route Handlers for the current static frontend unless explicitly approved.

The current phase does not require an application backend.

Do not introduce API endpoints simply to create an abstraction around local static data.

Future integrations may introduce server-side routes when there is a real requirement, such as securely communicating with external services.

---

## 24.8 Server Actions

Do not introduce Server Actions in the current phase.

Server Actions may be considered in a future stage only when an approved requirement genuinely benefits from them.

Do not use Server Actions as a substitute for an architecture that has not yet been approved.

---

## 24.9 Balanced Architecture

The project follows a balanced architecture philosophy.

Keep the implementation simple during the static phase while maintaining clear boundaries around:

- Presentation
- Content/data
- Integrations
- Configuration
- Shared utilities
- Domain concepts

Do not introduce enterprise patterns merely for appearance.

Do not create unnecessary abstraction layers, factories, providers, repositories, or adapters before there is a real problem they solve.

Architecture should evolve with actual requirements.

---

## 24.10 Future Data Sources

The current UI must not be tightly coupled to the fact that data comes from local TypeScript files.

Use meaningful types and lightweight interfaces for important domain concepts such as services, packages, products, and team members.

The intended evolution is:

```text
Current

UI
 ↓
Typed Data
 ↓
Local TypeScript
```

and later:

```text
Future

UI
 ↓
Typed Data / Data Access Boundary
 ↓
CMS / External API / Altegio
```

The current phase should establish the necessary types and reasonable boundaries without implementing speculative integration infrastructure.

Do not create complex factories or provider systems solely for future CMS or Altegio support.

---

## 24.11 Client Boundary Discipline

Keep Client Components as close as possible to the actual interactive element that requires them.

For example, if a page contains mostly static content and one interactive gallery:

```text
Server Page
 ├── Server Hero
 ├── Server Content
 ├── Server Services
 └── Client Gallery
```

Do not unnecessarily turn the entire page into a Client Component.

This preserves server rendering, reduces client JavaScript, and keeps the application easier to maintain.

---

## 24.12 General Next.js Principle

The default question when implementing a feature should be:

> **Can this be rendered or handled on the server without unnecessary client-side JavaScript?**

If yes, prefer the server-side solution.

Client-side behavior should be introduced intentionally for genuine interactivity, not as the default implementation style.

The website should remain:

- Server-first
- Mostly static
- Fast to load
- Minimal in client JavaScript
- Ready for future CMS integration
- Ready for future Altegio integration
- Simple enough to evolve without premature architecture



---

# 25. Branding Assets & Brand Source of Truth

## 25.1 Brand

The website is being developed for **Royal Longevity**.

Royal Longevity is the brand name and must be used consistently throughout the website, metadata, content placeholders, component examples, and project-specific references where the brand name is required.

Do not substitute generic names such as "Premium Salon", "Luxury Spa", or invented brand names when a brand-specific reference is appropriate.

---

## 25.2 Branding Directory

The project root contains a dedicated:

```text
branding/
```

directory.

This directory contains the supplied Royal Longevity brand assets, including materials such as:

- Logos
- Logo variations
- Logo icons
- English logo assets
- Arabic logo assets
- Beauty branding
- Medical branding
- Vertical and horizontal logo variants
- Brand fonts
- Brand presentation/reference materials
- Other supplied brand collateral

The `branding/` directory is the project's source of truth for supplied brand assets.

The agent must use the provided branding assets rather than recreating or approximating them.

---

## 25.3 Do Not Modify Original Branding Assets

Original assets inside `branding/` must be treated as source/reference assets.

Do not:

- Modify the original files
- Overwrite supplied assets
- Rename supplied assets unnecessarily
- Re-export them into a different format without a clear implementation requirement
- Replace supplied logos with recreated versions
- Recreate the logo using text when an appropriate supplied logo asset exists

If an optimized/web-ready derivative is required, preserve the original source asset and create the derivative separately.

---

## 25.4 Logo Selection

Royal Longevity has multiple logo variants.

The agent must select the appropriate supplied logo based on:

- Language
- Background
- Layout
- Context
- Brand variant
- Beauty vs medical context where applicable
- Horizontal vs vertical composition

Do not use a visually similar but incorrect logo simply because it is easier to implement.

Do not distort, stretch, rotate, recolor, or otherwise alter a supplied logo unless the brand guidelines explicitly permit the change.

---

## 25.5 English and Arabic Branding

English and Arabic logo assets are available.

The agent must respect the intended language-specific branding.

When the website is displayed in Arabic, use the supplied Arabic brand assets where an Arabic-specific logo is appropriate.

Do not assume that an English logo should always be reused for the Arabic experience.

---

## 25.6 Beauty and Medical Branding

The supplied assets include separate **Beauty** and **Medical** branding.

The agent must not assume that these variants are interchangeable.

Before using a Beauty or Medical logo/brand variant, the intended context must be clear.

If the website contains both business areas, their visual relationship and usage rules must follow the supplied brand materials rather than being invented by the agent.

If the correct usage is unclear from the available assets, ask for clarification rather than making a permanent branding decision.

---

## 25.7 Brand Fonts

Supplied brand fonts are available inside the `branding/` assets.

The agent must use the approved brand typography when appropriate.

Do not replace the supplied brand fonts with arbitrary fonts without explicit approval.

Font usage must still be evaluated for:

- English readability
- Arabic readability
- Web compatibility
- Performance
- Weight availability
- Licensing/usage constraints

If a supplied font cannot technically or legally be used on the web, stop and ask for an approved alternative rather than silently substituting a font.

---

## 25.8 Brand Colors

The supplied brand materials are the reference for the approved color system.

The agent must not invent additional brand colors.

If exact color values are not explicitly available in the project configuration or brand documentation, do not guess them from memory or approximate them casually.

When exact brand colors are needed for implementation, inspect the supplied brand materials or request the approved values.

---

## 25.9 Brand Asset Inspection

The agent should inspect relevant supplied branding assets before making significant visual implementation decisions.

The agent does not need to inspect every branding file for every task.

For example:

- Logo implementation → inspect relevant logo assets
- Typography implementation → inspect supplied font assets
- Color implementation → inspect relevant brand references
- Beauty page → inspect Beauty branding
- Medical page → inspect Medical branding

Use the smallest relevant set of source assets necessary to make an accurate implementation decision.

---

## 25.10 Dummy Content vs Brand Assets

The current project may use dummy/example content for services, offers, descriptions, testimonials, and other business information during the design/demo phase.

Dummy content must never be treated as authoritative business information.

Brand assets are different.

Supplied Royal Longevity logos, fonts, and official visual identity materials should be treated as real brand assets and must not be replaced with dummy equivalents.

The distinction is:

```text
Brand identity
    ↓
Use supplied assets

Business/content data
    ↓
Dummy content is acceptable during the demo phase
```

---

## 25.11 Asset Usage Principle

The visual implementation should feel like an extension of the existing Royal Longevity brand system.

The agent's job is to **implement the brand**, not redesign the brand.

Any decision that materially changes the established identity requires explicit approval.

## 37. Rule Priority

When rules conflict, use this priority:

1. Explicit project/user requirements
2. Approved design and branding decisions
3. This AGENT.md
4. Existing project conventions
5. Framework conventions
6. Agent preference

The agent must not override an explicit approved project decision based on personal preference.

---

## 38. General Engineering Principle

Build a website that is:

> **Premium in experience, simple in architecture, structured in data, disciplined in design, mobile-first in execution, multilingual by design, and ready for future integrations without prematurely implementing them.**

The goal of the current phase is not to build the entire future platform.

The goal is to establish a **high-quality frontend foundation that can evolve into that platform cleanly.**
