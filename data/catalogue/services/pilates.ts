import { localized } from "@/data/inner/localization";
import type { Service } from "../types";

export const pilates: Service[] = [
  {
    slug: "mat-pilates",
    category: "pilates",
    title: localized("Mat Pilates", "بيلاتس على الحصيرة"),
    description: localized(
      "Discover mat-based Pilates and ask about class levels.",
      "اكتشفي البيلاتس على الحصيرة واستفسري عن مستويات الحصص.",
    ),
    access: "membership",
    image: "services/mat-pilates",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "reformer-pilates",
    category: "pilates",
    title: localized("Reformer Pilates", "بيلاتس ريفورمر"),
    description: localized(
      "Enquire about equipment-based Pilates sessions.",
      "استفسري عن جلسات البيلاتس باستخدام الأجهزة.",
    ),
    access: "membership",
    image: "services/reformer-pilates",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "pilates-group-classes",
    category: "pilates",
    title: localized("Group Classes", "حصص جماعية"),
    description: localized(
      "Explore shared Pilates classes and discuss your preferences.",
      "اكتشفي حصص البيلاتس الجماعية وناقشي تفضيلاتك.",
    ),
    access: "membership",
    image: "services/pilates-group-classes",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "pilates-private-sessions",
    category: "pilates",
    title: localized("Private Sessions", "جلسات خاصة"),
    description: localized(
      "Ask about individual Pilates guidance.",
      "استفسري عن الإرشاد الفردي في البيلاتس.",
    ),
    access: "membership",
    image: "services/pilates-private-sessions",
    published: true,
    homepageOrder: null,
  },
];
