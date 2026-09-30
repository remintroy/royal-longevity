import { localized } from "@/data/inner/localization";
import type { Language } from "@/data/site";
import type { HeroMenuContent } from "@/data/hero-menu";

export const mainNavigation = [
  { slug: "", label: localized("Home", "الرئيسية") },
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
    slug: "memberships",
    label: localized("Memberships", "العضويات"),
    description: localized(
      "Make care part of your routine",
      "اجعلي العناية جزءاً من روتينك",
    ),
  },
  {
    slug: "appointments",
    label: localized("Appointments", "المواعيد"),
    description: localized(
      "Plan your next moment of care",
      "خططي للحظتك القادمة من العناية",
    ),
  },
  {
    slug: "our-space",
    label: localized("Our Spaces", "مساحاتنا"),
    description: localized("Take a look inside", "ألقي نظرة على مساحتنا"),
  },
  {
    slug: "gallery",
    label: localized("Gallery", "معرض الصور"),
    description: localized(
      "A glimpse of the Royal experience",
      "لمحة عن تجربة رويال",
    ),
  },
  { slug: "contact", label: localized("Contact", "التواصل") },
];
export const supportingNavigation = [
  {
    slug: "packages",
    label: localized("Packages & Offers", "الباقات والعروض"),
  },
  { slug: "faq", label: localized("FAQ", "الأسئلة الشائعة") },
  { slug: "terms", label: localized("Terms & Conditions", "الشروط والأحكام") },
  { slug: "privacy", label: localized("Privacy Policy", "سياسة الخصوصية") },
  { slug: "careers", label: localized("Careers", "الوظائف") },
  { slug: "blog", label: localized("Blog / Articles", "المدونة والمقالات") },
];
export function getInnerMenuContent(lang: Language): HeroMenuContent {
  return {
    label: localized("Primary navigation", "التنقل الرئيسي")[lang],
    openLabel: localized("Open menu", "افتحي القائمة")[lang],
    closeLabel: localized("Close menu", "أغلقي القائمة")[lang],
    links: mainNavigation
      .filter((item) => item.slug !== "" && item.slug !== "contact")
      .map((item) => ({
        href: `/${lang}${item.slug ? `/${item.slug}` : ""}`,
        label: item.label[lang],
        description: item.description?.[lang] ?? "",
      })),
    home: {
      href: `/${lang}`,
      label: localized("Home", "الرئيسية")[lang],
    },
    contact: {
      href: `/${lang}/contact`,
      label: localized("Contact", "التواصل")[lang],
    },
    questions: {
      href: `/${lang}/packages`,
      label: localized("Packages & Offers", "الباقات والعروض")[lang],
    },
  };
}
