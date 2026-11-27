import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { builtInCategories } from "@/data/catalogue";
import { requireAdmin } from "@/lib/cms/auth";
import { getAdminCatalogue } from "@/lib/cms/catalogue";
import { galleryKeyFromUrl, listSiteImages } from "@/lib/cms/images";
import {
  Badge,
  buttonClass,
  Notice,
  PageHeader,
} from "../../../../_components/ui";
import { BackLink } from "../../back-link";
import { CategoryForm } from "../../category-form";
import { toCategoryFormValue } from "../../form-values";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string; restored?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `${id} · Categories · Content admin` };
}

export default async function EditCategoryPage({
  params,
  searchParams,
}: Props) {
  await requireAdmin();
  const [{ id }, { created, restored }, { categories }, images] =
    await Promise.all([
      params,
      searchParams,
      getAdminCatalogue(),
      listSiteImages(),
    ]);
  const category = categories.find((entry) => entry.id === id);
  if (!category) notFound();

  const builtIn = builtInCategories.find((entry) => entry.id === id);

  return (
    <>
      <BackLink href="/admin/catalogue/categories" label="All categories" />
      <PageHeader
        eyebrow={
          <span className="flex flex-wrap items-center gap-2">
            Category
            {category.origin === "custom" ? (
              <Badge>Added in admin</Badge>
            ) : (
              <Badge tone="muted">Built-in</Badge>
            )}
            {category.edited && <Badge tone="gold">Edited</Badge>}
          </span>
        }
        title={category.title.en}
        description={`${category.serviceCount} service${category.serviceCount === 1 ? "" : "s"} in this category.`}
        actions={
          <a
            href={`/en/services/categories/${category.id}`}
            target="_blank"
            rel="noreferrer"
            className={buttonClass("secondary")}
          >
            View on site
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        }
      />
      {created && (
        <Notice tone="success" className="mb-5">
          Category created and published.
        </Notice>
      )}
      {restored && (
        <Notice tone="success" className="mb-5">
          The original category has been restored.
        </Notice>
      )}
      <CategoryForm
        key={`${category.id}-${category.edited}`}
        mode="update"
        initialValue={toCategoryFormValue(category)}
        original={builtIn ? toCategoryFormValue(builtIn) : undefined}
        images={images.filter((url) => galleryKeyFromUrl(url))}
        serviceCount={category.serviceCount}
      />
    </>
  );
}
