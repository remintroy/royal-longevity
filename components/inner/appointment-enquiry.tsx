"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CalendarDays, MessageCircle } from "lucide-react";
import type { Language } from "@/data/site";
import { categories, services } from "@/data/catalogue";
import { enquiryUi } from "@/data/inner/enquiry";
import { ui } from "@/data/inner/ui";
import { getBookingHref } from "@/lib/booking";
import { BookingCta } from "@/components/ui/booking-cta";
import { SectionHeading } from "./section-heading";

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
  const [message, setMessage] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const selectedService = services.find(
    (item) => item.slug === selectedServiceSlug,
  );
  const selectedCategory = categories.find(
    (item) => item.id === selectedService?.category,
  );
  const bookingContext = [
    selectedCategory?.title[lang],
    selectedService?.title[lang] ?? ui.any[lang],
    preferredDate && `${ui.date[lang]}: ${preferredDate}`,
    preferredTime && `${ui.time[lang]}: ${preferredTime}`,
    message.trim() && `${enquiryUi.message[lang]}: ${message.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
  return (
    <section
      id="appointment"
      className="my-16 scroll-mt-8 min-[900px]:my-20"
      aria-labelledby="appointment-title"
    >
      <SectionHeading
        eyebrow={enquiryUi.eyebrow[lang]}
        title={ui.visitTitle[lang]}
        id="appointment-title"
      />
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-espresso/75">
        {enquiryUi.intro[lang]}
      </p>
      <div className="mt-8 grid gap-8 rounded-3xl border border-border bg-white p-5 sm:p-8 min-[900px]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] min-[900px]:gap-x-10 lg:p-10">
        <div className="min-w-0">
          <label className="grid min-w-0 gap-[15px] text-sm">
            <span className="flex items-center gap-[15px] text-gold">
              01 <span className="text-espresso">{ui.select[lang]}</span>
            </span>
            <select
              className="h-14 w-full min-w-0 max-w-full rounded-2xl border border-border bg-ivory/20 px-4 text-base text-espresso transition-colors hover:border-espresso/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
              value={selectedServiceSlug}
              onChange={(event) => setSelectedServiceSlug(event.target.value)}
            >
              <option value="">{ui.any[lang]}</option>
              {categories.map((category) => (
                <optgroup key={category.id} label={category.title[lang]}>
                  {services
                    .filter((service) => service.category === category.id)
                    .map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.title[lang]}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          <p className="mt-7 text-sm leading-relaxed text-espresso/65">
            {enquiryUi.preferences[lang]}
          </p>
          <div className="mt-4 grid gap-5 min-[600px]:grid-cols-2">
            <label className="grid min-w-0 gap-[15px] text-sm">
              <span className="flex items-center gap-[15px] text-gold">
                02 <span className="text-espresso">{ui.date[lang]}</span>
              </span>
              <input
                className="h-14 w-full min-w-0 max-w-full rounded-2xl border border-border bg-ivory/20 px-4 text-base text-espresso transition-colors hover:border-espresso/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
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
                className="h-14 w-full min-w-0 max-w-full rounded-2xl border border-border bg-ivory/20 px-4 text-base text-espresso transition-colors hover:border-espresso/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
                type="time"
                value={preferredTime}
                onChange={(event) => setPreferredTime(event.target.value)}
              />
            </label>
          </div>
          <label className="mt-7 grid gap-3 text-sm">
            <span>{enquiryUi.message[lang]}</span>
            <textarea
              className="min-h-32 w-full resize-y rounded-2xl border border-border bg-ivory/20 p-4 text-base leading-relaxed text-espresso placeholder:text-espresso/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              rows={4}
              maxLength={1500}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={enquiryUi.placeholder[lang]}
            />
          </label>
        </div>
        <aside className="flex min-w-0 flex-col">
          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-[20px]">
            <Image
              className="object-cover"
              src={`/assets/images/gallery/${selectedService?.image ?? "salon"}.webp`}
              alt=""
              fill
              sizes="(max-width: 899px) 90vw, 500px"
            />
          </div>
          <p className="mb-3 text-xs tracking-widest text-espresso/65 uppercase rtl:tracking-normal">
            {enquiryUi.summary[lang]}
          </p>
          <h3 className="mb-3 text-2xl leading-snug break-words">
            {selectedService?.title[lang] ?? ui.summary[lang]}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-espresso/70">
            {selectedCategory?.title[lang] ?? enquiryUi.guidance[lang]}
          </p>
          {(preferredDate || preferredTime) && (
            <p className="mb-5 flex items-center gap-2.5 text-[13px] leading-[1.65]">
              <CalendarDays size={18} aria-hidden="true" />
              <span dir="ltr">
                {[preferredDate, preferredTime].filter(Boolean).join(" · ")}
              </span>
            </p>
          )}
        </aside>
        <div className="flex min-w-0 flex-col gap-5 border-t border-border pt-6 min-[900px]:col-span-2 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
          <p className="flex max-w-xl items-start gap-3 text-xs leading-relaxed text-espresso/70">
            <MessageCircle
              className="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            {enquiryUi.note[lang]}
          </p>
          <BookingCta
            className="w-fit max-w-full shrink-0 text-xs min-[380px]:text-sm"
            href={getBookingHref(lang, bookingContext)}
            label={ui.send[lang]}
            target="_blank"
            rel="noreferrer"
          />
        </div>
      </div>
    </section>
  );
}

export function AppointmentFromQuery({ lang }: { lang: Language }) {
  const searchParams = useSearchParams();
  const service = services.find(
    (item) => item.slug === searchParams.get("service"),
  );
  return (
    <AppointmentEnquiry
      key={service?.slug ?? "all"}
      lang={lang}
      initialService={service?.slug}
    />
  );
}
