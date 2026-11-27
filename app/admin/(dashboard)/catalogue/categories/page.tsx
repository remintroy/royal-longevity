import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/cms/auth";
import { getAdminCatalogue } from "@/lib/cms/catalogue";
import { galleryImageUrl } from "@/lib/cms/catalogue-options";
import { buttonClass, Notice, PageHeader } from "../../../_components/ui";
import { CatalogueList, type CatalogueRow } from "../catalogue-list";

export const metadata: Metadata = { title: "Categories · Content admin" };

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  await requireAdmin();
  const [{ deleted }, { categories }] = await Promise.all([
    searchParams,
    getAdminCatalogue(),
  ]);

  const rows: CatalogueRow[] = categories.map((category) => ({
    id: category.id,
    href: `/admin/catalogue/categories/${category.id}`,
    title: category.title.en,
    titleAr: category.title.ar,
    image: category.image ? galleryImageUrl(category.image) : "",
    meta: `${category.serviceCount} service${category.serviceCount === 1 ? "" : "s"}`,
    origin: category.origin,
    edited: category.edited,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Categories"
        description="Categories organise services on the website, in the services banner and in the enquiry form."
        actions={
          <Link
            href="/admin/catalogue/categories/new"
            className={buttonClass("primary")}
          >
            <Plus className="size-4" aria-hidden="true" />
            New category
          </Link>
        }
      />
      {deleted && (
        <Notice tone="success" className="mb-5">
          The category was deleted.
        </Notice>
      )}
      <CatalogueList rows={rows} noun="categories" />
    </>
  );
}
