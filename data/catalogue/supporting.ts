import { localized, type LocalizedText } from "@/data/inner/localization";

export type SupportingPage = {
  title: LocalizedText;
  description: LocalizedText;
  status: "awaiting-content" | "published";
};
// These routes are in the approved tree. Do not present unapproved legal copy or invented vacancies/articles.
export const supportingPages: Record<string, SupportingPage> = {
  terms: {
    title: localized("Terms & Conditions", "الشروط والأحكام"),
    description: localized(
      "Website usage, bookings, payments, memberships, packages, cancellations, promotions, intellectual property, liability and governing law.",
      "استخدام الموقع والحجوزات والمدفوعات والعضويات والباقات والإلغاء والعروض والملكية الفكرية والمسؤولية والقانون المعمول به.",
    ),
    status: "published",
  },
  privacy: {
    title: localized("Privacy Policy", "سياسة الخصوصية"),
    description: localized(
      "How Royal Longevity collects, uses, stores and protects personal information.",
      "كيف تجمع رويال لونجيفيتي المعلومات الشخصية وتستخدمها وتخزنها وتحميها.",
    ),
    status: "published",
  },
  disclaimer: {
    title: localized(
      "Website & Health Disclaimer",
      "إخلاء المسؤولية عن الموقع والمعلومات الصحية",
    ),
    description: localized(
      "Medical, aesthetic, wellness, fitness, treatment suitability, individual results and website-information limitations.",
      "المعلومات الطبية والتجميلية والعافية واللياقة ومدى ملاءمة العلاجات والنتائج الفردية وحدود معلومات الموقع.",
    ),
    status: "published",
  },
  careers: {
    title: localized("Careers", "الوظائف"),
    description: localized(
      "Interested in joining Royal Longevity? Contact our team to ask about opportunities. Confirmed vacancies will be listed here.",
      "هل ترغبين في الانضمام إلى رويال لونجيفيتي؟ تواصلي مع فريقنا للاستفسار عن الفرص. ستُدرج الوظائف المؤكدة هنا.",
    ),
    status: "awaiting-content",
  },
  blog: {
    title: localized("Journal & Articles", "المجلة والمقالات"),
    description: localized(
      "Stories from our world of beauty, movement and wellbeing will appear here.",
      "ستُنشر هنا قصص من عالم الجمال والحركة والعافية.",
    ),
    status: "awaiting-content",
  },
};
