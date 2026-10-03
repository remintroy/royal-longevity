import type { Language } from "@/data/site";
import { bookingMessage as copy } from "@/data/booking";
import {
  enquiryControlsUi,
  enquiryLocales,
  isEnquiryTime,
} from "@/data/inner/enquiry-controls";

export type BookingEnquiry = {
  kind?: "appointment" | "contact" | "package" | "membership";
  service?: string;
  package?: string;
  membership?: string;
  name?: string;
  topic?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  needsGuidance?: boolean;
};

export function getBookingMessage(
  lang: Language,
  enquiry: BookingEnquiry = {},
) {
  const kind = enquiry.kind ?? "appointment";
  const lines: string[] = [];
  function add(label: string, value?: string) {
    if (value?.trim()) lines.push(`${label}: ${value.trim()}`);
  }
  add(copy.name[lang], enquiry.name);
  add(copy.topic[lang], enquiry.topic);
  add(copy.service[lang], enquiry.service);
  add(copy.packageLabel[lang], enquiry.package);
  add(copy.membershipLabel[lang], enquiry.membership);
  if (enquiry.needsGuidance && !enquiry.service?.trim())
    lines.push(copy.guidance[lang]);
  add(copy.date[lang], enquiry.preferredDate);
  if (enquiry.preferredTime && isEnquiryTime(enquiry.preferredTime)) {
    const [hour, minute] = enquiry.preferredTime.split(":").map(Number);
    const numbers = new Intl.NumberFormat(enquiryLocales[lang], {
      minimumIntegerDigits: 2,
    });
    const period =
      hour >= 12 ? enquiryControlsUi.pm[lang] : enquiryControlsUi.am[lang];
    add(
      copy.time[lang],
      `${numbers.format(hour % 12 || 12)}:${numbers.format(minute)} ${period} — ${enquiryControlsUi.timeHint[lang]}`,
    );
  }
  add(copy.message[lang], enquiry.message);
  const closing =
    kind === "appointment"
      ? copy.availability[lang]
      : kind === "contact"
        ? copy.thanks[lang]
        : copy.details[lang];
  return [copy[kind][lang], lines.join("\n"), closing]
    .filter(Boolean)
    .join("\n\n");
}

export function getBookingHref(lang: Language, enquiry: BookingEnquiry = {}) {
  const url = new URL("https://wa.me/");
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  if (number && /^\d{7,15}$/.test(number)) url.pathname = `/${number}`;
  url.searchParams.set("text", getBookingMessage(lang, enquiry));
  return url.toString();
}
