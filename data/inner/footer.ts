import {
  mainNavigation,
  supportingNavigation,
} from "@/data/catalogue/navigation";
import { localized } from "./localization";

export const innerFooter = {
  explore: localized("Explore Royal Longevity", "اكتشفي رويال لونجيفيتي"),
  information: localized("Useful information", "معلومات مفيدة"),
  contact: localized("Let’s plan your visit", "لنخطط لزيارتك"),
  contactBody: localized(
    "For treatment guidance, appointment enquiries and visit details, speak with our team.",
    "للمساعدة في اختيار الجلسة والاستفسار عن المواعيد وتفاصيل الزيارة، تواصلي مع فريقنا.",
  ),
  contactLink: localized("Contact & location", "التواصل والموقع"),
  backToTop: localized("Back to top", "العودة إلى الأعلى"),
  brand: localized("Royal Longevity", "رويال لونجيفيتي"),
};

export const footerNavigation = [
  {
    id: "explore",
    label: innerFooter.explore,
    links: mainNavigation.filter((item) => item.slug !== "contact"),
  },
  {
    id: "information",
    label: innerFooter.information,
    links: supportingNavigation,
  },
];
