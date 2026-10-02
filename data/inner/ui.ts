import { localized, type LocalizedText } from "./localization";
export const ui = {
  home: localized("Home", "الرئيسية"),
  menu: localized("Menu", "القائمة"),
  skip: localized("Skip to content", "انتقلي إلى المحتوى"),
  book: localized("Book an appointment", "احجزي موعداً"),
  explore: localized("Explore treatment", "اكتشفي الجلسة"),
  all: localized("All services", "جميع الخدمات"),
  salon: localized("View our salon", "اكتشفي صالوننا"),
  gallery: localized("Explore our space", "اكتشفي مساحتنا"),
  care: localized("Care, in every detail", "عناية في كل التفاصيل"),
  services: localized(
    "Find your own beauty ritual.",
    "اكتشفي طقوس جمالك الخاصة.",
  ),
  serviceLabel: localized("Our treatments", "جلساتنا"),
  faq: localized("Have a question?", "لديكِ سؤال؟"),
  allFaq: localized("All questions", "جميع الأسئلة"),
  ready: localized("A little time, just for you.", "بعض الوقت، لكِ وحدك."),
  readyBody: localized(
    "Let us help you find your next favourite ritual.",
    "دعينا نساعدك على اكتشاف طقوس العناية التي تناسبك.",
  ),
  price: localized("Enquire for pricing", "استفسري عن الأسعار"),
  demo: localized(
    "A preview of our care. Treatments and collections are illustrative; confirm details with our team.",
    "لمحة عن عنايتنا. الجلسات والباقات توضيحية؛ يُرجى تأكيد التفاصيل مع فريقنا.",
  ),
  imageNote: localized(
    "Mood imagery · a glimpse of our inspiration",
    "صور إلهامية · لمحة عن أجوائنا",
  ),
  visit: localized("Plan your visit", "خططي لزيارتك"),
  visitTitle: localized(
    "Your next moment of care starts here.",
    "لحظتك القادمة من العناية تبدأ هنا.",
  ),
  visitBody: localized(
    "Tell us what you have in mind. Our team will discuss your treatment and confirm a suitable appointment on WhatsApp.",
    "أخبرينا بما ترغبين به. سيناقش فريقنا الجلسة معك ويؤكد موعداً مناسباً عبر واتساب.",
  ),
  select: localized("Choose a service", "اختاري الخدمة"),
  date: localized("Preferred date (optional)", "التاريخ المفضل (اختياري)"),
  time: localized("Preferred time (optional)", "الوقت المفضل (اختياري)"),
  any: localized("I’d like some guidance", "أرغب في المساعدة على الاختيار"),
  send: localized("Enquire on WhatsApp", "استفسري عبر واتساب"),
  requestNote: localized(
    "This is an enquiry. Your appointment is confirmed only after speaking with our team.",
    "هذا طلب استفسار. يُؤكَّد موعدك فقط بعد التواصل مع فريقنا.",
  ),
  summary: localized(
    "Thoughtfully planned. Personally yours.",
    "بتخطيط متقن، واهتمام خاص بكِ.",
  ),
  contact: localized("Speak with our team", "تواصلي مع فريقنا"),
  collection: localized(
    "Your care, beautifully combined.",
    "عنايتك، في باقات متكاملة.",
  ),
  included: localized("Included rituals", "طقوس العناية المشمولة"),
  footer: localized(
    "Personal care. Lasting confidence.",
    "عناية شخصية. ثقة تدوم.",
  ),
  back: localized("Back to services", "العودة إلى الخدمات"),
};

type CareValue = {
  title: LocalizedText;
  description: LocalizedText;
  icon: "leaf" | "user" | "sparkles" | "heart";
};

export const values: CareValue[] = [
  {
    title: localized("A calming space", "مساحة هادئة"),
    description: localized("Room to slow down", "مساحة للتمهّل"),
    icon: "leaf",
  },
  {
    title: localized("Personal attention", "اهتمام شخصي"),
    description: localized("Care that starts with you", "عناية تبدأ بكِ"),
    icon: "user",
  },
  {
    title: localized("Considered rituals", "طقوس مدروسة"),
    description: localized("Beauty in the details", "الجمال في التفاصيل"),
    icon: "sparkles",
  },
  {
    title: localized("Your comfort", "راحتك"),
    description: localized("At the heart of every visit", "في قلب كل زيارة"),
    icon: "heart",
  },
];
