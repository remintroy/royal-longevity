import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages } from "@/data/inner-pages";
import { SiteFrame } from "@/components/inner/site-frame";
import { Hero, Story, ServiceCards, GalleryGrid, Questions, PackageCards, ContactDetails } from "@/components/inner/content";
import { AppointmentEnquiry } from "@/components/inner/appointment-enquiry";

type Props = { params: Promise<{ lang: string; section: string }> };
function resolve(lang: string, section: string) {
  if (lang !== "en" && lang !== "ar") notFound();
  if (!Object.hasOwn(pages, section)) notFound();
  return { lang, page: pages[section] } as const;
}
export function generateStaticParams() {
  return ["en", "ar"].flatMap((lang) => Object.keys(pages).map((section) => ({ lang, section })));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: language, section } = await params;
  const { lang, page } = resolve(language, section);
  return { title: `${page.eyebrow[lang]} | Royal Longevity`, description: page.description[lang], alternates: { languages: { en: `/en/${section}`, ar: `/ar/${section}` } } };
}
export default async function InnerPage({ params }: Props) {
  const { lang: language, section } = await params;
  const { lang, page } = resolve(language, section);
  return <SiteFrame lang={lang} path={section}>
    <Hero page={page} lang={lang} />
    {["about", "salon", "wellness", "beauty", "our-space"].includes(section) && <Story page={page} lang={lang} />}
    {["services", "beauty", "wellness", "salon"].includes(section) && <ServiceCards lang={lang} category={section === "wellness" ? "wellness" : section === "services" ? undefined : "beauty"} />}
    {["salon", "our-space"].includes(section) && <GalleryGrid lang={lang} />}
    {section === "packages" && <PackageCards lang={lang} />}
    {section === "contact" && <ContactDetails lang={lang} />}
    {section === "faq" && <Questions lang={lang} full />}
    <AppointmentEnquiry lang={lang} />
    {section !== "faq" && <Questions lang={lang} />}
  </SiteFrame>;
}
