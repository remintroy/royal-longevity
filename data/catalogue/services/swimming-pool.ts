import { localized } from "@/data/inner/localization";
import type { Service } from "../types";

export const swimming_pool: Service[] = [
  {
    slug: "lap-swimming",
    category: "swimming-pool",
    title: localized("Lap Swimming", "سباحة المسارات"),
    description: localized(
      "Enquire about dedicated time for swimming lengths.",
      "استفسري عن وقت مخصص لسباحة المسارات.",
    ),
    access: "both",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "recreational-swimming",
    category: "swimming-pool",
    title: localized("Recreation", "السباحة الترفيهية"),
    description: localized(
      "Plan a relaxed visit to the pool.",
      "خططي لزيارة هادئة للمسبح.",
    ),
    access: "both",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "swimming-private-sessions",
    category: "swimming-pool",
    title: localized("Private Sessions", "جلسات سباحة خاصة"),
    description: localized(
      "Discuss a private swimming session with the team.",
      "ناقشي جلسة سباحة خاصة مع الفريق.",
    ),
    access: "both",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "pool-membership-access",
    category: "swimming-pool",
    title: localized("Pool Access (with Membership)", "دخول المسبح بالعضوية"),
    description: localized(
      "Ask which membership plans include pool access.",
      "استفسري عن خطط العضوية التي تشمل دخول المسبح.",
    ),
    access: "membership",
    published: true,
    homepageOrder: null,
  },
];
