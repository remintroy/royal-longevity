import "server-only";
import { unstable_cache } from "next/cache";
import { setDynamicCatalogue } from "@/data/catalogue";
import type { AccessModel, Category, Service } from "@/data/catalogue/types";
import { getDb } from "@/lib/mongodb";
import { CMS_CONTENT_TAG } from "./overrides";

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type StoredCategory = Omit<Category, "id"> & { _id: string; createdAt: Date };
type StoredService = Omit<Service, "slug" | "homepageOrder" | "gallery"> & {
  _id: string;
  createdAt: Date;
};

export const getDynamicCatalogue = unstable_cache(
  async (): Promise<{ categories: Category[]; services: Service[] }> => {
    const db = await getDb();
    if (!db) return { categories: [], services: [] };
    const [categoryRows, serviceRows] = await Promise.all([
      db
        .collection<StoredCategory>("catalogue_categories")
        .find()
        .sort({ createdAt: 1 })
        .toArray(),
      db
        .collection<StoredService>("catalogue_services")
        .find()
        .sort({ createdAt: 1 })
        .toArray(),
    ]);
    return {
      categories: categoryRows.map(({ _id, createdAt, ...category }) => {
        void createdAt;
        return { ...category, id: _id };
      }),
      services: serviceRows.map(({ _id, createdAt, ...service }) => {
        void createdAt;
        return { ...service, slug: _id, homepageOrder: null };
      }),
    };
  },
  ["cms-catalogue"],
  { tags: [CMS_CONTENT_TAG] },
);

/** Merges CMS-created categories and services into the shared catalogue for this render. */
export async function hydrateCatalogue() {
  setDynamicCatalogue(await getDynamicCatalogue());
}

export type { AccessModel };
