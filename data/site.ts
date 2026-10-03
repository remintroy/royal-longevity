import { getBookingHref } from "@/lib/booking";

export type Language = "en" | "ar";

export type Highlight = {
  value: string;
  label: string;
  stars?: boolean;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  bookingLabel: string;
  bookingHref: string;
  trustSignal: string;
  location: string;
  badgeLine1: string;
  badgeLine2: string;
  highlights: Highlight[];
  imageAlt: string;
};

export const marqueeContent: Record<Language, string[]> = {
  en: [
    "Skin Care",
    "Spa",
    "Wellness",
    "Beauty",
    "Treatment",
    "Salon",
    "Relaxation",
  ],
  ar: [
    "العناية بالبشرة",
    "سبا",
    "العافية",
    "الجمال",
    "العلاجات",
    "صالون",
    "الاسترخاء",
  ],
};

export const heroContent: Record<Language, HeroContent> = {
  en: {
    eyebrow: "Personal Care & Beauty · Ajman",
    title: "Care that lets your natural radiance linger.",
    description:
      "A considered beauty ritual, shaped around you — from restorative treatments to the details that make you feel entirely yourself.",
    bookingLabel: "Book an appointment",
    bookingHref: getBookingHref("en"),
    trustSignal: "A considered beauty experience",
    location: "Personal Care & Beauty · Ajman",
    badgeLine1: "Guest",
    badgeLine2: "favorite",
    // Demo metrics from the supplied design reference; confirm before publishing.
    highlights: [
      { value: "100%", label: "Reply Rate" },
      { value: "4.98", label: "Rated 4.98 out of 5", stars: true },
      { value: "137", label: "Reviews" },
    ],
    imageAlt:
      "Warm, editorial beauty treatment setting with ivory linens and botanical details",
  },
  ar: {
    eyebrow: "العناية الشخصية والجمال · عجمان",
    title: "عناية تُبرز إشراقتك الطبيعية.",
    description:
      "طقوس جمال متقنة مصممة خصيصاً لك — من العلاجات المجددة للنشاط إلى أدق التفاصيل التي تجعلك تشعرين بجمالك الطبيعي.",
    bookingLabel: "احجزي موعداً",
    bookingHref: getBookingHref("ar"),
    trustSignal: "تجربة جمال متقنة",
    location: "العناية الشخصية والجمال · عجمان",
    badgeLine1: "اختيار",
    badgeLine2: "العملاء",
    // Demo metrics from the supplied design reference; confirm before publishing.
    highlights: [
      { value: "100%", label: "معدل الرد" },
      { value: "4.98", label: "التقييم 4.98 من 5", stars: true },
      { value: "137", label: "التقييمات" },
    ],
    imageAlt: "جلسة علاج تجميلي دافئة مع بياضات عاجية وتفاصيل نباتية",
  },
};

export const getHeroContent = (lang: Language) => heroContent[lang];
export const getMarqueeContent = (lang: Language) => marqueeContent[lang];
