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

// User-approved demo location in Ajman, not the confirmed business address.
// Update the details and map query together when the final address is supplied.
const mapQuery = encodeURIComponent("Al Nuaimiya, Ajman, United Arab Emirates");
const content: Record<Language, Omit<LocationContent, "mapHref" | "mapEmbedHref">> = {
  en: {
    eyebrow: "Location",
    title: "Where to find us",
    details: [
      { label: "City", value: "Ajman,\nUnited Arab Emirates" },
      { label: "Neighbourhood", value: "Al Nuaimiya,\nAjman" },
      { label: "Your visit", value: "Plan your visit\nwith our team", enquire: true },
    ],
    mapTitle: "Demo location map of Al Nuaimiya, Ajman",
    mapNote: "Demo location in Ajman. Our exact address will be updated soon.",
    mapsLabel: "Open in Maps",
  },
  ar: {
    eyebrow: "الموقع",
    title: "أين تجديننا",
    details: [
      { label: "المدينة", value: "عجمان،\nالإمارات العربية المتحدة" },
      { label: "المنطقة", value: "النعيمية،\nعجمان" },
      { label: "زيارتك", value: "خططي لزيارتك\nمع فريقنا", enquire: true },
    ],
    mapTitle: "خريطة الموقع التجريبي في النعيمية، عجمان",
    mapNote: "موقع تجريبي في عجمان. سنحدّث العنوان الدقيق قريباً.",
    mapsLabel: "افتحي الخريطة",
  },
};

export function getLocationContent(lang: Language): LocationContent {
  return {
    ...content[lang],
    mapHref: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
    mapEmbedHref: `https://maps.google.com/maps?q=${mapQuery}&z=6&hl=${lang}&output=embed`,
  };
}
