import { mainNavigation, supportingNavigation } from "./catalogue/navigation";
import type { Language } from "./site";

type FooterLink = { label: string; href: string };

export type FooterContent = {
  eyebrow: string;
  title: string;
  bookingLabel: string;
  menuLabel: string;
  menu: FooterLink[];
  exploreLabel: string;
  explore: FooterLink[];
  contactLabel: string;
  contactAction: string;
  contactDescription: string;
  copyright: string;
  backToTop: string;
  brandAlt: string;
  wordmark: { src: string; width: number; height: number };
};

const content: Record<Language, Omit<FooterContent, "menu" | "explore">> = {
  en: {
    eyebrow: "Your moment",
    title: "Always here\nfor your care.",
    bookingLabel: "Book an appointment",
    menuLabel: "Menu",
    exploreLabel: "Explore",
    contactLabel: "Contact",
    contactAction: "Chat on WhatsApp",
    contactDescription: "Appointments, details\nand a little guidance.",
    copyright: "Royal Longevity",
    backToTop: "Back to top",
    brandAlt: "Royal Longevity",
    wordmark: {
      src: "/branding/text-english-white.svg",
      width: 1040,
      height: 72,
    },
  },
  ar: {
    eyebrow: "لحظتك الخاصة",
    title: "دائماً هنا\nللعناية بك.",
    bookingLabel: "احجزي موعدك",
    menuLabel: "القائمة",
    exploreLabel: "اكتشفي المزيد",
    contactLabel: "تواصلي معنا",
    contactAction: "تحدّثي معنا عبر واتساب",
    contactDescription: "للمواعيد والتفاصيل\nوكل ما تحتاجين إلى معرفته.",
    copyright: "رويال لونجيفيتي",
    backToTop: "العودة إلى الأعلى",
    brandAlt: "رويال لونجيفيتي",
    wordmark: {
      src: "/branding/text-arabic-white.svg",
      width: 950,
      height: 146,
    },
  },
};

export const getFooterContent = (lang: Language): FooterContent => ({
  ...content[lang],
  menu: mainNavigation.map((item) => ({
    label: item.label[lang],
    href: `/${lang}/${item.slug}`,
  })),
  explore: [
    ...supportingNavigation.map((item) => ({
      label: item.label[lang],
      href: `/${lang}/${item.slug}`,
    })),
    {
      label: lang === "en" ? "العربية" : "English",
      href: lang === "en" ? "/ar" : "/en",
    },
  ],
});
