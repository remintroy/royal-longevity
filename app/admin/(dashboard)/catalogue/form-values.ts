import "server-only";
import { getServiceGallery } from "@/data/catalogue/service-gallery";
import type { Category, Service } from "@/data/catalogue/types";
import { galleryImageUrl } from "@/lib/cms/catalogue-options";
import type { CategoryFormValue } from "./category-form";
import type { GalleryItemValue, ServiceFormValue } from "./service-form";

function imageUrl(key: string | undefined) {
  return key ? galleryImageUrl(key) : "";
}

export function toCategoryFormValue(category: Category): CategoryFormValue {
  return {
    id: category.id,
    title: { ...category.title },
    description: { ...category.description },
    access: category.access,
    group: category.group,
    image: imageUrl(category.image),
  };
}

export function toServiceFormValue(service: Service): ServiceFormValue {
  return {
    slug: service.slug,
    category: service.category,
    title: { ...service.title },
    description: { ...service.description },
    access: service.access,
    image: imageUrl(service.image),
    published: service.published,
    gallery: (service.gallery ?? []).map((photo, index) => ({
      key: `photo-${index + 1}`,
      src: photo.src,
      alt: { ...photo.alt },
    })),
  };
}

/** The photos a service page shows when no custom gallery is set. */
export function getAutomaticGallery(service: Service): GalleryItemValue[] {
  try {
    return getServiceGallery({ ...service, gallery: undefined }).map(
      (photo, index) => ({
        key: `auto-${index + 1}`,
        src: photo.src,
        alt: { ...photo.alt },
      }),
    );
  } catch {
    // A curated photo without a description; the page shows the custom gallery editor instead.
    return [];
  }
}
