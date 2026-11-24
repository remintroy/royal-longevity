import { getBookingBannerContent } from "@/data/booking-banner";
import { getCuratedServicesContent } from "@/data/curated-services";
import { getExperienceContent } from "@/data/experience";
import { getFaqContent } from "@/data/faq";
import { getFooterContent } from "@/data/footer";
import { getGalleryContent } from "@/data/gallery";
import { getHighlightsContent } from "@/data/highlights";
import { getIntroductionContent } from "@/data/introduction";
import { getHeroContent, type Language } from "@/data/site";

/** Landing-page sections whose text can be edited line by line in the CMS. */
export const landingSections = {
  hero: { label: "Hero", get: getHeroContent },
  introduction: { label: "Introduction", get: getIntroductionContent },
  experience: {
    label: "Experience & services marquee",
    get: getExperienceContent,
  },
  gallery: { label: "Gallery", get: getGalleryContent },
  highlights: { label: "Services bento grid", get: getHighlightsContent },
  bookingBanner: { label: "Booking banner", get: getBookingBannerContent },
  faq: { label: "FAQ", get: getFaqContent },
  curatedServices: {
    label: "Curated services",
    get: getCuratedServicesContent,
    // Images are shared with the gallery section and edited there.
    skip: ["images"],
  },
  footer: { label: "Footer", get: getFooterContent },
} as const;

export type LandingSectionId = keyof typeof landingSections;

export function isLandingSectionId(value: string): value is LandingSectionId {
  return value in landingSections;
}

export function getDefaultSectionContent(id: LandingSectionId, lang: Language) {
  return landingSections[id].get(lang);
}
