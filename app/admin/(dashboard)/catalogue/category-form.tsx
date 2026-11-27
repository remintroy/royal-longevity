"use client";

import { useState, useTransition } from "react";
import { RotateCcw, Trash2 } from "lucide-react";
import type { ActionResult } from "@/lib/cms/action-result";
import {
  accessOptions,
  groupOptions,
  slugify,
  type CategoryGroup,
} from "@/lib/cms/catalogue-options";
import type { AccessModel } from "@/data/catalogue/types";
import type { FieldErrors, LocalizedValue } from "@/lib/cms/schema";
import { ConfirmButton } from "../../_components/confirm-button";
import {
  ChoiceField,
  FieldGroup,
  ImageField,
  LocalizedTextField,
  TextField,
} from "../../_components/fields";
import { SaveBar, useUnsavedChanges } from "../../_components/save-bar";
import { Notice } from "../../_components/ui";
import { deleteCategory, restoreCategory, saveCategory } from "./actions";

export type CategoryFormValue = {
  id: string;
  title: LocalizedValue;
  description: LocalizedValue;
  access: AccessModel;
  group: CategoryGroup;
  /** Image URL, or "" for none. */
  image: string;
};

export function CategoryForm({
  mode,
  initialValue,
  original,
  images,
  serviceCount = 0,
}: {
  mode: "create" | "update";
  initialValue: CategoryFormValue;
  /** Code defaults of a built-in category, to mark and reset edits. */
  original?: CategoryFormValue;
  images: string[];
  serviceCount?: number;
}) {
  const [value, setValue] = useState(initialValue);
  const [savedValue, setSavedValue] = useState(initialValue);
  const [slugTouched, setSlugTouched] = useState(mode === "update");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<ActionResult | null>(null);
  const [pending, startTransition] = useTransition();
  const dirty = JSON.stringify(value) !== JSON.stringify(savedValue);
  const isBuiltIn = original !== undefined;
  const differsFromOriginal =
    isBuiltIn && JSON.stringify(savedValue) !== JSON.stringify(original);

  const update = <Key extends keyof CategoryFormValue>(
    key: Key,
    fieldValue: CategoryFormValue[Key],
  ) => {
    setValue((current) => ({ ...current, [key]: fieldValue }));
    setErrors((current) =>
      Object.fromEntries(
        Object.entries(current).filter(
          ([path]) => path !== key && !path.startsWith(`${key}.`),
        ),
      ),
    );
    setResult(null);
  };

  const run = (action: () => Promise<ActionResult>, onSuccess?: () => void) =>
    startTransition(async () => {
      const response = await action();
      setResult(response);
      if (response.ok) {
        setErrors({});
        onSuccess?.();
      } else {
        setErrors(response.errors ?? {});
      }
    });

  const save = () => {
    if (pending || (!dirty && mode === "update")) return;
    const submitted = value;
    run(
      () => saveCategory(mode, submitted),
      () => setSavedValue(submitted),
    );
  };

  useUnsavedChanges(dirty, save);

  const deleteBlocked = serviceCount > 0;

  return (
    <div className="grid gap-5">
      <FieldGroup title="Name & description">
        <LocalizedTextField
          label="Name"
          value={value.title}
          original={original?.title}
          errors={{ en: errors["title.en"], ar: errors["title.ar"] }}
          onChange={(title) => {
            update("title", title);
            if (!slugTouched) update("id", slugify(title.en));
          }}
        />
        <LocalizedTextField
          label="Description"
          multiline
          value={value.description}
          original={original?.description}
          errors={{
            en: errors["description.en"],
            ar: errors["description.ar"],
          }}
          onChange={(description) => update("description", description)}
        />
      </FieldGroup>

      <FieldGroup title="Settings">
        <TextField
          label="URL slug"
          help={
            mode === "create"
              ? "Used in the page address. Filled in from the English name; it can't be changed later."
              : "Used in the page address. It can't be changed after creation."
          }
          value={value.id}
          dir="ltr"
          placeholder="laser-treatments"
          disabled={mode === "update"}
          error={errors.id}
          onChange={(id) => {
            setSlugTouched(true);
            update("id", id.toLowerCase());
          }}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <ChoiceField
            label="Booking type"
            value={value.access}
            original={original?.access}
            options={accessOptions}
            error={errors.access}
            onChange={(access) => update("access", access as AccessModel)}
          />
          <ChoiceField
            label="Group"
            help="Groups services in the enquiry form."
            value={value.group}
            original={original?.group}
            options={groupOptions}
            error={errors.group}
            onChange={(group) => update("group", group as CategoryGroup)}
          />
        </div>
        <ImageField
          label="Cover image"
          help="Shown on the services overview. Without one, the first service's image is used."
          optional
          value={value.image}
          original={original?.image}
          images={images}
          error={errors.image}
          onChange={(image) => update("image", image)}
        />
      </FieldGroup>

      {mode === "update" && !isBuiltIn && (
        <FieldGroup title="Delete category">
          {deleteBlocked && (
            <Notice tone="info">
              This category has {serviceCount} service
              {serviceCount === 1 ? "" : "s"}. Move or delete them before
              deleting the category.
            </Notice>
          )}
          <div>
            <ConfirmButton
              question="Delete this category permanently?"
              confirmLabel="Delete"
              disabled={deleteBlocked || dirty}
              pending={pending}
              onConfirm={() => run(() => deleteCategory(value.id))}
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Delete category
            </ConfirmButton>
          </div>
        </FieldGroup>
      )}

      <SaveBar
        dirty={mode === "create" || dirty}
        pending={pending}
        result={result}
        saveLabel={mode === "create" ? "Create category" : "Save changes"}
        onSave={save}
        onDiscard={
          mode === "update"
            ? () => {
                setValue(savedValue);
                setErrors({});
                setResult(null);
              }
            : undefined
        }
        extra={
          differsFromOriginal && !dirty ? (
            <ConfirmButton
              question="Restore the original category?"
              confirmLabel="Restore"
              pending={pending}
              onConfirm={() => run(() => restoreCategory(value.id))}
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
