import { navigation, ui } from "./inner/ui";
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

const content: Record<Language, FooterContent> = {
  en: {
    eyebrow: "Your moment",
    title: "Always here\nfor your care.",
    bookingLabel: "Book an appointment",
    menuLabel: "Menu",
    menu: [
      { label: "About", href: "#introduction" },
      { label: "Gallery", href: "#gallery" },
      { label: "Reviews", href: "#reviews" },
      { label: "Curated care", href: "#curated-services" },
      { label: "Location", href: "#location" },
    ],
    exploreLabel: "Explore",
    explore: [
      { label: "Your questions", href: "#faq" },
      { label: "العربية", href: "/ar" },
    ],
    contactLabel: "Contact",
    contactAction: "Chat on WhatsApp",
    contactDescription: "Appointments, details\nand a little guidance.",
    copyright: "Royal Longevity",
    backToTop: "Back to top",
    brandAlt: "Royal Longevity",
    wordmark: {
      src: "/branding/text-english-white.png",
      width: 817,
      height: 56,
    },
  },
  ar: {
    eyebrow: "لحظتك الخاصة",
    title: "دائماً هنا\nللعناية بك.",
    bookingLabel: "احجزي موعدك",
    menuLabel: "القائمة",
    menu: [
      { label: "تعرّفي علينا", href: "#introduction" },
      { label: "معرض الصور", href: "#gallery" },
      { label: "آراء ضيوفنا", href: "#reviews" },
      { label: "عناية مختارة", href: "#curated-services" },
      { label: "الموقع", href: "#location" },
    ],
    exploreLabel: "اكتشفي المزيد",
    explore: [
      { label: "الأسئلة الشائعة", href: "#faq" },
      { label: "English", href: "/en" },
    ],
    contactLabel: "تواصلي معنا",
    contactAction: "تحدّثي معنا عبر واتساب",
    contactDescription: "للمواعيد والتفاصيل\nوكل ما تحتاجين إلى معرفته.",
    copyright: "رويال لونجيفيتي",
    backToTop: "العودة إلى الأعلى",
    brandAlt: "رويال لونجيفيتي",
    wordmark: {
      src: "/branding/text-arabic-white.png",
      width: 887,
      height: 177,
    },
  },
};

export const getFooterContent = (lang: Language): FooterContent => ({
  ...content[lang],
  menu: navigation.map((item) => ({
    label: item.label[lang],
    href: `/${lang}/${item.slug}`,
  })),
  explore: [
    { label: ui.all[lang], href: `/${lang}/services` },
    { label: ui.salon[lang], href: `/${lang}/salon` },
    { label: ui.allFaq[lang], href: `/${lang}/faq` },
    {
      label: lang === "en" ? "العربية" : "English",
      href: lang === "en" ? "/ar" : "/en",
    },
  ],
});
