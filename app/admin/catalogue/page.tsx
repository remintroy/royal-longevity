import { readdir } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { redirect } from "next/navigation";
import { categories as builtInCategories } from "@/data/catalogue/categories";
import { isAdmin } from "@/lib/cms/auth";
import { getDynamicCatalogue } from "@/lib/cms/catalogue";
import {
  deleteCategory,
  deleteService,
  saveCategory,
  saveService,
} from "./actions";

const messages: Record<string, string> = {
  "saved=category": "Category saved.",
  "saved=service": "Service saved.",
  "deleted=category": "Category deleted.",
  "deleted=service": "Service deleted.",
};
const errors: Record<string, string> = {
  db: "MONGODB_URI is not configured, so nothing was saved.",
  category:
    "Check the category: use a new lowercase slug (letters, numbers, hyphens) and fill every English and Arabic field.",
  service:
    "Check the service: use a new lowercase slug, pick an existing category and fill every English and Arabic field.",
  "category-in-use": "Delete or move this category's services first.",
};

const inputClass =
  "min-h-11 w-full rounded-xl border border-border bg-white px-3 text-base";
const textareaClass =
  "w-full rounded-xl border border-border bg-white p-3 text-base";

// Image keys are paths under /assets/images/gallery without ".webp".
async function listImageKeys() {
  const root = path.join(process.cwd(), "public/assets/images/gallery");
  try {
    const entries = await readdir(root, { recursive: true });
    return entries
      .filter((entry) => entry.endsWith(".webp"))
      .map((entry) =>
        entry
          .replace(/\.webp$/, "")
          .split(path.sep)
          .join("/"),
      )
      .sort();
  } catch {
    return [];
  }
}

function BilingualFields({
  defaults,
}: {
  defaults?: {
    title?: { en: string; ar: string };
    description?: { en: string; ar: string };
  };
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <label className="grid gap-1 text-xs">
        Title (English)
        <input
          name="title.en"
          required
          defaultValue={defaults?.title?.en}
          className={inputClass}
        />
      </label>
      <label className="grid gap-1 text-xs">
        العنوان (العربية)
        <input
          name="title.ar"
          dir="rtl"
          required
          defaultValue={defaults?.title?.ar}
          className={inputClass}
        />
      </label>
      <label className="grid gap-1 text-xs">
        Description (English)
        <textarea
          name="description.en"
          required
          rows={2}
          defaultValue={defaults?.description?.en}
          className={textareaClass}
        />
      </label>
      <label className="grid gap-1 text-xs">
        الوصف (العربية)
        <textarea
          name="description.ar"
          dir="rtl"
          required
          rows={2}
          defaultValue={defaults?.description?.ar}
          className={textareaClass}
        />
      </label>
    </div>
  );
}

function AccessSelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <label className="grid gap-1 text-xs">
      Access
      <select
        name="access"
        defaultValue={defaultValue ?? "appointment"}
        className={inputClass}
      >
        <option value="appointment">Appointment</option>
        <option value="membership">Membership</option>
        <option value="both">Membership or appointment</option>
      </select>
    </label>
  );
}

export default async function AdminCatalogue({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  if (!(await isAdmin())) redirect("/admin");
  const query = await searchParams;
  const notice = Object.entries(query)
    .map(([key, value]) => messages[`${key}=${value}`])
    .find(Boolean);
  const error = query.error ? errors[query.error] : undefined;
  const [{ categories, services }, imageKeys] = await Promise.all([
    getDynamicCatalogue(),
    listImageKeys(),
  ]);
  const allCategories = [
    ...builtInCategories.map((category) => ({
      id: category.id,
      label: category.title.en,
    })),
    ...categories.map((category) => ({
      id: category.id,
      label: category.title.en,
    })),
  ];

  return (
    <>
      <Link href="/admin" className="text-sm underline">
        ← All sections
      </Link>
      <h1 className="mb-6 mt-3 text-2xl">Services & categories</h1>
      {notice && (
        <p role="status" className="mb-4 rounded-2xl bg-white p-3 text-sm">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-700">
          {error}
        </p>
      )}
      <datalist id="image-keys">
        {imageKeys.map((key) => (
          <option key={key} value={key} />
        ))}
      </datalist>

      <section className="mb-10 grid gap-4">
        <h2 className="text-xl">Add or update a category</h2>
        <form
          action={saveCategory}
          className="grid gap-4 rounded-2xl border border-border bg-white p-4"
        >
          <div className="grid gap-3 md:grid-cols-4">
            <label className="grid gap-1 text-xs">
              Slug (used in the URL)
              <input
                name="id"
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                placeholder="laser-treatments"
                className={inputClass}
              />
            </label>
            <AccessSelect />
            <label className="grid gap-1 text-xs">
              Group
              <select name="group" defaultValue="beauty" className={inputClass}>
                <option value="beauty">Beauty</option>
                <option value="wellness">Wellness</option>
                <option value="fitness">Fitness</option>
              </select>
            </label>
            <label className="grid gap-1 text-xs">
              Image (optional)
              <input name="image" list="image-keys" className={inputClass} />
            </label>
          </div>
          <BilingualFields />
          <button className="min-h-11 justify-self-start rounded-full bg-espresso px-8 text-ivory">
            Save category
          </button>
        </form>
        <ul className="grid gap-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-white p-3 text-sm"
            >
              <span>
                {category.title.en} · {category.title.ar}{" "}
                <span className="text-espresso/50">({category.id})</span>
              </span>
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={category.id} />
                <button className="min-h-11 rounded-full border border-border px-4">
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4">
        <h2 className="text-xl">Add or update a service</h2>
        <form
          action={saveService}
          className="grid gap-4 rounded-2xl border border-border bg-white p-4"
        >
          <div className="grid gap-3 md:grid-cols-4">
            <label className="grid gap-1 text-xs">
              Slug (used in the URL)
              <input
                name="slug"
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                placeholder="laser-hair-removal"
                className={inputClass}
              />
            </label>
            <label className="grid gap-1 text-xs">
              Category
              <select name="category" required className={inputClass}>
                {allCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>
            <AccessSelect />
            <label className="grid gap-1 text-xs">
              Image (optional)
              <input name="image" list="image-keys" className={inputClass} />
            </label>
          </div>
          <BilingualFields />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="published"
              defaultChecked
              className="size-5"
            />
            Published
          </label>
          <button className="min-h-11 justify-self-start rounded-full bg-espresso px-8 text-ivory">
            Save service
          </button>
        </form>
        <ul className="grid gap-2">
          {services.map((service) => (
            <li
              key={service.slug}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-white p-3 text-sm"
            >
              <span>
                {service.title.en} · {service.title.ar}{" "}
                <span className="text-espresso/50">
                  ({service.slug} → {service.category}
                  {service.published ? "" : ", hidden"})
                </span>
              </span>
              <form action={deleteService}>
                <input type="hidden" name="slug" value={service.slug} />
                <button className="min-h-11 rounded-full border border-border px-4">
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
