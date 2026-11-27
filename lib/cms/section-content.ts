import "server-only";
import { unstable_cache } from "next/cache";
import type { Language } from "@/data/site";
import { getDb } from "@/lib/mongodb";
import { applyOverrides, CMS_CONTENT_TAG, getOverrides } from "./overrides";
import {
  cmsLanguages,
  emptyScalar,
  errorKey,
  isLocalizedField,
  type FieldErrors,
  type ListFieldSchema,
  type ListItemValue,
  type ScalarFieldSchema,
  type ScalarValue,
  type SectionSchema,
  type SectionValue,
} from "./schema";
import {
  getDefaultSectionContent,
  getSectionSchema,
  type LandingSectionId,
} from "./sections";

export const SECTIONS_COLLECTION = "content_sections";
export const LEGACY_OVERRIDES_COLLECTION = "content_overrides";

export type StoredSection = {
  _id: string;
  value: SectionValue;
  updatedAt: Date;
};

const MAX_TEXT_LENGTH = 4000;
const itemKeyPattern = /^[A-Za-z0-9_-]{1,64}$/;
const linkPattern =
  /^(?:\/(?!\/)\S*|https:\/\/\S+|mailto:\S+|tel:\+?[\d\s-]+|#[\w-]*)$/;

// ---------------------------------------------------------------------------
// Paths and links

type ContentNode = Record<string, unknown>;

function getAtPath(target: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (node, key) =>
        node && typeof node === "object"
          ? (node as ContentNode)[key]
          : undefined,
      target,
    );
}

function setAtPath(target: ContentNode, path: string, value: unknown) {
  const keys = path.split(".");
  const last = keys.pop();
  let node = target;
  for (const key of keys) {
    if (!node[key] || typeof node[key] !== "object") node[key] = {};
    node = node[key] as ContentNode;
  }
  if (last !== undefined) node[last] = value;
}

/** Site paths are stored without a language prefix so one link serves both languages. */
function isSitePath(href: string) {
  return (
    href.startsWith("/") &&
    !href.startsWith("/assets/") &&
    !href.startsWith("/branding/")
  );
}

function stripLanguage(href: string) {
  for (const lang of cmsLanguages) {
    if (href === `/${lang}`) return "/";
    if (href.startsWith(`/${lang}/`) || href.startsWith(`/${lang}#`)) {
      return href.slice(lang.length + 1);
    }
  }
  return href;
}

function localizeHref(href: string, lang: Language) {
  if (!isSitePath(href)) return href;
  return href === "/" ? `/${lang}` : `/${lang}${href}`;
}

// ---------------------------------------------------------------------------
// Content ⇄ editable value

function scalarFromContent(
  field: ScalarFieldSchema,
  english: unknown,
  arabic: unknown,
): ScalarValue {
  const asText = (value: unknown) => (typeof value === "string" ? value : "");
  if (isLocalizedField(field)) {
    return { en: asText(english), ar: asText(arabic) };
  }
  if (field.type === "link") return stripLanguage(asText(english));
  return asText(english);
}

/** Builds the editable value of a section from its English and Arabic content. */
function valueFromContent(
  schema: SectionSchema,
  english: unknown,
  arabic: unknown,
): SectionValue {
  const value: SectionValue = {};
  for (const field of schema.fields) {
    if (field.type !== "list") {
      value[field.key] = scalarFromContent(
        field,
        getAtPath(english, field.key),
        getAtPath(arabic, field.key),
      );
      continue;
    }
    const englishItems = getAtPath(english, field.key);
    const arabicItems = getAtPath(arabic, field.key);
    const items = Array.isArray(englishItems) ? englishItems : [];
    value[field.key] = items.map((item: unknown, index) => {
      const arabicItem = Array.isArray(arabicItems)
        ? arabicItems[index]
        : undefined;
      const id = getAtPath(item, "id");
      return {
        key: typeof id === "string" ? id : `item-${index + 1}`,
        fields: Object.fromEntries(
          field.fields.map((itemField) => [
            itemField.key,
            scalarFromContent(
              itemField,
              getAtPath(item, itemField.key),
              getAtPath(arabicItem, itemField.key),
            ),
          ]),
        ),
      };
    });
  }
  return value;
}

export function getDefaultSectionValue(id: LandingSectionId) {
  return valueFromContent(
    getSectionSchema(id),
    getDefaultSectionContent(id, "en"),
    getDefaultSectionContent(id, "ar"),
  );
}

function scalarForLanguage(
  field: ScalarFieldSchema,
  value: ScalarValue,
  lang: Language,
) {
  if (typeof value !== "string") return value[lang];
  return field.type === "link" ? localizeHref(value, lang) : value;
}

/** Renders a section's editable value as the typed content the components expect. */
function materializeSection<Id extends LandingSectionId>(
  id: Id,
  lang: Language,
  value: SectionValue,
) {
  const content = structuredClone(
    getDefaultSectionContent(id, lang),
  ) as unknown as ContentNode;

  for (const field of getSectionSchema(id).fields) {
    const fieldValue = value[field.key];
    if (field.type !== "list") {
      if (fieldValue !== undefined && !Array.isArray(fieldValue)) {
        setAtPath(
          content,
          field.key,
          scalarForLanguage(field, fieldValue, lang),
        );
      }
      continue;
    }
    if (!Array.isArray(fieldValue)) continue;

    const defaults = getAtPath(content, field.key);
    const defaultItems: ContentNode[] = Array.isArray(defaults) ? defaults : [];
    const items = fieldValue.map((item, index) => {
      // Start from the matching default entry so content outside the schema
      // (for example a figure's star rating) is preserved.
      const base = structuredClone(
        defaultItems.find((entry) => entry.id === item.key) ??
          defaultItems[index] ??
          defaultItems[0] ??
          {},
      );
      if ("id" in base) base.id = item.key;
      for (const itemField of field.fields) {
        const itemValue = item.fields[itemField.key];
        if (itemValue !== undefined) {
          setAtPath(
            base,
            itemField.key,
            scalarForLanguage(itemField, itemValue, lang),
          );
        }
      }
      return base;
    });
    setAtPath(content, field.key, items);
  }

  return content as unknown as ReturnType<typeof getDefaultSectionContent<Id>>;
}

// ---------------------------------------------------------------------------
// Validation

type ParseOptions = {
  /** Strict mode reports problems; lenient mode silently falls back to defaults. */
  strict: boolean;
  /** Known image URLs. Null when the image folder could not be read. */
  imageUrls: ReadonlySet<string> | null;
};

function parseScalar(
  field: ScalarFieldSchema,
  raw: unknown,
  fallback: ScalarValue,
  path: string,
  errors: FieldErrors,
  options: ParseOptions,
): ScalarValue {
  if (isLocalizedField(field)) {
    const source =
      raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
    const fallbackText =
      typeof fallback === "string" ? { en: fallback, ar: fallback } : fallback;
    const result = { en: "", ar: "" };
    for (const lang of cmsLanguages) {
      const text = source[lang];
      if (typeof text !== "string") {
        result[lang] = fallbackText[lang];
        if (options.strict) errors[errorKey(path, lang)] = "Missing text.";
        continue;
      }
      const trimmed = text.trim();
      result[lang] = trimmed;
      if (!options.strict) continue;
      if (!trimmed && !field.optional) {
        errors[errorKey(path, lang)] =
          lang === "en" ? "Enter the English text." : "Enter the Arabic text.";
      } else if (trimmed.length > MAX_TEXT_LENGTH) {
        errors[errorKey(path, lang)] =
          `Keep this under ${MAX_TEXT_LENGTH} characters.`;
      }
    }
    return result;
  }

  if (typeof raw !== "string") {
    if (options.strict) errors[path] = "Missing value.";
    return fallback;
  }
  const trimmed = raw.trim();
  if (!options.strict) return trimmed || fallback;

  if (field.type === "choice") {
    if (!field.options.some((option) => option.value === trimmed)) {
      errors[path] = "Choose one of the options.";
    }
  } else if (field.type === "image") {
    const known =
      options.imageUrls?.has(trimmed) ?? trimmed.startsWith("/assets/");
    if (!known) errors[path] = "Choose an image from the library.";
  } else if (!linkPattern.test(trimmed)) {
    errors[path] =
      "Use a site path such as /services, or a full https:// address.";
  }
  return trimmed;
}

function parseList(
  field: ListFieldSchema,
  raw: unknown,
  fallback: ListItemValue[],
  errors: FieldErrors,
  options: ParseOptions,
): ListItemValue[] {
  if (!Array.isArray(raw)) {
    if (options.strict) errors[field.key] = "Missing list.";
    return fallback;
  }
  if (raw.length < field.min || raw.length > field.max) {
    if (!options.strict) return fallback;
    errors[field.key] =
      field.min === field.max
        ? `This list needs exactly ${field.min} entries.`
        : `This list needs ${field.min}–${field.max} entries.`;
  }

  const seenKeys = new Set<string>();
  const items: ListItemValue[] = [];
  raw.forEach((rawItem: unknown, index) => {
    const source =
      rawItem && typeof rawItem === "object"
        ? (rawItem as Record<string, unknown>)
        : {};
    let key = typeof source.key === "string" ? source.key : "";
    if (!itemKeyPattern.test(key) || seenKeys.has(key)) {
      if (options.strict) {
        errors[field.key] =
          "The list contains an invalid entry. Reload and try again.";
      }
      key = `item-${index + 1}`;
    }
    seenKeys.add(key);

    const fallbackItem =
      fallback.find((item) => item.key === key) ?? fallback[index];
    const rawFields =
      source.fields && typeof source.fields === "object"
        ? (source.fields as Record<string, unknown>)
        : {};
    items.push({
      key,
      fields: Object.fromEntries(
        field.fields.map((itemField) => [
          itemField.key,
          parseScalar(
            itemField,
            rawFields[itemField.key],
            fallbackItem?.fields[itemField.key] ?? emptyScalar(itemField),
            errorKey(field.key, key, itemField.key),
            errors,
            options,
          ),
        ]),
      ),
    });
  });
  return items;
}

/**
 * Checks a section value against its schema. Strict mode is used for saves and
 * reports every problem; lenient mode is used for stored data so that content
 * saved under an older schema still renders, falling back to defaults.
 */
export function parseSectionValue(
  schema: SectionSchema,
  raw: unknown,
  fallback: SectionValue,
  options: ParseOptions,
): { value: SectionValue; errors: FieldErrors } {
  const source =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const errors: FieldErrors = {};
  const value: SectionValue = {};
  for (const field of schema.fields) {
    const fallbackValue = fallback[field.key];
    if (field.type === "list") {
      value[field.key] = parseList(
        field,
        source[field.key],
        Array.isArray(fallbackValue) ? fallbackValue : [],
        errors,
        options,
      );
    } else {
      value[field.key] = parseScalar(
        field,
        source[field.key],
        fallbackValue !== undefined && !Array.isArray(fallbackValue)
          ? fallbackValue
          : emptyScalar(field),
        field.key,
        errors,
        options,
      );
    }
  }
  return { value, errors };
}

// ---------------------------------------------------------------------------
// Reading saved content

export const getStoredSections = unstable_cache(
  async (): Promise<Record<string, { value: unknown; updatedAt: string }>> => {
    const db = await getDb();
    if (!db) return {};
    const rows = await db
      .collection<StoredSection>(SECTIONS_COLLECTION)
      .find()
      .toArray();
    return Object.fromEntries(
      rows.map((row) => [
        row._id,
        { value: row.value, updatedAt: row.updatedAt.toISOString() },
      ]),
    );
  },
  ["cms-sections"],
  { tags: [CMS_CONTENT_TAG] },
);

export type SectionState = {
  value: SectionValue;
  defaults: SectionValue;
  /** "legacy" means edits made with the earlier line-by-line editor. */
  source: "default" | "saved" | "legacy";
  updatedAt?: string;
};

/** The current editable value of a section, with its defaults for comparison. */
export async function getSectionState(
  id: LandingSectionId,
): Promise<SectionState> {
  const schema = getSectionSchema(id);
  const defaults = getDefaultSectionValue(id);
  const [stored, overrides] = await Promise.all([
    getStoredSections(),
    getOverrides(),
  ]);

  const saved = stored[id];
  if (saved) {
    return {
      value: parseSectionValue(schema, saved.value, defaults, {
        strict: false,
        imageUrls: null,
      }).value,
      defaults,
      source: "saved",
      updatedAt: saved.updatedAt,
    };
  }

  const hasLegacyEdits = Object.keys(overrides).some((key) =>
    key.startsWith(`${id}.`),
  );
  if (!hasLegacyEdits) return { value: defaults, defaults, source: "default" };

  const [english, arabic] = cmsLanguages.map((lang) =>
    applyOverrides(id, lang, getDefaultSectionContent(id, lang), overrides),
  );
  return {
    value: valueFromContent(schema, english, arabic),
    defaults,
    source: "legacy",
  };
}

/** Landing-page content for one language with CMS edits applied over the typed defaults. */
export async function getSectionContent<Id extends LandingSectionId>(
  id: Id,
  lang: Language,
) {
  const { value } = await getSectionState(id);
  return materializeSection(id, lang, value);
}
