import { SectionHeading } from "./section-heading";
import type { Language } from "@/data/site";
import { ui } from "@/data/inner/ui";
import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Sparkles, UserRound } from "lucide-react";
import { getGalleryContent } from "@/data/gallery";
import type { InnerPage } from "@/data/inner-pages";
import { values } from "@/data/inner/ui";
import { BookingCta } from "@/components/ui/booking-cta";
import { cn } from "@/lib/utils";
import { TextLink } from "./text-link";

export function Photo({
  image,
  lang,
  hero = false,
}: {
  image: string;
  lang: Language;
  hero?: boolean;
}) {
  const asset = getGalleryContent(lang).images.find(
    (item) => item.id === image,
  );

  if (!asset) {
    throw new Error(`Unknown gallery image: ${image}`);
  }
  return (
    <div
      className={cn(
        "relative aspect-[1.35] min-h-[300px] overflow-hidden rounded-3xl bg-ivory",
        hero && "min-[900px]:h-full min-[900px]:min-h-[550px]",
      )}
    >
      <Image
        className="object-cover"
        src={asset.src}
        alt={asset.alt}
        fill
        sizes="(max-width: 760px) 92vw, (max-width: 1400px) 48vw, 680px"
        preload={hero}
      />
      <span className="absolute end-5 bottom-5 rounded-full bg-[color-mix(in_srgb,var(--color-ivory)_22%,white)] px-[17px] py-2.5 text-xs">
        {ui.care[lang]}
      </span>
    </div>
  );
}

export function Hero({
  page,
  lang,
  detail = false,
}: {
  page: InnerPage;
  lang: Language;
  detail?: boolean;
}) {
  return (
    <>
      <section className="grid gap-[30px] pt-[18px] pb-[30px] min-[900px]:grid-cols-[1fr_1.08fr] min-[900px]:items-center min-[900px]:gap-10 min-[900px]:pt-2.5">
        <div className="px-1 py-3 min-[900px]:px-2.5 min-[900px]:py-[30px]">
          <nav
            className="mb-8 flex items-center gap-2.5 text-xs opacity-[.72]"
            aria-label={ui.home[lang]}
          >
            <Link href={`/${lang}`}>{ui.home[lang]}</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${lang}/services`}>{ui.all[lang]}</Link>
          </nav>
          <p className="mb-[17px] flex items-center gap-2.5 text-[11px] tracking-[.12em] uppercase before:text-[9px] before:text-gold before:content-['◆'] leading-[1.65]">
            {page.eyebrow[lang]}
          </p>
          <h1 className="text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[1.07] font-normal tracking-[-.05em] text-balance rtl:leading-[1.4] rtl:tracking-normal">
            {page.title[lang]}
          </h1>
          <p className="mt-[22px] max-w-[550px] text-base opacity-[.78] leading-[1.65]">
            {page.description[lang]}
          </p>
          <div className="mt-[30px] flex flex-wrap items-center gap-5">
            <BookingCta href="#appointment" label={ui.book[lang]} />
            <TextLink href={`/${lang}/${detail ? "salon" : "our-space"}`}>
              {detail ? ui.salon[lang] : ui.gallery[lang]}
            </TextLink>
          </div>
          <p className="mt-[30px] text-[11px] tracking-[.16em] uppercase opacity-65 leading-[1.65]">
            {ui.footer[lang]}
          </p>
        </div>
        <Photo image={page.image} lang={lang} hero />
      </section>
      <Values lang={lang} />
    </>
  );
}

export function Values({ lang }: { lang: Language }) {
  const icons = {
    leaf: Leaf,
    user: UserRound,
    sparkles: Sparkles,
    heart: Heart,
  };
  return (
    <div className="grid grid-cols-2 rounded-3xl border border-border p-3 min-[900px]:grid-cols-4 min-[900px]:px-4 min-[900px]:py-[22px]">
      {values.map((item) => {
        const Icon = icons[item.icon];
        return (
          <div
            className="flex items-center gap-3 px-2 py-[18px] max-[380px]:flex-col max-[380px]:items-start min-[900px]:px-[22px] min-[900px]:py-2 min-[900px]:not-first:border-s min-[900px]:not-first:border-border"
            key={item.icon}
          >
            <Icon
              className="shrink-0 text-gold"
              size={28}
              strokeWidth={1.3}
              aria-hidden="true"
            />
            <span>
              <strong className="block text-[13px] font-medium">
                {item.title[lang]}
              </strong>
              <small className="mt-[5px] block text-[11px] leading-normal opacity-70">
                {item.description[lang]}
              </small>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Story({ page, lang }: { page: InnerPage; lang: Language }) {
  return (
    <section className="my-[65px] scroll-mt-[25px] min-[900px]:my-[85px] grid items-center gap-[30px] min-[900px]:grid-cols-[1.15fr_1fr] min-[900px]:gap-[60px]">
      <Photo image={page.image === "salon" ? "hair" : "salon"} lang={lang} />
      <div className="px-1 py-2.5 min-[900px]:px-[15px] min-[900px]:py-[25px]">
        <SectionHeading eyebrow={ui.care[lang]} title={page.storyTitle[lang]} />
        <p className="mt-[22px] max-w-[550px] text-base opacity-[.78] leading-[1.65]">
          {page.story[lang]}
        </p>
        <TextLink className="mt-[26px]" href={`/${lang}/salon`}>
          {ui.salon[lang]}
        </TextLink>
      </div>
    </section>
  );
}
