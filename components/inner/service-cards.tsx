import Link from "next/link";
import {
  categories,
  getCategoryServices,
  type CategoryId,
} from "@/data/catalogue";
import { catalogueUi } from "@/data/catalogue/experience";
import type { Language } from "@/data/site";
import { SectionHeading } from "./section-heading";
import { TextLink } from "./text-link";
import { AccessLabel } from "./catalogue";

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
    <section className="my-12 min-[900px]:my-20" id="treatments">
      <SectionHeading
        eyebrow={collection.title[lang]}
        title={catalogueUi.services[lang]}
      />
      <div className="mt-8 grid gap-5 min-[600px]:grid-cols-2 min-[1100px]:grid-cols-3">
        {visibleServices.map((service) => (
          <article
            key={service.slug}
            className="flex flex-col rounded-3xl border border-border bg-white p-6"
          >
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
            <TextLink
              className="mt-auto"
              href={`/${lang}/services/${service.slug}`}
            >
              {catalogueUi.details[lang]}
            </TextLink>
          </article>
        ))}
      </div>
    </section>
  );
}
