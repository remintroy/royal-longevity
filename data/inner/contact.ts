import { localized } from "./localization";

export const contactUi = {
  optionalDateTime: localized(
    "Add a preferred date & time (optional)",
    "إضافة تاريخ ووقت مفضلين (اختياري)",
  ),
  quickLinks: localized("Contact shortcuts", "روابط التواصل السريعة"),
  findUs: localized("Find us", "موقعنا"),
  eyebrow: localized("Let’s talk", "لنتحدث"),
  title: localized("How can we help?", "كيف يمكننا مساعدتكِ؟"),
  intro: localized(
    "Tell us what you have in mind. We’ll help you take the next step on WhatsApp.",
    "أخبرينا بما تفكرين فيه. سنساعدكِ في الخطوة التالية عبر واتساب.",
  ),
  name: localized("Your name (optional)", "اسمكِ (اختياري)"),
  topic: localized("What is your enquiry about?", "ما موضوع استفساركِ؟"),
  message: localized("Your message", "رسالتكِ"),
  placeholder: localized(
    "Ask about a treatment, membership or your first visit…",
    "اسألي عن جلسة أو عضوية أو زيارتكِ الأولى…",
  ),
  required: localized(
    "Please write a message so we can help you.",
    "يرجى كتابة رسالة حتى نتمكن من مساعدتكِ.",
  ),
  hint: localized(
    "Required. Please avoid sharing sensitive medical information.",
    "مطلوبة. يرجى تجنّب مشاركة المعلومات الطبية الحساسة.",
  ),
  note: localized(
    "Continue to WhatsApp to review and send your message. This form does not confirm an appointment.",
    "تابعي إلى واتساب لمراجعة رسالتكِ وإرسالها. هذا النموذج لا يؤكد موعداً.",
  ),
  continue: localized("Continue on WhatsApp", "المتابعة عبر واتساب"),
  ready: localized(
    "Your message is ready. If WhatsApp didn’t open, use the link below. Tap Send in WhatsApp to complete your enquiry.",
    "رسالتكِ جاهزة. إذا لم يفتح واتساب، استخدمي الرابط أدناه. اضغطي على إرسال في واتساب لإكمال استفساركِ.",
  ),
  reopen: localized("Open your message in WhatsApp", "افتحي رسالتكِ في واتساب"),
  direct: localized("Prefer a quick conversation?", "تفضلين محادثة مباشرة؟"),
  directBody: localized(
    "You can also message our team directly, without filling in the form.",
    "يمكنكِ أيضاً مراسلة فريقنا مباشرة دون تعبئة النموذج.",
  ),
  chat: localized("Chat with our team", "تحدثي مع فريقنا"),
  visit: localized("Before you visit", "قبل زيارتكِ"),
  visitBody: localized(
    "Contact our team to confirm opening hours and arrange your visit.",
    "تواصلي مع فريقنا لتأكيد ساعات العمل وترتيب زيارتكِ.",
  ),
  faq: localized(
    "Explore frequently asked questions",
    "اطّلعي على الأسئلة الشائعة",
  ),
};

export const contactTopics = [
  { id: "general", label: localized("General enquiry", "استفسار عام") },
  {
    id: "treatment",
    label: localized("Treatments & appointments", "الجلسات والمواعيد"),
  },
  {
    id: "membership",
    label: localized("Memberships & packages", "العضويات والباقات"),
  },
  { id: "visit", label: localized("Planning a visit", "التخطيط لزيارة") },
  { id: "feedback", label: localized("Feedback", "ملاحظات واقتراحات") },
];
