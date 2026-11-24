import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/cms/auth";
import {
  applyOverrides,
  getOverrides,
  listEditableFields,
} from "@/lib/cms/overrides";
import {
  getDefaultSectionContent,
  isLandingSectionId,
  landingSections,
} from "@/lib/cms/sections";
import { saveSection } from "../actions";

const languages = [
  { id: "en", label: "English", dir: "ltr" },
  { id: "ar", label: "العربية", dir: "rtl" },
] as const;

export default async function AdminSection({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin");
  const { section: sectionId } = await params;
  const { saved, error } = await searchParams;
  if (!isLandingSectionId(sectionId)) notFound();

  const section = landingSections[sectionId];
  const skip = "skip" in section ? section.skip : [];
  const overrides = await getOverrides();
  const english = getDefaultSectionContent(sectionId, "en");
  const paths = listEditableFields(english, skip).map((field) => field.path);
  const current = Object.fromEntries(
    languages.map(({ id }) => [
      id,
      new Map(
        listEditableFields(
          applyOverrides(
            sectionId,
            id,
            getDefaultSectionContent(sectionId, id),
            overrides,
            skip,
          ),
          skip,
        ).map((field) => [field.path, field.value]),
      ),
    ]),
  );
  const save = saveSection.bind(null, sectionId);

  return (
    <>
      <Link href="/admin" className="text-sm underline">
        ← All sections
      </Link>
      <h1 className="mb-6 mt-3 text-2xl">{section.label}</h1>
      {saved && (
        <p role="status" className="mb-4 rounded-2xl bg-white p-3 text-sm">
          Saved. The site is updating.
        </p>
      )}
      {error === "db" && (
        <p role="alert" className="mb-4 text-sm text-red-700">
          MONGODB_URI is not configured, so nothing was saved.
        </p>
      )}
      <form action={save} className="grid gap-6">
        {paths.map((path) => (
          <fieldset
            key={path}
            className="grid gap-3 rounded-2xl border border-border bg-white p-4"
          >
            <legend className="px-2 text-xs text-espresso/60">{path}</legend>
            <div className="grid gap-3 md:grid-cols-2">
              {languages.map((lang) => (
                <label key={lang.id} className="grid gap-1 text-xs">
                  {lang.label}
                  <textarea
                    name={`${lang.id}::${path}`}
                    dir={lang.dir}
                    rows={2}
                    defaultValue={current[lang.id].get(path) ?? ""}
                    className="w-full resize-y rounded-xl border border-border p-3 text-base"
                  />
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="sticky bottom-0 -mx-4 border-t border-border bg-ivory p-4 sm:mx-0 sm:rounded-2xl sm:border">
          <button className="min-h-11 rounded-full bg-espresso px-8 text-ivory">
            Save changes
          </button>
          <span className="ms-4 text-xs text-espresso/60">
            Clear a field back to its default text by restoring the original
            wording.
          </span>
        </div>
      </form>
    </>
  );
}
