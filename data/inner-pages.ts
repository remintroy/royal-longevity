import type { Language } from "./site";

export type Localized = Record<Language, string>;
const l = (en: string, ar: string): Localized => ({ en, ar });
export const ui = {
  home: l("Home", "الرئيسية"), menu: l("Menu", "القائمة"), skip: l("Skip to content", "انتقلي إلى المحتوى"),
  book: l("Book an appointment", "احجزي موعداً"), explore: l("Explore treatment", "اكتشفي الجلسة"),
  all: l("All services", "جميع الخدمات"), salon: l("View our salon", "اكتشفي صالوننا"),
  gallery: l("Explore our space", "اكتشفي مساحتنا"), care: l("Care, in every detail", "عناية في كل التفاصيل"),
  services: l("Find your own beauty ritual.", "اكتشفي طقوس جمالك الخاصة."),
  serviceLabel: l("Our treatments", "جلساتنا"), faq: l("Have a question?", "لديكِ سؤال؟"),
  allFaq: l("All questions", "جميع الأسئلة"), ready: l("A little time, just for you.", "بعض الوقت، لكِ وحدك."),
  readyBody: l("Let us help you find your next favourite ritual.", "دعينا نساعدك على اكتشاف طقوس العناية التي تناسبك."),
  price: l("Enquire for pricing", "استفسري عن الأسعار"),
  demo: l("A preview of our care. Treatments and collections are illustrative; confirm details with our team.", "لمحة عن عنايتنا. الجلسات والباقات توضيحية؛ يُرجى تأكيد التفاصيل مع فريقنا."),
  imageNote: l("Mood imagery · a glimpse of our inspiration", "صور إلهامية · لمحة عن أجوائنا"),
  visit: l("Plan your visit", "خططي لزيارتك"), visitTitle: l("Your next moment of care starts here.", "لحظتك القادمة من العناية تبدأ هنا."),
  visitBody: l("Tell us what you have in mind. Our team will discuss your treatment and confirm a suitable appointment on WhatsApp.", "أخبرينا بما ترغبين به. سيناقش فريقنا الجلسة معك ويؤكد موعداً مناسباً عبر واتساب."),
  select: l("Choose a service", "اختاري الخدمة"), date: l("Preferred date (optional)", "التاريخ المفضل (اختياري)"),
  time: l("Preferred time (optional)", "الوقت المفضل (اختياري)"), any: l("I’d like some guidance", "أرغب في المساعدة على الاختيار"),
  send: l("Enquire on WhatsApp", "استفسري عبر واتساب"),
  requestNote: l("This is an enquiry. Your appointment is confirmed only after speaking with our team.", "هذا طلب استفسار. يُؤكَّد موعدك فقط بعد التواصل مع فريقنا."),
  summary: l("Thoughtfully planned. Personally yours.", "بتخطيط متقن، واهتمام خاص بكِ."),
  contact: l("Speak with our team", "تواصلي مع فريقنا"),
  collection: l("Your care, beautifully combined.", "عنايتك، في باقات متكاملة."),
  included: l("Included rituals", "طقوس العناية المشمولة"),
  footer: l("Personal care. Lasting confidence.", "عناية شخصية. ثقة تدوم."),
  back: l("Back to services", "العودة إلى الخدمات"),
};

export const navigation = [
  { slug: "about", label: l("About", "عن رويال") },
  { slug: "beauty", label: l("Beauty", "الجمال") },
  { slug: "wellness", label: l("Wellness", "العافية") },
  { slug: "packages", label: l("Packages", "الباقات") },
  { slug: "our-space", label: l("Our space", "مساحتنا") },
  { slug: "contact", label: l("Contact", "تواصلي معنا") },
];

export type Service = { slug: string; category: "beauty" | "wellness"; image: string; title: Localized; heading: Localized; description: Localized; ritual: Localized; options: { name: Localized; detail: Localized }[] };
// Demo catalogue. Confirm the treatments and package contents before publishing.
export const services: Service[] = [
  { slug: "pedicure", category: "beauty", image: "ritual", title: l("Pedicure", "العناية بالقدمين"), heading: l("Beautiful feet. Greater confidence.", "قدمان جميلتان. ثقة أكبر."), description: l("Relax, refresh and restore with a considered pedicure ritual. A little attention to the details, a little time for yourself.", "استرخي وانتعشي مع طقوس العناية بالقدمين. اهتمام بالتفاصيل ووقت خاص بكِ."), ritual: l("More than a treatment, a moment for you.", "أكثر من جلسة، لحظة لكِ."), options: [ { name: l("Classic pedicure", "بديكير كلاسيكي"), detail: l("A simple ritual of cleansing, shaping and finishing.", "طقوس بسيطة للتنظيف وتنسيق الأظافر والعناية النهائية.") }, { name: l("Deluxe pedicure", "بديكير ديلوكس"), detail: l("Unhurried care with exfoliation and a soothing finish.", "عناية هادئة مع التقشير ولمسة ختامية مريحة.") }, { name: l("Royal pedicure", "بديكير رويال"), detail: l("An extended foot-care ritual for a moment of indulgence.", "طقوس عناية ممتدة بالقدمين للحظة من الدلال.") } ] },
  { slug: "hair", category: "beauty", image: "hair", title: l("Hair & styling", "الشعر والتصفيف"), heading: l("Your style, beautifully expressed.", "أسلوبك، بأجمل تعبير."), description: l("From a fresh cut to a polished finish, discover thoughtful salon care shaped around your personal style.", "من قصة جديدة إلى إطلالة متقنة، اكتشفي عناية بالشعر تناسب أسلوبك الشخصي."), ritual: l("Good hair. A little more you.", "شعر جميل يعبّر عنكِ."), options: [ { name: l("Cut & finish", "قص وتصفيف"), detail: l("A fresh shape and a finish that feels like you.", "قصة جديدة ولمسة نهائية تعبّر عنكِ.") }, { name: l("Blow-dry & styling", "تجفيف وتصفيف"), detail: l("An effortless finish for everyday or an occasion.", "إطلالة متقنة لكل يوم أو لمناسبة خاصة.") }, { name: l("Hair-care ritual", "طقوس العناية بالشعر"), detail: l("Discuss your hair-care needs with our team.", "ناقشي احتياجات شعرك مع فريقنا.") } ] },
  { slug: "skincare", category: "beauty", image: "skincare", title: l("Facial care", "العناية بالوجه"), heading: l("Make room for your natural radiance.", "امنحي إشراقتك الطبيعية مساحة."), description: l("Thoughtful facial rituals, gentle attention and time to reset. Discover the care that suits your skin.", "طقوس مدروسة للوجه وعناية لطيفة ووقت للتجدد. اكتشفي ما يناسب بشرتك."), ritual: l("A fresh perspective on skin care.", "نظرة جديدة إلى العناية بالبشرة."), options: [ { name: l("Essential facial", "جلسة الوجه الأساسية"), detail: l("A considered introduction to your skincare ritual.", "بداية مدروسة لطقوس العناية ببشرتك.") }, { name: l("Hydration ritual", "طقوس الترطيب"), detail: l("A moment of gentle care for skin that feels refreshed.", "لحظة عناية لطيفة لبشرة تشعر بالانتعاش.") } ] },
  { slug: "massage", category: "wellness", image: "massage", title: l("Relaxation massage", "تدليك للاسترخاء"), heading: l("A softer pace. A deeper exhale.", "وتيرة أهدأ. نفس أعمق."), description: l("Step away from the everyday and settle into a quiet moment of restorative body care.", "ابتعدي عن صخب الحياة اليومية واستمتعي بلحظة هادئة من العناية بالجسم."), ritual: l("Space to pause, time to unwind.", "مساحة للتوقف، ووقت للاسترخاء."), options: [ { name: l("Relaxation ritual", "طقوس الاسترخاء"), detail: l("A gentle pause, tailored around your comfort.", "استراحة لطيفة مصممة حول راحتك.") }, { name: l("Extended escape", "استراحة ممتدة"), detail: l("More time to slow down and settle in.", "مزيد من الوقت للهدوء والاسترخاء.") } ] },
  { slug: "body-care", category: "wellness", image: "ritual", title: l("Body rituals", "طقوس العناية بالجسم"), heading: l("A ritual of renewal, from head to toe.", "طقوس تجدد من الرأس إلى القدمين."), description: l("Warmth, quiet and considered care. Explore body rituals that make space for your wellbeing.", "دفء وهدوء وعناية متقنة. اكتشفي طقوساً للجسم تمنح راحتك مساحة."), ritual: l("Let the everyday fall away.", "اتركي انشغالات يومك خلفك."), options: [ { name: l("Body polish", "تقشير الجسم"), detail: l("A refreshing exfoliation ritual with a gentle finish.", "طقوس تقشير منعشة بلمسة ختامية لطيفة.") }, { name: l("Spa ritual", "طقوس السبا"), detail: l("A quiet escape shaped around your preferences.", "استراحة هادئة تُصمَّم وفق تفضيلاتك.") } ] },
];

export type InnerPage = { title: Localized; eyebrow: Localized; description: Localized; image: string; storyTitle: Localized; story: Localized };
export const pages: Record<string, InnerPage> = {
  services: { title: ui.services, eyebrow: l("The care collection", "مجموعة العناية"), description: l("From your signature style to a moment of stillness. Explore thoughtful care for hair, skin, body and you.", "من إطلالتك المميزة إلى لحظة من السكون. اكتشفي عناية بالشعر والبشرة والجسم وبكِ."), image: "skincare", storyTitle: ui.care, story: ui.visitBody },
  beauty: { title: l("Beauty that feels entirely yours.", "جمال يشبهكِ تماماً."), eyebrow: l("Beauty · Personal care", "الجمال · العناية الشخصية"), description: l("Expert attention. Thoughtful details. Discover your next hair, skin or beauty ritual in a space designed for you.", "اهتمام متقن وتفاصيل مدروسة. اكتشفي طقوس الشعر والبشرة والجمال في مساحة مصممة لكِ."), image: "skincare", storyTitle: l("Your everyday, a little more beautiful.", "يومكِ، بمزيد من الجمال."), story: l("Whether you are preparing for something special or making time for yourself, our approach begins with listening.", "سواء كنت تستعدين لمناسبة خاصة أو تخصصين وقتاً لنفسك، تبدأ عنايتنا بالاستماع إليكِ.") },
  wellness: { title: l("Slow down. Come back to yourself.", "تمهّلي. وعودي إلى ذاتكِ."), eyebrow: l("Wellness · Body & mind", "العافية · الجسم والذهن"), description: l("Leave the busy day behind. Discover quiet rituals and thoughtful body care that put your comfort first.", "اتركي يومك المزدحم خلفك. اكتشفي طقوساً هادئة وعناية بالجسم تضع راحتك أولاً."), image: "massage", storyTitle: l("A little stillness goes a long way.", "قليل من السكون يصنع الكثير."), story: l("An unhurried environment, personal attention and space to breathe. Find a ritual that suits the way you want to feel.", "أجواء هادئة واهتمام شخصي ومساحة للتنفس. اختاري طقوساً تناسب الشعور الذي تبحثين عنه.") },
  salon: { title: l("Your style, beautifully expressed.", "أسلوبك، بأجمل تعبير."), eyebrow: l("Beauty · Salon", "الجمال · الصالون"), description: l("Step into a refined space for your beauty rituals. From styling to personal care, every detail begins with you.", "ادخلي مساحة راقية لطقوس جمالك. من التصفيف إلى العناية الشخصية، كل التفاصيل تبدأ بكِ."), image: "salon", storyTitle: l("A space for your beauty rituals.", "مساحة لطقوس جمالك."), story: l("Thoughtfully arranged spaces, considered details and time to feel at home. Discover a calmer way to care for yourself.", "مساحات مدروسة وتفاصيل متقنة ووقت للشعور بالراحة. اكتشفي أسلوباً أهدأ للعناية بنفسك.") },
  about: { title: l("Care is in our nature.", "العناية في طبيعتنا."), eyebrow: l("About Royal Longevity", "عن رويال لونجيفيتي"), description: l("We believe beauty is personal. A feeling of confidence, a moment of calm, and thoughtful attention that stays with you.", "نؤمن بأن الجمال تجربة شخصية. شعور بالثقة ولحظة هدوء واهتمام مدروس يبقى معكِ."), image: "details", storyTitle: l("Personal care. Lasting confidence.", "عناية شخصية. ثقة تدوم."), story: l("Royal Longevity brings beauty and wellbeing together through an unhurried, personal approach. From the welcome to the finishing touch, our vision is simple: make room for you.", "يجمع رويال لونجيفيتي الجمال والعافية بنهج شخصي هادئ. من الترحيب إلى اللمسة الأخيرة، رؤيتنا بسيطة: منحك المساحة التي تستحقينها.") },
  "our-space": { title: l("A place to feel at ease.", "مكان تشعرين فيه بالراحة."), eyebrow: l("The Royal Longevity experience", "تجربة رويال لونجيفيتي"), description: l("Warm details, quiet corners and room to breathe. Discover the inspiration behind our beauty and wellness spaces.", "تفاصيل دافئة وزوايا هادئة ومساحة للتنفس. اكتشفي الإلهام وراء مساحات الجمال والعافية لدينا."), image: "salon", storyTitle: l("Designed around your comfort.", "مصممة حول راحتك."), story: l("From a welcoming lounge to the smallest finishing touch, our spaces reflect a belief that feeling good begins with feeling at ease.", "من ردهة الترحيب إلى أدق اللمسات، تعكس مساحاتنا إيماننا بأن الشعور الجميل يبدأ بالراحة.") },
  packages: { title: l("More care. One beautiful ritual.", "مزيد من العناية. طقوس جميلة متكاملة."), eyebrow: l("Curated packages", "باقات مختارة"), description: l("Thoughtful combinations for everyday care, a special occasion or a well-deserved pause.", "توليفات مدروسة للعناية اليومية أو مناسبة خاصة أو استراحة تستحقينها."), image: "ritual", storyTitle: ui.collection, story: ui.visitBody },
  contact: { title: l("Let’s make time for you.", "لنخصص وقتاً لكِ."), eyebrow: l("Contact & location", "التواصل والموقع"), description: l("Looking for the right treatment or planning your first visit? Start a conversation with our team.", "تبحثين عن الجلسة المناسبة أو تخططين لزيارتك الأولى؟ ابدئي محادثة مع فريقنا."), image: "hair", storyTitle: ui.visitTitle, story: ui.visitBody },
  faq: { title: l("A little clarity, before your visit.", "مزيد من الوضوح قبل زيارتك."), eyebrow: l("Frequently asked questions", "الأسئلة الشائعة"), description: l("From choosing a treatment to arranging your appointment, find the details that help you feel prepared.", "من اختيار الجلسة إلى ترتيب موعدك، اكتشفي التفاصيل التي تساعدك على الاستعداد."), image: "details", storyTitle: ui.faq, story: ui.visitBody },
};
export const values = [
  { title: l("A calming space", "مساحة هادئة"), description: l("Room to slow down", "مساحة للتمهّل"), icon: "leaf" },
  { title: l("Personal attention", "اهتمام شخصي"), description: l("Care that starts with you", "عناية تبدأ بكِ"), icon: "user" },
  { title: l("Considered rituals", "طقوس مدروسة"), description: l("Beauty in the details", "الجمال في التفاصيل"), icon: "sparkles" },
  { title: l("Your comfort", "راحتك"), description: l("At the heart of every visit", "في قلب كل زيارة"), icon: "heart" },
];
export const packages = [
  { slug: "everyday", title: l("The everyday escape", "استراحة يومية"), description: l("A fresh finish and a little time to yourself.", "إطلالة متجددة وبعض الوقت لنفسك."), image: "hair", services: ["hair", "pedicure"] },
  { slug: "radiance", title: l("The radiance ritual", "طقوس الإشراقة"), description: l("Thoughtful care for a beautifully refreshed feeling.", "عناية مدروسة لشعور جميل ومتجدد."), image: "skincare", services: ["skincare", "pedicure"] },
  { slug: "reset", title: l("The quiet reset", "تجدد هادئ"), description: l("Make space for a slower, softer afternoon.", "امنحي نفسك وقتاً أكثر هدوءاً ولطفاً."), image: "massage", services: ["massage", "body-care"] },
];
