import type { Language } from "./site";

export type HighlightIcon =
  | "beauty"
  | "skin"
  | "wellness"
  | "care"
  | "detail"
  | "calm"
  | "ritual"
  | "style"
  | "time";

export type HighlightsContent = {
  eyebrow: string;
  title: string;
  categories: {
    id: string;
    title: string;
    description: string;
    icon: HighlightIcon;
    href: string;
    actionLabel: string;
  }[];
  detailsLabel: string;
  centerpiece: string;
  details: { id: string; label: string; icon: HighlightIcon }[];
};

// Demo brand copy, pending business approval; these are themes, not service counts.
const content: Record<Language, HighlightsContent> = {
  en: {
    eyebrow: "The essentials",
    title: "Thoughtfully yours",
    categories: [
      {
        id: "beauty",
        title: "Beauty",
        description: "Your style, beautifully expressed",
        icon: "beauty",
        href: "/en/beauty",
        actionLabel: "Explore beauty",
      },
      {
        id: "skin",
        title: "Skincare",
        description: "Thoughtful care for your skin",
        icon: "skin",
        href: "/en/services/skincare",
        actionLabel: "Explore skincare",
      },
      {
        id: "wellness",
        title: "Wellness",
        description: "A little room to restore",
        icon: "wellness",
        href: "/en/wellness",
        actionLabel: "Explore wellness",
      },
    ],
    detailsLabel: "Every detail, considered",
    centerpiece: "Care centred\non you",
    details: [
      { id: "attention", label: "Personal attention", icon: "care" },
      { id: "details", label: "Beauty in the details", icon: "detail" },
      { id: "calm", label: "Room to unwind", icon: "calm" },
      { id: "rituals", label: "Restorative rituals", icon: "ritual" },
      { id: "style", label: "Your signature style", icon: "style" },
      { id: "time", label: "Time for yourself", icon: "time" },
    ],
  },
  ar: {
    eyebrow: "جوهر تجربتنا",
    title: "كل التفاصيل من أجلك",
    categories: [
      {
        id: "beauty",
        title: "الجمال",
        description: "أسلوبك بأجمل تعبير",
        icon: "beauty",
        href: "/ar/beauty",
        actionLabel: "اكتشفي خدمات الجمال",
      },
      {
        id: "skin",
        title: "العناية بالبشرة",
        description: "عناية مدروسة لبشرتك",
        icon: "skin",
        href: "/ar/services/skincare",
        actionLabel: "اكتشفي العناية بالبشرة",
      },
      {
        id: "wellness",
        title: "العافية",
        description: "مساحة تستعيدين فيها نشاطك",
        icon: "wellness",
        href: "/ar/wellness",
        actionLabel: "اكتشفي العافية",
      },
    ],
    detailsLabel: "كل تفصيلة بعناية",
    centerpiece: "عناية تتمحور\nحولك",
    details: [
      { id: "attention", label: "اهتمام شخصي", icon: "care" },
      { id: "details", label: "جمال في التفاصيل", icon: "detail" },
      { id: "calm", label: "مساحة للاسترخاء", icon: "calm" },
      { id: "rituals", label: "طقوس تجدد نشاطك", icon: "ritual" },
      { id: "style", label: "أسلوبك الخاص", icon: "style" },
      { id: "time", label: "وقت لنفسك", icon: "time" },
    ],
  },
};

export const getHighlightsContent = (lang: Language) => content[lang];
