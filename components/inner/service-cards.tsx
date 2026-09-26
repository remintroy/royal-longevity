import Image from "next/image";
import Link from "next/link";
import {
  categories,
  getCategoryServices,
  type CategoryId,
} from "@/data/catalogue";
import { catalogueUi } from "@/data/catalogue/experience";
import type { Language } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { BookingCta } from "@/components/ui/booking-cta";
import { getBookingHref } from "@/lib/booking";
import { AccessLabel } from "./catalogue";
import { ServiceCardsMotion } from "./service-cards-motion";
import { ElasticSectionBackground } from "./elastic-section-background";

export function ServiceCards({
  lang,
  category,
}: {
  lang: Language;
  category: CategoryId;
}) {
  const visibleServices = getCategoryServices(category);
  const collection = categories.find((item) => item.id === category);
  if (!collection) return null;
  return (
    <section
      className="relative isolate my-12 pt-28 pb-28 text-espresso min-[900px]:my-10 min-[900px]:pt-30 min-[900px]:pb-30"
      id="treatments"
    >
      <ElasticSectionBackground />
      <SectionHeading
        key={`heading-${lang}-${category}`}
        animate
        startAfter={2}
        eyebrow={collection.title[lang]}
        title={catalogueUi.services[lang]}
      />
      <ServiceCardsMotion key={`cards-${lang}-${category}`}>
        {visibleServices.map((service) => (
          <article
            key={service.slug}
            data-service-card
            className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-white text-espresso"
          >
            <div className="aspect-4/3 overflow-hidden bg-ivory">
              <Image
                data-service-image
                src={`/assets/images/gallery/${service.image ?? "salon"}.webp`}
                alt=""
                width={1312}
                height={1199}
                sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 1434px) calc((100vw - 84px) / 2), 675px"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div>
                <AccessLabel access={service.access} lang={lang} />
              </div>
              <h3 className="mt-5 text-2xl leading-snug">
                <Link href={`/${lang}/services/${service.slug}`}>
                  {service.title[lang]}
                </Link>
              </h3>
              <p className="mt-3 mb-6 text-sm leading-relaxed text-espresso/75">
                {service.description[lang]}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-3">
                <BookingCta
                  href={getBookingHref(lang, service.title[lang])}
                  label={catalogueUi.bookNow[lang]}
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <Link
                  className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-border px-5 text-sm text-espresso transition-colors duration-200 hover:bg-ivory focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3 motion-reduce:transition-none"
                  href={`/${lang}/services/${service.slug}`}
                >
                  {catalogueUi.details[lang]}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </ServiceCardsMotion>
    </section>
  );
}
