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
    <section className="my-[65px] scroll-mt-[25px] min-[900px]:my-[85px] grid gap-[30px] min-[900px]:grid-cols-[1.2fr_1fr] min-[900px]:gap-[70px]">
      <div>
        <SectionHeading eyebrow={location.eyebrow} title={location.title} />
        <div className="mt-[30px] grid gap-[25px] min-[900px]:grid-cols-3">
          {location.details.map((detail) => (
            <div key={detail.label}>
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
      <div className="flex flex-col items-start gap-6 rounded-3xl bg-ivory p-[35px]">
        <MapPin size={36} strokeWidth={1.2} aria-hidden="true" />
        <h3 className="text-[1.22rem] leading-[1.35] font-medium">
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
