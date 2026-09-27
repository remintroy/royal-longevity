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

// AI-generated brand-aligned illustrations, not actual premises or client photography.
// Generation prompts and provenance are recorded in design/gallery-image-prompts.md.
const images = [
  {
    id: "salon",
    en: [
      "The beauty space",
      "An ivory salon chair beside an arched mirror and espresso cabinetry",
    ],
    ar: ["مساحة الجمال", "كرسي صالون عاجي بجوار مرآة مقوسة وخزائن بنية داكنة"],
  },
  {
    id: "ritual",
    en: [
      "Quiet rituals",
      "Ivory spa towels, a stone water bowl and an amber oil bottle",
    ],
    ar: ["طقوس هادئة", "مناشف سبا عاجية ووعاء ماء حجري وعبوة زيت كهرمانية"],
  },
  {
    id: "skincare",
    en: [
      "Skin, thoughtfully cared for",
      "A facial mask gently applied with a brush during a skincare treatment",
    ],
    ar: [
      "عناية مدروسة ببشرتك",
      "وضع قناع للوجه بلطف باستخدام فرشاة أثناء جلسة عناية بالبشرة",
    ],
  },
  {
    id: "details",
    en: [
      "Beauty in the details",
      "An amber glass care bottle in warm natural light",
    ],
    ar: [
      "الجمال في التفاصيل",
      "عبوة عناية زجاجية بلون كهرماني في ضوء طبيعي دافئ",
    ],
  },
  {
    id: "massage",
    en: [
      "A moment to unwind",
      "A therapist gently massaging a hand resting on an ivory towel",
    ],
    ar: ["لحظة للاسترخاء", "معالجة تدلك بلطف يداً تستريح على منشفة عاجية"],
  },
  {
    id: "hair",
    en: [
      "Your signature style",
      "Glossy brunette waves over an ivory salon cape",
    ],
    ar: ["أسلوبك الخاص", "شعر بني لامع بتموجات ناعمة فوق رداء صالون عاجي"],
  },
];

export function getGalleryContent(lang: Language): GalleryContent {
  return {
    ...(lang === "ar"
      ? {
          eyebrow: "معرض الصور",
          title: "عالم من الجمال.\nولحظات من الهدوء.",
          bookingLabel: "احجزي موعدك",
        }
      : {
          eyebrow: "Gallery",
          title: "A world of beauty.\nA little space for you.",
          bookingLabel: "Book an appointment",
        }),
    images: images.map((image) => ({
      id: image.id,
      src: `/assets/images/gallery/brand-${image.id}.webp`,
      title: image[lang][0],
      alt: image[lang][1],
    })),
  };
}
