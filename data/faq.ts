import type { Language } from "./site";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  image: string;
};

export type FaqContent = {
  eyebrow: string;
  title: string;
  bookingLabel: string;
  items: FaqItem[];
};

// Draft copy pending business approval. Images reuse the gallery's demo assets.
const content: Record<Language, FaqContent> = {
  en: {
    eyebrow: "FAQ",
    title: "Everything you\nneed to know.",
    bookingLabel: "Book an appointment",
    items: [
      {
        id: "booking",
        question: "How do I book an appointment?",
        answer: "Use the booking button to message Royal Longevity on WhatsApp. Share the service you’re interested in and your preferred day and time, then confirm the appointment details with our team.",
        image: "/assets/images/gallery/salon.webp",
      },
      {
        id: "choosing",
        question: "Which treatment is right for me?",
        answer: "Tell us what you’re looking for, whether it’s skincare, salon care or a moment to unwind. Message our team before booking to discuss the options and ask any questions about your chosen service.",
        image: "/assets/images/gallery/skincare.webp",
      },
      {
        id: "first-visit",
        question: "How should I prepare for my visit?",
        answer: "Preparation depends on your chosen service. When confirming your appointment, ask our team about any preparation, what to bring and when to arrive so you can plan your visit comfortably.",
        image: "/assets/images/gallery/ritual.webp",
      },
      {
        id: "changes",
        question: "Can I change or cancel my booking?",
        answer: "If your plans change, contact our team on WhatsApp as soon as possible. Please confirm the cancellation terms and any applicable fees with the team when booking.",
        image: "/assets/images/gallery/details.webp",
      },
    ],
  },
  ar: {
    eyebrow: "الأسئلة الشائعة",
    title: "كل ما تحتاجين\nإلى معرفته.",
    bookingLabel: "احجزي موعدك",
    items: [
      {
        id: "booking",
        question: "كيف أحجز موعداً؟",
        answer: "استخدمي زر الحجز للتواصل مع رويال لونجيفيتي عبر واتساب. أخبرينا بالخدمة التي ترغبين بها واليوم والوقت المناسبين لك، ثم أكّدي تفاصيل الموعد مع فريقنا.",
        image: "/assets/images/gallery/salon.webp",
      },
      {
        id: "choosing",
        question: "كيف أختار الجلسة المناسبة لي؟",
        answer: "أخبرينا بما تبحثين عنه، سواء كان العناية بالبشرة أو خدمات الصالون أو لحظة من الاسترخاء. تواصلي مع فريقنا قبل الحجز لمناقشة الخيارات وطرح أسئلتك حول الخدمة التي تختارينها.",
        image: "/assets/images/gallery/skincare.webp",
      },
      {
        id: "first-visit",
        question: "كيف أستعدّ لزيارتي؟",
        answer: "تختلف التحضيرات بحسب الخدمة التي تختارينها. عند تأكيد موعدك، اسألي فريقنا عن أي استعدادات مطلوبة وما تحتاجين إلى إحضاره ووقت الوصول المناسب، لتخططي لزيارتك بكل راحة.",
        image: "/assets/images/gallery/ritual.webp",
      },
      {
        id: "changes",
        question: "هل يمكنني تعديل حجزي أو إلغاؤه؟",
        answer: "إذا تغيّرت خططك، تواصلي مع فريقنا عبر واتساب في أقرب وقت ممكن. يُرجى التأكد من شروط الإلغاء وأي رسوم قد تنطبق مع الفريق عند الحجز.",
        image: "/assets/images/gallery/details.webp",
      },
    ],
  },
};

export const getFaqContent = (lang: Language) => content[lang];
