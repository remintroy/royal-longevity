import type { Language } from "./site";

export type BookingBannerContent = {
  eyebrow: string;
  title: string;
  bookingLabel: string;
  image: { src: string; mobileSrc: string; alt: string };
};

// Demo copy, pending business approval.
// Generated banner variants based on the owner-supplied reference; see design/booking-banner.md.
const content: Record<Language, BookingBannerContent> = {
  en: {
    eyebrow: "A moment for you",
    title: "Make time for beauty.\nMake space for yourself.",
    bookingLabel: "Book an appointment",
    image: {
      src: "/assets/images/booking-banner-desktop.webp",
      mobileSrc: "/assets/images/booking-banner-mobile.webp",
      alt: "An ivory towel, gold-pump lotion dispenser and white flowers on warm marble",
    },
  },
  ar: {
    eyebrow: "لحظة من أجلك",
    title: "امنحي جمالك وقتاً.\nوخصصي لنفسك لحظة.",
    bookingLabel: "احجزي موعدك",
    image: {
      src: "/assets/images/booking-banner-desktop.webp",
      mobileSrc: "/assets/images/booking-banner-mobile.webp",
      alt: "منشفة عاجية وعبوة لوشن بمضخة ذهبية وزهور بيضاء على رخام دافئ",
    },
  },
};

export const getBookingBannerContent = (lang: Language) => content[lang];
