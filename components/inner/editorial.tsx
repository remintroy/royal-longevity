import { PageHero } from "./page-hero";
import { ContentReveal } from "./content-reveal";
import { getBookingHref } from "@/lib/booking";
import { SectionHeading } from "./section-heading";
import type { Language } from "@/data/site";
import { ui } from "@/data/inner/ui";
import Image from "next/image";
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

export function Hero({ page, lang }: { page: InnerPage; lang: Language }) {
  return (
    <>
      <PageHero
        lang={lang}
        title={page.title[lang]}
        description={page.description[lang]}
        eyebrow={page.eyebrow[lang]}
        navigation={<TextLink href={`/${lang}`}>{ui.home[lang]}</TextLink>}
        media={<Photo image={page.image} lang={lang} hero />}
        actions={
          <>
            <BookingCta
              enquiry
              href={getBookingHref(lang)}
              label={ui.book[lang]}
              target="_blank"
              rel="noreferrer"
            />
            <TextLink href={`/${lang}/our-space`}>{ui.gallery[lang]}</TextLink>
          </>
        }
      />
      <div className="mt-8">
        <Values lang={lang} />
      </div>
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
      <ContentReveal>
        <div data-content-reveal>
          <Photo
            image={page.image === "salon" ? "hair" : "salon"}
            lang={lang}
          />
        </div>
      </ContentReveal>
      <div className="px-1 py-2.5 min-[900px]:px-[15px] min-[900px]:py-[25px]">
        <SectionHeading
          animate
          eyebrow={ui.care[lang]}
          title={page.storyTitle[lang]}
        />
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
