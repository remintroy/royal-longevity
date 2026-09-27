import type { LocalizedText } from "@/data/inner/localization";

export type CategoryId =
  | "gym-fitness"
  | "yoga"
  | "pilates"
  | "swimming-pool"
  | "spa-wellness"
  | "facial-treatments"
  | "makeup"
  | "salon-hair"
  | "nails-pedicure";
export type AccessModel = "membership" | "appointment" | "both";
export type Category = {
  id: CategoryId;
  title: LocalizedText;
  description: LocalizedText;
  access: AccessModel;
  group: "fitness" | "wellness" | "beauty";
  image?: string;
};
export type ServiceGalleryImage = {
  src: string;
  alt: LocalizedText;
};

export type Service = {
  slug: string;
  category: CategoryId;
  title: LocalizedText;
  description: LocalizedText;
  access: AccessModel;
  image?: string;
  /** Ordered gallery photography, with the lead image first. */
  gallery?: ServiceGalleryImage[];
  published: boolean;
  /** Null excludes this service. A number selects it and sets its homepage order. */
  homepageOrder: number | null;
};
export type MembershipPlan = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  categories: CategoryId[];
  poolAccess: "included" | "not-included";
};
