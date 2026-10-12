"use client";

import { useId, useState } from "react";
import { Clock3, X } from "lucide-react";
import {
  I18nProvider,
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import {
  appointmentTimeSlots,
  enquiryControlsUi as copy,
  enquiryLocales,
  isEnquiryTime,
} from "@/data/inner/enquiry-controls";
import { formatPickerTime, type PickerProps } from "./date-time-picker";
import { usePopupMotion } from "./use-popup-motion";
import { TimeWheel } from "./time-wheel";

export function AppointmentTimeSelector({
  lang,
  label,
  step,
  value,
  onChange,
}: PickerProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const { overlayRef, close } = usePopupMotion(() => setIsOpen(false));
  const [draftTime, setDraftTime] = useState("");
  const displayTime = formatPickerTime(value, lang);
  const isComplete = isEnquiryTime(draftTime);

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
              setDraftTime(isEnquiryTime(value) ? value : "");
            }
            if (open) setIsOpen(true);
            else close();
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
            ref={overlayRef}
            style={{ opacity: 0 }}
            isDismissable
            className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/20 backdrop-blur-[4px] motion-reduce:backdrop-blur-none p-2"
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
                    onPress={close}
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
                  {draftTime ? formatPickerTime(draftTime, lang) : "—"}
                </p>
                <p
                  id={`${id}-help`}
                  className="mb-4 text-center text-xs leading-relaxed text-espresso/65"
                >
                  {copy.wheelHelp[lang]}
                  <span className="mt-1 block">{copy.timeSlotsHint[lang]}</span>
                </p>
                <div dir="ltr">
                  <TimeWheel
                    options={appointmentTimeSlots}
                    value={draftTime}
                    onChange={setDraftTime}
                    labelledBy={`${id}-label`}
                    describedBy={`${id}-help`}
                    formatValue={(option) => formatPickerTime(option, lang)}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
                  <Button
                    isDisabled={!value}
                    onPress={() => {
                      onChange("");
                      close();
                    }}
                    className="min-h-11 rounded-full px-4 text-sm hover:bg-ivory data-focus-visible:outline-2 data-focus-visible:outline-gold data-disabled:opacity-40"
                  >
                    {copy.clear[lang]}
                  </Button>
                  <Button
                    isDisabled={!isComplete}
                    onPress={() => {
                      if (!isComplete) return;
                      onChange(draftTime);
                      close();
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
