import { getBookingBannerContent } from "@/data/booking-banner";
import { getCuratedServicesContent } from "@/data/curated-services";
import { getExperienceContent } from "@/data/experience";
import { getFaqContent } from "@/data/faq";
import { getFooterContent } from "@/data/footer";
import { getGalleryContent } from "@/data/gallery";
import { getHighlightsContent } from "@/data/highlights";
import { getIntroductionContent } from "@/data/introduction";
import { getHeroContent, type Language } from "@/data/site";
import type { ScalarFieldSchema, SectionSchema } from "./schema";

const text = (key: string, label: string, help?: string) =>
  ({ type: "text", key, label, help }) as const;
const multiline = (key: string, label: string, help?: string) =>
  ({ type: "multiline", key, label, help }) as const;
const image = (key: string, label: string, help?: string) =>
  ({ type: "image", key, label, help }) as const;
const link = (key: string, label: string, help?: string) =>
  ({ type: "link", key, label, help }) as const;

const bookingLabel = text(
  "bookingLabel",
  "Booking button",
  "Opens the WhatsApp booking flow.",
);

const highlightIcon = {
  type: "choice",
  key: "icon",
  label: "Icon",
  options: [
    { value: "beauty", label: "Scissors" },
    { value: "skin", label: "Droplets" },
    { value: "wellness", label: "Leaf" },
    { value: "care", label: "Heart & hand" },
    { value: "detail", label: "Gem" },
    { value: "calm", label: "Waves" },
    { value: "ritual", label: "Flower" },
    { value: "style", label: "Sparkles" },
    { value: "time", label: "Clock" },
  ],
} as const satisfies ScalarFieldSchema;

const statisticIcon = {
  type: "choice",
  key: "icon",
  label: "Icon",
  options: [
    { value: "smile", label: "Smile" },
    { value: "guests", label: "Guests" },
    { value: "care", label: "Heart & hand" },
  ],
} as const satisfies ScalarFieldSchema;

/**
 * Landing-page sections editable in the CMS. `get` returns the code defaults;
 * `schema` lists what editors may change. Content not in the schema (ids, fixed
 * WhatsApp links, artwork sizes) always comes from the defaults.
 */
export const landingSections = {
  hero: {
    get: getHeroContent,
    schema: {
      label: "Hero",
      description: "The first screen: headline, introduction and key figures.",
      fields: [
        text("eyebrow", "Eyebrow"),
        multiline("title", "Headline", "Line breaks are kept."),
        multiline("description", "Introduction"),
        bookingLabel,
        multiline("trustSignal", "Trust line"),
        text("location", "Location line"),
        text("badgeLine1", "Badge — first line"),
        text("badgeLine2", "Badge — second line"),
        {
          type: "list",
          key: "highlights",
          label: "Key figures",
          help: "The layout shows exactly three figures.",
          itemLabel: "Figure",
          min: 3,
          max: 3,
          fields: [text("value", "Figure"), text("label", "Caption")],
        },
        text("imageAlt", "Image description", "Read aloud by screen readers."),
      ],
    },
  },
  introduction: {
    get: getIntroductionContent,
    schema: {
      label: "Introduction",
      description: "Welcome statement and statistics beside the lounge photo.",
      fields: [
        text("eyebrow", "Eyebrow"),
        multiline("title", "Heading", "Line breaks are kept."),
        text("imageAlt", "Image description", "Read aloud by screen readers."),
        {
          type: "list",
          key: "statistics",
          label: "Statistics",
          itemLabel: "Statistic",
          min: 1,
          max: 5,
          fields: [
            text(
              "value",
              "Number",
              "Whole numbers count up on screen; other text is shown as written.",
            ),
            {
              ...text("suffix", "Suffix", "For example + or %."),
              optional: true,
            },
            multiline("label", "Caption"),
            statisticIcon,
          ],
        },
      ],
    },
  },
  experience: {
    get: getExperienceContent,
    schema: {
      label: "Experience",
      description:
        "Team message and moving banner. The banner lists your service categories automatically.",
      fields: [
        text("title", "Heading"),
        text("team", "Team name"),
        multiline("message", "Message"),
        text("contactLabel", "WhatsApp button"),
        text("pauseLabel", "Pause button (screen readers)"),
        text("playLabel", "Play button (screen readers)"),
      ],
    },
  },
  gallery: {
    get: getGalleryContent,
    schema: {
      label: "Gallery",
      description:
        "Six photos of the space. They also appear in the Curated services strip.",
      fields: [
        text("eyebrow", "Eyebrow"),
        multiline("title", "Heading", "Line breaks are kept."),
        bookingLabel,
        {
          type: "list",
          key: "images",
          label: "Photos",
          help: "The grid is designed for exactly six photos. Reorder to change their position.",
          itemLabel: "Photo",
          min: 6,
          max: 6,
          fields: [
            image("src", "Photo"),
            text("title", "Caption"),
            text("alt", "Description", "Read aloud by screen readers."),
          ],
        },
      ],
    },
  },
  highlights: {
    get: getHighlightsContent,
    schema: {
      label: "Services overview",
      description:
        "The services grid: three featured categories and six quick links.",
      fields: [
        text("eyebrow", "Eyebrow"),
        text("title", "Heading"),
        {
          type: "list",
          key: "categories",
          label: "Featured categories",
          help: "The grid shows exactly three featured categories.",
          itemLabel: "Category",
          min: 3,
          max: 3,
          fields: [
            text("title", "Title"),
            multiline("description", "Description"),
            highlightIcon,
            link("href", "Link"),
            text("actionLabel", "Link label"),
          ],
        },
        text("detailsLabel", "Quick links heading"),
        multiline("centerpiece", "Centre text", "Line breaks are kept."),
        {
          type: "list",
          key: "details",
          label: "Quick links",
          help: "Shown as two rows of three around the centre text.",
          itemLabel: "Quick link",
          min: 6,
          max: 6,
          fields: [text("label", "Label"), highlightIcon, link("href", "Link")],
        },
        text("allServices.label", "All services link label"),
        link("allServices.href", "All services link"),
      ],
    },
  },
  bookingBanner: {
    get: getBookingBannerContent,
    schema: {
      label: "Booking banner",
      description: "The full-width invitation to book.",
      fields: [
        text("eyebrow", "Eyebrow"),
        multiline("title", "Heading", "Line breaks are kept."),
        bookingLabel,
        multiline("childrenNotice", "Children notice"),
        image("image.src", "Photo (desktop)"),
        image("image.mobileSrc", "Photo (mobile)"),
        text("image.alt", "Photo description", "Read aloud by screen readers."),
      ],
    },
  },
  faq: {
    get: getFaqContent,
    schema: {
      label: "FAQ",
      description: "Frequently asked questions, each with its own photo.",
      fields: [
        text("eyebrow", "Eyebrow"),
        multiline("title", "Heading", "Line breaks are kept."),
        bookingLabel,
        {
          type: "list",
          key: "items",
          label: "Questions",
          itemLabel: "Question",
          min: 1,
          max: 12,
          fields: [
            text("question", "Question"),
            multiline("answer", "Answer"),
            image("image", "Photo"),
          ],
        },
      ],
    },
  },
  curatedServices: {
    get: getCuratedServicesContent,
    schema: {
      label: "Curated services",
      description:
        "Moving photo strip with an enquiry prompt. Its photos are managed in the Gallery section.",
      fields: [
        text("eyebrow", "Eyebrow"),
        text("title", "Heading"),
        multiline("description", "Description"),
        text("bookingLabel", "Button"),
        multiline("enquiryNote", "Enquiry note"),
        text("marqueeControls.pause", "Pause button (screen readers)"),
        text("marqueeControls.play", "Play button (screen readers)"),
      ],
    },
  },
  footer: {
    get: getFooterContent,
    schema: {
      label: "Footer",
      description:
        "Closing invitation and contact details. Its menu links follow the site navigation automatically.",
      fields: [
        text("eyebrow", "Eyebrow"),
        multiline("title", "Heading", "Line breaks are kept."),
        bookingLabel,
        multiline("contactDescription", "Contact description"),
        text("contactLabel", "Contact heading"),
        text("contactAction", "WhatsApp button"),
        text("menuLabel", "Menu heading"),
        text("exploreLabel", "Explore heading"),
        text("copyright", "Copyright name"),
        text("backToTop", "Back to top"),
        text("brandAlt", "Logo description"),
      ],
    },
  },
} satisfies Record<
  string,
  { get: (lang: Language) => object; schema: SectionSchema }
>;

export type LandingSectionId = keyof typeof landingSections;

export const landingSectionIds = Object.keys(
  landingSections,
) as LandingSectionId[];

export function isLandingSectionId(value: string): value is LandingSectionId {
  return Object.hasOwn(landingSections, value);
}

export function getDefaultSectionContent<Id extends LandingSectionId>(
  id: Id,
  lang: Language,
): ReturnType<(typeof landingSections)[Id]["get"]> {
  return landingSections[id].get(lang) as ReturnType<
    (typeof landingSections)[Id]["get"]
  >;
}

export function getSectionSchema(id: LandingSectionId): SectionSchema {
  return landingSections[id].schema;
}
