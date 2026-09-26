import { localized } from "@/data/inner/localization";
import type { Service } from "../types";

export const yoga: Service[] = [
  {
    slug: "yoga-classes",
    category: "yoga",
    title: localized("Yoga Classes", "حصص اليوغا"),
    description: localized(
      "Explore yoga classes and ask about suitable levels.",
      "اكتشفي حصص اليوغا واستفسري عن المستويات المناسبة.",
    ),
    access: "membership",
    image: "services/yoga-classes",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "meditation",
    category: "yoga",
    title: localized("Meditation", "التأمل"),
    description: localized(
      "Make time for guided stillness and a quieter moment.",
      "خصصي وقتاً للهدوء والتأمل الموجّه.",
    ),
    access: "membership",
    image: "services/meditation",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "breathing-sessions",
    category: "yoga",
    title: localized("Breathing Sessions", "جلسات التنفس"),
    description: localized(
      "Enquire about guided breathing sessions.",
      "استفسري عن جلسات التنفس الموجّهة.",
    ),
    access: "membership",
    image: "services/breathing-sessions",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "wellness-programs",
    category: "yoga",
    title: localized("Wellness Programs", "برامج العافية"),
    description: localized(
      "Discuss a programme combining mindful practices.",
      "ناقشي برنامجاً يجمع ممارسات العناية الواعية.",
    ),
    access: "membership",
    image: "services/wellness-programs",
    published: true,
    homepageOrder: null,
  },
];
