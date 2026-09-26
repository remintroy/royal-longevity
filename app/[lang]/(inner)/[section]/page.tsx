import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages } from "@/data/inner-pages";
import { pageLayouts } from "@/data/catalogue/page-layouts";
import { supportingPages } from "@/data/catalogue/supporting";
import { ui } from "@/data/inner/ui";
import { SiteFrame } from "@/components/inner/site-frame";
import { Hero, Story } from "@/components/inner/editorial";
import { Questions } from "@/components/inner/questions";
import { ServiceCards } from "@/components/inner/service-cards";
import { GalleryGrid } from "@/components/inner/gallery-grid";
import { PackageCards } from "@/components/inner/package-cards";
import { ContactDetails } from "@/components/inner/contact-details";
import { AppointmentFromQuery } from "@/components/inner/appointment-enquiry";
import {
  CatalogueIntro,
  CategoryCards,
  PoolAccess,
} from "@/components/inner/catalogue";
import { Memberships, Journey } from "@/components/inner/memberships";

type InnerPageProps = { params: Promise<{ lang: string; section: string }> };
function resolvePage(lang: string, section: string) {
  if (lang !== "en" && lang !== "ar") notFound();
  if (!Object.hasOwn(pages, section) || !Object.hasOwn(pageLayouts, section))
    notFound();
  return { lang, page: pages[section], layout: pageLayouts[section] } as const;
}
export function generateStaticParams() {
  return ["en", "ar"].flatMap((lang) =>
    Object.keys(pageLayouts).map((section) => ({ lang, section })),
  );
}
export async function generateMetadata({
  params,
}: InnerPageProps): Promise<Metadata> {
  const { lang: language, section } = await params;
  const { lang, page } = resolvePage(language, section);
  return {
    title: `${page.title[lang]} | Royal Longevity`,
    description: page.description[lang],
    alternates: { languages: { en: `/en/${section}`, ar: `/ar/${section}` } },
    ...(Object.hasOwn(supportingPages, section)
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}
export default async function InnerPage({ params }: InnerPageProps) {
  const { lang: language, section } = await params;
  const { lang, page, layout } = resolvePage(language, section);
  return (
    <SiteFrame lang={lang} path={section}>
      {layout.hero === "intro" ? (
        <CatalogueIntro
          lang={lang}
          eyebrow={page.eyebrow[lang]}
          title={page.title[lang]}
          description={page.description[lang]}
        />
      ) : (
        <Hero page={page} lang={lang} />
      )}
      {layout.sections.map((block) => {
        switch (block) {
          case "story":
            return <Story key={block} page={page} lang={lang} />;
          case "categories":
            return <CategoryCards key={block} lang={lang} />;
          case "beauty-categories":
            return <CategoryCards key={block} lang={lang} group="beauty" />;
          case "wellness-categories":
            return <CategoryCards key={block} lang={lang} group="wellness" />;
          case "salon-services":
            return (
              <ServiceCards key={block} lang={lang} category="salon-hair" />
            );
          case "gallery":
            return <GalleryGrid key={block} lang={lang} />;
          case "packages":
            return <PackageCards key={block} lang={lang} />;
          case "contact":
            return <ContactDetails key={block} lang={lang} />;
          case "appointments":
            return (
              <Suspense
                key={block}
                fallback={
                  <p className="py-10" role="status">
                    {ui.select[lang]}
                  </p>
                }
              >
                <AppointmentFromQuery lang={lang} />
              </Suspense>
            );
          case "memberships":
            return <Memberships key={block} lang={lang} />;
          case "membership-journey":
            return <Journey key={block} lang={lang} membership />;
          case "appointment-journey":
            return <Journey key={block} lang={lang} />;
          case "pool-access":
            return <PoolAccess key={block} lang={lang} />;
          case "questions":
            return <Questions key={block} lang={lang} />;
          case "all-questions":
            return <Questions key={block} lang={lang} full />;
        }
      })}
    </SiteFrame>
  );
}
