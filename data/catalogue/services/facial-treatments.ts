import { localized } from "@/data/inner/localization";
import type { Service } from "../types";

export const facial_treatments: Service[] = [
  {
    slug: "skincare",
    category: "facial-treatments",
    title: localized("Standard Facial", "جلسة الوجه الأساسية"),
    description: localized(
      "Discover a considered introduction to facial care.",
      "اكتشفي بداية مدروسة للعناية بالوجه.",
    ),
    access: "appointment",
    image: "services/skincare",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "advanced-facial",
    category: "facial-treatments",
    title: localized("Advanced Facial", "جلسة وجه متقدمة"),
    description: localized(
      "Discuss advanced facial options and suitability with our team.",
      "ناقشي خيارات العناية المتقدمة بالوجه ومدى ملاءمتها مع فريقنا.",
    ),
    access: "appointment",
    image: "services/advanced-facial",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "anti-ageing",
    category: "facial-treatments",
    title: localized("Anti-Ageing", "العناية بعلامات التقدم في السن"),
    description: localized(
      "Discuss your skin concerns and the available care options.",
      "ناقشي احتياجات بشرتك وخيارات العناية المتاحة.",
    ),
    access: "appointment",
    image: "services/anti-ageing",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "skin-treatments",
    category: "facial-treatments",
    title: localized("Skin Treatments", "علاجات البشرة"),
    description: localized(
      "Enquire about treatment options for your skin-care preferences.",
      "استفسري عن الخيارات المناسبة لتفضيلات العناية ببشرتك.",
    ),
    access: "appointment",
    image: "services/skin-treatments",
    published: true,
    homepageOrder: null,
  },
];
