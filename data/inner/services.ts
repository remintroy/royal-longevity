import { localized, type LocalizedText } from "./localization";

export type Service = {
  slug: string;
  category: "beauty" | "wellness";
  image: string;
  title: LocalizedText;
  heading: LocalizedText;
  description: LocalizedText;
  ritual: LocalizedText;
  options: {
    name: LocalizedText;
    detail: LocalizedText;
  }[];
};

// Demo catalogue. Confirm the treatments and package contents before publishing.
export const services: Service[] = [
  {
    slug: "pedicure",
    category: "beauty",
    image: "ritual",
    title: localized("Pedicure", "العناية بالقدمين"),
    heading: localized(
      "Beautiful feet. Greater confidence.",
      "قدمان جميلتان. ثقة أكبر.",
    ),
    description: localized(
      "Relax, refresh and restore with a considered pedicure ritual. A little attention to the details, a little time for yourself.",
      "استرخي وانتعشي مع طقوس العناية بالقدمين. اهتمام بالتفاصيل ووقت خاص بكِ.",
    ),
    ritual: localized(
      "More than a treatment, a moment for you.",
      "أكثر من جلسة، لحظة لكِ.",
    ),
    options: [
      {
        name: localized("Classic pedicure", "بديكير كلاسيكي"),
        detail: localized(
          "A simple ritual of cleansing, shaping and finishing.",
          "طقوس بسيطة للتنظيف وتنسيق الأظافر والعناية النهائية.",
        ),
      },
      {
        name: localized("Deluxe pedicure", "بديكير ديلوكس"),
        detail: localized(
          "Unhurried care with exfoliation and a soothing finish.",
          "عناية هادئة مع التقشير ولمسة ختامية مريحة.",
        ),
      },
      {
        name: localized("Royal pedicure", "بديكير رويال"),
        detail: localized(
          "An extended foot-care ritual for a moment of indulgence.",
          "طقوس عناية ممتدة بالقدمين للحظة من الدلال.",
        ),
      },
    ],
  },
  {
    slug: "hair",
    category: "beauty",
    image: "hair",
    title: localized("Hair & styling", "الشعر والتصفيف"),
    heading: localized(
      "Your style, beautifully expressed.",
      "أسلوبك، بأجمل تعبير.",
    ),
    description: localized(
      "From a fresh cut to a polished finish, discover thoughtful salon care shaped around your personal style.",
      "من قصة جديدة إلى إطلالة متقنة، اكتشفي عناية بالشعر تناسب أسلوبك الشخصي.",
    ),
    ritual: localized("Good hair. A little more you.", "شعر جميل يعبّر عنكِ."),
    options: [
      {
        name: localized("Cut & finish", "قص وتصفيف"),
        detail: localized(
          "A fresh shape and a finish that feels like you.",
          "قصة جديدة ولمسة نهائية تعبّر عنكِ.",
        ),
      },
      {
        name: localized("Blow-dry & styling", "تجفيف وتصفيف"),
        detail: localized(
          "An effortless finish for everyday or an occasion.",
          "إطلالة متقنة لكل يوم أو لمناسبة خاصة.",
        ),
      },
      {
        name: localized("Hair-care ritual", "طقوس العناية بالشعر"),
        detail: localized(
          "Discuss your hair-care needs with our team.",
          "ناقشي احتياجات شعرك مع فريقنا.",
        ),
      },
    ],
  },
  {
    slug: "skincare",
    category: "beauty",
    image: "skincare",
    title: localized("Facial care", "العناية بالوجه"),
    heading: localized(
      "Make room for your natural radiance.",
      "امنحي إشراقتك الطبيعية مساحة.",
    ),
    description: localized(
      "Thoughtful facial rituals, gentle attention and time to reset. Discover the care that suits your skin.",
      "طقوس مدروسة للوجه وعناية لطيفة ووقت للتجدد. اكتشفي ما يناسب بشرتك.",
    ),
    ritual: localized(
      "A fresh perspective on skin care.",
      "نظرة جديدة إلى العناية بالبشرة.",
    ),
    options: [
      {
        name: localized("Essential facial", "جلسة الوجه الأساسية"),
        detail: localized(
          "A considered introduction to your skincare ritual.",
          "بداية مدروسة لطقوس العناية ببشرتك.",
        ),
      },
      {
        name: localized("Hydration ritual", "طقوس الترطيب"),
        detail: localized(
          "A moment of gentle care for skin that feels refreshed.",
          "لحظة عناية لطيفة لبشرة تشعر بالانتعاش.",
        ),
      },
    ],
  },
  {
    slug: "massage",
    category: "wellness",
    image: "massage",
    title: localized("Relaxation massage", "تدليك للاسترخاء"),
    heading: localized(
      "A softer pace. A deeper exhale.",
      "وتيرة أهدأ. نفس أعمق.",
    ),
    description: localized(
      "Step away from the everyday and settle into a quiet moment of restorative body care.",
      "ابتعدي عن صخب الحياة اليومية واستمتعي بلحظة هادئة من العناية بالجسم.",
    ),
    ritual: localized(
      "Space to pause, time to unwind.",
      "مساحة للتوقف، ووقت للاسترخاء.",
    ),
    options: [
      {
        name: localized("Relaxation ritual", "طقوس الاسترخاء"),
        detail: localized(
          "A gentle pause, tailored around your comfort.",
          "استراحة لطيفة مصممة حول راحتك.",
        ),
      },
      {
        name: localized("Extended escape", "استراحة ممتدة"),
        detail: localized(
          "More time to slow down and settle in.",
          "مزيد من الوقت للهدوء والاسترخاء.",
        ),
      },
    ],
  },
  {
    slug: "body-care",
    category: "wellness",
    image: "ritual",
    title: localized("Body rituals", "طقوس العناية بالجسم"),
    heading: localized(
      "A ritual of renewal, from head to toe.",
      "طقوس تجدد من الرأس إلى القدمين.",
    ),
    description: localized(
      "Warmth, quiet and considered care. Explore body rituals that make space for your wellbeing.",
      "دفء وهدوء وعناية متقنة. اكتشفي طقوساً للجسم تمنح راحتك مساحة.",
    ),
    ritual: localized(
      "Let the everyday fall away.",
      "اتركي انشغالات يومك خلفك.",
    ),
    options: [
      {
        name: localized("Body polish", "تقشير الجسم"),
        detail: localized(
          "A refreshing exfoliation ritual with a gentle finish.",
          "طقوس تقشير منعشة بلمسة ختامية لطيفة.",
        ),
      },
      {
        name: localized("Spa ritual", "طقوس السبا"),
        detail: localized(
          "A quiet escape shaped around your preferences.",
          "استراحة هادئة تُصمَّم وفق تفضيلاتك.",
        ),
      },
    ],
  },
];

export type ServiceCategory = Service["category"];

type ServiceCategoryLink = {
  slug: "services" | ServiceCategory;
  label: LocalizedText;
};

export const serviceCategories: ServiceCategoryLink[] = [
  { slug: "services", label: localized("All services", "جميع الخدمات") },
  { slug: "beauty", label: localized("Beauty", "الجمال") },
  { slug: "wellness", label: localized("Wellness", "العافية") },
];
