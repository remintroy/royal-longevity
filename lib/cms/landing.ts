import "server-only";
import type { Language } from "@/data/site";
import { applyOverrides, getOverrides } from "./overrides";
import {
  getDefaultSectionContent,
  landingSections,
  type LandingSectionId,
} from "./sections";

/** Landing-page content with CMS edits applied over the typed defaults. */
export async function getLandingSection<Id extends LandingSectionId>(
  id: Id,
  lang: Language,
): Promise<ReturnType<(typeof landingSections)[Id]["get"]>> {
  const overrides = await getOverrides();
  const section = landingSections[id];
  const skip = "skip" in section ? section.skip : [];
  return applyOverrides(
    id,
    lang,
    getDefaultSectionContent(id, lang),
    overrides,
    skip,
  ) as ReturnType<(typeof landingSections)[Id]["get"]>;
}
