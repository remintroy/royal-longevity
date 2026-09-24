import { localized } from "@/data/inner/localization";
import type { Service } from "../types";

export const makeup: Service[] = [
  {
    slug: "bridal-makeup",
    category: "makeup",
    title: localized("Bridal Makeup", "مكياج العروس"),
    description: localized(
      "Discuss your wedding look and personal preferences.",
      "ناقشي إطلالة زفافك وتفضيلاتك الشخصية.",
    ),
    access: "appointment",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "party-makeup",
    category: "makeup",
    title: localized("Party Makeup", "مكياج الحفلات"),
    description: localized(
      "Explore a makeup look for your celebration.",
      "اكتشفي إطلالة مكياج لاحتفالك.",
    ),
    access: "appointment",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "event-makeup",
    category: "makeup",
    title: localized("Event Makeup", "مكياج المناسبات"),
    description: localized(
      "Plan your makeup for an upcoming occasion.",
      "خططي لمكياج مناسبتك القادمة.",
    ),
    access: "appointment",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "makeup-consultation",
    category: "makeup",
    title: localized("Makeup Consultation", "استشارة مكياج"),
    description: localized(
      "Share your ideas and discuss your preferred look.",
      "شاركي أفكارك وناقشي إطلالتك المفضلة.",
    ),
    access: "appointment",
    published: true,
    homepageOrder: null,
  },
];
