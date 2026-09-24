import { localized } from "@/data/inner/localization";
import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "gym-fitness",
    title: localized("Gym & Fitness", "النادي واللياقة"),
    description: localized(
      "Make room for movement, strength and personal training.",
      "مساحة للحركة والقوة والتدريب الشخصي.",
    ),
    access: "membership",
    group: "fitness",
  },
  {
    id: "yoga",
    title: localized("Yoga", "اليوغا"),
    description: localized(
      "Find space for mindful movement, breathing and stillness.",
      "مساحة للحركة الواعية والتنفس والهدوء.",
    ),
    access: "membership",
    group: "wellness",
  },
  {
    id: "pilates",
    title: localized("Pilates", "البيلاتس"),
    description: localized(
      "Explore considered movement in a class or a private session.",
      "اكتشفي حركة مدروسة في حصة جماعية أو جلسة خاصة.",
    ),
    access: "membership",
    group: "fitness",
  },
  {
    id: "swimming-pool",
    title: localized("Swimming Pool", "المسبح"),
    description: localized(
      "Discover pool access through selected memberships or a separate appointment.",
      "اكتشفي دخول المسبح عبر عضويات مختارة أو موعد منفصل.",
    ),
    access: "both",
    group: "fitness",
  },
  {
    id: "spa-wellness",
    title: localized("Spa & Wellness", "السبا والعافية"),
    description: localized(
      "Slow down with massage, body treatments, hammam and spa rituals.",
      "تمهّلي مع التدليك والعناية بالجسم والحمّام وطقوس السبا.",
    ),
    access: "appointment",
    group: "wellness",
    image: "massage",
  },
  {
    id: "facial-treatments",
    title: localized("Facial Treatments", "العناية بالوجه"),
    description: localized(
      "Explore facial care and discuss the approach that suits your skin.",
      "اكتشفي العناية بالوجه وناقشي ما يناسب بشرتك.",
    ),
    access: "appointment",
    group: "beauty",
    image: "skincare",
  },
  {
    id: "makeup",
    title: localized("Makeup", "المكياج"),
    description: localized(
      "A considered look for your celebration, occasion or everyday style.",
      "إطلالة مدروسة لاحتفالك أو مناسبتك أو أسلوبك اليومي.",
    ),
    access: "appointment",
    group: "beauty",
  },
  {
    id: "salon-hair",
    title: localized("Salon & Hair", "الصالون والشعر"),
    description: localized(
      "Discover cuts, colour, hair care and occasion styling.",
      "اكتشفي القص والتلوين والعناية بالشعر وتصفيف المناسبات.",
    ),
    access: "appointment",
    group: "beauty",
    image: "hair",
  },
  {
    id: "nails-pedicure",
    title: localized("Nails & Pedicure", "الأظافر والبديكير"),
    description: localized(
      "Care for hands and feet, finished in your own style.",
      "عناية باليدين والقدمين بلمسة تعبّر عن أسلوبك.",
    ),
    access: "appointment",
    group: "beauty",
    image: "ritual",
  },
];
