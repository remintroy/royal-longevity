import "server-only";
import type { Language } from "@/data/site";
import { getSectionContent } from "./section-content";
import type { LandingSectionId } from "./sections";

/** Landing-page content with CMS edits applied over the typed defaults. */
export async function getLandingSection<Id extends LandingSectionId>(
  id: Id,
  lang: Language,
) {
  const content = await getSectionContent(id, lang);
  if (id !== "curatedServices") return content;

  // The curated strip shows the gallery photos, which are edited in the Gallery section.
  const gallery = await getSectionContent("gallery", lang);
  return { ...content, images: gallery.images };
}
