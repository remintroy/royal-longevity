import { SectionHeading } from "./section-heading";
import type { Language } from "@/data/site";
import { ui } from "@/data/inner/ui";
import { MapPin } from "lucide-react";
import { getLocationContent } from "@/data/location";
import { BookingCta } from "@/components/ui/booking-cta";
import { getBookingHref } from "@/lib/booking";
import { TextLink } from "./text-link";

export function ContactDetails({ lang }: { lang: Language }) {
  const location = getLocationContent(lang);
  return (
    <section className="my-[65px] scroll-mt-[25px] min-[900px]:my-[85px] grid gap-[30px] min-[900px]:grid-cols-[1.2fr_0.8fr] min-[900px]:gap-[70px]">
      <div>
        <SectionHeading
          animate
          eyebrow={location.eyebrow}
          title={location.title}
        />
        <div className="mt-8 grid gap-6 divide-y divide-border">
          {location.details.map((detail) => (
            <div className="pb-6" key={detail.label}>
              <h3 className="mb-[7px] text-[13px] leading-[1.35] font-medium">
                {detail.label}
              </h3>
              <p className="leading-[1.65] whitespace-pre-line opacity-75">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-[22px] text-xs opacity-65 leading-[1.65]">
          {location.mapNote}
        </p>
        <TextLink href={location.mapHref}>{location.mapsLabel}</TextLink>
      </div>
      <div className="flex flex-col items-start gap-6 rounded-3xl border border-border bg-ivory/60 p-6 min-[700px]:p-10">
        <MapPin size={36} strokeWidth={1.2} aria-hidden="true" />
        <h3 className="text-2xl leading-snug font-normal">
          {ui.contact[lang]}
        </h3>
        <p className="leading-[1.65] text-sm">{ui.visitBody[lang]}</p>
        <BookingCta
          href={getBookingHref(lang)}
          label={ui.send[lang]}
          target="_blank"
          rel="noreferrer"
        />
      </div>
    </section>
  );
}
