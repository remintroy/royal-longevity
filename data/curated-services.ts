import { getGalleryContent, type GalleryImage } from "./gallery";
import type { Language } from "./site";

export type CuratedServicesContent = {
  eyebrow: string;
  title: string;
  description: string;
  bookingLabel: string;
  enquiryNote: string;
  marqueeControls: { pause: string; play: string };
  images: GalleryImage[];
};

// Demo editorial copy; service pricing and details are discussed on WhatsApp.
const copy: Record<Language, Omit<CuratedServicesContent, "images">> = {
  en: {
    eyebrow: "Curated care",
    title: "Your beauty. Your ritual.",
    description: "From skin and salon care to moments of calm.\nLet us help you find the services that feel like you.",
    bookingLabel: "Find your ritual",
    enquiryNote: "Message us on WhatsApp for prices and details.",
    marqueeControls: { pause: "Pause images", play: "Play images" },
  },
  ar: {
    eyebrow: "عناية مختارة لك",
    title: "جمالك. طقوسك الخاصة.",
    description: "من العناية بالبشرة والشعر إلى لحظات من الهدوء.\nنساعدك على اختيار الخدمات التي تعبّر عنك.",
    bookingLabel: "اختاري طقوسك",
    enquiryNote: "تواصلي معنا عبر واتساب لمعرفة الأسعار والتفاصيل.",
    marqueeControls: { pause: "إيقاف حركة الصور", play: "تشغيل حركة الصور" },
  },
};

export function getCuratedServicesContent(lang: Language): CuratedServicesContent {
  return { ...copy[lang], images: getGalleryContent(lang).images };
}
