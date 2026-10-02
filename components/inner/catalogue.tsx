import { PageHero } from "./page-hero";
import { ContentReveal } from "./content-reveal";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Language } from "@/data/site";
import {
  categories,
  getCategoryServices,
  type Category,
  type AccessModel,
} from "@/data/catalogue";
import { catalogueUi } from "@/data/catalogue/experience";
import { ui } from "@/data/inner/ui";
import { SectionHeading } from "./section-heading";
import { TextLink } from "./text-link";
import { CategoryIcon } from "./category-icon";
import { BookingCta } from "@/components/ui/booking-cta";

export function AccessLabel({
  access,
  lang,
}: {
  access: AccessModel;
  lang: Language;
}) {
  return (
    <span className="inline-flex rounded-full border border-border px-3 py-1.5 text-xs leading-relaxed">
      {catalogueUi[access][lang]}
    </span>
  );
}

export function CatalogueIntro({
  lang,
  title = catalogueUi.discover[lang],
  description = catalogueUi.introduction[lang],
  eyebrow,
  showHomeLink = true,
}: {
  lang: Language;
  title?: string;
  description?: string;
  eyebrow?: string;
  showHomeLink?: boolean;
}) {
  return (
    <PageHero
      lang={lang}
      title={title}
      description={description}
      eyebrow={eyebrow}
      navigation={
        showHomeLink ? (
          <TextLink href={`/${lang}`}>{ui.home[lang]}</TextLink>
        ) : undefined
      }
    />
  );
}

export function CategoryCards({
  lang,
  group,
}: {
  lang: Language;
  group?: Category["group"];
}) {
  const visible = categories.filter(
    (category) => !group || category.group === group,
  );
  return (
    <section
      className="my-12 min-[900px]:my-20"
      aria-labelledby="collections-title"
    >
      <SectionHeading
        animate
        id="collections-title"
        eyebrow={catalogueUi.categories[lang]}
        title={ui.services[lang]}
      />
      <ContentReveal className="mt-8 grid grid-cols-1 gap-5 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3">
        {visible.map((category) => {
          const items = getCategoryServices(category.id);
          return (
            <article
              data-content-reveal
              key={category.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-white"
            >
              <div className="relative isolate flex aspect-video items-center justify-center overflow-hidden bg-ivory p-6 text-center">
                <Image
                  data-content-image
                  src={`/assets/images/gallery/${category.image ?? items[0]?.image ?? "salon"}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 699px) 92vw, (max-width: 1099px) 46vw, (max-width: 1434px) 31vw, 444px"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-ink/60"
                />
                <h3 className="relative text-3xl font-normal leading-snug tracking-[-.02em] text-white min-[1100px]:text-4xl rtl:tracking-normal">
                  <Link
                    href={`/${lang}/services/categories/${category.id}`}
                    className="underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {category.title[lang]}
                  </Link>
                </h3>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-border p-6">
                <CategoryIcon
                  category={category.id}
                  className="size-9 shrink-0 text-gold"
                />
                <AccessLabel access={category.access} lang={lang} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm leading-relaxed text-espresso/75">
                  {category.description[lang]}
                </p>
                <ul className="my-5 divide-y divide-border">
                  {items.map((service) => (
                    <li key={service.slug}>
                      <Link
                        className="group flex min-h-11 items-center justify-between gap-3 py-2 text-sm hover:underline"
                        href={`/${lang}/services/${service.slug}`}
                      >
                        {service.title[lang]}
                        <ArrowRight
                          className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 motion-reduce:transform-none"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <BookingCta
                  className="mt-auto self-start border border-border bg-transparent text-espresso transition-colors duration-200 ease-out hover:bg-ivory motion-reduce:transition-none"
                  iconClassName="transition-colors duration-200 ease-out group-hover:bg-white motion-reduce:transition-none"
                  href={`/${lang}/services/categories/${category.id}`}
                  label={catalogueUi.explore[lang]}
                />
              </div>
            </article>
          );
        })}
      </ContentReveal>
    </section>
  );
}

export function PoolAccess({ lang }: { lang: Language }) {
  return (
    <section className="my-12 rounded-3xl border border-border bg-white p-6 min-[900px]:p-10">
      <SectionHeading
        eyebrow={catalogueUi.both[lang]}
        title={catalogueUi.poolTitle[lang]}
      />
      <div className="mt-8 grid gap-8 min-[700px]:grid-cols-2">
        <div>
          <h3 className="text-xl">{catalogueUi.membership[lang]}</h3>
          <p className="my-4 max-w-lg text-sm leading-relaxed text-espresso/75">
            {catalogueUi.poolMember[lang]}
          </p>
          <TextLink href={`/${lang}/memberships`}>
            {catalogueUi.memberships[lang]}
          </TextLink>
        </div>
        <div>
          <h3 className="text-xl">{catalogueUi.appointment[lang]}</h3>
          <p className="my-4 max-w-lg text-sm leading-relaxed text-espresso/75">
            {catalogueUi.poolBooking[lang]}
          </p>
          <TextLink
            href={`/${lang}/appointments?service=lap-swimming#appointment`}
          >
            {catalogueUi.appointments[lang]}
          </TextLink>
        </div>
      </div>
    </section>
  );
}

export function ServiceImage({
  image,
  category,
}: {
  image?: string;
  category: Category["id"];
}) {
  return (
    <div className="relative flex aspect-[1.4] items-center justify-center overflow-hidden rounded-3xl bg-ivory">
      {image ? (
        <Image
          src={`/assets/images/gallery/${image}.webp`}
          alt=""
          fill
          sizes="(max-width: 700px) 90vw, 600px"
          className="object-cover"
        />
      ) : (
        <CategoryIcon category={category} className="size-20 text-gold" />
      )}
    </div>
  );
}
