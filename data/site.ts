export type Language = 'en' | 'ar';

export const heroContent = {
  en: {
    eyebrow: "Beauty & Personal Care · Dubai",
    title: "Care that lets your natural radiance linger.",
    description: "A considered beauty ritual, shaped around you — from restorative treatments to the details that make you feel entirely yourself.",
    bookingLabel: "Book an appointment",
    bookingHref: "https://wa.me/?text=Hello%20Royal%20Longevity%2C%20I%20would%20like%20to%20book%20an%20appointment.",
    trustSignal: "A considered beauty experience",
    location: "Beauty & Personal Care · Dubai",
    highlights: [
      { value: "Beauty", label: "personal care" },
      { value: "Wellness", label: "considered rituals" },
      { value: "Care", label: "made personal" },
    ],
    imageAlt: "Warm, editorial beauty treatment setting with ivory linens and botanical details",
  },
  ar: {
    eyebrow: "العناية الشخصية والجمال · دبي",
    title: "عناية تُبرز إشراقتك الطبيعية.",
    description: "طقوس جمال متقنة مصممة خصيصاً لك — من العلاجات المجددة للنشاط إلى أدق التفاصيل التي تجعلك تشعرين بجمالك الطبيعي.",
    bookingLabel: "احجزي موعداً",
    bookingHref: "https://wa.me/?text=مرحباً%20Royal%20Longevity،%20أود%20حجز%20موعد.",
    trustSignal: "تجربة جمال متقنة",
    location: "العناية الشخصية والجمال · دبي",
    highlights: [
      { value: "الجمال", label: "العناية الشخصية" },
      { value: "العافية", label: "طقوس متقنة" },
      { value: "العناية", label: "مصممة لك" },
    ],
    imageAlt: "جلسة علاج تجميلي دافئة مع بياضات عاجية وتفاصيل نباتية",
  }
} as const;

export const getHeroContent = (lang: Language) => heroContent[lang];
