import { categories, getService, type CategoryId } from "./catalogue";
import { localized } from "./inner/localization";
import type { Language } from "./site";

export type HighlightIcon =
  | "beauty"
  | "skin"
  | "wellness"
  | "care"
  | "detail"
  | "calm"
  | "ritual"
  | "style"
  | "time";

export type HighlightsContent = {
  eyebrow: string;
  title: string;
  categories: {
    id: string;
    title: string;
    description: string;
    icon: HighlightIcon;
    href: string;
    actionLabel: string;
  }[];
  detailsLabel: string;
  centerpiece: string;
  allServices: { href: string; label: string };
  details: { id: string; label: string; icon: HighlightIcon; href: string }[];
};

const majorCategories: { id: CategoryId; icon: HighlightIcon }[] = [
  { id: "salon-hair", icon: "beauty" },
  { id: "facial-treatments", icon: "skin" },
  { id: "spa-wellness", icon: "wellness" },
];
const majorServices: { slug: string; icon: HighlightIcon }[] = [
  { slug: "skincare", icon: "skin" },
  { slug: "hair", icon: "beauty" },
  { slug: "manicure", icon: "detail" },
  { slug: "massage", icon: "calm" },
  { slug: "yoga-classes", icon: "wellness" },
  { slug: "reformer-pilates", icon: "care" },
];

export function getHighlightsContent(lang: Language): HighlightsContent {
  return {
    eyebrow: localized("The essentials", "جوهر تجربتنا")[lang],
    title: localized("Thoughtfully yours", "كل التفاصيل من أجلك")[lang],
    categories: majorCategories.flatMap(({ id, icon }) => {
      const category = categories.find((item) => item.id === id);
      return category
        ? [
            {
              id,
              title: category.title[lang],
              description: category.description[lang],
              icon,
              href: `/${lang}/services/categories/${id}`,
              actionLabel: localized("Explore services", "اكتشفي الخدمات")[
                lang
              ],
            },
          ]
        : [];
    }),
    detailsLabel: localized("Explore your care", "اكتشفي عنايتك")[lang],
    centerpiece: localized("Care centred\non you", "عناية تتمحور\nحولك")[lang],
    allServices: {
      href: `/${lang}/services`,
      label: localized("Explore all services", "اكتشفي جميع الخدمات")[lang],
    },
    details: majorServices.flatMap(({ slug, icon }) => {
      const service = getService(slug);
      return service
        ? [
            {
              id: slug,
              label: service.title[lang],
              icon,
              href: `/${lang}/services/${slug}`,
            },
          ]
        : [];
    }),
  };
}
