import type { Language } from "./site";

export type IntroductionContent = {
  eyebrow: string;
  title: string;
  imageAlt: string;
  statistics: {
    value: number;
    suffix: string;
    label: string;
    icon: "smile" | "guests" | "care";
  }[];
};

// Demo copy and figures, pending business approval. The photograph is the
// supplied Stayscape reference, not a photograph of Royal Longevity's premises.
export const introductionImage = "/assets/images/introduction-lounge.webp";

const content: Record<Language, IntroductionContent> = {
  en: {
    eyebrow: "Introduction",
    title: "A space for beauty.\nA moment for yourself.",
    imageAlt: "A quiet lounge with soft seating, warm wood and considered details",
    statistics: [
      { value: 200, suffix: "+", label: "Guests welcomed\nwith care", icon: "smile" },
      { value: 26, suffix: "%", label: "Guests returning\nto their rituals", icon: "guests" },
      { value: 1, suffix: ":1", label: "Personal attention,\nshaped around you", icon: "care" },
    ],
  },
  ar: {
    eyebrow: "تعرّفي علينا",
    title: "مساحة للجمال.\nولحظة لنفسك.",
    imageAlt: "ردهة هادئة بمقاعد مريحة وخشب دافئ وتفاصيل متقنة",
    statistics: [
      { value: 200, suffix: "+", label: "ضيوف استقبلناهم\nبكل عناية", icon: "smile" },
      { value: 26, suffix: "%", label: "ضيوف يعودون\nلطقوسهم المفضلة", icon: "guests" },
      { value: 1, suffix: ":1", label: "اهتمام شخصي\nمصمم من أجلك", icon: "care" },
    ],
  },
};

export const getIntroductionContent = (lang: Language) => content[lang];
