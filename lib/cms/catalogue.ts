import "server-only";
import { unstable_cache } from "next/cache";
import {
  builtInCategories,
  builtInCategoryIds,
  builtInServices,
  builtInServiceSlugs,
  setDynamicCatalogue,
} from "@/data/catalogue";
import type {
  Category,
  Service,
  ServiceGalleryImage,
} from "@/data/catalogue/types";
import { getDb } from "@/lib/mongodb";
import { CMS_CONTENT_TAG } from "./overrides";

export const CATEGORIES_COLLECTION = "catalogue_categories";
export const SERVICES_COLLECTION = "catalogue_services";

/** A category saved in the CMS. Its id is either new or the id of a built-in category it edits. */
export type StoredCategory = Omit<Category, "id"> & {
  _id: string;
  createdAt: Date;
  updatedAt?: Date;
};

/** A service saved in the CMS. Its id is either new or the slug of a built-in service it edits. */
export type StoredService = Omit<Service, "slug" | "homepageOrder"> & {
  _id: string;
  gallery?: ServiceGalleryImage[];
  createdAt: Date;
  updatedAt?: Date;
};

export const getDynamicCatalogue = unstable_cache(
  async (): Promise<{ categories: Category[]; services: Service[] }> => {
    const db = await getDb();
    if (!db) return { categories: [], services: [] };
    const [categoryRows, serviceRows] = await Promise.all([
      db
        .collection<StoredCategory>(CATEGORIES_COLLECTION)
        .find()
        .sort({ createdAt: 1 })
        .toArray(),
      db
        .collection<StoredService>(SERVICES_COLLECTION)
        .find()
        .sort({ createdAt: 1 })
        .toArray(),
    ]);
    return {
      categories: categoryRows.map((row) => ({
        id: row._id,
        title: row.title,
        description: row.description,
        access: row.access,
        group: row.group,
        image: row.image ?? undefined,
      })),
      services: serviceRows.map((row) => ({
        slug: row._id,
        category: row.category,
        title: row.title,
        description: row.description,
        access: row.access,
        image: row.image ?? undefined,
        gallery: row.gallery?.length ? row.gallery : undefined,
        published: row.published,
        homepageOrder: null,
      })),
    };
  },
  ["cms-catalogue"],
  { tags: [CMS_CONTENT_TAG] },
);

/** Merges CMS categories and services into the shared catalogue for this render. */
export async function hydrateCatalogue() {
  setDynamicCatalogue(await getDynamicCatalogue());
}

export type CatalogueOrigin = "built-in" | "custom";

export type AdminCategory = Category & {
  origin: CatalogueOrigin;
  /** True when a built-in category has CMS edits. */
  edited: boolean;
  serviceCount: number;
};

export type AdminService = Service & {
  origin: CatalogueOrigin;
  edited: boolean;
};

/** The full catalogue as the admin sees it: built-in entries with edits applied, then custom entries. */
export async function getAdminCatalogue() {
  const cms = await getDynamicCatalogue();
  const categoryEdits = new Map(cms.categories.map((item) => [item.id, item]));
  const serviceEdits = new Map(cms.services.map((item) => [item.slug, item]));

  const services: AdminService[] = [
    ...builtInServices.map((service) => {
      const edit = serviceEdits.get(service.slug);
      return {
        ...(edit ? { ...edit, homepageOrder: service.homepageOrder } : service),
        origin: "built-in" as const,
        edited: Boolean(edit),
      };
    }),
    ...cms.services
      .filter((service) => !builtInServiceSlugs.has(service.slug))
      .map((service) => ({
        ...service,
        origin: "custom" as const,
        edited: false,
      })),
  ];

  const countServices = (id: string) =>
    services.filter((service) => service.category === id).length;

  const categories: AdminCategory[] = [
    ...builtInCategories.map((category) => {
      const edit = categoryEdits.get(category.id);
      return {
        ...(edit ?? category),
        origin: "built-in" as const,
        edited: Boolean(edit),
        serviceCount: countServices(category.id),
      };
    }),
    ...cms.categories
      .filter((category) => !builtInCategoryIds.has(category.id))
      .map((category) => ({
        ...category,
        origin: "custom" as const,
        edited: false,
        serviceCount: countServices(category.id),
      })),
  ];

  return { categories, services };
}
