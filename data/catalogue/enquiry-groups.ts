import type { Language } from "@/data/site";
import { categories, services } from "./index";

export type ServiceGroup = {
  id: string;
  label: string;
  options: { id: string; label: string }[];
};

/** Language-resolved service options for the enquiry form, which runs in the browser. */
export function getServiceGroups(lang: Language): ServiceGroup[] {
  return categories.map((category) => ({
    id: category.id,
    label: category.title[lang],
    options: services
      .filter((service) => service.category === category.id)
      .map((service) => ({ id: service.slug, label: service.title[lang] })),
  }));
}
