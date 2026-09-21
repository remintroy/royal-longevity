import type { Language } from "./site";

export type GalleryImage = {
  id: string;
  src: string;
  title: string;
  alt: string;
};

export type GalleryContent = {
  eyebrow: string;
  title: string;
  bookingLabel: string;
  images: GalleryImage[];
};

// Demo imagery from Unsplash, not photographs of Royal Longevity's premises.
// Source photo IDs and replacement guidance are recorded in design/gallery.md.
const images = [
  { id: "salon", en: ["The beauty space", "Salon styling stations with large mirrors and black chairs"], ar: ["مساحة الجمال", "محطات تصفيف الشعر بمرايا كبيرة ومقاعد سوداء"] },
  { id: "ritual", en: ["Quiet rituals", "Soft towels, flowers and care essentials arranged for a spa ritual"], ar: ["طقوس هادئة", "مناشف ناعمة وزهور ومستحضرات عناية لطقوس الاسترخاء"] },
  { id: "skincare", en: ["Skin, thoughtfully cared for", "A facial mask gently applied with a brush during a skincare treatment"], ar: ["عناية مدروسة ببشرتك", "وضع قناع للوجه بلطف باستخدام فرشاة أثناء جلسة عناية بالبشرة"] },
  { id: "details", en: ["Beauty in the details", "An amber glass care bottle in warm natural light"], ar: ["الجمال في التفاصيل", "عبوة عناية زجاجية بلون كهرماني في ضوء طبيعي دافئ"] },
  { id: "massage", en: ["A moment to unwind", "Massage oil being poured into a therapist’s hands before a back massage"], ar: ["لحظة للاسترخاء", "سكب زيت التدليك في يدي المعالجة قبل تدليك الظهر"] },
  { id: "hair", en: ["Your signature style", "A bright hair salon with styling chairs and mirrors"], ar: ["أسلوبك الخاص", "صالون شعر مضيء بمقاعد تصفيف ومرايا"] },
];

export function getGalleryContent(lang: Language): GalleryContent {
  return {
    ...(lang === "ar"
      ? { eyebrow: "معرض الصور", title: "عالم من الجمال.\nولحظات من الهدوء.", bookingLabel: "احجزي موعدك" }
      : { eyebrow: "Gallery", title: "A world of beauty.\nA little space for you.", bookingLabel: "Book an appointment" }),
    images: images.map((image) => ({
      id: image.id,
      src: `/assets/images/gallery/${image.id}.webp`,
      title: image[lang][0],
      alt: image[lang][1],
    })),
  };
}
