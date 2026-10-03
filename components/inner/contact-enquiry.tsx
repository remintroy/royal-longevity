"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { I18nProvider } from "react-aria-components";
import type { Language } from "@/data/site";
import { contactTopics, contactUi } from "@/data/inner/contact";
import { ui } from "@/data/inner/ui";
import { DatePicker, TimePicker } from "@/components/ui/date-time-picker";
import { enquiryLocales } from "@/data/inner/enquiry-controls";
import { EnquirySelect } from "@/components/ui/enquiry-select";
import { getBookingHref } from "@/lib/booking";

export function ContactEnquiry({ lang }: { lang: Language }) {
  const id = useId();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [topic, setTopic] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [error, setError] = useState(false);
  const [preparedHref, setPreparedHref] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const message = String(fields.get("message") ?? "").trim();
    if (!message) {
      setError(true);
      messageRef.current?.focus();
      return;
    }
    setError(false);
    const name = String(fields.get("name") ?? "").trim();
    const selectedTopic =
      contactTopics.find((item) => item.id === topic) ?? contactTopics[0];
    const href = getBookingHref(lang, {
      kind: "contact",
      topic:
        selectedTopic.id === "general" ? undefined : selectedTopic.label[lang],
      name,
      message,
      preferredDate,
      preferredTime,
    });
    setPreparedHref(href);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <section aria-labelledby={`${id}-title`} className="min-w-0">
      <h2 id={`${id}-title`} className="text-2xl font-normal sm:text-3xl">
        {contactUi.title[lang]}
      </h2>
      <form
        noValidate
        onSubmit={handleSubmit}
        onChange={() => setPreparedHref("")}
        className="mt-6 grid gap-5"
      >
        <label className="grid gap-3 text-sm">
          <span>{contactUi.name[lang]}</span>
          <input
            name="name"
            autoComplete="name"
            maxLength={100}
            dir="auto"
            className="min-h-14 min-w-0 w-full rounded-2xl border border-border bg-white px-4 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          />
        </label>
        <I18nProvider locale={enquiryLocales[lang]}>
          <EnquirySelect
            label={contactUi.topic[lang]}
            value={topic}
            onChange={(value) => {
              setTopic(value);
              setPreparedHref("");
            }}
            defaultOption={{
              id: contactTopics[0].id,
              label: contactTopics[0].label[lang],
            }}
            groups={[
              {
                id: "topics",
                label: contactUi.topic[lang],
                options: contactTopics
                  .slice(1)
                  .map((item) => ({ id: item.id, label: item.label[lang] })),
              },
            ]}
          />
        </I18nProvider>
        <div className="grid gap-3 text-sm">
          <label htmlFor={`${id}-message`}>
            {contactUi.message[lang]} <span aria-hidden="true">*</span>
          </label>
          <textarea
            ref={messageRef}
            id={`${id}-message`}
            name="message"
            required
            rows={4}
            maxLength={1500}
            dir="auto"
            aria-invalid={error || undefined}
            aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
            onChange={(event) => {
              if (event.target.value.trim()) setError(false);
            }}
            placeholder={contactUi.placeholder[lang]}
            className="min-h-36 w-full resize-y rounded-2xl border border-border bg-white p-4 text-base leading-relaxed placeholder:text-espresso/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          />
          <p
            id={`${id}-hint`}
            className="text-xs leading-relaxed text-espresso/70"
          >
            {contactUi.hint[lang]}
          </p>
          {error && (
            <p
              id={`${id}-error`}
              role="alert"
              className="text-sm font-medium text-espresso"
            >
              {contactUi.required[lang]}
            </p>
          )}
        </div>
        <I18nProvider locale={enquiryLocales[lang]}>
          <details className="rounded-2xl border border-border">
            <summary className="cursor-pointer rounded-2xl px-4 py-4 text-sm leading-relaxed text-espresso focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2">
              {contactUi.optionalDateTime[lang]}
            </summary>
            <div className="grid gap-5 px-4 pb-4">
              <DatePicker
                lang={lang}
                label={ui.date[lang]}
                value={preferredDate}
                onChange={(value) => {
                  setPreferredDate(value);
                  setPreparedHref("");
                }}
              />
              <TimePicker
                lang={lang}
                label={ui.time[lang]}
                value={preferredTime}
                onChange={(value) => {
                  setPreferredTime(value);
                  setPreparedHref("");
                }}
              />
            </div>
          </details>
        </I18nProvider>
        <div className="grid gap-4">
          <p
            id={`${id}-note`}
            className="text-xs leading-relaxed text-espresso/75"
          >
            {contactUi.note[lang]}
          </p>
          <button
            type="submit"
            aria-describedby={`${id}-note`}
            className="group flex min-h-14 w-full items-center gap-3 rounded-full bg-espresso p-2 pe-5 text-start text-sm font-semibold text-ivory transition-colors duration-200 hover:bg-espresso/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-fit"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ivory text-espresso">
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 rtl:-scale-x-100"
              />
            </span>
            {contactUi.continue[lang]}
          </button>
          <div role="status" aria-live="polite">
            {preparedHref && (
              <div className="grid gap-3 text-sm leading-relaxed">
                <p>{contactUi.ready[lang]}</p>
                <a
                  href={preparedHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-gold"
                >
                  {contactUi.reopen[lang]}
                </a>
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
