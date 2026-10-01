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
  Popover,
  Modal,
  ModalOverlay,
  Radio,
  RadioGroup,
} from "react-aria-components";
import { cn } from "@/lib/utils";
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
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const numbers = new Intl.NumberFormat(enquiryLocales[lang], {
    minimumIntegerDigits: 2,
  });
  const displayTime = formatEnquiryTime(value, lang);
  const stages = [
    {
      label: copy.hour[lang],
      title: copy.selectHour[lang],
      description: copy.hourHelp[lang],
      value: hour,
      setValue: setHour,
      options: enquiryHours,
    },
    {
      label: copy.minute[lang],
      title: copy.selectMinute[lang],
      description: copy.minuteHelp[lang],
      value: minute,
      setValue: setMinute,
      options: enquiryMinutes,
    },
    {
      label: copy.period[lang],
      title: copy.selectPeriod[lang],
      description: copy.periodHelp[lang],
      value: period,
      setValue: setPeriod,
      options: ["am", "pm"],
    },
  ];
  const activeStage = stages[activeStep];
  const isComplete = Boolean(hour && minute && period);

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
            const [savedHour = "", savedMinute = ""] = value.split(":");
            setHour(
              savedHour
                ? String(Number(savedHour) % 12 || 12).padStart(2, "0")
                : "",
            );
            setMinute(savedMinute);
            setPeriod(savedHour ? (Number(savedHour) >= 12 ? "pm" : "am") : "");
            setActiveStep(0);
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/20 p-2"
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
              <div
                dir="ltr"
                className="mb-3 flex items-start justify-center gap-1 rounded-2xl border border-border bg-ivory/20 p-2"
              >
                {stages.map((stage, index) => (
                  <div
                    key={stage.label}
                    className="flex min-w-0 flex-1 items-start gap-1"
                  >
                    {index === 1 && (
                      <span
                        aria-hidden="true"
                        className="pt-2 text-3xl text-espresso/50"
                      >
                        :
                      </span>
                    )}
                    <Button
                      aria-label={`${stage.label}: ${stage.value ? (index === 2 ? copy[stage.value === "am" ? "am" : "pm"][lang] : numbers.format(Number(stage.value))) : "--"}`}
                      aria-pressed={activeStep === index}
                      onPress={() => setActiveStep(index)}
                      className={cn(
                        "flex min-h-20 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-transparent px-1 tabular-nums outline-none data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-gold",
                        activeStep === index
                          ? "border-espresso bg-espresso text-white"
                          : "text-espresso hover:bg-ivory",
                      )}
                    >
                      <span
                        className={
                          index === 2
                            ? "text-xl font-medium"
                            : "text-3xl font-medium"
                        }
                      >
                        {index === 2
                          ? period
                            ? copy[period === "am" ? "am" : "pm"][lang]
                            : "--"
                          : numbers.format(Number(stage.value || "0"))}
                      </span>
                      <span
                        className="text-[11px]"
                        dir={lang === "ar" ? "rtl" : "ltr"}
                      >
                        {stage.label}
                      </span>
                    </Button>
                  </div>
                ))}
              </div>
              <p className="mb-4 text-center text-xs leading-relaxed text-espresso/65">
                {copy.editHint[lang]}
              </p>
              <div aria-live="polite" aria-atomic="true" className="mb-3">
                <h4 id={`${id}-stage`} className="text-sm font-medium">
                  {activeStep + 1}/3 · {activeStage.title}
                </h4>
                <p
                  id={`${id}-help`}
                  className="mt-1 text-xs leading-relaxed text-espresso/65"
                >
                  {activeStage.description}
                </p>
              </div>
              <RadioGroup
                key={activeStep}
                aria-labelledby={`${id}-stage`}
                aria-describedby={`${id}-help`}
                value={activeStage.value}
                onChange={activeStage.setValue}
                className={cn(
                  "grid h-48 content-start gap-2 overflow-y-auto overscroll-contain rounded-2xl border border-border p-2",
                  activeStep === 2
                    ? "grid-cols-2"
                    : activeStep === 1
                      ? "grid-cols-5"
                      : "grid-cols-4",
                )}
                data-lenis-prevent
              >
                {activeStage.options.map((option) => (
                  <Radio
                    key={option}
                    value={option}
                    className="flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-border text-base tabular-nums outline-none hover:bg-ivory data-selected:border-espresso data-selected:bg-espresso data-selected:text-white data-focus-visible:outline-2 data-focus-visible:outline-offset-1 data-focus-visible:outline-gold"
                  >
                    {activeStep === 2
                      ? copy[option === "am" ? "am" : "pm"][lang]
                      : numbers.format(Number(option))}
                  </Radio>
                ))}
              </RadioGroup>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
                <Button
                  isDisabled={activeStep === 0 && !value}
                  onPress={() => {
                    if (activeStep > 0) setActiveStep(activeStep - 1);
                    else {
                      onChange("");
                      setIsOpen(false);
                    }
                  }}
                  className="min-h-11 rounded-full px-4 text-sm hover:bg-ivory data-focus-visible:outline-2 data-focus-visible:outline-gold data-disabled:opacity-40"
                >
                  {activeStep > 0 ? copy.back[lang] : copy.clear[lang]}
                </Button>
                <Button
                  isDisabled={
                    activeStep === 2 ? !isComplete : !activeStage.value
                  }
                  onPress={() => {
                    if (activeStep < 2) {
                      setActiveStep(activeStep + 1);
                      return;
                    }
                    const hour24 =
                      (Number(hour) % 12) + (period === "pm" ? 12 : 0);
                    onChange(`${String(hour24).padStart(2, "0")}:${minute}`);
                    setIsOpen(false);
                  }}
                  className="min-h-11 rounded-full bg-espresso px-5 text-sm text-white hover:bg-ink data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-gold data-disabled:opacity-40"
                >
                  {activeStep === 2 ? copy.done[lang] : copy.next[lang]}
                </Button>
              </div>
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  );
}
