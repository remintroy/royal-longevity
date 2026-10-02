"use client";

import { useId, useState } from "react";
import { I18nProvider } from "react-aria-components";
import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import type { Language } from "@/data/site";
import { categories, services } from "@/data/catalogue";
import { enquiryUi } from "@/data/inner/enquiry";
import {
  enquiryLocales,
  enquiryControlsUi,
} from "@/data/inner/enquiry-controls";
import { EnquirySelect } from "@/components/ui/enquiry-select";
import {
  DatePicker,
  TimePicker,
  formatPickerTime,
} from "@/components/ui/date-time-picker";
import { ui } from "@/data/inner/ui";
import { getBookingHref } from "@/lib/booking";
import { BookingCta } from "@/components/ui/booking-cta";
import { SectionHeading } from "./section-heading";

type AppointmentEnquiryProps = {
  lang: Language;
  initialService?: string;
  inDialog?: boolean;
};

export function AppointmentEnquiry({
  lang,
  initialService = "",
  inDialog = false,
}: AppointmentEnquiryProps) {
  const formId = useId();
  const titleId = `${formId}-title`;
  const noteId = `${formId}-note`;
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
  const serviceGroups = categories.map((category) => ({
    id: category.id,
    label: category.title[lang],
    options: services
      .filter((service) => service.category === category.id)
      .map((service) => ({ id: service.slug, label: service.title[lang] })),
  }));
  const bookingContext = [
    selectedCategory?.title[lang],
    selectedService?.title[lang] ?? ui.any[lang],
    preferredDate && `${ui.date[lang]}: ${preferredDate}`,
    preferredTime &&
      `${ui.time[lang]}: ${formatPickerTime(preferredTime, lang)} (${enquiryControlsUi.timeHint[lang]})`,
    message.trim() && `${enquiryUi.message[lang]}: ${message.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
  if (inDialog) {
    return (
      <div className="flex min-h-0 flex-col">
        <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-5 sm:px-6" data-lenis-prevent>
          <p className="mb-5 text-sm leading-relaxed text-espresso/75">
            {enquiryUi.bookingIntro[lang]}
          </p>
          <I18nProvider locale={enquiryLocales[lang]}>
            <EnquirySelect
              label={ui.select[lang]}
              value={selectedServiceSlug}
              onChange={setSelectedServiceSlug}
              defaultOption={{ id: "any-service", label: ui.any[lang] }}
              groups={serviceGroups}
            />
            <details className="mt-4 rounded-2xl border border-border">
              <summary className="cursor-pointer rounded-2xl px-4 py-4 text-sm leading-relaxed text-espresso focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2">
                {enquiryUi.optionalDetails[lang]}
              </summary>
              <div className="grid gap-5 px-4 pb-4">
                <DatePicker lang={lang} label={ui.date[lang]} value={preferredDate} onChange={setPreferredDate} />
                <TimePicker lang={lang} label={ui.time[lang]} value={preferredTime} onChange={setPreferredTime} />
                <label className="grid gap-2 text-sm">
                  <span>{enquiryUi.message[lang]}</span>
                  <textarea
                    className="min-h-24 w-full resize-y rounded-2xl border border-border bg-ivory/20 p-3 text-base leading-relaxed text-espresso placeholder:text-espresso/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    rows={3}
                    maxLength={1500}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={enquiryUi.placeholder[lang]}
                  />
                </label>
              </div>
            </details>
          </I18nProvider>
        </div>
        <div className="shrink-0 border-t border-border bg-white px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
          <a
            className="flex min-h-14 w-full items-center justify-center rounded-full bg-espresso px-6 py-4 text-center text-sm font-semibold leading-snug text-ivory hover:bg-espresso/90 active:bg-espresso/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            aria-describedby={noteId}
            href={getBookingHref(lang, bookingContext)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {enquiryUi.continue[lang]}
          </a>
          <p id={noteId} className="mt-3 text-center text-xs leading-relaxed text-espresso/75">
            {enquiryUi.bookingNote[lang]}
          </p>
        </div>
      </div>
    );
  }
  return (
    <section
      id="appointment"
      className="my-16 scroll-mt-8 min-[900px]:my-20"
      aria-labelledby={titleId}
    >
      <div className="grid gap-8 rounded-3xl bg-ivory/60 p-4 sm:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 lg:p-10">
        <header className="min-w-0">
          <SectionHeading
            eyebrow={enquiryUi.eyebrow[lang]}
            title={enquiryUi.title[lang]}
            id={titleId}
          />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-espresso/75">
            {enquiryUi.intro[lang]}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-espresso/75">
            {enquiryUi.guidance[lang]}
          </p>
        </header>
        <div className="min-w-0 rounded-3xl border border-border bg-white p-4 sm:p-6 lg:p-8">
          <I18nProvider locale={enquiryLocales[lang]}>
            <EnquirySelect
              label={ui.select[lang]}
              value={selectedServiceSlug}
              onChange={setSelectedServiceSlug}
              defaultOption={{ id: "any-service", label: ui.any[lang] }}
              groups={serviceGroups}
            />
            <p className="mt-6 text-sm leading-relaxed text-espresso/75">
              {enquiryUi.preferences[lang]}
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <DatePicker
                lang={lang}
                label={ui.date[lang]}
                value={preferredDate}
                onChange={setPreferredDate}
              />
              <TimePicker
                lang={lang}
                label={ui.time[lang]}
                value={preferredTime}
                onChange={setPreferredTime}
              />
            </div>
          </I18nProvider>
          <label className="mt-6 grid gap-3 text-sm">
            <span>{enquiryUi.message[lang]}</span>
            <textarea
              className="min-h-28 w-full resize-y rounded-2xl border border-border bg-ivory/20 p-4 text-base leading-relaxed text-espresso placeholder:text-espresso/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              rows={3}
              maxLength={1500}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={enquiryUi.placeholder[lang]}
            />
          </label>
          <div className="mt-6 flex min-w-0 flex-col gap-4 border-t border-border pt-6">
            <p
              id={noteId}
              className="flex items-start gap-3 text-sm leading-relaxed text-espresso/75"
            >
              <MessageCircle
                className="mt-1 size-4 shrink-0"
                aria-hidden="true"
              />
              {enquiryUi.note[lang]}
            </p>
            <BookingCta
              className="w-full max-w-full text-xs min-[380px]:text-sm sm:w-fit"
              aria-describedby={noteId}
              href={getBookingHref(lang, bookingContext)}
              label={enquiryUi.continue[lang]}
              target="_blank"
              rel="noreferrer"
            />
          </div>
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
