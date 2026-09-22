import { SectionHeading } from "./section-heading";
import type { Language } from "@/data/site";
import { ui } from "@/data/inner/ui";
import Image from "next/image";
import { getGalleryContent } from "@/data/gallery";

export function GalleryGrid({ lang }: { lang: Language }) {
  return (
    <section className="my-[65px] scroll-mt-[25px] min-[900px]:my-[85px]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
        <div>
          <SectionHeading eyebrow={ui.gallery[lang]} title={ui.care[lang]} />
        </div>
      </div>
      <div className="grid gap-6 min-[600px]:grid-cols-2 min-[1150px]:grid-cols-3">
        {getGalleryContent(lang).images.map((item, index) => (
          <figure className="m-0 min-w-0" key={item.id}>
            <div className="relative aspect-[1.3] overflow-hidden rounded-[22px]">
              <Image
                className="object-cover"
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 430px"
              />
            </div>
            <figcaption className="mt-[13px] flex justify-between gap-2.5 text-xs">
              {item.title}
              <span className="opacity-45">0{index + 1}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-[22px] text-xs opacity-65 leading-[1.65]">
        {ui.imageNote[lang]}
      </p>
    </section>
  );
}
