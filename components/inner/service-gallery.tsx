import Image from "next/image";
import type { Service } from "@/data/catalogue";
import {
  getServiceGallery,
  serviceGalleryUi,
} from "@/data/catalogue/service-gallery";
import type { Language } from "@/data/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export function ServiceGallery({
  service,
  lang,
}: {
  service: Service;
  lang: Language;
}) {
  const images = getServiceGallery(service);

  return (
    <section
      aria-labelledby="service-gallery-title"
      className="my-16 min-[900px]:my-20"
    >
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4 min-[900px]:mb-9">
        <div>
          <SectionHeading
            id="service-gallery-title"
            eyebrow={serviceGalleryUi.eyebrow[lang]}
            title={serviceGalleryUi.title[lang]}
          />
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-espresso/65">
          {service.title[lang]}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 min-[700px]:grid-cols-4 min-[700px]:gap-4">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={cn(
              "relative aspect-[4/3] min-w-0 overflow-hidden rounded-[20px] bg-ivory min-[900px]:rounded-3xl",
              index === 0 &&
                "col-span-2 min-[700px]:row-span-2 min-[700px]:aspect-auto",
            )}
          >
            <Image
              src={image.src}
              alt={image.alt[lang]}
              fill
              className="object-cover"
              sizes={
                index === 0
                  ? "(min-width: 1434px) 677px, (min-width: 700px) 48vw, 94vw"
                  : "(min-width: 1434px) 331px, (min-width: 700px) 24vw, 47vw"
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
