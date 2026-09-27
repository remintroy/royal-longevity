import { localized } from "@/data/inner/localization";
import type { Service, ServiceGalleryImage } from "./types";

export const serviceGalleryUi = {
  eyebrow: localized("A closer look", "نظرة أقرب"),
  title: localized("Space for your experience.", "مساحة لتجربتكِ."),
  note: localized(
    "Gallery preview · illustrative images and layout placeholders, not photographs of our premises.",
    "معاينة المعرض · صور توضيحية ومؤقتة للتصميم، وليست صوراً لمرافقنا.",
  ),
};

// Local copies keep the layout preview stable and avoid external image requests.
// Replace these through each service's gallery field with approved photography.
const placeholders: ServiceGalleryImage[] = [1, 2, 3, 4].map((number) => ({
  src: `/assets/images/service-gallery/placeholder-${number}.webp`,
  alt: localized(
    `Layout placeholder photograph ${number}; not the service or premises`,
    `صورة مؤقتة للتصميم ${number}؛ لا تمثّل الخدمة أو المرافق`,
  ),
}));

export function getServiceGallery(service: Service): ServiceGalleryImage[] {
  if (service.gallery?.length) return service.gallery;
  const lead: ServiceGalleryImage = service.image
    ? {
        src: `/assets/images/gallery/${service.image}.webp`,
        alt: localized(
          `Illustrative image for ${service.title.en}; not premises photography`,
          `صورة توضيحية لخدمة ${service.title.ar}؛ وليست صورة للمرافق`,
        ),
      }
    : placeholders[0];
  return [lead, ...placeholders];
}
