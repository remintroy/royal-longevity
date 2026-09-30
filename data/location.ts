import type { Language } from "./site";

export type LocationContent = {
  eyebrow: string;
  title: string;
  details: { label: string; value: string; enquire?: boolean }[];
  mapTitle: string;
  mapNote: string;
  mapHref: string;
  mapEmbedHref: string;
  mapsLabel: string;
};

// Coordinates resolved from the supplied Google Maps location link.
const mapHref = "https://maps.app.goo.gl/7ZQF7wGxBqx74WMbA";
const mapQuery = encodeURIComponent("25.3885556,55.4375278");
const content: Record<
  Language,
  Omit<LocationContent, "mapHref" | "mapEmbedHref">
> = {
  en: {
    eyebrow: "Location",
    title: "Where to find us",
    details: [
      { label: "City", value: "Ajman,\nUnited Arab Emirates" },
      { label: "Location", value: "Royal Longevity" },
      {
        label: "Your visit",
        value: "Plan your visit\nwith our team",
        enquire: true,
      },
    ],
    mapTitle: "Royal Longevity location map",
    mapNote: "Follow the map pin for our exact location.",
    mapsLabel: "Open in Maps",
  },
  ar: {
    eyebrow: "الموقع",
    title: "أين تجديننا",
    details: [
      { label: "المدينة", value: "عجمان،\nالإمارات العربية المتحدة" },
      { label: "الموقع", value: "رويال لونجيفيتي" },
      { label: "زيارتك", value: "خططي لزيارتك\nمع فريقنا", enquire: true },
    ],
    mapTitle: "خريطة موقع رويال لونجيفيتي",
    mapNote: "اتبعي دبوس الخريطة للوصول إلى موقعنا الدقيق.",
    mapsLabel: "افتحي الخريطة",
  },
};

export function getLocationContent(lang: Language): LocationContent {
  return {
    ...content[lang],
    mapHref,
    mapEmbedHref: `https://maps.google.com/maps?q=${mapQuery}&z=16&hl=${lang}&output=embed`,
  };
}
