import "server-only";
import { revalidatePath, updateTag } from "next/cache";
import { CMS_CONTENT_TAG } from "./overrides";

/**
 * Makes saved CMS changes visible immediately: the admin sees its own write on the
 * next render, and every localized site page is regenerated.
 * Call only from Server Actions.
 */
export function publishContentChange() {
  updateTag(CMS_CONTENT_TAG);
  revalidatePath("/[lang]", "layout");
}
