import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, type InnerPage } from "@/data/inner-pages";
import { SiteFrame } from "@/components/inner/site-frame";
import { Hero, Story, TreatmentOptions, Questions } from "@/components/inner/content";
import { AppointmentEnquiry } from "@/components/inner/appointment-enquiry";

type Props = { params: Promise<{ lang: string; slug: string }> };
function resolve(lang: string, slug: string) {
  if (lang !== "en" && lang !== "ar") notFound();
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return { lang, service } as const;
}
export function generateStaticParams() {
  return ["en", "ar"].flatMap((lang) => services.map(({ slug }) => ({ lang, slug })));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: language, slug } = await params;
  const { lang, service } = resolve(language, slug);
  return { title: `${service.title[lang]} | Royal Longevity`, description: service.description[lang], alternates: { languages: { en: `/en/services/${slug}`, ar: `/ar/services/${slug}` } } };
}
export default async function ServicePage({ params }: Props) {
  const { lang: language, slug } = await params;
  const { lang, service } = resolve(language, slug);
  const page: InnerPage = { title: service.heading, eyebrow: service.title, description: service.description, image: service.image, storyTitle: service.ritual, story: service.description };
  return <SiteFrame lang={lang} path={`services/${slug}`}><Hero page={page} lang={lang} detail /><Story page={page} lang={lang} /><TreatmentOptions service={service} lang={lang} /><AppointmentEnquiry lang={lang} initialService={slug} /><Questions lang={lang} /></SiteFrame>;
}
