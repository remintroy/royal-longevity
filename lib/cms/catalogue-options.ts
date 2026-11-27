import type { AccessModel, Category } from "@/data/catalogue/types";

// Shared by the admin forms (client) and the catalogue actions (server).

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type CategoryGroup = Category["group"];

export const accessOptions: { value: AccessModel; label: string }[] = [
  { value: "appointment", label: "By appointment" },
  { value: "membership", label: "Membership" },
  { value: "both", label: "Membership or appointment" },
];

export const groupOptions: { value: CategoryGroup; label: string }[] = [
  { value: "beauty", label: "Beauty" },
  { value: "wellness", label: "Wellness" },
  { value: "fitness", label: "Fitness" },
];

/** Turns an English title into a URL slug, e.g. "Laser Hair Removal" → "laser-hair-removal". */
export function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function galleryImageUrl(key: string) {
  return `/assets/images/gallery/${key}.webp`;
}
