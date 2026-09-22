import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages } from "@/data/inner-pages";
import { SiteFrame } from "@/components/inner/site-frame";
import { Hero, Story } from "@/components/inner/editorial";
import { Questions } from "@/components/inner/questions";
import { ServiceCards } from "@/components/inner/service-cards";
import { GalleryGrid } from "@/components/inner/gallery-grid";
import { PackageCards } from "@/components/inner/package-cards";
import { ContactDetails } from "@/components/inner/contact-details";
import { AppointmentEnquiry } from "@/components/inner/appointment-enquiry";

type InnerPageProps = { params: Promise<{ lang: string; section: string }> };
function resolvePage(lang: string, section: string) {
  if (lang !== "en" && lang !== "ar") notFound();
  if (!Object.hasOwn(pages, section)) notFound();
  return { lang, page: pages[section] } as const;
}
export function generateStaticParams() {
  return ["en", "ar"].flatMap((lang) =>
    Object.keys(pages).map((section) => ({ lang, section })),
  );
}
export async function generateMetadata({
  params,
}: InnerPageProps): Promise<Metadata> {
  const { lang: language, section } = await params;
  const { lang, page } = resolvePage(language, section);
  return {
    title: `${page.eyebrow[lang]} | Royal Longevity`,
    description: page.description[lang],
    alternates: { languages: { en: `/en/${section}`, ar: `/ar/${section}` } },
  };
}
export default async function InnerPage({ params }: InnerPageProps) {
  const { lang: language, section } = await params;
  const { lang, page } = resolvePage(language, section);
  const showStory = [
    "about",
    "salon",
    "wellness",
    "beauty",
    "our-space",
  ].includes(section);
  const showServices = ["services", "beauty", "wellness", "salon"].includes(
    section,
  );
  const showGallery = ["salon", "our-space"].includes(section);
  const serviceCategory = section === "wellness" ? "wellness" : "beauty";

  return (
    <SiteFrame lang={lang} path={section}>
      <Hero page={page} lang={lang} />
      {showStory && <Story page={page} lang={lang} />}
      {showServices && (
        <ServiceCards
          lang={lang}
          category={section === "services" ? undefined : serviceCategory}
        />
      )}
      {showGallery && <GalleryGrid lang={lang} />}
      {section === "packages" && <PackageCards lang={lang} />}
      {section === "contact" && <ContactDetails lang={lang} />}
      {section === "faq" && <Questions lang={lang} full />}
      <AppointmentEnquiry lang={lang} />
      {section !== "faq" && <Questions lang={lang} />}
    </SiteFrame>
  );
}
