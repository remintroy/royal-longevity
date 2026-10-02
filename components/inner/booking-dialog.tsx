"use client";

import { Dialog, Modal, ModalOverlay, Button } from "react-aria-components";
import { useId } from "react";
import { X } from "lucide-react";
import type { Language } from "@/data/site";
import { enquiryUi } from "@/data/inner/enquiry";
import { AppointmentEnquiry } from "./appointment-enquiry";

export default function BookingDialog({ lang, initialService, onClose }: {
  lang: Language;
  initialService?: string;
  onClose: () => void;
}) {
  const titleId = useId();
  return (
    <ModalOverlay
      isOpen
      isDismissable
      onOpenChange={(open) => { if (!open) onClose(); }}
      data-lenis-prevent
      className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/50 p-3 sm:p-6"
    >
      <Modal className="flex max-h-[calc(100dvh-24px)] w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-white text-espresso shadow-xl sm:max-h-[calc(100dvh-48px)]">
        <Dialog aria-labelledby={titleId} className="flex min-h-0 w-full flex-col outline-none" lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
          <div className="flex shrink-0 items-center justify-between gap-3 bg-white px-5 py-4 sm:px-6 sm:pt-5">
            <h2 id={titleId} className="text-xl leading-snug font-medium sm:text-2xl">{enquiryUi.bookingTitle[lang]}</h2>
            <Button autoFocus onPress={onClose} aria-label={enquiryUi.close[lang]} className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-white text-espresso transition-colors hover:bg-ivory data-focus-visible:outline-2 data-focus-visible:outline-gold data-focus-visible:outline-offset-2">
              <X size={20} aria-hidden="true" />
            </Button>
          </div>
          <AppointmentEnquiry lang={lang} initialService={initialService} inDialog />
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
