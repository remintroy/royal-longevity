import { getHeroContent, type Language } from "@/data/site";

export function getBookingHref(lang: Language, context?: string) {
  const url = new URL(getHeroContent(lang).bookingHref);
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  if (number && /^\d{7,15}$/.test(number)) url.pathname = `/${number}`;
  if (context)
    url.searchParams.set(
      "text",
      `${url.searchParams.get("text") ?? ""}\n${context}`,
    );
  return url.toString();
}
