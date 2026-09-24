import { catalogueUi } from "./catalogue/experience";
import { supportingPages } from "./catalogue/supporting";
import { localized, type LocalizedText } from "./inner/localization";
import { ui } from "./inner/ui";

export type InnerPage = {
  title: LocalizedText;
  eyebrow: LocalizedText;
  description: LocalizedText;
  image: string;
  storyTitle: LocalizedText;
  story: LocalizedText;
};

export const pages: Record<string, InnerPage> = {
  services: {
    title: catalogueUi.discover,
    eyebrow: localized("The care collection", "مجموعة العناية"),
    description: catalogueUi.introduction,
    image: "skincare",
    storyTitle: ui.care,
    story: ui.visitBody,
  },
  beauty: {
    title: localized(
      "Beauty that feels entirely yours.",
      "جمال يشبهكِ تماماً.",
    ),
    eyebrow: localized("Beauty · Personal care", "الجمال · العناية الشخصية"),
    description: localized(
      "Expert attention. Thoughtful details. Discover your next hair, skin or beauty ritual in a space designed for you.",
      "اهتمام متقن وتفاصيل مدروسة. اكتشفي طقوس الشعر والبشرة والجمال في مساحة مصممة لكِ.",
    ),
    image: "skincare",
    storyTitle: localized(
      "Your everyday, a little more beautiful.",
      "يومكِ، بمزيد من الجمال.",
    ),
    story: localized(
      "Whether you are preparing for something special or making time for yourself, our approach begins with listening.",
      "سواء كنت تستعدين لمناسبة خاصة أو تخصصين وقتاً لنفسك، تبدأ عنايتنا بالاستماع إليكِ.",
    ),
  },
  wellness: {
    title: localized(
      "Slow down. Come back to yourself.",
      "تمهّلي. وعودي إلى ذاتكِ.",
    ),
    eyebrow: localized("Wellness · Body & mind", "العافية · الجسم والذهن"),
    description: localized(
      "Leave the busy day behind. Discover quiet rituals and thoughtful body care that put your comfort first.",
      "اتركي يومك المزدحم خلفك. اكتشفي طقوساً هادئة وعناية بالجسم تضع راحتك أولاً.",
    ),
    image: "massage",
    storyTitle: localized(
      "A little stillness goes a long way.",
      "قليل من السكون يصنع الكثير.",
    ),
    story: localized(
      "An unhurried environment, personal attention and space to breathe. Find a ritual that suits the way you want to feel.",
      "أجواء هادئة واهتمام شخصي ومساحة للتنفس. اختاري طقوساً تناسب الشعور الذي تبحثين عنه.",
    ),
  },
  salon: {
    title: localized(
      "Your style, beautifully expressed.",
      "أسلوبك، بأجمل تعبير.",
    ),
    eyebrow: localized("Beauty · Salon", "الجمال · الصالون"),
    description: localized(
      "Step into a refined space for your beauty rituals. From styling to personal care, every detail begins with you.",
      "ادخلي مساحة راقية لطقوس جمالك. من التصفيف إلى العناية الشخصية، كل التفاصيل تبدأ بكِ.",
    ),
    image: "salon",
    storyTitle: localized(
      "A space for your beauty rituals.",
      "مساحة لطقوس جمالك.",
    ),
    story: localized(
      "Thoughtfully arranged spaces, considered details and time to feel at home. Discover a calmer way to care for yourself.",
      "مساحات مدروسة وتفاصيل متقنة ووقت للشعور بالراحة. اكتشفي أسلوباً أهدأ للعناية بنفسك.",
    ),
  },
  about: {
    title: localized("Care is in our nature.", "العناية في طبيعتنا."),
    eyebrow: localized("About Royal Longevity", "عن رويال لونجيفيتي"),
    description: localized(
      "We believe beauty is personal. A feeling of confidence, a moment of calm, and thoughtful attention that stays with you.",
      "نؤمن بأن الجمال تجربة شخصية. شعور بالثقة ولحظة هدوء واهتمام مدروس يبقى معكِ.",
    ),
    image: "details",
    storyTitle: localized(
      "Personal care. Lasting confidence.",
      "عناية شخصية. ثقة تدوم.",
    ),
    story: localized(
      "Royal Longevity brings beauty and wellbeing together through an unhurried, personal approach. From the welcome to the finishing touch, our vision is simple: make room for you.",
      "يجمع رويال لونجيفيتي الجمال والعافية بنهج شخصي هادئ. من الترحيب إلى اللمسة الأخيرة، رؤيتنا بسيطة: منحك المساحة التي تستحقينها.",
    ),
  },
  "our-space": {
    title: localized("A place to feel at ease.", "مكان تشعرين فيه بالراحة."),
    eyebrow: localized(
      "The Royal Longevity experience",
      "تجربة رويال لونجيفيتي",
    ),
    description: localized(
      "Warm details, quiet corners and room to breathe. Discover the inspiration behind our beauty and wellness spaces.",
      "تفاصيل دافئة وزوايا هادئة ومساحة للتنفس. اكتشفي الإلهام وراء مساحات الجمال والعافية لدينا.",
    ),
    image: "salon",
    storyTitle: localized("Designed around your comfort.", "مصممة حول راحتك."),
    story: localized(
      "From a welcoming lounge to the smallest finishing touch, our spaces reflect a belief that feeling good begins with feeling at ease.",
      "من ردهة الترحيب إلى أدق اللمسات، تعكس مساحاتنا إيماننا بأن الشعور الجميل يبدأ بالراحة.",
    ),
  },
  packages: {
    title: localized(
      "More care. One beautiful ritual.",
      "مزيد من العناية. طقوس جميلة متكاملة.",
    ),
    eyebrow: localized("Curated packages", "باقات مختارة"),
    description: localized(
      "Thoughtful combinations for everyday care, a special occasion or a well-deserved pause.",
      "توليفات مدروسة للعناية اليومية أو مناسبة خاصة أو استراحة تستحقينها.",
    ),
    image: "ritual",
    storyTitle: ui.collection,
    story: ui.visitBody,
  },
  contact: {
    title: localized("Let’s make time for you.", "لنخصص وقتاً لكِ."),
    eyebrow: localized("Contact & location", "التواصل والموقع"),
    description: localized(
      "Looking for the right treatment or planning your first visit? Start a conversation with our team.",
      "تبحثين عن الجلسة المناسبة أو تخططين لزيارتك الأولى؟ ابدئي محادثة مع فريقنا.",
    ),
    image: "hair",
    storyTitle: ui.visitTitle,
    story: ui.visitBody,
  },
  faq: {
    title: localized(
      "A little clarity, before your visit.",
      "مزيد من الوضوح قبل زيارتك.",
    ),
    eyebrow: localized("Frequently asked questions", "الأسئلة الشائعة"),
    description: localized(
      "From choosing a treatment to arranging your appointment, find the details that help you feel prepared.",
      "من اختيار الجلسة إلى ترتيب موعدك، اكتشفي التفاصيل التي تساعدك على الاستعداد.",
    ),
    image: "details",
    storyTitle: ui.faq,
    story: ui.visitBody,
  },
};

// Additional destinations from the supplied website flow tree.
pages.memberships = {
  title: catalogueUi.membershipTitle,
  eyebrow: catalogueUi.membership,
  description: catalogueUi.membershipIntro,
  image: "details",
  storyTitle: ui.care,
  story: catalogueUi.membershipIntro,
};
pages.appointments = {
  title: catalogueUi.appointments,
  eyebrow: catalogueUi.appointment,
  description: catalogueUi.appointmentIntro,
  image: "details",
  storyTitle: ui.visitTitle,
  story: catalogueUi.appointmentIntro,
};
pages.gallery = {
  title: catalogueUi.gallery,
  eyebrow: catalogueUi.spaces,
  description: catalogueUi.galleryBody,
  image: "salon",
  storyTitle: ui.care,
  story: catalogueUi.galleryBody,
};
pages["our-space"] = {
  ...pages["our-space"],
  title: catalogueUi.spaces,
  description: catalogueUi.spacesBody,
};
for (const [slug, page] of Object.entries(supportingPages)) {
  pages[slug] = {
    title: page.title,
    eyebrow: catalogueUi.supporting,
    description: page.description,
    image: "details",
    storyTitle: page.title,
    story: page.description,
  };
}
