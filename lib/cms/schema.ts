import type { Language } from "@/data/site";

// Field schemas describe how a landing-page section is edited in the CMS.
// This module is shared by the admin editor (client) and the server, so it must
// stay free of server-only imports.

export const cmsLanguages = ["en", "ar"] as const satisfies readonly Language[];

type BaseField = {
  /** Dot path into the section content, e.g. "title" or "image.alt". */
  key: string;
  label: string;
  help?: string;
};

/** Copy written separately in English and Arabic. */
export type TextFieldSchema = BaseField & {
  type: "text" | "multiline";
  /** Allows the field to be left empty. */
  optional?: boolean;
};

/** An image path shared by both languages. */
export type ImageFieldSchema = BaseField & { type: "image" };

/**
 * A link shared by both languages. Site pages are stored without the language
 * prefix ("/services") and localized when the page renders ("/ar/services").
 */
export type LinkFieldSchema = BaseField & { type: "link" };

/** One value from a fixed list, shared by both languages. */
export type ChoiceFieldSchema = BaseField & {
  type: "choice";
  options: readonly { value: string; label: string }[];
};

export type ScalarFieldSchema =
  TextFieldSchema | ImageFieldSchema | LinkFieldSchema | ChoiceFieldSchema;

export type ListFieldSchema = BaseField & {
  type: "list";
  /** Singular name for one entry, e.g. "Question". */
  itemLabel: string;
  min: number;
  max: number;
  fields: readonly ScalarFieldSchema[];
};

export type FieldSchema = ScalarFieldSchema | ListFieldSchema;

export type SectionSchema = {
  label: string;
  description: string;
  fields: readonly FieldSchema[];
};

export type LocalizedValue = Record<Language, string>;
export type ScalarValue = LocalizedValue | string;

export type ListItemValue = {
  /** Stable identity of the entry; becomes the item's `id` where content has one. */
  key: string;
  fields: Record<string, ScalarValue>;
};

/** The editable state of a whole section, keyed by field key. */
export type SectionValue = Record<string, ScalarValue | ListItemValue[]>;

/** Validation messages keyed by field path, e.g. "title.ar" or "items.faq-1.answer.en". */
export type FieldErrors = Record<string, string>;

export function isLocalizedField(
  field: ScalarFieldSchema,
): field is TextFieldSchema {
  return field.type === "text" || field.type === "multiline";
}

export function emptyScalar(field: ScalarFieldSchema): ScalarValue {
  if (isLocalizedField(field)) return { en: "", ar: "" };
  if (field.type === "choice") return field.options[0]?.value ?? "";
  return "";
}

export function errorKey(...parts: string[]) {
  return parts.join(".");
}
