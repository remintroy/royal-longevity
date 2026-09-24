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
export type Service = {
  slug: string;
  category: CategoryId;
  title: LocalizedText;
  description: LocalizedText;
  access: AccessModel;
  image?: string;
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
