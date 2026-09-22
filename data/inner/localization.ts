import type { Language } from "@/data/site";

export type LocalizedText = Record<Language, string>;

export function localized(en: string, ar: string): LocalizedText {
  return { en, ar };
}
