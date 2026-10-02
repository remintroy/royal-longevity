"use client";

import { useId, useState } from "react";
import { parseDate, today } from "@internationalized/date";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  X,
} from "lucide-react";
import {
  I18nProvider,
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { TimeWheel } from "./time-wheel";
import type { Language } from "@/data/site";
import {
  enquiryControlsUi as copy,
  enquiryHours,
  enquiryLocales,
  enquiryMinutes,
  enquiryPeriods,
} from "@/data/inner/enquiry-controls";

export type PickerProps = {
  lang: Language;
  label: string;
  step?: string;
  value: string;
  onChange: (value: string) => void;
};

export function formatPickerDate(value: string, lang: Language) {
  if (!value) return "";
  return new Intl.DateTimeFormat(enquiryLocales[lang], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dubai",
  }).format(parseDate(value).toDate("Asia/Dubai"));
}

export function DatePicker({
  lang,
  label,
  step,
  value,
  onChange,
}: PickerProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <I18nProvider locale={enquiryLocales[lang]}>
      <div className="grid min-w-0 gap-[15px] text-sm">
        <span
          id={`${id}-label`}
          className="flex items-center gap-[15px] text-espresso"
        >
          {step && (
            <span className="text-gold" aria-hidden="true">
              {step}
            </span>
          )}
          {label}
        </span>
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button
            aria-labelledby={`${id}-label ${id}-value`}
            className="flex min-h-14 w-full min-w-0 items-center justify-between gap-3 rounded-2xl border border-border bg-ivory/20 px-4 py-3 text-start text-base text-espresso transition-colors duration-200 hover:border-espresso/30 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-gold data-pressed:bg-ivory/60 motion-reduce:transition-none"
          >
            <span id={`${id}-value`} className="min-w-0 truncate">
              {formatPickerDate(value, lang) || copy.chooseDate[lang]}
            </span>
            <CalendarDays className="size-5 shrink-0" aria-hidden="true" />
          </Button>
          <ModalOverlay
            isDismissable
            className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/20 p-2"
          >
            <Modal
              className="max-h-[calc(100dvh-1rem)] w-[min(22rem,calc(100vw-1rem))] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-white p-4 text-espresso shadow-lg shadow-espresso/10"
              data-lenis-prevent
            >
              <Dialog className="outline-none">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <Heading slot="title" className="text-base font-medium">
                    {copy.chooseDate[lang]}
                  </Heading>
                  <Button
                    aria-label={copy.close[lang]}
                    onPress={() => setIsOpen(false)}
                    className="flex size-11 items-center justify-center rounded-full hover:bg-ivory data-focus-visible:outline-2 data-focus-visible:outline-gold"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </Button>
                </div>
                <Calendar
                  aria-label={label}
                  value={value ? parseDate(value) : null}
                  minValue={today("Asia/Dubai")}
                  onChange={(date) => {
                    onChange(date.toString());
                    setIsOpen(false);
                  }}
                >
                  <header className="mb-3 flex items-center justify-between gap-1">
                    <Button
                      slot="previous"
                      aria-label={copy.previousMonth[lang]}
                      className="flex size-11 shrink-0 items-center justify-center rounded-full outline-none hover:bg-ivory data-focus-visible:ring-2 data-focus-visible:ring-gold data-disabled:opacity-30"
                    >
                      <ChevronLeft
                        className="size-5 rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </Button>
                    <Heading className="text-center text-base font-medium" />
                    <Button
                      slot="next"
                      aria-label={copy.nextMonth[lang]}
                      className="flex size-11 shrink-0 items-center justify-center rounded-full outline-none hover:bg-ivory data-focus-visible:ring-2 data-focus-visible:ring-gold data-disabled:opacity-30"
                    >
                      <ChevronRight
                        className="size-5 rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </Button>
                  </header>
                  <CalendarGrid
                    weekdayStyle="short"
                    className="w-full table-fixed border-collapse"
                  >
                    <CalendarGridHeader>
                      {(day) => (
                        <CalendarHeaderCell className="pb-2 text-center text-xs font-normal text-espresso/65">
                          {day}
                        </CalendarHeaderCell>
                      )}
                    </CalendarGridHeader>
                    <CalendarGridBody>
                      {(date) => (
                        <CalendarCell
                          date={date}
                          className="flex h-11 w-full cursor-pointer items-center justify-center rounded-full text-sm tabular-nums outline-none hover:bg-ivory data-focus-visible:ring-2 data-focus-visible:ring-inset data-focus-visible:ring-gold data-selected:bg-espresso data-selected:text-white data-disabled:cursor-default data-disabled:text-espresso/30 data-disabled:hover:bg-transparent data-outside-month:hidden"
                        />
                      )}
                    </CalendarGridBody>
                  </CalendarGrid>
                </Calendar>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-2">
                  <Button
                    isDisabled={!value}
                    onPress={() => {
                      onChange("");
                      setIsOpen(false);
                    }}
                    className="min-h-11 rounded-full px-4 text-sm underline-offset-4 hover:underline data-focus-visible:outline-2 data-focus-visible:outline-gold data-disabled:opacity-40"
                  >
                    {copy.clear[lang]}
                  </Button>
                  <Button
                    onPress={() => setIsOpen(false)}
                    className="min-h-11 rounded-full px-4 text-sm hover:bg-ivory data-focus-visible:outline-2 data-focus-visible:outline-gold"
                  >
                    {copy.close[lang]}
                  </Button>
                </div>
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
      </div>
    </I18nProvider>
  );
}

export function formatPickerTime(value: string, lang: Language) {
  if (!value) return "";
  const [hour, minute] = value.split(":").map(Number);
  const numbers = new Intl.NumberFormat(enquiryLocales[lang], {
    minimumIntegerDigits: 2,
  });
  const period = hour >= 12 ? copy.pm[lang] : copy.am[lang];
  return `${numbers.format(hour % 12 || 12)}:${numbers.format(minute)} ${period}`;
}

export function TimePicker({
  lang,
  label,
  step,
  value,
  onChange,
}: PickerProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState("");
  const numbers = new Intl.NumberFormat(enquiryLocales[lang], {
    minimumIntegerDigits: 2,
  });
  const displayTime = formatPickerTime(value, lang);
  const columns = [
    {
      id: "hour",
      label: copy.hour[lang],
      value: hour,
      setValue: setHour,
      options: enquiryHours,
    },
    {
      id: "minute",
      label: copy.minute[lang],
      value: minute,
      setValue: setMinute,
      options: enquiryMinutes,
    },
    {
      id: "period",
      label: copy.period[lang],
      value: period,
      setValue: setPeriod,
      options: enquiryPeriods,
    },
  ];
  const isComplete = Boolean(hour && minute && period);

  return (
    <I18nProvider locale={enquiryLocales[lang]}>
      <div className="grid min-w-0 gap-[15px] text-sm">
        <span
          id={`${id}-label`}
          className="flex items-center gap-[15px] text-espresso"
        >
          {step && (
            <span className="text-gold" aria-hidden="true">
              {step}
            </span>
          )}
          {label}
        </span>
        <DialogTrigger
          isOpen={isOpen}
          onOpenChange={(open) => {
            if (open) {
              const [savedHour = "", savedMinute = ""] = value.split(":");
              setHour(
                savedHour
                  ? String(Number(savedHour) % 12 || 12).padStart(2, "0")
                  : "",
              );
              setMinute(savedMinute);
              setPeriod(
                savedHour ? (Number(savedHour) >= 12 ? "pm" : "am") : "",
              );
            }
            setIsOpen(open);
          }}
        >
          <Button
            aria-labelledby={`${id}-label ${id}-value`}
            className="flex min-h-14 w-full min-w-0 items-center justify-between gap-3 rounded-2xl border border-border bg-ivory/20 px-4 py-3 text-start text-base text-espresso transition-colors duration-200 hover:border-espresso/30 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-gold data-pressed:bg-ivory/60 motion-reduce:transition-none"
          >
            <span id={`${id}-value`} className="min-w-0 truncate">
              {displayTime ? <bdi>{displayTime}</bdi> : copy.chooseTime[lang]}
            </span>
            <Clock3 className="size-5 shrink-0" aria-hidden="true" />
          </Button>
          <ModalOverlay
            isDismissable
            className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/20 p-2"
          >
            <Modal
              className="max-h-[calc(100dvh-1rem)] w-[min(22rem,calc(100vw-1rem))] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-white p-4 text-espresso shadow-lg shadow-espresso/10"
              data-lenis-prevent
            >
              <Dialog className="outline-none">
                <div className="flex items-center justify-between gap-2">
                  <Heading slot="title" className="text-base font-medium">
                    {copy.chooseTime[lang]}
                  </Heading>
                  <Button
                    aria-label={copy.close[lang]}
                    onPress={() => setIsOpen(false)}
                    className="flex size-11 items-center justify-center rounded-full hover:bg-ivory data-focus-visible:outline-2 data-focus-visible:outline-gold"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </Button>
                </div>
                <p className="mb-4 text-xs text-espresso/65">
                  {copy.timeHint[lang]}
                </p>
                <p
                  className="mb-4 text-center text-3xl font-medium tabular-nums text-espresso"
                  dir="ltr"
                >
                  {numbers.format(Number(hour || "0"))}:
                  {numbers.format(Number(minute || "0"))}{" "}
                  <span className="text-xl">
                    {period ? copy[period === "am" ? "am" : "pm"][lang] : "--"}
                  </span>
                </p>
                <p
                  id={`${id}-help`}
                  className="mb-4 text-center text-xs leading-relaxed text-espresso/65"
                >
                  {copy.wheelHelp[lang]}
                </p>
                <div className="grid grid-cols-3 gap-2" dir="ltr">
                  {columns.map((column) => (
                    <div key={column.id} className="min-w-0">
                      <p
                        id={`${id}-${column.id}`}
                        className="mb-2 text-center text-xs text-espresso/70"
                        dir={lang === "ar" ? "rtl" : "ltr"}
                      >
                        {column.label}
                      </p>
                      <TimeWheel
                        options={column.options}
                        value={column.value}
                        onChange={column.setValue}
                        labelledBy={`${id}-${column.id}`}
                        describedBy={`${id}-help`}
                        formatValue={(option) =>
                          column.id === "period"
                            ? copy[option === "am" ? "am" : "pm"][lang]
                            : numbers.format(Number(option))
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
                  <Button
                    isDisabled={!value}
                    onPress={() => {
                      onChange("");
                      setIsOpen(false);
                    }}
                    className="min-h-11 rounded-full px-4 text-sm hover:bg-ivory data-focus-visible:outline-2 data-focus-visible:outline-gold data-disabled:opacity-40"
                  >
                    {copy.clear[lang]}
                  </Button>
                  <Button
                    isDisabled={!isComplete}
                    onPress={() => {
                      const hour24 =
                        (Number(hour) % 12) + (period === "pm" ? 12 : 0);
                      onChange(`${String(hour24).padStart(2, "0")}:${minute}`);
                      setIsOpen(false);
                    }}
                    className="min-h-11 rounded-full bg-espresso px-5 text-sm text-white hover:bg-ink data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-gold data-disabled:opacity-40"
                  >
                    {copy.done[lang]}
                  </Button>
                </div>
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
      </div>
    </I18nProvider>
  );
}
