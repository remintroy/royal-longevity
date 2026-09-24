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
export { categories } from "./categories";
export type { Service, Category, CategoryId, AccessModel } from "./types";

// Category file order controls catalogue display order.
export const serviceCatalogue: Service[] = [
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
export const services = serviceCatalogue.filter((service) => service.published);
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
