"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  endSession,
  isAdmin,
  isPasswordValid,
  startSession,
} from "@/lib/cms/auth";
import {
  CMS_CONTENT_TAG,
  listEditableFields,
  overrideKey,
} from "@/lib/cms/overrides";
import {
  getDefaultSectionContent,
  isLandingSectionId,
  landingSections,
} from "@/lib/cms/sections";
import { getDb } from "@/lib/mongodb";

const languages = ["en", "ar"] as const;

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!isPasswordValid(password)) redirect("/admin?error=1");
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin");
}

export async function saveSection(sectionId: string, formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  if (!isLandingSectionId(sectionId)) throw new Error("Unknown section");
  const db = await getDb();
  if (!db) redirect(`/admin/${sectionId}?error=db`);

  const section = landingSections[sectionId];
  const skip = "skip" in section ? section.skip : [];
  const operations = languages.flatMap((lang) =>
    listEditableFields(getDefaultSectionContent(sectionId, lang), skip).map(
      (field) => {
        const key = overrideKey(sectionId, lang, field.path);
        const submitted = formData.get(`${lang}::${field.path}`);
        // Only changed text is stored; text matching the default clears the override.
        if (typeof submitted !== "string" || submitted === field.value) {
          return { deleteOne: { filter: { _id: key } } };
        }
        return {
          updateOne: {
            filter: { _id: key },
            update: { $set: { value: submitted, updatedAt: new Date() } },
            upsert: true,
          },
        };
      },
    ),
  );

  await db
    .collection<{ _id: string }>("content_overrides")
    .bulkWrite(operations);
  revalidateTag(CMS_CONTENT_TAG, "max");
  revalidatePath("/[lang]", "layout");
  redirect(`/admin/${sectionId}?saved=1`);
}
