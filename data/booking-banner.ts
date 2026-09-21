import type { Language } from "./site";

export type BookingBannerContent = {
  eyebrow: string;
  title: string;
  bookingLabel: string;
  image: { src: string; alt: string };
};

// Demo copy and existing demo photography, pending business approval.
// Image provenance is recorded in design/gallery.md.
const content: Record<Language, BookingBannerContent> = {
  en: {
    eyebrow: "A moment for you",
    title: "Make time for beauty.\nMake space for yourself.",
    bookingLabel: "Book an appointment",
    image: {
      src: "/assets/images/gallery/ritual.webp",
      alt: "Soft towels, flowers and a candle arranged for a calming beauty ritual",
    },
  },
  ar: {
    eyebrow: "لحظة من أجلك",
    title: "امنحي جمالك وقتاً.\nوخصصي لنفسك لحظة.",
    bookingLabel: "احجزي موعدك",
    image: {
      src: "/assets/images/gallery/ritual.webp",
      alt: "مناشف ناعمة وزهور وشمعة مرتبة لطقوس جمال هادئة",
    },
  },
};

export const getBookingBannerContent = (lang: Language) => content[lang];
