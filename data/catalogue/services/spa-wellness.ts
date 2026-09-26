import { localized } from "@/data/inner/localization";
import type { Service } from "../types";

export const spa_wellness: Service[] = [
  {
    slug: "massage",
    category: "spa-wellness",
    title: localized("Massage", "التدليك"),
    description: localized(
      "Take a quiet pause with a massage tailored to your preferences.",
      "استمتعي باستراحة هادئة مع تدليك يناسب تفضيلاتك.",
    ),
    access: "appointment",
    image: "services/massage",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "body-care",
    category: "spa-wellness",
    title: localized("Body Treatments", "علاجات الجسم"),
    description: localized(
      "Explore considered body care and discuss your preferences.",
      "اكتشفي العناية المدروسة بالجسم وناقشي تفضيلاتك.",
    ),
    access: "appointment",
    image: "services/body-care",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "hammam",
    category: "spa-wellness",
    title: localized("Hammam", "الحمّام"),
    description: localized(
      "Enquire about a hammam ritual and the available options.",
      "استفسري عن طقوس الحمّام والخيارات المتاحة.",
    ),
    access: "appointment",
    image: "services/hammam",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "spa-rituals",
    category: "spa-wellness",
    title: localized("Spa Rituals", "طقوس السبا"),
    description: localized(
      "Make space for an unhurried spa experience.",
      "امنحي نفسك وقتاً لتجربة سبا هادئة.",
    ),
    access: "appointment",
    image: "services/spa-rituals",
    published: true,
    homepageOrder: null,
  },
];
