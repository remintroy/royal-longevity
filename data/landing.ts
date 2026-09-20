import type { Language } from "./site";

type Offering = { title: string; description: string; services: string[] };
type Space = { title: string; description: string };
type LandingContent = {
  nav: { href: string; label: string }[];
  menu: string; close: string; skip: string; language: string;
  eyebrow: string; title: string; statement: string; booking: string;
  imagePlaceholder: string; heroImage: string; heroCaption: string;
  intro: { eyebrow: string; title: string; description: string; values: string[] };
  wellness: { eyebrow: string; title: string; description: string; items: Offering[] };
  beauty: { eyebrow: string; title: string; description: string; items: Offering[] };
  explore: string; enquire: string;
  spaces: { eyebrow: string; title: string; description: string; items: Space[] };
  memberships: { eyebrow: string; title: string; description: string; note: string; items: Offering[] };
  ritual: { eyebrow: string; title: string; steps: Space[] };
  faq: { title: string; items: { question: string; answer: string }[] };
  visit: { eyebrow: string; title: string; description: string; location: string; locationValue: string; hours: string; hoursValue: string; availability: string };
  footer: string; backToTop: string;
};

// Draft editorial content for the landing-page structure. Commercial details need confirmation.
export const landingContent: Record<Language, LandingContent> = {
  en: {
    nav: [{ href: "#wellness", label: "Movement & wellness" }, { href: "#beauty", label: "Beauty & treatments" }, { href: "#spaces", label: "Our spaces" }, { href: "#memberships", label: "Memberships" }, { href: "#visit", label: "Visit us" }],
    menu: "Open menu", close: "Close menu", skip: "Skip to content", language: "Switch to Arabic",
    eyebrow: "A world of wellness. Exclusively for women.", title: "Your space to feel\ncompletely yourself.", statement: "Movement, beauty and restoration. All in one place.", booking: "Plan your visit",
    imagePlaceholder: "Image placeholder", heroImage: "A first look inside Royal Longevity", heroCaption: "A little more time for you.",
    intro: { eyebrow: "Welcome to Royal Longevity", title: "Every part of your wellbeing.\nBeautifully connected.", description: "An energising morning. A quiet afternoon. A moment that belongs only to you. Discover a women-only destination where movement, recovery and personal care come together, at your own pace.", values: ["Exclusively for women", "Whole-body wellbeing", "One considered destination"] },
    wellness: { eyebrow: "01 / Move & restore", title: "Find your own rhythm.", description: "Make feeling good part of your everyday. Explore movement and recovery through memberships and packages.", items: [
      { title: "Gym & strength", description: "Space to build strength, find focus and move with purpose.", services: ["Gym", "Strength & conditioning"] },
      { title: "Pilates & yoga", description: "A slower breath. A stronger centre. Movement that brings you back to yourself.", services: ["Pilates", "Yoga"] },
      { title: "Pool & recovery", description: "From a refreshing swim to a moment of stillness, give yourself room to reset.", services: ["Pool", "Ice bath"] },
    ] },
    beauty: { eyebrow: "02 / Care & renew", title: "Care in every detail.", description: "Make time for the rituals you love. Salon, skin and spa experiences, arranged by appointment.", items: [
      { title: "Hair & salon", description: "A fresh perspective, from your everyday style to a dedicated hair ritual.", services: ["Hair styling", "Hair treatments", "Salon services"] },
      { title: "Hands & feet", description: "Thoughtful finishing touches that leave you feeling beautifully put together.", services: ["Manicure", "Pedicure", "Nail polish"] },
      { title: "Face & skin", description: "Dedicated attention for your skin, with time to pause and feel cared for.", services: ["Facial treatments", "Skin care"] },
      { title: "Spa & massage", description: "Step away from the everyday and settle into a quieter moment.", services: ["Spa rituals", "Massage"] },
    ] },
    explore: "Explore memberships", enquire: "Enquire about",
    spaces: { eyebrow: "03 / A sense of place", title: "The setting is part\nof the experience.", description: "Room to move. Space to breathe. Discover the places that make your time here feel entirely your own.", items: [
      { title: "The pool", description: "A place to slow down" }, { title: "The movement studio", description: "Room for your next chapter" }, { title: "The treatment suites", description: "A quieter kind of care" }, { title: "The salon", description: "Beauty in the details" },
    ] },
    memberships: { eyebrow: "04 / Your way to wellbeing", title: "A routine that fits your life.", description: "Choose regular time for yourself or a focused collection of visits. We’ll help you explore the right way to enjoy the centre.", note: "Membership options, package inclusions and pricing will be shared here soon.", items: [
      { title: "Memberships", description: "For making movement and recovery part of your rhythm.", services: ["Explore ongoing access", "Discover gym, studio and pool options", "Find a routine around you"] },
      { title: "Wellness packages", description: "For a more flexible way to spend time on your wellbeing.", services: ["Explore a collection of visits", "Discover movement and recovery options", "Choose time for yourself"] },
    ] },
    ritual: { eyebrow: "An experience shaped around you", title: "Arrive as you are.\nLeave feeling more like you.", steps: [{ title: "Find your moment", description: "Explore the movement, beauty or restorative experience you’re drawn to." }, { title: "Make it yours", description: "Speak with us about a membership, a package or an individual appointment." }, { title: "Take your time", description: "Step into a space devoted to your wellbeing, and let the everyday wait." }] },
    faq: { title: "A few things to know.", items: [{ question: "Is Royal Longevity exclusively for women?", answer: "Yes. Royal Longevity is a women-only wellness destination, bringing movement, recovery, beauty and personal care together in one place." }, { question: "Which experiences are membership or package based?", answer: "Gym, Pilates, yoga, pool and ice bath experiences are offered through memberships and packages. Exact inclusions and access details will be confirmed with each option." }, { question: "Can I book an individual beauty treatment?", answer: "Salon, hair, manicure, pedicure, facial, spa and massage services are appointment based. You can enquire about the service you are interested in without choosing a wellness membership." }, { question: "How do I choose the right experience?", answer: "Start with what you would like time for: movement, recovery or personal care. Our team can help you explore the available options when booking enquiries open." }] },
    visit: { eyebrow: "We look forward to welcoming you", title: "Make room for yourself.", description: "Your next chapter of wellbeing starts with a little time for you.", location: "Find us", locationValue: "Location details coming soon", hours: "Opening hours", hoursValue: "To be confirmed", availability: "Booking enquiries will open here soon. Contact details are being finalised." },
    footer: "A world of wellness, exclusively for women.", backToTop: "Back to top",
  },
  ar: {
    nav: [{ href: "#wellness", label: "الحركة والعافية" }, { href: "#beauty", label: "الجمال والعناية" }, { href: "#spaces", label: "مساحاتنا" }, { href: "#memberships", label: "العضويات" }, { href: "#visit", label: "زورينا" }],
    menu: "افتحي القائمة", close: "أغلقي القائمة", skip: "انتقلي إلى المحتوى", language: "Switch to English",
    eyebrow: "عالم من العافية. للسيدات فقط.", title: "مساحتك لتكوني\nعلى طبيعتك تماماً.", statement: "الحركة والجمال والاسترخاء. في مكان واحد.", booking: "خططي لزيارتك",
    imagePlaceholder: "صورة مؤقتة", heroImage: "لمحة من داخل رويال لونجيفيتي", heroCaption: "مزيد من الوقت لكِ.",
    intro: { eyebrow: "أهلاً بكِ في رويال لونجيفيتي", title: "كل جوانب عافيتك.\nفي تناغم جميل.", description: "صباح مفعم بالحيوية. ظهيرة هادئة. لحظة تخصك وحدك. اكتشفي وجهة للسيدات تجمع الحركة والاسترخاء والعناية الشخصية، بإيقاع يناسبك.", values: ["للسيدات حصرياً", "عافية متكاملة", "وجهة واحدة بعناية فائقة"] },
    wellness: { eyebrow: "٠١ / الحركة والاسترخاء", title: "اكتشفي إيقاعك الخاص.", description: "اجعلي العافية جزءاً من يومك. استكشفي تجارب الحركة والاستشفاء من خلال العضويات والباقات.", items: [
      { title: "النادي الرياضي والقوة", description: "مساحة لبناء القوة والتركيز والحركة الهادفة.", services: ["النادي الرياضي", "تمارين القوة واللياقة"] },
      { title: "البيلاتس واليوغا", description: "نفس أهدأ وتوازن أعمق. حركة تعيدك إلى ذاتك.", services: ["البيلاتس", "اليوغا"] },
      { title: "المسبح والاستشفاء", description: "من سباحة منعشة إلى لحظة سكون، امنحي نفسك فرصة للتجدد.", services: ["المسبح", "الحمام الثلجي"] },
    ] },
    beauty: { eyebrow: "٠٢ / العناية والتجدد", title: "عناية في كل تفصيلة.", description: "خصصي وقتاً لطقوسك المفضلة. تجارب الصالون والبشرة والسبا بموعد مسبق.", items: [
      { title: "الشعر والصالون", description: "إطلالة متجددة، من تسريحتك اليومية إلى طقوس العناية بالشعر.", services: ["تصفيف الشعر", "علاجات الشعر", "خدمات الصالون"] },
      { title: "اليدان والقدمان", description: "لمسات متقنة تمنحك شعوراً بالجمال والاهتمام.", services: ["مانيكير", "باديكير", "طلاء الأظافر"] },
      { title: "الوجه والبشرة", description: "اهتمام مخصص لبشرتك ووقت للراحة والعناية.", services: ["علاجات الوجه", "العناية بالبشرة"] },
      { title: "السبا والمساج", description: "ابتعدي عن انشغالات يومك واستمتعي بلحظة أكثر هدوءاً.", services: ["طقوس السبا", "المساج"] },
    ] },
    explore: "استكشفي العضويات", enquire: "استفسري عن",
    spaces: { eyebrow: "٠٣ / روح المكان", title: "المكان جزء\nمن التجربة.", description: "مساحة للحركة. ومتنفس للهدوء. اكتشفي الأماكن التي تجعل وقتك هنا ملكاً لك وحدك.", items: [{ title: "المسبح", description: "مكان لاستعادة الهدوء" }, { title: "استوديو الحركة", description: "مساحة لبدايتك الجديدة" }, { title: "أجنحة العناية", description: "عناية يحيطها الهدوء" }, { title: "الصالون", description: "الجمال في التفاصيل" }] },
    memberships: { eyebrow: "٠٤ / طريقك إلى العافية", title: "روتين ينسجم مع حياتك.", description: "اختاري وقتاً منتظماً لنفسك أو مجموعة زيارات مرنة. سنساعدك على استكشاف الطريقة الأنسب للاستمتاع بالمركز.", note: "سنشارك تفاصيل العضويات ومحتويات الباقات والأسعار هنا قريباً.", items: [
      { title: "العضويات", description: "لتصبح الحركة والاستشفاء جزءاً من إيقاعك اليومي.", services: ["استكشفي خيارات الزيارة المنتظمة", "تعرّفي على خيارات النادي والاستوديو والمسبح", "اختاري روتيناً يناسبك"] },
      { title: "باقات العافية", description: "طريقة أكثر مرونة لتخصيص الوقت لعافيتك.", services: ["استكشفي مجموعة من الزيارات", "تعرّفي على خيارات الحركة والاستشفاء", "اختاري وقتاً لنفسك"] },
    ] },
    ritual: { eyebrow: "تجربة مصممة حولك", title: "تعالي كما أنتِ.\nوغادري أقرب إلى ذاتك.", steps: [{ title: "اختاري لحظتك", description: "استكشفي تجربة الحركة أو الجمال أو الاسترخاء التي تلهمك." }, { title: "اجعليها لكِ", description: "تحدثي معنا عن عضوية أو باقة أو موعد فردي." }, { title: "خذي وقتك", description: "ادخلي مساحة مخصصة لعافيتك، ودعي انشغالاتك تنتظر." }] },
    faq: { title: "ما تودين معرفته.", items: [{ question: "هل رويال لونجيفيتي مخصص للسيدات فقط؟", answer: "نعم. رويال لونجيفيتي وجهة عافية للسيدات فقط تجمع الحركة والاستشفاء والجمال والعناية الشخصية في مكان واحد." }, { question: "ما التجارب المتاحة ضمن العضويات والباقات؟", answer: "تتوفر تجارب النادي الرياضي والبيلاتس واليوغا والمسبح والحمام الثلجي من خلال العضويات والباقات. سيتم تأكيد التفاصيل وما يشمله كل خيار." }, { question: "هل يمكنني حجز جلسة عناية فردية؟", answer: "خدمات الصالون والشعر والمانيكير والباديكير والوجه والسبا والمساج متاحة بموعد مسبق. يمكنك الاستفسار عن الخدمة التي تهمك دون اختيار عضوية عافية." }, { question: "كيف أختار التجربة المناسبة؟", answer: "ابدئي بما ترغبين بتخصيص وقت له: الحركة أو الاستشفاء أو العناية الشخصية. يمكن لفريقنا مساعدتك في استكشاف الخيارات عند فتح الاستفسارات عن الحجوزات." }] },
    visit: { eyebrow: "نتطلع لاستقبالك", title: "امنحي نفسك مساحة.", description: "تبدأ رحلتك القادمة نحو العافية بقليل من الوقت لكِ.", location: "موقعنا", locationValue: "تفاصيل الموقع قريباً", hours: "ساعات العمل", hoursValue: "سيتم تأكيدها قريباً", availability: "ستتاح الاستفسارات عن الحجوزات هنا قريباً. يجري استكمال بيانات التواصل." },
    footer: "عالم من العافية، للسيدات حصرياً.", backToTop: "العودة إلى الأعلى",
  },
};
