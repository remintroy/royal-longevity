import { ExploreMore } from "@/components/inner/explore-more";
import { CatalogueBreadcrumbs } from "@/components/inner/catalogue-breadcrumbs";
import { catalogueHero } from "@/data/catalogue/hero";
import { ServiceArtInterlude } from "@/components/inner/service-art-interlude";
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
  return (
    <SiteFrame flushFooter lang={lang} path={`services/${slug}`}>
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
            <TextLink href="#appointment">{catalogueUi.enquiry[lang]}</TextLink>
          </>
        }
      />
      <ServiceArtInterlude category={category.id} passage="opening" />
      <ServiceGallery service={service} lang={lang} />
      <ServiceArtInterlude category={category.id} />
      <section className="my-12 rounded-3xl border border-border bg-white p-6 min-[900px]:p-10">
        <h2 className="text-2xl">{catalogueUi.pricing[lang]}</h2>
        <p className="mt-4 leading-relaxed text-espresso/75">
          {catalogueUi.pricingBody[lang]}
        </p>
      </section>
      {service.access === "both" && <PoolAccess lang={lang} />}
      <AppointmentEnquiry lang={lang} initialService={slug} />
      <ServiceArtInterlude category={category.id} signature />
      <ServiceCards lang={lang} category={category.id} decorated />
      <ServiceArtInterlude category={category.id} passage="closing" />
      <Questions lang={lang} />
      <ExploreMore lang={lang} category={category.id} />
    </SiteFrame>
  );
}
