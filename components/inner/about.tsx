import Image from "next/image";
import type { Language } from "@/data/site";
import type { InnerPage } from "@/data/inner-pages";
import { aboutUi } from "@/data/inner/about";
import { values } from "@/data/inner/ui";
import { getGalleryContent } from "@/data/gallery";
import { BookingCta } from "@/components/ui/booking-cta";
import { SectionHeading } from "./section-heading";
import { TextLink } from "./text-link";

export function AboutContent({
  page,
  lang,
}: {
  page: InnerPage;
  lang: Language;
}) {
  const image = getGalleryContent(lang).images.find(
    (item) => item.id === page.image,
  );
  return (
    <>
      <section
        aria-labelledby="about-story-title"
        className="my-12 grid items-center gap-8 lg:my-20 lg:grid-cols-2 lg:gap-16"
      >
        <div className="min-w-0">
          <SectionHeading
            eyebrow={aboutUi.approach[lang]}
            title={page.storyTitle[lang]}
            id="about-story-title"
          />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-espresso/75">
            {page.story[lang]}
          </p>
          <TextLink className="mt-5" href={`/${lang}/gallery`}>
            {aboutUi.spaces[lang]}
          </TextLink>
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ivory">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1440px) 650px, (min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
        )}
      </section>
      <section
        aria-labelledby="about-values-title"
        className="my-12 border-t border-border pt-10 lg:my-20 lg:pt-14"
      >
        <SectionHeading
          eyebrow={aboutUi.valuesEyebrow[lang]}
          title={aboutUi.valuesTitle[lang]}
          id="about-values-title"
        />
        <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-x-10">
          {values.map((value) => (
            <li key={value.icon} className="border-t border-border py-6">
              <h3 className="text-lg font-medium">{value.title[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso/75">
                {value.description[lang]}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section
        aria-labelledby="about-next-title"
        className="my-12 grid gap-6 rounded-3xl bg-ivory/60 p-5 sm:p-8 lg:my-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:p-10"
      >
        <div>
          <h2
            id="about-next-title"
            className="text-balance text-2xl font-normal leading-snug sm:text-3xl"
          >
            {aboutUi.nextTitle[lang]}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-espresso/75">
            {aboutUi.nextBody[lang]}
          </p>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-3">
          <BookingCta
            href={`/${lang}/services`}
            label={aboutUi.explore[lang]}
          />
          <TextLink href={`/${lang}/contact`}>{aboutUi.contact[lang]}</TextLink>
        </div>
      </section>
    </>
  );
}
