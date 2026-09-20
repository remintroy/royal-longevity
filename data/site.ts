export type Language = 'en' | 'ar';

export type Highlight = {
  value: string;
  label: string;
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
  en: ["Skin Care", "Spa", "Wellness", "Beauty", "Treatment", "Salon", "Relaxation"],
  ar: ["العناية بالبشرة", "سبا", "العافية", "الجمال", "العلاجات", "صالون", "الاسترخاء"]
};

export const heroContent: Record<Language, HeroContent> = {
  en: {
    eyebrow: "Personal Care & Beauty · Ajman",
    title: "Care that lets your natural radiance linger.",
    description: "A considered beauty ritual, shaped around you — from restorative treatments to the details that make you feel entirely yourself.",
    bookingLabel: "Book an appointment",
    bookingHref: "https://wa.me/?text=Hello%20Royal%20Longevity%2C%20I%20would%20like%20to%20book%20an%20appointment.",
    trustSignal: "A considered beauty experience",
    location: "Personal Care & Beauty · Ajman",
    badgeLine1: "Guest",
    badgeLine2: "favorite",
    highlights: [
      { value: "Beauty", label: "personal care" },
      { value: "Wellness", label: "considered rituals" },
      { value: "Care", label: "made personal" },
    ],
    imageAlt: "Warm, editorial beauty treatment setting with ivory linens and botanical details",
  },
  ar: {
    eyebrow: "العناية الشخصية والجمال · عجمان",
    title: "عناية تُبرز إشراقتك الطبيعية.",
    description: "طقوس جمال متقنة مصممة خصيصاً لك — من العلاجات المجددة للنشاط إلى أدق التفاصيل التي تجعلك تشعرين بجمالك الطبيعي.",
    bookingLabel: "احجزي موعداً",
    bookingHref: "https://wa.me/?text=مرحباً%20Royal%20Longevity،%20أود%20حجز%20موعد.",
    trustSignal: "تجربة جمال متقنة",
    location: "العناية الشخصية والجمال · عجمان",
    badgeLine1: "اختيار",
    badgeLine2: "العملاء",
    highlights: [
      { value: "الجمال", label: "العناية الشخصية" },
      { value: "العافية", label: "طقوس متقنة" },
      { value: "العناية", label: "مصممة لك" },
    ],
    imageAlt: "جلسة علاج تجميلي دافئة مع بياضات عاجية وتفاصيل نباتية",
  }
};

export const getHeroContent = (lang: Language) => heroContent[lang];
export const getMarqueeContent = (lang: Language) => marqueeContent[lang];
