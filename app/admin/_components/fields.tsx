"use client";

import Image from "next/image";
import { useId, useRef, useState, type ReactNode } from "react";
import { ImageIcon, RotateCcw, Search, X } from "lucide-react";
import type { LocalizedValue } from "@/lib/cms/schema";
import { cn } from "@/lib/utils";
import { Badge, buttonClass, inputClass } from "./ui";

const languages = [
  { id: "en", label: "English", dir: "ltr" },
  { id: "ar", label: "العربية", dir: "rtl" },
] as const;

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-red-800">
      {message}
    </p>
  );
}

/** Label row shared by every field: name, "Edited" marker and an optional reset. */
function FieldLabel({
  htmlFor,
  label,
  help,
  edited,
  onReset,
}: {
  htmlFor?: string;
  label: string;
  help?: string;
  edited?: boolean;
  onReset?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
      <div className="grid gap-0.5">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          {htmlFor ? <label htmlFor={htmlFor}>{label}</label> : label}
          {edited && <Badge tone="gold">Edited</Badge>}
        </span>
        {help && <span className="text-xs text-espresso/60">{help}</span>}
      </div>
      {edited && onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-8 items-center gap-1 rounded-full px-2 text-xs text-espresso/70 hover:bg-espresso/5 hover:text-espresso"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
          Reset to original
        </button>
      )}
    </div>
  );
}

export function LocalizedTextField({
  label,
  help,
  multiline,
  optional,
  value,
  original,
  errors,
  onChange,
}: {
  label: string;
  help?: string;
  multiline?: boolean;
  optional?: boolean;
  value: LocalizedValue;
  /** The code default; when given, edits are marked and can be reset. */
  original?: LocalizedValue;
  errors?: Partial<Record<"en" | "ar", string>>;
  onChange: (value: LocalizedValue) => void;
}) {
  const id = useId();
  const edited =
    original !== undefined &&
    (value.en !== original.en || value.ar !== original.ar);

  return (
    <div className="grid gap-2.5">
      <FieldLabel
        label={optional ? `${label} (optional)` : label}
        help={help}
        edited={edited}
        onReset={original ? () => onChange(original) : undefined}
      />
      <div className="grid gap-3 md:grid-cols-2">
        {languages.map((lang) => {
          const inputId = `${id}-${lang.id}`;
          const errorId = `${inputId}-error`;
          const error = errors?.[lang.id];
          const shared = {
            id: inputId,
            dir: lang.dir,
            lang: lang.id,
            value: value[lang.id],
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? errorId : undefined,
            className: cn(
              inputClass,
              multiline && "field-sizing-content min-h-20 resize-y",
            ),
          };
          const update = (text: string) =>
            onChange({ ...value, [lang.id]: text });
          return (
            <div key={lang.id} className="grid content-start gap-1.5">
              <label
                htmlFor={inputId}
                className="text-xs text-espresso/60"
                lang={lang.id}
              >
                {lang.label}
              </label>
              {multiline ? (
                <textarea
                  {...shared}
                  rows={2}
                  onChange={(event) => update(event.target.value)}
                />
              ) : (
                <input
                  {...shared}
                  onChange={(event) => update(event.target.value)}
                />
              )}
              <FieldError id={errorId} message={error} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TextField({
  label,
  help,
  value,
  original,
  error,
  placeholder,
  list,
  disabled,
  dir,
  onChange,
}: {
  label: string;
  help?: string;
  value: string;
  original?: string;
  error?: string;
  placeholder?: string;
  /** Id of a <datalist> with suggestions. */
  list?: string;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  onChange: (value: string) => void;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="grid content-start gap-1.5">
      <FieldLabel
        htmlFor={id}
        label={label}
        help={help}
        edited={original !== undefined && value !== original}
        onReset={original !== undefined ? () => onChange(original) : undefined}
      />
      <input
        id={id}
        value={value}
        list={list}
        dir={dir}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function ChoiceField({
  label,
  help,
  value,
  original,
  options,
  error,
  onChange,
}: {
  label: string;
  help?: string;
  value: string;
  original?: string;
  options: readonly { value: string; label: string }[];
  error?: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="grid content-start gap-1.5">
      <FieldLabel
        htmlFor={id}
        label={label}
        help={help}
        edited={original !== undefined && value !== original}
        onReset={original !== undefined ? () => onChange(original) : undefined}
      />
      <select
        id={id}
        value={value}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(inputClass, "min-h-11")}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function SwitchField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? `${id}-description` : undefined}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-0.5 inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
          checked
            ? "border-espresso bg-espresso"
            : "border-border bg-espresso/10",
        )}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={cn(
            "inline-block size-5 rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none",
            checked
              ? "translate-x-6 rtl:-translate-x-6"
              : "translate-x-1 rtl:-translate-x-1",
          )}
        />
      </button>
      <label htmlFor={id} className="grid cursor-pointer gap-0.5">
        <span className="text-sm font-medium text-ink">{label}</span>
        {description && (
          <span id={`${id}-description`} className="text-xs text-espresso/60">
            {description}
          </span>
        )}
      </label>
    </div>
  );
}

/** Picks an image from the site's image library, with search and a live preview. */
export function ImageField({
  label,
  help,
  value,
  original,
  images,
  error,
  optional,
  onChange,
}: {
  label: string;
  help?: string;
  /** Image URL, or "" for none. */
  value: string;
  original?: string;
  images: readonly string[];
  error?: string;
  optional?: boolean;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const matches = search
    ? images.filter((url) => url.toLowerCase().includes(search))
    : images;

  const choose = (url: string) => {
    onChange(url);
    dialog.current?.close();
  };

  return (
    <div className="grid content-start gap-1.5">
      <FieldLabel
        label={optional ? `${label} (optional)` : label}
        help={help}
        edited={original !== undefined && value !== original}
        onReset={original !== undefined ? () => onChange(original) : undefined}
      />
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border bg-white p-2",
          error ? "border-red-700" : "border-border",
        )}
      >
        <div className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-ivory/60">
          {value ? (
            <Image
              src={value}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <ImageIcon className="size-5 text-espresso/40" aria-hidden="true" />
          )}
        </div>
        <span
          className="min-w-0 flex-1 truncate text-xs text-espresso/60"
          dir="ltr"
        >
          {value ? value.replace("/assets/images/", "") : "No image"}
        </span>
        <div className="flex shrink-0 gap-1">
          {optional && value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className={buttonClass("ghost", "px-3")}
              aria-label={`Remove ${label}`}
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            className={buttonClass("secondary", "px-4")}
            aria-describedby={error ? `${id}-error` : undefined}
          >
            {value ? "Change" : "Choose"}
          </button>
        </div>
      </div>
      <FieldError id={`${id}-error`} message={error} />

      <dialog
        ref={dialog}
        aria-labelledby={`${id}-title`}
        className="m-auto w-[min(56rem,calc(100vw-2rem))] max-h-[min(44rem,calc(100svh-2rem))] rounded-3xl border border-border bg-white p-0 text-ink shadow-[0_24px_64px_-24px_rgb(32_23_15/0.35)] backdrop:bg-ink/40"
      >
        <div className="flex max-h-[inherit] flex-col">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <h2 id={`${id}-title`} className="flex-1 text-lg">
              Choose an image
            </h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className={buttonClass("ghost", "size-11 px-0")}
              aria-label="Close"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="border-b border-border p-4">
            <label className="relative block">
              <span className="sr-only">Search images</span>
              <Search
                className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-espresso/50"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or folder, e.g. facial"
                className={cn(inputClass, "ps-9")}
              />
            </label>
          </div>
          <div className="overflow-y-auto p-4">
            {matches.length === 0 ? (
              <p className="py-8 text-center text-sm text-espresso/60">
                No images match “{query}”.
              </p>
            ) : (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {matches.map((url) => {
                  const selected = url === value;
                  return (
                    <li key={url}>
                      <button
                        type="button"
                        onClick={() => choose(url)}
                        aria-pressed={selected}
                        className={cn(
                          "group grid w-full gap-1.5 rounded-2xl border p-1.5 text-start transition-colors",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                          selected
                            ? "border-espresso bg-ivory/60"
                            : "border-transparent hover:border-border",
                        )}
                      >
                        <span className="relative block aspect-4/3 overflow-hidden rounded-xl bg-ivory/60">
                          <Image
                            src={url}
                            alt=""
                            fill
                            sizes="200px"
                            className="object-cover"
                          />
                        </span>
                        <span
                          className="truncate px-1 text-xs text-espresso/70"
                          dir="ltr"
                        >
                          {url.replace("/assets/images/", "")}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

/** Wraps a group of related fields with a heading, like a card in a CMS form. */
export function FieldGroup({
  title,
  description,
  children,
  actions,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="grid gap-5 rounded-3xl border border-border bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="grid gap-1">
          <h2 className="text-lg text-ink">{title}</h2>
          {description && (
            <p className="text-sm text-espresso/65">{description}</p>
          )}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
