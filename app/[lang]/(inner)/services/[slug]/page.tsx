import { CatalogueBreadcrumbs } from "@/components/inner/catalogue-breadcrumbs";
import { catalogueHero } from "@/data/catalogue/hero";
import { ServiceArt } from "@/components/inner/service-art";
import { ServiceGallery } from "@/components/inner/service-gallery";
import { PageHero } from "@/components/inner/page-hero";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService, categories } from "@/data/catalogue";
import { catalogueUi } from "@/data/catalogue/experience";
import { ui } from "@/data/inner/ui";
import { SiteFrame } from "@/components/inner/site-frame";
import { Questions } from "@/components/inner/questions";
import { ServiceCards } from "@/components/inner/service-cards";
import { AppointmentEnquiry } from "@/components/inner/appointment-enquiry";
import {
  AccessLabel,
  PoolAccess,
  ServiceImage,
} from "@/components/inner/catalogue";
import { Journey } from "@/components/inner/memberships";
import { BookingCta } from "@/components/ui/booking-cta";
import { TextLink } from "@/components/inner/text-link";
import { getBookingHref } from "@/lib/booking";

type ServicePageProps = { params: Promise<{ lang: string; slug: string }> };
function resolveService(lang: string, slug: string) {
  if (lang !== "en" && lang !== "ar") notFound();
  const service = getService(slug);
  if (!service) notFound();
  const category = categories.find((item) => item.id === service.category);
  if (!category) notFound();
  return { lang, service, category } as const;
}
export function generateStaticParams() {
  return ["en", "ar"].flatMap((lang) =>
    services.map(({ slug }) => ({ lang, slug })),
  );
}
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { lang: language, slug } = await params;
  const { lang, service } = resolveService(language, slug);
  return {
    title: `${service.title[lang]} | Royal Longevity`,
    description: service.description[lang],
    alternates: {
      languages: { en: `/en/services/${slug}`, ar: `/ar/services/${slug}` },
    },
  };
}
export default async function ServicePage({ params }: ServicePageProps) {
  const { lang: language, slug } = await params;
  const { lang, service, category } = resolveService(language, slug);
  const membership = service.access === "membership";
  return (
    <SiteFrame lang={lang} path={`services/${slug}`}>
      <CatalogueBreadcrumbs
        lang={lang}
        items={[
          { label: ui.home[lang], href: `/${lang}` },
          { label: ui.all[lang], href: `/${lang}/services` },
          {
            label: category.title[lang],
            href: `/${lang}/services/categories/${category.id}`,
          },
          { label: service.title[lang] },
        ]}
      />
      <PageHero
        lang={lang}
        backgroundArt={<ServiceArt service={service} />}
        title={service.title[lang]}
        description={service.description[lang]}
        eyebrow={
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs tracking-[.1em] uppercase text-espresso/65 rtl:tracking-normal">
              {catalogueHero.service[lang]}
            </span>
            <AccessLabel access={service.access} lang={lang} />
          </div>
        }
        media={<ServiceImage image={service.image} category={category.id} />}
        actions={
          <>
            <BookingCta
              href={getBookingHref(
                lang,
                `${category.title[lang]} · ${service.title[lang]}`,
              )}
              label={catalogueUi.bookNow[lang]}
              target="_blank"
              rel="noreferrer"
            />
            <TextLink
              href={membership ? `/${lang}/memberships` : "#appointment"}
            >
              {membership
                ? catalogueUi.memberships[lang]
                : catalogueUi.appointments[lang]}
            </TextLink>
          </>
        }
      />
      <ServiceGallery service={service} lang={lang} />
      <section className="my-12 rounded-3xl border border-border bg-white p-6 min-[900px]:p-10">
        <h2 className="text-2xl">{catalogueUi.pricing[lang]}</h2>
        <p className="mt-4 leading-relaxed text-espresso/75">
          {catalogueUi.pricingBody[lang]}
        </p>
      </section>
      <Journey lang={lang} membership={membership} />
      {service.access === "both" && <PoolAccess lang={lang} />}
      {!membership && <AppointmentEnquiry lang={lang} initialService={slug} />}
      <ServiceCards lang={lang} category={category.id} />
      <Questions lang={lang} />
    </SiteFrame>
  );
}
