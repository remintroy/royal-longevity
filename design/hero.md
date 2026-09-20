# Royal Longevity Hero Design Specification

## Purpose

This document defines the intended hero and top-navigation interaction pattern for Royal Longevity. It takes structural inspiration from the smooth, curved layout language observed on [Stayscape](https://stayscape.framer.website/) while retaining Royal Longevity's supplied assets, colour system, typography, and Beauty/Medical distinctions.

It is a design reference, not permission to copy Stayscape branding, copy, imagery, or implementation code.

## Hero composition

The hero should be an intentional vertical sequence:

```text
Top navigation
      ↓
Large centred editorial statement
      ↓
Small, real trust signal
      ↓
Primary booking action
      ↓
Image-led transition into the next section
```

- Keep the title to two to four lines and centre it in the available hero space.
- Avoid placing a long paragraph directly below the title. Let headline, proof, and call to action remain distinct moments.
- Include one primary booking action only. The current destination is WhatsApp; its presentation must remain a reusable booking action.
- Use a small trust signal only where it is factual: a rating, testimonial cluster, service count, or short credibility statement.
- On smaller screens, preserve the order and hierarchy. Do not turn the hero into a crowded group of cards.

## Headline

The reference uses a large centred heading with compact editorial line height. Royal Longevity should keep that proportion with the approved display typography.

| Property | Desktop target | Mobile target |
| --- | --- | --- |
| Font size | 52–60px | 34–40px |
| Line height | 108–115% | 110–118% |
| Letter spacing | -0.01em, if supported by the approved font | -0.01em, if supported by the approved font |
| Alignment | Centre | Centre |

The hero must use Royal Longevity's approved serif/editorial heading treatment, not the reference site's Figtree sans-serif.

## Editorial reveal animation

Use the word-by-word reveal only for the primary hero headline:

```text
Initial:  opacity 0; translateY(18–24px); blur(6–10px)
Final:    opacity 1; translateY(0); blur(0)
Duration: 550–700ms per word
Stagger:  55–80ms
Ease:     cubic-bezier(0.22, 1, 0.36, 1)
```

- Animate the headline once when it enters the viewport; do not replay it on normal scrolling.
- On mobile, reduce translation to `12–16px` and reduce/remove blur to protect performance.
- Under `prefers-reduced-motion`, show the completed heading without a staggered reveal.

## Trust signal

Where real imagery and claims are available, use a compact overlapping-avatar cluster:

```text
[avatar][avatar][avatar]  Trusted by [factual proof]
```

- Avatar size: `28–34px`.
- Overlap: `-8px` to `-10px`.
- Use a `2px` surface-colour ring around each avatar to keep overlaps clean.
- Supporting text: `14–15px`, restrained and readable.
- Reveal the group as one unit using an opacity fade and `translateY(12px)`; do not animate avatars independently.

If credible client imagery or data is unavailable, use a verified rating or concise brand statement instead. Never invent social proof.

## Primary booking button

The primary hero CTA follows a pill-with-icon-circle pattern:

```text
[ circular WhatsApp / arrow icon ]  Book an appointment
```

| Property | Specification |
| --- | --- |
| Form | Fully pill-shaped (`999px` radius) |
| Minimum height | `48px`; prefer `52–56px` in the hero |
| Internal layout | Icon circle + label, `14–16px` gap |
| Icon circle | High-contrast circular inset with `12–14px` internal padding |
| Text | Always visible; icon is supportive, not the sole label |
| Surface | Royal Longevity approved dark/espresso surface with approved light text |

Interactions:

```text
Hover:   icon nudges 3–4px, 180–220ms
Pressed: scale(0.98), around 100ms
Focus:   clear keyboard focus treatment
```

Do not make the entire button jump, bounce, or change width on hover. If the icon changes sides, it must do so without moving the text or causing layout shift.

## Top navigation

The intended desktop pattern is a spacious horizontal navigation with a branded pill on the left and two circular utility controls on the right:

```text
[ supplied Royal Longevity logo pill ]                 [ language ] [ menu ]
```

- Use the appropriate supplied English or Arabic logo asset; do not recreate the wordmark with text.
- Give the logo pill a `44–48px` height and enough horizontal breathing room for the selected asset.
- Language and menu controls should be `44–48px` circles and share the same border/surface treatment.
- Use `6–8px` between the utility controls.
- On desktop, place the nav in a wide content container (typically `1120–1240px` maximum) with `32–48px` horizontal page insets.
- On mobile, use `20px` page insets and retain the two controls. Never reduce touch targets below `44px`.

The reference's compact 660px-wide nav is suitable for its small apartment site; Royal Longevity should use the same composition but a wider container to support its logo and navigation needs.

## Menu panel

The menu should feel like a quiet floating extension of the header:

- Anchor it immediately below the navigation controls, separated by approximately `8px`.
- Use a `24px` radius, a fine 1px border, a calm brand surface, and a broad low-opacity shadow.
- On desktop, use a grid or grouped layout; two to three columns are appropriate only when labels remain easy to scan.
- Each destination can have a main label and one concise explanatory label when that improves discovery.
- A small directional arrow may fade/slide in `2–4px` on hover. It must mirror in RTL.

Open/close motion:

```text
Open:     opacity 0 → 1; translateY(-8px) → 0; scale(.98) → 1
Duration: 260–340ms
Close:    180–220ms
Ease:     cubic-bezier(0.22, 1, 0.36, 1)
```

On mobile, use a full-height or near-full-height sheet if needed, retaining `24–32px` rounded top corners and generous padding. Ensure focus is managed correctly and the menu can be closed by keyboard.

## Menu icon

- Use three thin, rounded `18–20px` lines.
- When opening, rotate the first and third lines into an X; fade/scale down the centre line.
- Duration: `220–280ms`.
- Keep the outer circular control still; animate the icon inside it.
- Remove nonessential transforms under `prefers-reduced-motion`.

## Scrolling and performance

The reference includes Lenis smooth-scroll styles. Smooth scrolling may be considered later, but it is not required to achieve the visual language.

- Start with native scrolling, stable layout, and intentional section spacing.
- Only add a smooth-scroll library after confirming it does not compromise mobile performance, keyboard navigation, anchor links, modals, screen readers, or reduced-motion preferences.
- If a library is approved later, Lenis is the closest reference behaviour. Adding any dependency requires explicit approval under `AGENTS.md`.

## Implementation boundary

- Keep most hero markup server-rendered.
- Isolate only the navigation toggle and intentional entrance animation in small Client Components when needed.
- Do not introduce a global animation or smooth-scroll dependency by default.
- Verify the completed experience in English/LTR and Arabic/RTL, including icon direction, utility-control ordering, menu alignment, and focus handling.
