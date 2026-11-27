"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { RotateCcw, Trash2 } from "lucide-react";
import type { AccessModel } from "@/data/catalogue/types";
import type { ActionResult } from "@/lib/cms/action-result";
import { accessOptions, slugify } from "@/lib/cms/catalogue-options";
import type { FieldErrors, LocalizedValue } from "@/lib/cms/schema";
import { ConfirmButton } from "../../_components/confirm-button";
import {
  ChoiceField,
  FieldGroup,
  ImageField,
  LocalizedTextField,
  SwitchField,
  TextField,
} from "../../_components/fields";
import { ListEditor, newItemKey } from "../../_components/list-editor";
import { SaveBar, useUnsavedChanges } from "../../_components/save-bar";
import { buttonClass } from "../../_components/ui";
import { deleteService, restoreService, saveService } from "./actions";

const MAX_GALLERY = 12;

export type GalleryItemValue = {
  key: string;
  src: string;
  alt: LocalizedValue;
};

export type ServiceFormValue = {
  slug: string;
  category: string;
  title: LocalizedValue;
  description: LocalizedValue;
  access: AccessModel;
  /** Lead image URL, or "" for none. */
  image: string;
  published: boolean;
  /** Empty means the gallery is assembled automatically. */
  gallery: GalleryItemValue[];
};

export function ServiceForm({
  mode,
  initialValue,
  original,
  categories,
  leadImages,
  galleryImages,
  automaticGallery,
}: {
  mode: "create" | "update";
  initialValue: ServiceFormValue;
  /** Code defaults of a built-in service, to mark and reset edits. */
  original?: ServiceFormValue;
  categories: { value: string; label: string }[];
  /** Images allowed as the lead image (gallery folder). */
  leadImages: string[];
  /** Images allowed in the photo gallery (whole library). */
  galleryImages: string[];
  /** Photos shown when no gallery is set. */
  automaticGallery: GalleryItemValue[];
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

  const clearErrors = (path: string) =>
    setErrors((current) =>
      Object.fromEntries(
        Object.entries(current).filter(
          ([key]) => key !== path && !key.startsWith(`${path}.`),
        ),
      ),
    );

  const update = <Key extends keyof ServiceFormValue>(
    key: Key,
    fieldValue: ServiceFormValue[Key],
  ) => {
    setValue((current) => ({ ...current, [key]: fieldValue }));
    clearErrors(key);
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
      () => saveService(mode, submitted),
      () => setSavedValue(submitted),
    );
  };

  useUnsavedChanges(dirty, save);

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
            if (!slugTouched) update("slug", slugify(title.en));
          }}
        />
        <LocalizedTextField
          label="Short description"
          help="Shown on service cards and at the top of the service page."
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

      <FieldGroup title="Visibility & booking">
        <SwitchField
          label="Visible on the website"
          description="Hidden services keep their content but are removed from the site and enquiry form."
          checked={value.published}
          onChange={(published) => update("published", published)}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <ChoiceField
            label="Category"
            value={value.category}
            original={original?.category}
            options={categories}
            error={errors.category}
            onChange={(category) => update("category", category)}
          />
          <ChoiceField
            label="Booking type"
            value={value.access}
            original={original?.access}
            options={accessOptions}
            error={errors.access}
            onChange={(access) => update("access", access as AccessModel)}
          />
        </div>
        <TextField
          label="URL slug"
          help={
            mode === "create"
              ? "Used in the page address. Filled in from the English name; it can't be changed later."
              : "Used in the page address. It can't be changed after creation."
          }
          value={value.slug}
          dir="ltr"
          placeholder="laser-hair-removal"
          disabled={mode === "update"}
          error={errors.slug}
          onChange={(slug) => {
            setSlugTouched(true);
            update("slug", slug.toLowerCase());
          }}
        />
      </FieldGroup>

      <FieldGroup title="Images">
        <ImageField
          label="Lead image"
          help="Used on service cards. Without one, the category artwork is shown."
          optional
          value={value.image}
          original={original?.image}
          images={leadImages}
          error={errors.image}
          onChange={(image) => update("image", image)}
        />

        {value.gallery.length === 0 ? (
          <div className="grid gap-3 rounded-2xl border border-dashed border-border p-4">
            <div className="grid gap-0.5">
              <span className="text-sm font-medium text-ink">
                Photo gallery
              </span>
              <span className="text-xs text-espresso/60">
                {automaticGallery.length > 0
                  ? "Automatic: the lead image and curated photos below are shown on the service page."
                  : "No photos yet. Add a lead image, or build a custom gallery."}
              </span>
            </div>
            {automaticGallery.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {automaticGallery.map((photo) => (
                  <li
                    key={photo.key}
                    className="relative size-16 overflow-hidden rounded-xl bg-ivory/60"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt.en}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              onClick={() =>
                update(
                  "gallery",
                  automaticGallery.length > 0
                    ? automaticGallery.map((photo) => ({
                        ...photo,
                        key: newItemKey("photo"),
                      }))
                    : [
                        {
                          key: newItemKey("photo"),
                          src: "",
                          alt: { en: "", ar: "" },
                        },
                      ],
                )
              }
              className={buttonClass("secondary", "justify-self-start")}
            >
              Customise gallery
            </button>
          </div>
        ) : (
          <div className="grid gap-3">
            <ListEditor
              label="Photo gallery"
              help="The first photo leads the gallery on the service page."
              itemLabel="Photo"
              items={value.gallery}
              min={0}
              max={MAX_GALLERY}
              error={errors.gallery}
              getTitle={(photo) =>
                photo.alt.en || photo.src.split("/").pop() || ""
              }
              hasErrors={(photo) =>
                Object.keys(errors).some((key) =>
                  key.startsWith(`gallery.${photo.key}.`),
                )
              }
              createItem={() => ({
                key: newItemKey("photo"),
                src: "",
                alt: { en: "", ar: "" },
              })}
              onChange={(gallery) => update("gallery", gallery)}
              renderItem={(photo, updatePhoto) => (
                <>
                  <ImageField
                    label="Photo"
                    value={photo.src}
                    images={galleryImages}
                    error={errors[`gallery.${photo.key}.src`]}
                    onChange={(src) => {
                      updatePhoto({ ...photo, src });
                      clearErrors(`gallery.${photo.key}.src`);
                    }}
                  />
                  <LocalizedTextField
                    label="Description"
                    help="Read aloud by screen readers."
                    value={photo.alt}
                    errors={{
                      en: errors[`gallery.${photo.key}.alt.en`],
                      ar: errors[`gallery.${photo.key}.alt.ar`],
                    }}
                    onChange={(alt) => {
                      updatePhoto({ ...photo, alt });
                      clearErrors(`gallery.${photo.key}.alt`);
                    }}
                  />
                </>
              )}
            />
            <button
              type="button"
              onClick={() => update("gallery", [])}
              className={buttonClass("ghost", "justify-self-start")}
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Use the automatic gallery instead
            </button>
          </div>
        )}
      </FieldGroup>

      {mode === "update" && !isBuiltIn && (
        <FieldGroup
          title="Delete service"
          description="To take a service off the site temporarily, turn off “Visible on the website” instead."
        >
          <div>
            <ConfirmButton
              question="Delete this service permanently?"
              confirmLabel="Delete"
              disabled={dirty}
              pending={pending}
              onConfirm={() => run(() => deleteService(value.slug))}
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Delete service
            </ConfirmButton>
          </div>
        </FieldGroup>
      )}

      <SaveBar
        dirty={mode === "create" || dirty}
        pending={pending}
        result={result}
        saveLabel={mode === "create" ? "Create service" : "Save changes"}
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
              question="Restore the original service?"
              confirmLabel="Restore"
              pending={pending}
              onConfirm={() => run(() => restoreService(value.slug))}
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
