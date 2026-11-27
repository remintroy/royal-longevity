import type { Metadata } from "next";
import { requireAdmin } from "@/lib/cms/auth";
import { listSiteImages, galleryKeyFromUrl } from "@/lib/cms/images";
import { PageHeader } from "../../../../_components/ui";
import { BackLink } from "../../back-link";
import { CategoryForm } from "../../category-form";

export const metadata: Metadata = { title: "New category · Content admin" };

export default async function NewCategoryPage() {
  await requireAdmin();
  const images = (await listSiteImages()).filter((url) =>
    galleryKeyFromUrl(url),
  );

  return (
    <>
      <BackLink href="/admin/catalogue/categories" label="All categories" />
      <PageHeader
        eyebrow="Catalogue"
        title="New category"
        description="Add the name in English and Arabic. The page address is created from the English name."
      />
      <CategoryForm
        mode="create"
        images={images}
        initialValue={{
          id: "",
          title: { en: "", ar: "" },
          description: { en: "", ar: "" },
          access: "appointment",
          group: "beauty",
          image: "",
        }}
      />
    </>
  );
}
