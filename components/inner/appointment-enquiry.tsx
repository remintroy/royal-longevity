"use client";

import { SectionHeading } from "./section-heading";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, MessageCircle } from "lucide-react";
import type { Language } from "@/data/site";
import { services } from "@/data/inner/services";
import { ui } from "@/data/inner/ui";
import { getBookingHref } from "@/lib/booking";
import { BookingCta } from "@/components/ui/booking-cta";

type AppointmentEnquiryProps = {
  lang: Language;
  initialService?: string;
};

export function AppointmentEnquiry({
  lang,
  initialService = "",
}: AppointmentEnquiryProps) {
  const [selectedServiceSlug, setSelectedServiceSlug] =
    useState(initialService);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const selectedService = services.find(
    (item) => item.slug === selectedServiceSlug,
  );
  const bookingContext = [
    selectedService?.title[lang] ?? ui.any[lang],
    preferredDate && `${ui.date[lang]}: ${preferredDate}`,
    preferredTime && `${ui.time[lang]}: ${preferredTime}`,
  ]
    .filter(Boolean)
    .join("\n");
  return (
    <section
      id="appointment"
      className="my-[65px] scroll-mt-[25px] min-[900px]:my-[85px]"
      aria-labelledby="appointment-title"
    >
      <SectionHeading
        eyebrow={ui.visit[lang]}
        title={ui.visitTitle[lang]}
        id="appointment-title"
      />
      <p className="mt-[22px] max-w-[550px] text-base opacity-[.78] leading-[1.65]">
        {ui.visitBody[lang]}
      </p>
      <div className="mt-7 grid gap-[18px] min-[900px]:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 rounded-3xl border border-border bg-white p-6 max-[380px]:p-[18px] min-[900px]:p-[35px]">
          <label className="grid min-w-0 gap-[15px] text-sm">
            <span className="flex items-center gap-[15px] text-gold">
              01 <span className="text-espresso">{ui.select[lang]}</span>
            </span>
            <select
              className="h-14 w-full min-w-0 rounded-xl border border-border bg-[color-mix(in_srgb,var(--color-ivory)_22%,white)] px-4 text-espresso"
              value={selectedServiceSlug}
              onChange={(event) => setSelectedServiceSlug(event.target.value)}
            >
              <option value="">{ui.any[lang]}</option>
              {services.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.title[lang]}
                </option>
              ))}
            </select>
          </label>
          <div className="mt-7 grid gap-6 min-[600px]:grid-cols-2">
            <label className="grid min-w-0 gap-[15px] text-sm">
              <span className="flex items-center gap-[15px] text-gold">
                02 <span className="text-espresso">{ui.date[lang]}</span>
              </span>
              <input
                className="h-14 w-full min-w-0 rounded-xl border border-border bg-[color-mix(in_srgb,var(--color-ivory)_22%,white)] px-4 text-espresso"
                type="date"
                value={preferredDate}
                onChange={(event) => setPreferredDate(event.target.value)}
              />
            </label>
            <label className="grid min-w-0 gap-[15px] text-sm">
              <span className="flex items-center gap-[15px] text-gold">
                03 <span className="text-espresso">{ui.time[lang]}</span>
              </span>
              <input
                className="h-14 w-full min-w-0 rounded-xl border border-border bg-[color-mix(in_srgb,var(--color-ivory)_22%,white)] px-4 text-espresso"
                type="time"
                value={preferredTime}
                onChange={(event) => setPreferredTime(event.target.value)}
              />
            </label>
          </div>
          <p className="mt-[30px] flex items-start gap-[13px] text-[13px] opacity-70 leading-[1.65]">
            <MessageCircle
              className="mt-[3px] shrink-0"
              size={20}
              aria-hidden="true"
            />
            {ui.requestNote[lang]}
          </p>
        </div>
        <aside className="min-w-0 rounded-3xl border border-border bg-white p-6 max-[380px]:p-[18px]">
          <div className="relative mb-5 h-[150px] overflow-hidden rounded-[15px]">
            <Image
              className="object-cover"
              src={`/assets/images/gallery/${selectedService?.image ?? "salon"}.webp`}
              alt=""
              fill
              sizes="(max-width: 760px) 90vw, 400px"
            />
          </div>
          <h3 className="text-[1.22rem] leading-[1.35] font-medium mb-5">
            {selectedService?.title[lang] ?? ui.summary[lang]}
          </h3>
          {(preferredDate || preferredTime) && (
            <p className="mb-5 flex items-center gap-2.5 text-[13px] leading-[1.65]">
              <CalendarDays size={18} aria-hidden="true" />
              <span dir="ltr">
                {[preferredDate, preferredTime].filter(Boolean).join(" · ")}
              </span>
            </p>
          )}
          <BookingCta
            className="max-w-full"
            href={getBookingHref(lang, bookingContext)}
            label={ui.send[lang]}
            target="_blank"
            rel="noreferrer"
          />
        </aside>
      </div>
    </section>
  );
}
