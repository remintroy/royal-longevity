"use server";

import { redirect } from "next/navigation";
import { MongoServerError } from "mongodb";
import {
  builtInCategories,
  builtInCategoryIds,
  builtInServices,
  builtInServiceSlugs,
} from "@/data/catalogue";
import type { ServiceGalleryImage } from "@/data/catalogue/types";
import type { LocalizedText } from "@/data/inner/localization";
import {
  countErrors,
  failure,
  type ActionResult,
} from "@/lib/cms/action-result";
import { requireAdmin } from "@/lib/cms/auth";
import {
  CATEGORIES_COLLECTION,
  SERVICES_COLLECTION,
  type StoredCategory,
  type StoredService,
} from "@/lib/cms/catalogue";
import {
  accessOptions,
  groupOptions,
  slugPattern,
} from "@/lib/cms/catalogue-options";
import { galleryKeyFromUrl, listSiteImages } from "@/lib/cms/images";
import { publishContentChange } from "@/lib/cms/publish";
import type { FieldErrors } from "@/lib/cms/schema";
import { getDb } from "@/lib/mongodb";

const MAX_TITLE = 120;
const MAX_DESCRIPTION = 600;
const MAX_GALLERY = 12;

const noDatabase = failure(
  "The database is not configured (MONGODB_URI), so nothing was saved.",
);

type Source = Record<string, unknown>;

function asObject(value: unknown): Source {
  return value && typeof value === "object" ? (value as Source) : {};
}

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readLocalized(
  source: Source,
  name: string,
  maxLength: number,
  errors: FieldErrors,
): LocalizedText {
  const raw = asObject(source[name]);
  const value = { en: asText(raw.en), ar: asText(raw.ar) };
  for (const lang of ["en", "ar"] as const) {
    const key = `${name}.${lang}`;
    if (!value[lang]) {
      errors[key] =
        lang === "en" ? "Enter the English text." : "Enter the Arabic text.";
    } else if (value[lang].length > maxLength) {
      errors[key] = `Keep this under ${maxLength} characters.`;
    }
  }
  return value;
}

function readChoice<T extends string>(
  source: Source,
  name: string,
  options: readonly { value: T }[],
  errors: FieldErrors,
): T {
  const value = asText(source[name]);
  const match = options.find((option) => option.value === value);
  if (!match) errors[name] = "Choose one of the options.";
  return (match ?? options[0]).value;
}

function readSlug(source: Source, name: string, errors: FieldErrors) {
  const slug = asText(source[name]);
  if (!slugPattern.test(slug) || slug.length > 80) {
    errors[name] =
      "Use lowercase letters, numbers and single hyphens, e.g. laser-hair-removal.";
  }
  return slug;
}

/** Validates the lead image and converts its URL to a catalogue image key. */
function readImageKey(
  source: Source,
  knownImages: ReadonlySet<string>,
  errors: FieldErrors,
) {
  const url = asText(source.image);
  if (!url) return undefined;
  const key = galleryKeyFromUrl(url);
  if (!key || (knownImages.size > 0 && !knownImages.has(url))) {
    errors.image = "Choose an image from the gallery folder of the library.";
    return undefined;
  }
  return key;
}

function readGallery(
  source: Source,
  knownImages: ReadonlySet<string>,
  errors: FieldErrors,
): ServiceGalleryImage[] {
  const raw = Array.isArray(source.gallery) ? source.gallery : [];
  if (raw.length > MAX_GALLERY) {
    errors.gallery = `Use up to ${MAX_GALLERY} photos.`;
  }
  return raw.slice(0, MAX_GALLERY).map((entry: unknown, index) => {
    const item = asObject(entry);
    const key = typeof item.key === "string" ? item.key : String(index);
    const itemErrors: FieldErrors = {};
    const src = asText(item.src);
    if (!src || (knownImages.size > 0 && !knownImages.has(src))) {
      itemErrors.src = "Choose a photo.";
    }
    const alt = readLocalized(item, "alt", MAX_TITLE * 2, itemErrors);
    for (const [field, message] of Object.entries(itemErrors)) {
      errors[`gallery.${key}.${field}`] = message;
    }
    return { src, alt };
  });
}

/** Splits fields into $set and $unset so clearing an optional field removes it. */
function toUpdate(fields: Record<string, unknown>, now: Date) {
  const set: Record<string, unknown> = { updatedAt: now };
  const unset: Record<string, ""> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined) unset[key] = "";
    else set[key] = value;
  }
  return {
    $set: set,
    ...(Object.keys(unset).length > 0 ? { $unset: unset } : {}),
    $setOnInsert: { createdAt: now },
  };
}

function isDuplicateKey(error: unknown) {
  return error instanceof MongoServerError && error.code === 11000;
}

// ---------------------------------------------------------------------------
// Categories

export async function saveCategory(
  mode: "create" | "update",
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  const db = await getDb();
  if (!db) return noDatabase;

  const source = asObject(input);
  const errors: FieldErrors = {};
  const knownImages = new Set(await listSiteImages());
  const id = readSlug(source, "id", errors);
  const fields = {
    title: readLocalized(source, "title", MAX_TITLE, errors),
    description: readLocalized(source, "description", MAX_DESCRIPTION, errors),
    access: readChoice(source, "access", accessOptions, errors),
    group: readChoice(source, "group", groupOptions, errors),
    image: readImageKey(source, knownImages, errors),
  };

  const collection = db.collection<StoredCategory>(CATEGORIES_COLLECTION);
  const isBuiltIn = builtInCategoryIds.has(id);
  if (!errors.id && mode === "create") {
    if (isBuiltIn || (await collection.findOne({ _id: id }))) {
      errors.id = "A category with this slug already exists. Choose another.";
    }
  }
  if (!errors.id && mode === "update" && !isBuiltIn) {
    if (!(await collection.findOne({ _id: id }))) {
      return failure(
        "This category no longer exists. It may have been deleted.",
      );
    }
  }
  if (Object.keys(errors).length > 0) {
    return failure(`Not saved. ${countErrors(errors)}`, errors);
  }

  const now = new Date();
  try {
    if (mode === "create") {
      await collection.insertOne({
        _id: id,
        ...fields,
        createdAt: now,
        updatedAt: now,
      });
    } else {
      await collection.updateOne({ _id: id }, toUpdate(fields, now), {
        upsert: isBuiltIn,
      });
    }
  } catch (error) {
    if (isDuplicateKey(error)) {
      return failure("Not saved.", {
        id: "A category with this slug already exists.",
      });
    }
    throw error;
  }

  publishContentChange();
  if (mode === "create") {
    redirect(`/admin/catalogue/categories/${id}?created=1`);
  }
  return { ok: true, message: "Saved and published." };
}

/** Counts services (built-in, edited or custom) currently filed under a category. */
async function countServicesInCategory(categoryId: string) {
  const db = await getDb();
  const rows = db
    ? await db
        .collection<StoredService>(SERVICES_COLLECTION)
        .find({}, { projection: { category: 1 } })
        .toArray()
    : [];
  const edited = new Map(rows.map((row) => [row._id, row.category]));
  const builtInCount = builtInServices.filter(
    (service) => (edited.get(service.slug) ?? service.category) === categoryId,
  ).length;
  const customCount = rows.filter(
    (row) => !builtInServiceSlugs.has(row._id) && row.category === categoryId,
  ).length;
  return builtInCount + customCount;
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  await requireAdmin();
  const db = await getDb();
  if (!db) return noDatabase;
  if (builtInCategoryIds.has(id)) {
    return failure("Built-in categories cannot be deleted.");
  }
  const inUse = await countServicesInCategory(id);
  if (inUse > 0) {
    return failure(
      `This category still has ${inUse} service${inUse === 1 ? "" : "s"}. Move or delete them first.`,
    );
  }
  await db
    .collection<StoredCategory>(CATEGORIES_COLLECTION)
    .deleteOne({ _id: id });
  publishContentChange();
  redirect("/admin/catalogue/categories?deleted=1");
}

export async function restoreCategory(id: string): Promise<ActionResult> {
  await requireAdmin();
  const db = await getDb();
  if (!db) return noDatabase;
  if (!builtInCategories.some((category) => category.id === id)) {
    return failure("Only built-in categories can be restored.");
  }
  await db
    .collection<StoredCategory>(CATEGORIES_COLLECTION)
    .deleteOne({ _id: id });
  publishContentChange();
  redirect(`/admin/catalogue/categories/${id}?restored=1`);
}

// ---------------------------------------------------------------------------
// Services

export async function saveService(
  mode: "create" | "update",
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  const db = await getDb();
  if (!db) return noDatabase;

  const source = asObject(input);
  const errors: FieldErrors = {};
  const knownImages = new Set(await listSiteImages());
  const slug = readSlug(source, "slug", errors);
  const category = asText(source.category);
  const gallery = readGallery(source, knownImages, errors);
  const fields = {
    category,
    title: readLocalized(source, "title", MAX_TITLE, errors),
    description: readLocalized(source, "description", MAX_DESCRIPTION, errors),
    access: readChoice(source, "access", accessOptions, errors),
    image: readImageKey(source, knownImages, errors),
    published: source.published === true,
    // An empty list means "use the automatic gallery".
    gallery: gallery.length > 0 ? gallery : undefined,
  };

  const categoryExists =
    builtInCategoryIds.has(category) ||
    Boolean(
      category &&
      (await db
        .collection<StoredCategory>(CATEGORIES_COLLECTION)
        .findOne({ _id: category })),
    );
  if (!categoryExists) errors.category = "Choose a category.";

  const collection = db.collection<StoredService>(SERVICES_COLLECTION);
  const isBuiltIn = builtInServiceSlugs.has(slug);
  if (!errors.slug && mode === "create") {
    if (isBuiltIn || (await collection.findOne({ _id: slug }))) {
      errors.slug = "A service with this slug already exists. Choose another.";
    }
  }
  if (!errors.slug && mode === "update" && !isBuiltIn) {
    if (!(await collection.findOne({ _id: slug }))) {
      return failure(
        "This service no longer exists. It may have been deleted.",
      );
    }
  }
  if (Object.keys(errors).length > 0) {
    return failure(`Not saved. ${countErrors(errors)}`, errors);
  }

  const now = new Date();
  try {
    if (mode === "create") {
      await collection.insertOne({
        _id: slug,
        ...fields,
        createdAt: now,
        updatedAt: now,
      });
    } else {
      await collection.updateOne({ _id: slug }, toUpdate(fields, now), {
        upsert: isBuiltIn,
      });
    }
  } catch (error) {
    if (isDuplicateKey(error)) {
      return failure("Not saved.", {
        slug: "A service with this slug already exists.",
      });
    }
    throw error;
  }

  publishContentChange();
  if (mode === "create") {
    redirect(`/admin/catalogue/services/${slug}?created=1`);
  }
  return { ok: true, message: "Saved and published." };
}

export async function deleteService(slug: string): Promise<ActionResult> {
  await requireAdmin();
  const db = await getDb();
  if (!db) return noDatabase;
  if (builtInServiceSlugs.has(slug)) {
    return failure("Built-in services cannot be deleted. Hide them instead.");
  }
  await db
    .collection<StoredService>(SERVICES_COLLECTION)
    .deleteOne({ _id: slug });
  publishContentChange();
  redirect("/admin/catalogue/services?deleted=1");
}

export async function restoreService(slug: string): Promise<ActionResult> {
  await requireAdmin();
  const db = await getDb();
  if (!db) return noDatabase;
  if (!builtInServiceSlugs.has(slug)) {
    return failure("Only built-in services can be restored.");
  }
  await db
    .collection<StoredService>(SERVICES_COLLECTION)
    .deleteOne({ _id: slug });
  publishContentChange();
  redirect(`/admin/catalogue/services/${slug}?restored=1`);
}
