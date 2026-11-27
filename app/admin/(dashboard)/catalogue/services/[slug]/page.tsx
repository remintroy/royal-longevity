import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { builtInServices } from "@/data/catalogue";
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
import { getAutomaticGallery, toServiceFormValue } from "../../form-values";
import { ServiceForm } from "../../service-form";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ created?: string; restored?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} · Services · Content admin` };
}

export default async function EditServicePage({ params, searchParams }: Props) {
  await requireAdmin();
  const [{ slug }, { created, restored }, { categories, services }, images] =
    await Promise.all([
      params,
      searchParams,
      getAdminCatalogue(),
      listSiteImages(),
    ]);
  const service = services.find((entry) => entry.slug === slug);
  if (!service) notFound();

  const builtIn = builtInServices.find((entry) => entry.slug === slug);
  const category = categories.find((entry) => entry.id === service.category);

  return (
    <>
      <BackLink href="/admin/catalogue/services" label="All services" />
      <PageHeader
        eyebrow={
          <span className="flex flex-wrap items-center gap-2">
            {category?.title.en ?? "Service"}
            {service.published ? (
              <Badge tone="success">Live</Badge>
            ) : (
              <Badge tone="muted">Hidden</Badge>
            )}
            {service.origin === "custom" && <Badge>Added in admin</Badge>}
            {service.edited && <Badge tone="gold">Edited</Badge>}
          </span>
        }
        title={service.title.en}
        actions={
          service.published ? (
            <a
              href={`/en/services/${service.slug}`}
              target="_blank"
              rel="noreferrer"
              className={buttonClass("secondary")}
            >
              View on site
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          ) : undefined
        }
      />
      {created && (
        <Notice tone="success" className="mb-5">
          Service created{service.published ? " and published" : ""}.
        </Notice>
      )}
      {restored && (
        <Notice tone="success" className="mb-5">
          The original service has been restored.
        </Notice>
      )}
      <ServiceForm
        key={`${service.slug}-${service.edited}`}
        mode="update"
        initialValue={toServiceFormValue(service)}
        original={builtIn ? toServiceFormValue(builtIn) : undefined}
        categories={categories.map((entry) => ({
          value: entry.id,
          label: entry.title.en,
        }))}
        leadImages={images.filter((url) => galleryKeyFromUrl(url))}
        galleryImages={images}
        automaticGallery={getAutomaticGallery(service)}
      />
    </>
  );
}
