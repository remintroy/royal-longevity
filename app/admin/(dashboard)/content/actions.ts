"use server";

import { requireAdmin } from "@/lib/cms/auth";
import {
  countErrors,
  failure,
  type ActionResult,
} from "@/lib/cms/action-result";
import { listSiteImages } from "@/lib/cms/images";
import { publishContentChange } from "@/lib/cms/publish";
import {
  getDefaultSectionValue,
  LEGACY_OVERRIDES_COLLECTION,
  parseSectionValue,
  SECTIONS_COLLECTION,
  type StoredSection,
} from "@/lib/cms/section-content";
import { getSectionSchema, isLandingSectionId } from "@/lib/cms/sections";
import { getDb } from "@/lib/mongodb";

const noDatabase = failure(
  "The database is not configured (MONGODB_URI), so nothing was saved.",
);

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function saveSection(
  sectionId: string,
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  if (!isLandingSectionId(sectionId)) return failure("Unknown section.");
  const db = await getDb();
  if (!db) return noDatabase;

  const images = await listSiteImages();
  const { value, errors } = parseSectionValue(
    getSectionSchema(sectionId),
    input,
    getDefaultSectionValue(sectionId),
    { strict: true, imageUrls: images.length ? new Set(images) : null },
  );
  if (Object.keys(errors).length > 0) {
    return failure(`Not saved. ${countErrors(errors)}`, errors);
  }

  await db
    .collection<StoredSection>(SECTIONS_COLLECTION)
    .updateOne(
      { _id: sectionId },
      { $set: { value, updatedAt: new Date() } },
      { upsert: true },
    );
  // Edits from the earlier line-by-line editor are now part of the saved document.
  await db
    .collection<{ _id: string }>(LEGACY_OVERRIDES_COLLECTION)
    .deleteMany({ _id: { $regex: `^${escapeRegExp(sectionId)}\\.` } });

  publishContentChange();
  return { ok: true, message: "Saved and published." };
}

export async function resetSection(sectionId: string): Promise<ActionResult> {
  await requireAdmin();
  if (!isLandingSectionId(sectionId)) return failure("Unknown section.");
  const db = await getDb();
  if (!db) return noDatabase;

  await Promise.all([
    db
      .collection<StoredSection>(SECTIONS_COLLECTION)
      .deleteOne({ _id: sectionId }),
    db
      .collection<{ _id: string }>(LEGACY_OVERRIDES_COLLECTION)
      .deleteMany({ _id: { $regex: `^${escapeRegExp(sectionId)}\\.` } }),
  ]);

  publishContentChange();
  return { ok: true, message: "Original text restored." };
}
