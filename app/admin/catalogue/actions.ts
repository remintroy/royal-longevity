"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { builtInCategoryIds, builtInServiceSlugs } from "@/data/catalogue";
import { isAdmin } from "@/lib/cms/auth";
import { slugPattern } from "@/lib/cms/catalogue";
import { CMS_CONTENT_TAG } from "@/lib/cms/overrides";
import { getDb } from "@/lib/mongodb";

const accessModels = ["membership", "appointment", "both"] as const;
const groups = ["fitness", "wellness", "beauty"] as const;

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function oneOf<T extends string>(value: string, allowed: readonly T[]) {
  return allowed.find((item) => item === value);
}

async function requireAdminDb() {
  if (!(await isAdmin())) redirect("/admin");
  const db = await getDb();
  if (!db) redirect("/admin/catalogue?error=db");
  return db;
}

function finish(message: string): never {
  revalidateTag(CMS_CONTENT_TAG, "max");
  revalidatePath("/[lang]", "layout");
  redirect(`/admin/catalogue?${message}`);
}

export async function saveCategory(formData: FormData) {
  const db = await requireAdminDb();
  const id = text(formData, "id");
  const access = oneOf(text(formData, "access"), accessModels);
  const group = oneOf(text(formData, "group"), groups);
  const titleEn = text(formData, "title.en");
  const titleAr = text(formData, "title.ar");
  const descriptionEn = text(formData, "description.en");
  const descriptionAr = text(formData, "description.ar");
  const valid =
    slugPattern.test(id) &&
    !builtInCategoryIds.has(id) &&
    access &&
    group &&
    titleEn &&
    titleAr &&
    descriptionEn &&
    descriptionAr;
  if (!valid) redirect("/admin/catalogue?error=category");

  const image = text(formData, "image");
  await db.collection<{ _id: string }>("catalogue_categories").updateOne(
    { _id: id },
    {
      $set: {
        title: { en: titleEn, ar: titleAr },
        description: { en: descriptionEn, ar: descriptionAr },
        access,
        group,
        image: image || undefined,
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );
  finish("saved=category");
}

export async function saveService(formData: FormData) {
  const db = await requireAdminDb();
  const slug = text(formData, "slug");
  const category = text(formData, "category");
  const access = oneOf(text(formData, "access"), accessModels);
  const titleEn = text(formData, "title.en");
  const titleAr = text(formData, "title.ar");
  const descriptionEn = text(formData, "description.en");
  const descriptionAr = text(formData, "description.ar");
  const categoryExists =
    builtInCategoryIds.has(category) ||
    Boolean(
      await db
        .collection<{ _id: string }>("catalogue_categories")
        .findOne({ _id: category }),
    );
  const valid =
    slugPattern.test(slug) &&
    !builtInServiceSlugs.has(slug) &&
    categoryExists &&
    access &&
    titleEn &&
    titleAr &&
    descriptionEn &&
    descriptionAr;
  if (!valid) redirect("/admin/catalogue?error=service");

  const image = text(formData, "image");
  await db.collection<{ _id: string }>("catalogue_services").updateOne(
    { _id: slug },
    {
      $set: {
        category,
        title: { en: titleEn, ar: titleAr },
        description: { en: descriptionEn, ar: descriptionAr },
        access,
        image: image || undefined,
        published: formData.get("published") === "on",
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );
  finish("saved=service");
}

export async function deleteCategory(formData: FormData) {
  const db = await requireAdminDb();
  const id = text(formData, "id");
  const inUse = await db
    .collection("catalogue_services")
    .countDocuments({ category: id });
  if (inUse > 0) redirect("/admin/catalogue?error=category-in-use");
  await db
    .collection<{ _id: string }>("catalogue_categories")
    .deleteOne({ _id: id });
  finish("deleted=category");
}

export async function deleteService(formData: FormData) {
  const db = await requireAdminDb();
  await db
    .collection<{ _id: string }>("catalogue_services")
    .deleteOne({ _id: text(formData, "slug") });
  finish("deleted=service");
}
