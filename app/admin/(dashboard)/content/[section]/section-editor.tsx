"use client";

import { useState, useTransition } from "react";
import { RotateCcw } from "lucide-react";
import type { ActionResult } from "@/lib/cms/action-result";
import {
  emptyScalar,
  errorKey,
  type FieldErrors,
  type FieldSchema,
  type ListFieldSchema,
  type ListItemValue,
  type LocalizedValue,
  type ScalarFieldSchema,
  type ScalarValue,
  type SectionSchema,
  type SectionValue,
} from "@/lib/cms/schema";
import type { LandingSectionId } from "@/lib/cms/sections";
import { ConfirmButton } from "../../../_components/confirm-button";
import {
  ChoiceField,
  FieldGroup,
  ImageField,
  LocalizedTextField,
  TextField,
} from "../../../_components/fields";
import { ListEditor, newItemKey } from "../../../_components/list-editor";
import { SaveBar, useUnsavedChanges } from "../../../_components/save-bar";
import { resetSection, saveSection } from "../actions";

const LINK_SUGGESTIONS_ID = "admin-link-suggestions";

type EditorProps = {
  sectionId: LandingSectionId;
  schema: SectionSchema;
  initialValue: SectionValue;
  defaults: SectionValue;
  images: string[];
  linkSuggestions: string[];
};

/** Splits the schema into cards: runs of single fields, and one card per list. */
function groupFields(fields: readonly FieldSchema[]) {
  const cards: (
    | { kind: "fields"; fields: ScalarFieldSchema[] }
    | { kind: "list"; field: ListFieldSchema }
  )[] = [];
  for (const field of fields) {
    if (field.type === "list") {
      cards.push({ kind: "list", field });
      continue;
    }
    const last = cards.at(-1);
    if (last?.kind === "fields") last.fields.push(field);
    else cards.push({ kind: "fields", fields: [field] });
  }
  return cards;
}

function isSame(left: unknown, right: unknown) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function ScalarInput({
  field,
  path,
  value,
  original,
  errors,
  images,
  onChange,
}: {
  field: ScalarFieldSchema;
  path: string;
  value: ScalarValue;
  original?: ScalarValue;
  errors: FieldErrors;
  images: string[];
  onChange: (value: ScalarValue) => void;
}) {
  if (field.type === "text" || field.type === "multiline") {
    const asLocalized = (input: ScalarValue): LocalizedValue =>
      typeof input === "string" ? { en: input, ar: input } : input;
    return (
      <LocalizedTextField
        label={field.label}
        help={field.help}
        multiline={field.type === "multiline"}
        optional={field.optional}
        value={asLocalized(value)}
        original={original === undefined ? undefined : asLocalized(original)}
        errors={{
          en: errors[errorKey(path, "en")],
          ar: errors[errorKey(path, "ar")],
        }}
        onChange={onChange}
      />
    );
  }

  const text = typeof value === "string" ? value : "";
  const originalText = typeof original === "string" ? original : undefined;
  if (field.type === "image") {
    return (
      <ImageField
        label={field.label}
        help={field.help}
        value={text}
        original={originalText}
        images={images}
        error={errors[path]}
        onChange={onChange}
      />
    );
  }
  if (field.type === "choice") {
    return (
      <ChoiceField
        label={field.label}
        help={field.help}
        value={text}
        original={originalText}
        options={field.options}
        error={errors[path]}
        onChange={onChange}
      />
    );
  }
  return (
    <TextField
      label={field.label}
      help={
        field.help ??
        "A site page such as /services, or a full https:// address."
      }
      value={text}
      original={originalText}
      list={LINK_SUGGESTIONS_ID}
      dir="ltr"
      placeholder="/services"
      error={errors[path]}
      onChange={onChange}
    />
  );
}

export function SectionEditor({
  sectionId,
  schema,
  initialValue,
  defaults,
  images,
  linkSuggestions,
}: EditorProps) {
  const [value, setValue] = useState(initialValue);
  const [savedValue, setSavedValue] = useState(initialValue);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<ActionResult | null>(null);
  const [pending, startTransition] = useTransition();
  const dirty = !isSame(value, savedValue);
  const matchesDefaults = isSame(value, defaults);

  const clearErrors = (path: string) =>
    setErrors((current) =>
      Object.fromEntries(
        Object.entries(current).filter(
          ([key]) => key !== path && !key.startsWith(`${path}.`),
        ),
      ),
    );

  const updateField = (key: string, fieldValue: SectionValue[string]) => {
    setValue((current) => ({ ...current, [key]: fieldValue }));
    clearErrors(key);
    setResult(null);
  };

  const save = () => {
    if (!dirty || pending) return;
    const submitted = value;
    startTransition(async () => {
      const response = await saveSection(sectionId, submitted);
      setResult(response);
      if (response.ok) {
        setSavedValue(submitted);
        setErrors({});
      } else {
        setErrors(response.errors ?? {});
      }
    });
  };

  const restoreDefaults = () => {
    startTransition(async () => {
      const response = await resetSection(sectionId);
      setResult(response);
      if (response.ok) {
        setValue(defaults);
        setSavedValue(defaults);
        setErrors({});
      }
    });
  };

  useUnsavedChanges(dirty, save);

  const renderList = (field: ListFieldSchema) => {
    const items = (value[field.key] ?? []) as ListItemValue[];
    const defaultItems = (defaults[field.key] ?? []) as ListItemValue[];
    const titleField = field.fields.find(
      (itemField) =>
        itemField.type === "text" || itemField.type === "multiline",
    );
    const itemErrorPrefix = (item: ListItemValue) =>
      `${errorKey(field.key, item.key)}.`;

    return (
      <ListEditor
        label={field.label}
        help={field.help}
        itemLabel={field.itemLabel}
        items={items}
        min={field.min}
        max={field.max}
        error={errors[field.key]}
        getTitle={(item) => {
          const title = titleField ? item.fields[titleField.key] : undefined;
          return typeof title === "object" ? title.en : (title ?? "");
        }}
        hasErrors={(item) =>
          Object.keys(errors).some((key) =>
            key.startsWith(itemErrorPrefix(item)),
          )
        }
        isEdited={(item) => {
          const original = defaultItems.find((entry) => entry.key === item.key);
          return !original || !isSame(original.fields, item.fields);
        }}
        createItem={() => ({
          key: newItemKey(),
          fields: Object.fromEntries(
            field.fields.map((itemField) => [
              itemField.key,
              emptyScalar(itemField),
            ]),
          ),
        })}
        onChange={(next) => updateField(field.key, next)}
        renderItem={(item, update) => {
          const original = defaultItems.find((entry) => entry.key === item.key);
          return field.fields.map((itemField) => {
            const path = errorKey(field.key, item.key, itemField.key);
            return (
              <ScalarInput
                key={itemField.key}
                field={itemField}
                path={path}
                value={item.fields[itemField.key] ?? emptyScalar(itemField)}
                original={original?.fields[itemField.key]}
                errors={errors}
                images={images}
                onChange={(fieldValue) => {
                  update({
                    ...item,
                    fields: { ...item.fields, [itemField.key]: fieldValue },
                  });
                  clearErrors(path);
                }}
              />
            );
          });
        }}
      />
    );
  };

  return (
    <div className="grid gap-5">
      <datalist id={LINK_SUGGESTIONS_ID}>
        {linkSuggestions.map((href) => (
          <option key={href} value={href} />
        ))}
      </datalist>

      {groupFields(schema.fields).map((card) =>
        card.kind === "list" ? (
          <FieldGroup key={card.field.key} title={card.field.label}>
            {renderList(card.field)}
          </FieldGroup>
        ) : (
          <FieldGroup
            key={card.fields[0].key}
            title={
              card.fields.some((field) => field.type === "image")
                ? "Text & images"
                : "Text"
            }
          >
            {card.fields.map((field) => (
              <ScalarInput
                key={field.key}
                field={field}
                path={field.key}
                value={
                  (value[field.key] as ScalarValue | undefined) ??
                  emptyScalar(field)
                }
                original={defaults[field.key] as ScalarValue | undefined}
                errors={errors}
                images={images}
                onChange={(fieldValue) => updateField(field.key, fieldValue)}
              />
            ))}
          </FieldGroup>
        ),
      )}

      <SaveBar
        dirty={dirty}
        pending={pending}
        result={result}
        onSave={save}
        onDiscard={() => {
          setValue(savedValue);
          setErrors({});
          setResult(null);
        }}
        extra={
          !matchesDefaults && !dirty ? (
            <ConfirmButton
              question="Restore the original text?"
              confirmLabel="Restore"
              pending={pending}
              onConfirm={restoreDefaults}
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Restore original
            </ConfirmButton>
          ) : undefined
        }
      />
    </div>
  );
}
