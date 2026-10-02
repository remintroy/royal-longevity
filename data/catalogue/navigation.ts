import { localized } from "@/data/inner/localization";
import type { Language } from "@/data/site";

/** Shared destinations for the landing page, inner pages and footers. */
export const mainNavigation = [
  {
    slug: "services",
    label: localized("Services", "الخدمات"),
    description: localized("Find your personal ritual", "اكتشفي طقوس العناية بكِ"),
  },
  {
    slug: "packages",
    label: localized("Packages", "الباقات"),
    description: localized("Care, beautifully combined", "عناية في باقات متكاملة"),
  },
  {
    slug: "memberships",
    label: localized("Memberships", "العضويات"),
    description: localized("Make care part of your routine", "اجعلي العناية جزءاً من روتينك"),
  },
  {
    slug: "about",
    label: localized("About", "عن رويال"),
    description: localized("Discover our approach", "اكتشفي فلسفتنا"),
  },
  {
    slug: "our-space",
    label: localized("Our space", "مساحتنا"),
    description: localized("Take a look inside", "ألقي نظرة على مساحتنا"),
  },
  {
    slug: "contact",
    label: localized("Contact", "التواصل"),
    description: localized("Plan your visit", "خططي لزيارتك"),
  },
];

export const supportingNavigation = [
  { slug: "faq", label: localized("FAQ", "الأسئلة الشائعة") },
  { slug: "terms", label: localized("Terms & Conditions", "الشروط والأحكام") },
  { slug: "privacy", label: localized("Privacy Policy", "سياسة الخصوصية") },
];

export function getMenuContent(lang: Language) {
  return {
    label: localized("Primary navigation", "التنقل الرئيسي")[lang],
    openLabel: localized("Open menu", "افتحي القائمة")[lang],
    closeLabel: localized("Close menu", "أغلقي القائمة")[lang],
    links: mainNavigation.map((item) => ({
      href: `/${lang}/${item.slug}`,
      label: item.label[lang],
      description: item.description[lang],
    })),
    secondaryLinks: [
      { href: `/${lang}`, label: localized("Home", "الرئيسية")[lang] },
      { href: `/${lang}/faq`, label: localized("Your questions", "أسئلتك")[lang] },
    ],
  };
}

export const getInnerMenuContent = getMenuContent;
