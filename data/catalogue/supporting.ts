import { localized, type LocalizedText } from "@/data/inner/localization";

export type SupportingPage = {
  title: LocalizedText;
  description: LocalizedText;
  status: "awaiting-content";
};
// These routes are in the approved tree. Do not present unapproved legal copy or invented vacancies/articles.
export const supportingPages: Record<string, SupportingPage> = {
  terms: {
    title: localized("Terms & Conditions", "الشروط والأحكام"),
    description: localized(
      "Our full terms will be published here. Please contact our team for the terms that apply to your service or membership before confirming.",
      "ستُنشر شروطنا الكاملة هنا. يُرجى التواصل مع فريقنا لمعرفة الشروط المطبّقة على خدمتك أو عضويتك قبل التأكيد.",
    ),
    status: "awaiting-content",
  },
  privacy: {
    title: localized("Privacy Policy", "سياسة الخصوصية"),
    description: localized(
      "Our privacy policy is being prepared. Please contact our team with questions about your personal information before sharing it.",
      "يجري إعداد سياسة الخصوصية. يُرجى التواصل مع فريقنا للاستفسار عن معلوماتك الشخصية قبل مشاركتها.",
    ),
    status: "awaiting-content",
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
