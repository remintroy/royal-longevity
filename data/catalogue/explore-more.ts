import { categories, getCategoryServices } from "./index";
import type { CategoryId } from "./types";
import { localized } from "@/data/inner/localization";

export const exploreMoreUi = {
  eyebrow: localized("Continue exploring", "واصلي الاكتشاف"),
  title: localized("More ways to care for you.", "المزيد من العناية لكِ."),
  collection: localized("Collection", "مجموعة"),
  service: localized("Service", "خدمة"),
  previous: localized("Previous recommendations", "الاقتراحات السابقة"),
  next: localized("Next recommendations", "الاقتراحات التالية"),
  pause: localized("Pause scrolling", "إيقاف التمرير"),
  play: localized("Resume scrolling", "استئناف التمرير"),
};

export function getExploreMore(category: CategoryId) {
  const index = categories.findIndex((item) => item.id === category);
  const ordered = [
    ...categories.slice(index + 1),
    ...categories.slice(0, index),
  ];
  return ordered
    .filter((item) => getCategoryServices(item.id).length > 0)
    .slice(0, 4)
    .flatMap((item) => {
      const service = getCategoryServices(item.id)[0];
      return [
        {
          id: `collection-${item.id}`,
          kind: "collection" as const,
          title: item.title,
          category: item.id,
          image: item.image,
          path: `services/categories/${item.id}`,
        },
        {
          id: `service-${service.slug}`,
          kind: "service" as const,
          title: service.title,
          category: item.id,
          image: service.image,
          path: `services/${service.slug}`,
        },
      ];
    });
}
