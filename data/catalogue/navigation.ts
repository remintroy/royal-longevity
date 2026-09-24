import { localized } from "@/data/inner/localization";
import type { Language } from "@/data/site";
import type { HeroMenuContent } from "@/data/hero-menu";

export const mainNavigation = [
  { slug: "", label: localized("Home", "الرئيسية") },
  { slug: "about", label: localized("About", "عن رويال") },
  { slug: "services", label: localized("Services", "الخدمات") },
  { slug: "memberships", label: localized("Memberships", "العضويات") },
  { slug: "appointments", label: localized("Appointments", "المواعيد") },
  { slug: "our-space", label: localized("Our Spaces", "مساحاتنا") },
  { slug: "gallery", label: localized("Gallery", "معرض الصور") },
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
      .filter((item) => item.slug !== "contact")
      .map((item) => ({
        href: `/${lang}${item.slug ? `/${item.slug}` : ""}`,
        label: item.label[lang],
        description: "",
      })),
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
