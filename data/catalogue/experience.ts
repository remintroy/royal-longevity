import { localized } from "@/data/inner/localization";
import type { MembershipPlan } from "./types";

// Illustrative plan structure, not confirmed commercial terms or entitlements.
export const membershipPlans: MembershipPlan[] = [
  {
    id: "gym",
    title: localized("Gym membership", "عضوية النادي"),
    description: localized(
      "Explore a regular fitness routine.",
      "اكتشفي روتيناً منتظماً للياقة.",
    ),
    categories: ["gym-fitness"],
    poolAccess: "not-included",
  },
  {
    id: "yoga",
    title: localized("Yoga membership", "عضوية اليوغا"),
    description: localized(
      "Make space for mindful practice.",
      "خصصي مساحة للممارسة الواعية.",
    ),
    categories: ["yoga"],
    poolAccess: "not-included",
  },
  {
    id: "pilates",
    title: localized("Pilates membership", "عضوية البيلاتس"),
    description: localized(
      "Build a considered movement routine.",
      "ابني روتيناً للحركة المدروسة.",
    ),
    categories: ["pilates"],
    poolAccess: "not-included",
  },
  {
    id: "combined",
    title: localized("Combined membership", "العضوية المشتركة"),
    description: localized(
      "Explore fitness, yoga, Pilates and pool access together.",
      "اكتشفي اللياقة واليوغا والبيلاتس ودخول المسبح معاً.",
    ),
    categories: ["gym-fitness", "yoga", "pilates", "swimming-pool"],
    poolAccess: "included",
  },
];

export const catalogueUi = {
  bookNow: localized("Book now", "احجزي الآن"),
  categories: localized("Service categories", "فئات الخدمات"),
  discover: localized(
    "Find your way to feeling good.",
    "اكتشفي طريقك إلى الراحة.",
  ),
  introduction: localized(
    "Movement, moments of calm and personal care. Explore nine collections, then choose the service or membership that suits you.",
    "حركة ولحظات هدوء وعناية شخصية. اكتشفي تسع مجموعات، ثم اختاري الخدمة أو العضوية المناسبة لكِ.",
  ),
  explore: localized("Explore collection", "اكتشفي المجموعة"),
  details: localized("View service", "عرض الخدمة"),
  services: localized("Services in this collection", "خدمات هذه المجموعة"),
  membership: localized("Membership", "عضوية"),
  appointment: localized("Appointment", "موعد"),
  both: localized("Membership or appointment", "عضوية أو موعد"),
  memberships: localized("Explore memberships", "اكتشفي العضويات"),
  appointments: localized("Plan an appointment", "خططي لموعد"),
  enquiry: localized("Discuss this service", "استفسري عن هذه الخدمة"),
  membershipEnquiry: localized(
    "Enquire about this plan",
    "استفسري عن هذه الخطة",
  ),
  membershipTitle: localized(
    "A routine that belongs to you.",
    "روتين يناسبكِ.",
  ),
  membershipIntro: localized(
    "Compare gym, yoga, Pilates and combined options. Our team will help you choose a plan and confirm its facilities, access and terms.",
    "قارني خيارات النادي واليوغا والبيلاتس والعضوية المشتركة. يساعدك فريقنا في اختيار خطة وتأكيد مرافقها وشروط الدخول إليها.",
  ),
  planNote: localized(
    "Illustrative plans. Pricing, duration, schedules and pool access must be confirmed with our team before joining.",
    "خطط توضيحية. يجب تأكيد الأسعار والمدة والجداول ودخول المسبح مع فريقنا قبل الاشتراك.",
  ),
  included: localized("Collections to explore", "مجموعات للاكتشاف"),
  poolIncluded: localized(
    "Pool access included in this example plan",
    "دخول المسبح مشمول في هذه الخطة التوضيحية",
  ),
  poolSeparate: localized(
    "Pool access arranged separately",
    "يُرتّب دخول المسبح بشكل منفصل",
  ),
  poolTitle: localized(
    "One pool. Two ways to visit.",
    "مسبح واحد. طريقتان للزيارة.",
  ),
  poolMember: localized(
    "Explore selected memberships with pool access. Confirm inclusions with our team.",
    "اكتشفي عضويات مختارة تشمل المسبح. أكّدي التفاصيل مع فريقنا.",
  ),
  poolBooking: localized(
    "Enquire about a separate pool session with your preferred date and time.",
    "استفسري عن جلسة مسبح منفصلة مع التاريخ والوقت المفضلين.",
  ),
  next: localized("Your next step", "خطوتك التالية"),
  membershipSteps: [
    localized("Compare plans", "قارني الخطط"),
    localized("Choose your interests", "اختاري اهتماماتك"),
    localized("Speak with our team", "تواصلي مع فريقنا"),
    localized("Confirm joining details", "أكّدي تفاصيل الاشتراك"),
  ],
  appointmentSteps: [
    localized("Choose a service", "اختاري خدمة"),
    localized("Share a preferred date & time", "شاركي التاريخ والوقت المفضلين"),
    localized("Send your enquiry", "أرسلي استفسارك"),
    localized("Confirm with our team", "أكّدي مع فريقنا"),
  ],
  appointmentIntro: localized(
    "Choose a service and share your preferences. The team confirms timing, pricing and any payment arrangements with you on WhatsApp.",
    "اختاري خدمة وشاركي تفضيلاتك. يؤكد الفريق الوقت والسعر وأي ترتيبات للدفع معكِ عبر واتساب.",
  ),
  membershipOnly: localized(
    "This service is offered through a membership enquiry. Compare plans or discuss your interests with our team.",
    "تُطلب هذه الخدمة عبر استفسار عن العضوية. قارني الخطط أو ناقشي اهتماماتك مع فريقنا.",
  ),
  supporting: localized("Useful information", "معلومات مفيدة"),
  pricing: localized("Pricing & session details", "الأسعار وتفاصيل الجلسة"),
  pricingBody: localized(
    "Ask our team about pricing, duration, suitability and what to expect before confirming your visit.",
    "اسألي فريقنا عن السعر والمدة ومدى الملاءمة وتفاصيل التجربة قبل تأكيد زيارتك.",
  ),
  spaces: localized("Explore our spaces", "اكتشفي مساحاتنا"),
  spacesBody: localized(
    "Discover the collections that shape our fitness, wellbeing and beauty spaces. Photography is illustrative while our premises gallery is prepared.",
    "اكتشفي المجموعات التي تشكّل مساحات اللياقة والعافية والجمال. الصور توضيحية ريثما يُجهّز معرض صور مرافقنا.",
  ),
  gallery: localized("Gallery", "معرض الصور"),
  galleryBody: localized(
    "A visual introduction to our care. These are inspiration images; premises photography and video will be added when available.",
    "لمحة مصورة عن عنايتنا. هذه صور إلهامية؛ ستُضاف صور المرافق ومقاطع الفيديو عند توفرها.",
  ),
};
