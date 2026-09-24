import { localized } from "@/data/inner/localization";
export const catalogueQuestions = [
  {
    id: "access",
    question: localized(
      "Do I need a membership or an appointment?",
      "هل أحتاج إلى عضوية أم موعد؟",
    ),
    answer: localized(
      "Gym, yoga and Pilates follow a membership enquiry path. Spa, facials, makeup, hair and nails follow an appointment path. Pool visits can be discussed through either route.",
      "تتبع خدمات النادي واليوغا والبيلاتس مسار الاستفسار عن العضوية. وتتبع خدمات السبا والوجه والمكياج والشعر والأظافر مسار المواعيد. ويمكن مناقشة زيارة المسبح عبر أي من المسارين.",
    ),
  },
  {
    id: "pool",
    question: localized(
      "Is pool access included in every membership?",
      "هل تشمل كل عضوية دخول المسبح؟",
    ),
    answer: localized(
      "Pool access is planned for selected memberships. Ask our team to confirm the inclusions, schedules and conditions of your chosen plan.",
      "يُخطط لإتاحة المسبح ضمن عضويات مختارة. اطلبي من فريقنا تأكيد المزايا والجداول والشروط الخاصة بخطتك.",
    ),
  },
  {
    id: "confirmation",
    question: localized(
      "Does sending an enquiry confirm my booking?",
      "هل إرسال الاستفسار يؤكد حجزي؟",
    ),
    answer: localized(
      "No. Your preferred date and time are a request. Our team confirms availability, pricing and any payment arrangements with you on WhatsApp.",
      "لا. التاريخ والوقت المفضلان مجرد طلب. يؤكد فريقنا التوفر والسعر وأي ترتيبات للدفع معكِ عبر واتساب.",
    ),
  },
  {
    id: "plans",
    question: localized("How do I choose a membership?", "كيف أختار العضوية؟"),
    answer: localized(
      "Compare the example plans, choose the activities you are interested in and contact our team. Pricing, duration and access are confirmed before joining.",
      "قارني الخطط التوضيحية واختاري الأنشطة التي تهمك ثم تواصلي مع فريقنا. تُؤكّد الأسعار والمدة وشروط الدخول قبل الاشتراك.",
    ),
  },
];
