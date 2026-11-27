import type { Metadata } from "next";
import { requireAdmin } from "@/lib/cms/auth";
import { getAdminCatalogue } from "@/lib/cms/catalogue";
import { galleryKeyFromUrl, listSiteImages } from "@/lib/cms/images";
import { PageHeader } from "../../../../_components/ui";
import { BackLink } from "../../back-link";
import { ServiceForm } from "../../service-form";

export const metadata: Metadata = { title: "New service · Content admin" };

export default async function NewServicePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  await requireAdmin();
  const [{ category: requestedCategory }, { categories }, images] =
    await Promise.all([searchParams, getAdminCatalogue(), listSiteImages()]);
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.title.en,
  }));
  const initialCategory =
    categories.find((category) => category.id === requestedCategory) ??
    categories[0];

  return (
    <>
      <BackLink href="/admin/catalogue/services" label="All services" />
      <PageHeader
        eyebrow="Catalogue"
        title="New service"
        description="Add the name and description in English and Arabic, choose a category, then create the service."
      />
      <ServiceForm
        mode="create"
        categories={categoryOptions}
        leadImages={images.filter((url) => galleryKeyFromUrl(url))}
        galleryImages={images}
        automaticGallery={[]}
        initialValue={{
          slug: "",
          category: initialCategory?.id ?? "",
          title: { en: "", ar: "" },
          description: { en: "", ar: "" },
          access: initialCategory?.access ?? "appointment",
          image: "",
          published: true,
          gallery: [],
        }}
      />
    </>
  );
}
