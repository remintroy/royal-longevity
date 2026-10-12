import { localized } from "@/data/inner/localization";
import { services } from "./index";
import { serviceGalleryAlt } from "./service-gallery-assets";
import { serviceGallerySelections } from "./service-gallery-selections";
import type { Service, ServiceGalleryImage } from "./types";

export const serviceGalleryUi = {
  eyebrow: localized("A closer look", "نظرة أقرب"),
  title: localized("Space for your experience.", "مساحة لتجربتكِ."),
};

function galleryPhoto(path: string): ServiceGalleryImage {
  const picturedService = services.find(
    (service) => `gallery/${service.image}` === path,
  );
  const alt =
    serviceGalleryAlt[path] ??
    (picturedService
      ? localized(
          `Illustrative ${picturedService.title.en} session`,
          `جلسة توضيحية لخدمة ${picturedService.title.ar}`,
        )
      : undefined);

  if (!alt) throw new Error(`Missing service gallery description: ${path}`);
  return { src: `/assets/images/${path}.webp`, alt };
}

export function getServiceGallery(service: Service): ServiceGalleryImage[] {
  if (service.gallery?.length) return service.gallery;

  // New services show their own lead until supporting photos are curated.
  // Never fill a gallery automatically with unrelated services.
  const images: ServiceGalleryImage[] = service.image
    ? [
        {
          src: `/assets/images/gallery/${service.image}.webp`,
          alt: localized(
            `Illustrative ${service.title.en} session`,
            `جلسة توضيحية لخدمة ${service.title.ar}`,
          ),
        },
      ]
    : [];
  const supporting = serviceGallerySelections[service.slug] ?? [];
  return [...images, ...supporting.map(galleryPhoto)];
}
