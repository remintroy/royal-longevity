import { ContentReveal } from "./content-reveal";
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
          <SectionHeading
            animate
            eyebrow={ui.gallery[lang]}
            title={ui.care[lang]}
          />
        </div>
      </div>
      <ContentReveal className="grid gap-x-6 gap-y-10 min-[700px]:grid-cols-2">
        {getGalleryContent(lang).images.map((item, index) => (
          <figure data-content-reveal className="m-0 min-w-0" key={item.id}>
            <div className="relative aspect-video overflow-hidden rounded-3xl">
              <Image
                data-content-image
                className="object-cover"
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 699px) 92vw, (max-width: 1434px) 46vw, 675px"
              />
            </div>
            <figcaption className="mt-[13px] flex justify-between gap-2.5 text-xs">
              {item.title}
              <span className="opacity-45">0{index + 1}</span>
            </figcaption>
          </figure>
        ))}
      </ContentReveal>
      <p className="mt-[22px] text-xs opacity-65 leading-[1.65]">
        {ui.imageNote[lang]}
      </p>
    </section>
  );
}
