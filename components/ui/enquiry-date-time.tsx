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
  ListBox,
  ListBoxItem,
  Popover,
  Radio,
  RadioGroup,
} from "react-aria-components";
import type { Language } from "@/data/site";
import {
  enquiryControlsUi as copy,
  enquiryHours,
  enquiryLocales,
  enquiryMinutes,
} from "@/data/inner/enquiry-controls";

type EnquiryPickerProps = {
  lang: Language;
  label: string;
  step: string;
  value: string;
  onChange: (value: string) => void;
};

export function formatEnquiryDate(value: string, lang: Language) {
  if (!value) return "";
  return new Intl.DateTimeFormat(enquiryLocales[lang], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dubai",
  }).format(parseDate(value).toDate("Asia/Dubai"));
}

export function EnquiryDatePicker({
  lang,
  label,
  step,
  value,
  onChange,
}: EnquiryPickerProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid min-w-0 gap-[15px] text-sm">
      <span
        id={`${id}-label`}
        className="flex items-center gap-[15px] text-espresso"
      >
        <span className="text-gold" aria-hidden="true">
          {step}
        </span>
        {label}
      </span>
      <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button
          aria-labelledby={`${id}-label ${id}-value`}
          className="flex min-h-14 w-full min-w-0 items-center justify-between gap-3 rounded-2xl border border-border bg-ivory/20 px-4 py-3 text-start text-base text-espresso transition-colors duration-200 hover:border-espresso/30 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-gold data-pressed:bg-ivory/60 motion-reduce:transition-none"
        >
          <span id={`${id}-value`} className="min-w-0 truncate">
            {formatEnquiryDate(value, lang) || copy.chooseDate[lang]}
          </span>
          <CalendarDays className="size-5 shrink-0" aria-hidden="true" />
        </Button>
        <Popover
          placement="bottom start"
          offset={8}
          containerPadding={8}
          className="z-50 max-h-[calc(100dvh-2rem)] w-[min(22rem,calc(100vw-1rem))] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-white p-3 text-espresso shadow-lg shadow-espresso/10 sm:p-4"
          data-lenis-prevent
        >
          <Dialog aria-label={label} className="outline-none">
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
        </Popover>
      </DialogTrigger>
    </div>
  );
}

export function formatEnquiryTime(value: string, lang: Language) {
  if (!value) return "";
  const [hour, minute] = value.split(":").map(Number);
  const numbers = new Intl.NumberFormat(enquiryLocales[lang], {
    minimumIntegerDigits: 2,
  });
  const period = hour >= 12 ? copy.pm[lang] : copy.am[lang];
  return `${numbers.format(hour % 12 || 12)}:${numbers.format(minute)} ${period}`;
}

export function EnquiryTimePicker({
  lang,
  label,
  step,
  value,
  onChange,
}: EnquiryPickerProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("am");
  const numbers = new Intl.NumberFormat(enquiryLocales[lang], {
    minimumIntegerDigits: 2,
  });
  const displayTime = formatEnquiryTime(value, lang);
  const columns = [
    {
      id: "hour",
      label: copy.hour[lang],
      options: enquiryHours,
      value: hour,
      setValue: setHour,
    },
    {
      id: "minute",
      label: copy.minute[lang],
      options: enquiryMinutes,
      value: minute,
      setValue: setMinute,
    },
  ];

  return (
    <div className="grid min-w-0 gap-[15px] text-sm">
      <span
        id={`${id}-label`}
        className="flex items-center gap-[15px] text-espresso"
      >
        <span className="text-gold" aria-hidden="true">
          {step}
        </span>
        {label}
      </span>
      <DialogTrigger
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (open) {
            const [savedHour = "", savedMinute = "00"] = value.split(":");
            setHour(
              savedHour
                ? String(Number(savedHour) % 12 || 12).padStart(2, "0")
                : "",
            );
            setMinute(savedMinute);
            setPeriod(Number(savedHour) >= 12 ? "pm" : "am");
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
        <Popover
          placement="bottom start"
          offset={8}
          containerPadding={8}
          className="z-50 max-h-[calc(100dvh-2rem)] w-[min(20rem,calc(100vw-1rem))] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-white p-4 text-espresso shadow-lg shadow-espresso/10"
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
            <RadioGroup
              aria-label={copy.period[lang]}
              value={period}
              onChange={setPeriod}
              orientation="horizontal"
              className="mb-4 grid grid-cols-2 gap-1 rounded-full border border-border bg-ivory/20 p-1"
            >
              {(["am", "pm"] as const).map((option) => (
                <Radio
                  key={option}
                  value={option}
                  className="flex min-h-11 cursor-pointer items-center justify-center rounded-full text-sm outline-none data-selected:bg-espresso data-selected:text-white data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-gold"
                >
                  {copy[option][lang]}
                </Radio>
              ))}
            </RadioGroup>
            <div className="grid grid-cols-2 gap-3">
              {columns.map((column) => (
                <div key={column.id} className="min-w-0">
                  <p
                    id={`${id}-${column.id}`}
                    className="mb-2 text-center text-xs text-espresso/70"
                  >
                    {column.label}
                  </p>
                  <ListBox
                    aria-labelledby={`${id}-${column.id}`}
                    selectionMode="single"
                    disallowEmptySelection
                    selectedKeys={column.value ? [column.value] : []}
                    onSelectionChange={(keys) => {
                      if (keys !== "all") {
                        const key = [...keys][0];
                        if (key !== undefined) column.setValue(String(key));
                      }
                    }}
                    className="h-48 overflow-y-auto overscroll-contain rounded-2xl border border-border bg-ivory/20 p-1 outline-none data-focus-visible:ring-2 data-focus-visible:ring-gold"
                    data-lenis-prevent
                  >
                    {column.options.map((option) => (
                      <ListBoxItem
                        key={option}
                        id={option}
                        textValue={option}
                        className="flex min-h-11 cursor-pointer items-center justify-center rounded-xl text-base tabular-nums outline-none data-focused:bg-ivory data-focus-visible:ring-2 data-focus-visible:ring-inset data-focus-visible:ring-gold data-selected:bg-espresso data-selected:text-white"
                      >
                        {numbers.format(Number(option))}
                      </ListBoxItem>
                    ))}
                  </ListBox>
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
                className="min-h-11 rounded-full px-4 text-sm hover:underline data-focus-visible:outline-2 data-focus-visible:outline-gold data-disabled:opacity-40"
              >
                {copy.clear[lang]}
              </Button>
              <Button
                isDisabled={!hour}
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
        </Popover>
      </DialogTrigger>
    </div>
  );
}
