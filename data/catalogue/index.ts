import { gym_fitness } from "./services/gym-fitness";
import { yoga } from "./services/yoga";
import { pilates } from "./services/pilates";
import { swimming_pool } from "./services/swimming-pool";
import { spa_wellness } from "./services/spa-wellness";
import { facial_treatments } from "./services/facial-treatments";
import { makeup } from "./services/makeup";
import { salon_hair } from "./services/salon-hair";
import { nails_pedicure } from "./services/nails-pedicure";
import type { CategoryId, Service } from "./types";
import { categories as builtInCategories } from "./categories";
import type { Category } from "./types";
export type {
  Service,
  Category,
  CategoryId,
  StaticCategoryId,
  AccessModel,
} from "./types";

// Category file order controls catalogue display order.
const builtInServices: Service[] = [
  ...gym_fitness,
  ...yoga,
  ...pilates,
  ...swimming_pool,
  ...spa_wellness,
  ...facial_treatments,
  ...makeup,
  ...salon_hair,
  ...nails_pedicure,
];

/** Identifiers owned by the code-defined catalogue; CMS items may not reuse them. */
export const builtInCategoryIds = new Set(
  builtInCategories.map((category) => category.id),
);
export const builtInServiceSlugs = new Set(
  builtInServices.map((service) => service.slug),
);

// These arrays start as the built-in catalogue. setDynamicCatalogue() appends
// categories and services created in the CMS; they are updated in place so that
// every importer sees the merged catalogue during a server render.
export const categories: Category[] = [...builtInCategories];
export const serviceCatalogue: Service[] = [...builtInServices];
export const services: Service[] = serviceCatalogue.filter(
  (service) => service.published,
);

export function setDynamicCatalogue(extra: {
  categories: Category[];
  services: Service[];
}) {
  const builtInIds = new Set(builtInCategories.map((category) => category.id));
  const builtInSlugs = new Set(builtInServices.map((service) => service.slug));
  categories.splice(
    0,
    categories.length,
    ...builtInCategories,
    ...extra.categories.filter((category) => !builtInIds.has(category.id)),
  );
  serviceCatalogue.splice(
    0,
    serviceCatalogue.length,
    ...builtInServices,
    ...extra.services.filter(
      (service) =>
        !builtInSlugs.has(service.slug) &&
        categories.some((category) => category.id === service.category),
    ),
  );
  services.splice(
    0,
    services.length,
    ...serviceCatalogue.filter((service) => service.published),
  );
}
export function getCategoryServices(category: CategoryId) {
  return services.filter((service) => service.category === category);
}
export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
/** Prepared for future homepage use; the existing landing page does not consume this. */
export function getHomepageServices(source: readonly Service[] = services) {
  return source
    .filter((service) => service.published && service.homepageOrder !== null)
    .sort(
      (a, b) =>
        (a.homepageOrder ?? 0) - (b.homepageOrder ?? 0) ||
        a.slug.localeCompare(b.slug),
    );
}
