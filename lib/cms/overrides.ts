import "server-only";
import { unstable_cache } from "next/cache";
import { getDb } from "@/lib/mongodb";
import type { Language } from "@/data/site";

export const CMS_CONTENT_TAG = "cms-content";

/**
 * Map of `section.lang.path` to edited text, written by the earlier line-by-line
 * editor. Still read so those edits survive; a section migrates to a structured
 * document the next time it is saved.
 */
export type Overrides = Record<string, string>;

// Keys that hold links, files, identifiers or icon names rather than editable copy.
const nonTextKeys = new Set(["id", "href", "src", "mobileSrc", "icon", "date"]);

function isEditableKey(key: string) {
  return !nonTextKeys.has(key) && !key.endsWith("Href");
}

export const getOverrides = unstable_cache(
  async (): Promise<Overrides> => {
    const db = await getDb();
    if (!db) return {};
    const rows = await db
      .collection<{ _id: string; value: string }>("content_overrides")
      .find()
      .toArray();
    return Object.fromEntries(rows.map((row) => [row._id, row.value]));
  },
  ["cms-overrides"],
  { tags: [CMS_CONTENT_TAG] },
);

export type EditableField = { path: string; value: string };

/** Lists every editable string in a content object, in document order. */
export function listEditableFields(
  content: unknown,
  skip: readonly string[] = [],
  path = "",
): EditableField[] {
  if (typeof content === "string") return [{ path, value: content }];
  if (Array.isArray(content)) {
    return content.flatMap((item, index) =>
      listEditableFields(item, skip, path ? `${path}.${index}` : `${index}`),
    );
  }
  if (content && typeof content === "object") {
    return Object.entries(content).flatMap(([key, value]) =>
      isEditableKey(key) && !skip.includes(path ? `${path}.${key}` : key)
        ? listEditableFields(value, skip, path ? `${path}.${key}` : key)
        : [],
    );
  }
  return [];
}

/** Returns a copy of `content` with stored overrides applied to its editable strings. */
export function applyOverrides<T>(
  section: string,
  lang: Language,
  content: T,
  overrides: Overrides,
  skip: readonly string[] = [],
): T {
  const result = structuredClone(content);
  for (const field of listEditableFields(content, skip)) {
    const override = overrides[overrideKey(section, lang, field.path)];
    if (override === undefined) continue;
    setAtPath(result, field.path, override);
  }
  return result;
}

export function overrideKey(section: string, lang: Language, path: string) {
  return `${section}.${lang}.${path}`;
}

function setAtPath(target: unknown, path: string, value: string) {
  const keys = path.split(".");
  const last = keys.pop();
  let node = target as Record<string, unknown>;
  for (const key of keys) node = node[key] as Record<string, unknown>;
  if (last !== undefined) node[last] = value;
}
