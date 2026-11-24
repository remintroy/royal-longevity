import type { Language } from "./site";

export type IntroductionContent = {
  eyebrow: string;
  title: string;
  imageAlt: string;
  statistics: {
    value: string;
    suffix: string;
    label: string;
    icon: "smile" | "guests" | "care";
  }[];
};

// Figures are text so they can be edited in the CMS; they start at 0 until real figures exist.
// Imagery is generated interiors, not photographs of the premises.
export const introductionImages = {
  mobile: {
    src: "/assets/images/introduction-lounge-mobile.webp",
    width: 940,
    height: 1672,
  },
  tablet: {
    src: "/assets/images/introduction-lounge-tablet.webp",
    width: 1122,
    height: 1402,
  },
  desktop: {
    src: "/assets/images/introduction-lounge-desktop.webp",
    width: 1672,
    height: 941,
  },
};

const content: Record<Language, IntroductionContent> = {
  en: {
    eyebrow: "Introduction",
    title: "A space for beauty.\nA moment for yourself.",
    imageAlt:
      "A quiet lounge with soft seating, warm wood and considered details",
    statistics: [
      {
        value: "0",
        suffix: "",
        label: "Guests welcomed\nwith care",
        icon: "smile",
      },
      {
        value: "0",
        suffix: "",
        label: "Guests returning\nto their rituals",
        icon: "guests",
      },
      {
        value: "0",
        suffix: "",
        label: "Personal attention,\nshaped around you",
        icon: "care",
      },
    ],
  },
  ar: {
    eyebrow: "تعرّفي علينا",
    title: "مساحة للجمال.\nولحظة لنفسك.",
    imageAlt: "ردهة هادئة بمقاعد مريحة وخشب دافئ وتفاصيل متقنة",
    statistics: [
      {
        value: "0",
        suffix: "",
        label: "ضيوف استقبلناهم\nبكل عناية",
        icon: "smile",
      },
      {
        value: "0",
        suffix: "",
        label: "ضيوف يعودون\nلطقوسهم المفضلة",
        icon: "guests",
      },
      {
        value: "0",
        suffix: "",
        label: "اهتمام شخصي\nمصمم من أجلك",
        icon: "care",
      },
    ],
  },
};

export const getIntroductionContent = (lang: Language) => content[lang];
