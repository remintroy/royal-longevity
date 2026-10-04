import { services, type Service } from "@/data/catalogue";
import { localized, type LocalizedText } from "./localization";

export type CarePackage = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  services: string[];
};

export const packages: CarePackage[] = [
  {
    slug: "everyday",
    title: localized("The everyday escape", "استراحة يومية"),
    description: localized(
      "A fresh finish and a little time to yourself.",
      "إطلالة متجددة وبعض الوقت لنفسك.",
    ),
    image: "/assets/images/packages/everyday.webp",
    services: ["hair", "pedicure"],
  },
  {
    slug: "radiance",
    title: localized("The radiance ritual", "طقوس الإشراقة"),
    description: localized(
      "Thoughtful care for a beautifully refreshed feeling.",
      "عناية مدروسة لشعور جميل ومتجدد.",
    ),
    image: "/assets/images/packages/radiance.webp",
    services: ["skincare", "pedicure"],
  },
  {
    slug: "reset",
    title: localized("The quiet reset", "تجدد هادئ"),
    description: localized(
      "Make space for a slower, softer afternoon.",
      "امنحي نفسك وقتاً أكثر هدوءاً ولطفاً.",
    ),
    image: "/assets/images/packages/reset.webp",
    services: ["massage", "body-care"],
  },
];

export function getPackageServices(carePackage: CarePackage): Service[] {
  return carePackage.services.map((slug) => {
    const service = services.find((item) => item.slug === slug);

    if (!service) {
      throw new Error(
        `Unknown service "${slug}" in package "${carePackage.slug}"`,
      );
    }

    return service;
  });
}
