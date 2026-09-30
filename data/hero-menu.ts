import type { Language } from "./site";
import { localized } from "./inner/localization";

const destinations = [
  {
    slug: "about",
    label: localized("About", "عن رويال"),
    description: localized("Discover our approach", "اكتشفي فلسفتنا"),
  },
  {
    slug: "services",
    label: localized("Services", "الخدمات"),
    description: localized(
      "Find your personal ritual",
      "اكتشفي طقوس العناية بكِ",
    ),
  },
  {
    slug: "our-space",
    label: localized("Our space", "مساحتنا"),
    description: localized("Take a look inside", "ألقي نظرة على مساحتنا"),
  },
  {
    slug: "beauty",
    label: localized("Beauty", "الجمال"),
    description: localized("Care for hair and skin", "عناية بالشعر والبشرة"),
  },
  {
    slug: "wellness",
    label: localized("Wellness", "العافية"),
    description: localized("Make room to unwind", "امنحي نفسك وقتاً للاسترخاء"),
  },
  {
    slug: "packages",
    label: localized("Packages", "الباقات"),
    description: localized(
      "Care, beautifully combined",
      "عناية في باقات متكاملة",
    ),
  },
];

export function getHeroMenuContent(lang: Language) {
  return {
    openLabel: localized("Open menu", "افتحي القائمة")[lang],
    closeLabel: localized("Close menu", "أغلقي القائمة")[lang],
    label: localized("Primary navigation", "التنقل الرئيسي")[lang],
    links: destinations.map((item) => ({
      href: `/${lang}/${item.slug}`,
      label: item.label[lang],
      description: item.description[lang],
    })),
    contact: {
      href: `/${lang}/contact`,
      label: localized("Plan your visit", "خططي لزيارتك")[lang],
    },
    questions: {
      href: `/${lang}/faq`,
      label: localized("Your questions", "أسئلتك")[lang],
    },
  };
}
export type HeroMenuContent = ReturnType<typeof getHeroMenuContent> & {
  home?: { href: string; label: string };
};
