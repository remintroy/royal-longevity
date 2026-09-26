import { localized } from "@/data/inner/localization";
import type { Service } from "../types";

export const salon_hair: Service[] = [
  {
    slug: "hair",
    category: "salon-hair",
    title: localized("Hair Cut & Styling", "قص الشعر وتصفيفه"),
    description: localized(
      "A fresh shape and a finish that feels like you.",
      "قصة جديدة ولمسة نهائية تعبّر عنكِ.",
    ),
    access: "appointment",
    image: "services/hair",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "hair-color",
    category: "salon-hair",
    title: localized("Hair Color", "تلوين الشعر"),
    description: localized(
      "Discuss your colour preferences and a suitable approach.",
      "ناقشي تفضيلاتك في اللون والطريقة المناسبة.",
    ),
    access: "appointment",
    image: "services/hair-color",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "hair-treatments",
    category: "salon-hair",
    title: localized("Hair Treatments", "علاجات الشعر"),
    description: localized(
      "Explore hair-care options with our salon team.",
      "اكتشفي خيارات العناية بالشعر مع فريق الصالون.",
    ),
    access: "appointment",
    image: "services/hair-treatments",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "bridal-hairstyles",
    category: "salon-hair",
    title: localized("Bridal Hairstyles", "تسريحات العروس"),
    description: localized(
      "Plan a hairstyle for your wedding day.",
      "خططي لتسريحة يوم زفافك.",
    ),
    access: "appointment",
    image: "services/bridal-hairstyles",
    published: true,
    homepageOrder: null,
  },
];
