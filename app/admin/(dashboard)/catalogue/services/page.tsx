import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/cms/auth";
import { getAdminCatalogue } from "@/lib/cms/catalogue";
import { galleryImageUrl } from "@/lib/cms/catalogue-options";
import { buttonClass, Notice, PageHeader } from "../../../_components/ui";
import { CatalogueList, type CatalogueRow } from "../catalogue-list";

export const metadata: Metadata = { title: "Services · Content admin" };

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  await requireAdmin();
  const [{ deleted }, { categories, services }] = await Promise.all([
    searchParams,
    getAdminCatalogue(),
  ]);
  const categoryNames = new Map(
    categories.map((category) => [category.id, category.title.en]),
  );

  const rows: CatalogueRow[] = services.map((service) => ({
    id: service.slug,
    href: `/admin/catalogue/services/${service.slug}`,
    title: service.title.en,
    titleAr: service.title.ar,
    image: service.image ? galleryImageUrl(service.image) : "",
    meta: categoryNames.get(service.category) ?? "No category",
    group: service.category,
    hidden: !service.published,
    origin: service.origin,
    edited: service.edited,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Services"
        description="Every service on the website. Open one to edit its name, description, category, images and visibility."
        actions={
          <Link
            href="/admin/catalogue/services/new"
            className={buttonClass("primary")}
          >
            <Plus className="size-4" aria-hidden="true" />
            New service
          </Link>
        }
      />
      {deleted && (
        <Notice tone="success" className="mb-5">
          The service was deleted.
        </Notice>
      )}
      <CatalogueList
        rows={rows}
        noun="services"
        showVisibility
        groups={categories.map((category) => ({
          value: category.id,
          label: category.title.en,
        }))}
      />
    </>
  );
}
