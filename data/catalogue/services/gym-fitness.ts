import { localized } from "@/data/inner/localization";
import type { Service } from "../types";

export const gym_fitness: Service[] = [
  {
    slug: "strength-training",
    category: "gym-fitness",
    title: localized("Strength Training", "تدريب القوة"),
    description: localized(
      "Explore strength-focused training with guidance from our team.",
      "اكتشفي تدريب القوة بإرشاد فريقنا.",
    ),
    access: "membership",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "cardio",
    category: "gym-fitness",
    title: localized("Cardio", "تمارين القلب"),
    description: localized(
      "Discuss cardio sessions that suit your routine.",
      "ناقشي جلسات تمارين القلب المناسبة لروتينك.",
    ),
    access: "membership",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "personal-training",
    category: "gym-fitness",
    title: localized("Personal Training", "التدريب الشخصي"),
    description: localized(
      "Enquire about individual guidance and your training preferences.",
      "استفسري عن الإرشاد الفردي وتفضيلاتك التدريبية.",
    ),
    access: "membership",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "fitness-programs",
    category: "gym-fitness",
    title: localized("Fitness Programs", "برامج اللياقة"),
    description: localized(
      "Explore a training programme and discuss your goals.",
      "استكشفي برنامجاً تدريبياً وناقشي أهدافك.",
    ),
    access: "membership",
    published: true,
    homepageOrder: null,
  },
];
