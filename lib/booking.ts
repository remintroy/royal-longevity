import type { Language } from "@/data/site";

// Set a verified international number before enabling enquiries.
// Keep the booking destination here so a future Altegio connection is contained.
export function getBookingHref(lang: Language, context?: string) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[\s+()-]/g, "");
  if (!phone || !/^\d{8,15}$/.test(phone)) return "#visit";
  const message = lang === "ar"
    ? `مرحباً رويال لونجيفيتي، أود الاستفسار عن ${context ?? "زيارة المركز"}.`
    : `Hello Royal Longevity, I would like to enquire about ${context ?? "visiting the centre"}.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
