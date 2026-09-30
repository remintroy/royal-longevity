import { localized } from "@/data/inner/localization";
import { categories, getCategoryServices } from "./index";
import type { CategoryId, Service, ServiceGalleryImage } from "./types";

export const serviceGalleryUi = {
  eyebrow: localized("A closer look", "نظرة أقرب"),
  title: localized("Space for your experience.", "مساحة لتجربتكِ."),
  note: localized(
    "Service and collection inspiration · includes AI-generated imagery, not photographs of our premises.",
    "صور إلهامية للخدمات والمجموعات · تتضمن صوراً مولّدة بالذكاء الاصطناعي، وليست صوراً لمرافقنا.",
  ),
};

const galleryDetails = {
  fitness: {
    src: "/assets/images/service-gallery/fitness-detail.webp",
    alt: localized(
      "Dumbbells, cable equipment and a towel in an illustrative fitness studio",
      "أثقال ومعدات مقاومة ومنشفة في استوديو لياقة توضيحي",
    ),
  },
  movement: {
    src: "/assets/images/service-gallery/movement-detail.webp",
    alt: localized(
      "Exercise mat, cork blocks and a Pilates ring in a calm movement studio",
      "بساط تمارين وقطع فلين وحلقة بيلاتس في استوديو هادئ للحركة",
    ),
  },
  pool: {
    src: "/assets/images/service-gallery/pool-detail.webp",
    alt: localized(
      "Calm pool water beside a stone edge and folded towels",
      "مياه مسبح هادئة بجانب حافة حجرية ومناشف مطوية",
    ),
  },
  care: {
    src: "/assets/images/service-gallery/care-detail.webp",
    alt: localized(
      "Treatment towels, a ceramic bowl and an amber oil bottle",
      "مناشف للعناية ووعاء خزفي وزجاجة زيت كهرمانية",
    ),
  },
  beauty: {
    src: "/assets/images/service-gallery/beauty-detail.webp",
    alt: localized(
      "Beauty consultation vanity with a mirror, towels and a cosmetic case",
      "طاولة استشارة تجميل مع مرآة ومناشف وحقيبة مستحضرات",
    ),
  },
} satisfies Record<string, ServiceGalleryImage>;

const categoryDetails: Record<CategoryId, keyof typeof galleryDetails> = {
  "gym-fitness": "fitness",
  yoga: "movement",
  pilates: "movement",
  "swimming-pool": "pool",
  "spa-wellness": "care",
  "facial-treatments": "care",
  makeup: "beauty",
  "salon-hair": "beauty",
  "nails-pedicure": "beauty",
};

export function getServiceGallery(service: Service): ServiceGalleryImage[] {
  if (service.gallery?.length) return service.gallery;

  const category = categories.find((item) => item.id === service.category);
  const images: ServiceGalleryImage[] = [];

  if (service.image) {
    images.push({
      src: `/assets/images/gallery/${service.image}.webp`,
      alt: localized(
        `Illustrative image for ${service.title.en}`,
        `صورة توضيحية لخدمة ${service.title.ar}`,
      ),
    });
  }

  if (category?.image) {
    images.push({
      src: `/assets/images/gallery/${category.image}.webp`,
      alt: localized(
        `${category.title.en} collection inspiration`,
        `صورة إلهامية لمجموعة ${category.title.ar}`,
      ),
    });
  }

  const relatedServices = getCategoryServices(service.category).filter(
    (item) => item.slug !== service.slug && item.image,
  );
  for (const related of relatedServices) {
    const src = `/assets/images/gallery/${related.image}.webp`;
    if (images.some((image) => image.src === src)) continue;
    if (images.length >= 4) break;
    images.push({
      src,
      alt: localized(
        `Related care in this collection: ${related.title.en}`,
        `عناية ذات صلة ضمن المجموعة: ${related.title.ar}`,
      ),
    });
  }

  return [...images, galleryDetails[categoryDetails[service.category]]];
}
