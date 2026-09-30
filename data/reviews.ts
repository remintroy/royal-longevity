import type { Language } from "./site";

export type Review = {
  id: string;
  name: string;
  initials: string;
  location: string;
  quote: string;
  rating: string;
  date: string;
  dateLabel: string;
};

export type ReviewsContent = {
  eyebrow: string;
  title: string;
  rating: string;
  ratingLabel: string;
  outOfFive: string;
  demoLabel: string;
  viewAllLabel: string;
  viewAllHref: string;
  categories: { label: string; rating: string }[];
  reviews: Review[];
};

// All names, testimonials, dates and scores are fictional design placeholders.
// Replace with approved customer reviews before publication. Do not use in schema.
const content: Record<Language, ReviewsContent> = {
  en: {
    eyebrow: "Reviews",
    title: "Thoughtful care.\nBeautifully remembered.",
    rating: "4.98",
    ratingLabel: "Overall rating",
    outOfFive: "out of 5",
    demoLabel: "Sample reviews for design preview",
    viewAllLabel: "View All",
    viewAllHref: "#",
    categories: [
      { label: "Atmosphere", rating: "4.9" },
      { label: "Personal care", rating: "5.0" },
      { label: "Attention to detail", rating: "5.0" },
      { label: "Communication", rating: "5.0" },
    ],
    reviews: [
      {
        id: "sarah",
        name: "Sarah A.",
        initials: "SA",
        location: "Dubai, UAE",
        rating: "5.0",
        date: "2026-09-28",
        dateLabel: "Sep 28, 2026",
        quote:
          "A lovely pause in a busy week. The space felt calm from the moment I arrived, and every little detail was considered. I left feeling refreshed and wonderfully looked after.",
      },
      {
        id: "lina",
        name: "Lina M.",
        initials: "LM",
        location: "Abu Dhabi, UAE",
        rating: "5.0",
        date: "2026-09-25",
        dateLabel: "Sep 25, 2026",
        quote:
          "The team took time to understand exactly what I wanted. Nothing felt rushed, and the finish was so thoughtful. A beautiful experience from start to finish.",
      },
      {
        id: "amelia",
        name: "Amelia D.",
        initials: "AD",
        location: "Dubai, UAE",
        rating: "5.0",
        date: "2026-09-22",
        dateLabel: "Sep 22, 2026",
        quote:
          "A beautifully calm space with a team who really listen. Booking was easy, the welcome was warm, and I felt cared for throughout my visit. I would happily return.",
      },
      {
        id: "emma",
        name: "Emma R.",
        initials: "ER",
        location: "Dubai, UAE",
        rating: "5.0",
        date: "2026-09-19",
        dateLabel: "Sep 19, 2026",
        quote:
          "Such a warm welcome and a genuinely relaxing atmosphere. I loved the personal attention and the little touches that made my visit feel special. Already looking forward to returning.",
      },
      {
        id: "noura",
        name: "Noura K.",
        initials: "NK",
        location: "Sharjah, UAE",
        rating: "5.0",
        date: "2026-09-16",
        dateLabel: "Sep 16, 2026",
        quote:
          "My favourite part was having a moment entirely to myself. Gentle care, a peaceful setting and a team who made me feel comfortable throughout.",
      },
      {
        id: "yasmin",
        name: "Yasmin F.",
        initials: "YF",
        location: "Abu Dhabi, UAE",
        rating: "5.0",
        date: "2026-09-13",
        dateLabel: "Sep 13, 2026",
        quote:
          "Everything felt thoughtfully prepared, from the peaceful atmosphere to the finishing touches. A wonderful way to slow down and enjoy a little time for myself. I left feeling renewed.",
      },
      {
        id: "sofia",
        name: "Sofia L.",
        initials: "SL",
        location: "Dubai, UAE",
        rating: "5.0",
        date: "2026-09-10",
        dateLabel: "Sep 10, 2026",
        quote:
          "Beautiful surroundings and such attentive service. Everything was explained clearly, and the whole visit felt effortless. A little ritual I would happily make time for again.",
      },
      {
        id: "maya",
        name: "Maya H.",
        initials: "MH",
        location: "Abu Dhabi, UAE",
        rating: "5.0",
        date: "2026-09-07",
        dateLabel: "Sep 07, 2026",
        quote:
          "From the first welcome to the final detail, the care felt personal. I appreciated the unhurried approach and left with a smile. A very special place to unwind.",
      },
      {
        id: "olivia",
        name: "Olivia B.",
        initials: "OB",
        location: "Dubai, UAE",
        rating: "5.0",
        date: "2026-09-04",
        dateLabel: "Sep 04, 2026",
        quote:
          "A lovely experience during my time in Dubai. The team were welcoming and attentive, and every detail made the visit feel personal. A peaceful moment I will remember.",
      },
    ],
  },
  ar: {
    eyebrow: "آراء ضيوفنا",
    title: "عناية تلامس القلب.\nوتجربة تبقى في الذاكرة.",
    rating: "4.98",
    ratingLabel: "التقييم العام",
    outOfFive: "من 5",
    demoLabel: "آراء تجريبية لمعاينة التصميم",
    viewAllLabel: "عرض الكل",
    viewAllHref: "#",
    categories: [
      { label: "الأجواء", rating: "4.9" },
      { label: "العناية الشخصية", rating: "5.0" },
      { label: "الاهتمام بالتفاصيل", rating: "5.0" },
      { label: "التواصل", rating: "5.0" },
    ],
    reviews: [
      {
        id: "sarah",
        name: "سارة أ.",
        initials: "س أ",
        location: "دبي، الإمارات",
        rating: "5.0",
        date: "2026-09-28",
        dateLabel: "٢٨ سبتمبر ٢٠٢٦",
        quote:
          "استراحة جميلة وسط أسبوع مزدحم. شعرت بالهدوء منذ لحظة وصولي، وكانت كل التفاصيل مدروسة بعناية. غادرت وأنا أشعر بالانتعاش وباهتمام رائع.",
      },
      {
        id: "lina",
        name: "لينا م.",
        initials: "ل م",
        location: "أبوظبي، الإمارات",
        rating: "5.0",
        date: "2026-09-25",
        dateLabel: "٢٥ سبتمبر ٢٠٢٦",
        quote:
          "أخذ الفريق الوقت الكافي لفهم ما أريده تماماً. لم أشعر بأي استعجال، وكانت اللمسات الأخيرة متقنة. تجربة جميلة من البداية إلى النهاية.",
      },
      {
        id: "amelia",
        name: "أميليا د.",
        initials: "أ د",
        location: "دبي، الإمارات",
        rating: "5.0",
        date: "2026-09-22",
        dateLabel: "٢٢ سبتمبر ٢٠٢٦",
        quote:
          "مساحة هادئة وجميلة وفريق يصغي باهتمام. كان الحجز سهلاً والترحيب دافئاً، وشعرت بالعناية طوال زيارتي. يسعدني أن أعود مجدداً.",
      },
      {
        id: "emma",
        name: "إيما ر.",
        initials: "إ ر",
        location: "دبي، الإمارات",
        rating: "5.0",
        date: "2026-09-19",
        dateLabel: "١٩ سبتمبر ٢٠٢٦",
        quote:
          "ترحيب دافئ وأجواء تبعث على الاسترخاء. أحببت الاهتمام الشخصي والتفاصيل الصغيرة التي جعلت زيارتي مميزة. أتطلع بالفعل للعودة.",
      },
      {
        id: "noura",
        name: "نورة ك.",
        initials: "ن ك",
        location: "الشارقة، الإمارات",
        rating: "5.0",
        date: "2026-09-16",
        dateLabel: "١٦ سبتمبر ٢٠٢٦",
        quote:
          "أجمل ما في التجربة أنني حظيت بلحظة لنفسي وحدي. عناية لطيفة ومكان هادئ وفريق جعلني أشعر بالراحة طوال الزيارة.",
      },
      {
        id: "yasmin",
        name: "ياسمين ف.",
        initials: "ي ف",
        location: "أبوظبي، الإمارات",
        rating: "5.0",
        date: "2026-09-13",
        dateLabel: "١٣ سبتمبر ٢٠٢٦",
        quote:
          "كل شيء كان معداً بعناية، من الأجواء الهادئة إلى اللمسات الأخيرة. طريقة رائعة للتمهل والاستمتاع ببعض الوقت لنفسي. غادرت وأنا أشعر بالتجدد.",
      },
      {
        id: "sofia",
        name: "صوفيا ل.",
        initials: "ص ل",
        location: "دبي، الإمارات",
        rating: "5.0",
        date: "2026-09-10",
        dateLabel: "١٠ سبتمبر ٢٠٢٦",
        quote:
          "مكان جميل وخدمة مليئة بالاهتمام. شُرح كل شيء بوضوح، وكانت الزيارة مريحة بكل تفاصيلها. طقس جميل يسعدني أن أخصص له وقتاً من جديد.",
      },
      {
        id: "maya",
        name: "مايا هـ.",
        initials: "م هـ",
        location: "أبوظبي، الإمارات",
        rating: "5.0",
        date: "2026-09-07",
        dateLabel: "٧ سبتمبر ٢٠٢٦",
        quote:
          "من الترحيب الأول إلى آخر تفصيلة، شعرت بأن العناية مصممة من أجلي. قدّرت الهدوء وعدم الاستعجال وغادرت بابتسامة. مكان مميز للاسترخاء.",
      },
      {
        id: "olivia",
        name: "أوليفيا ب.",
        initials: "أ ب",
        location: "دبي، الإمارات",
        rating: "5.0",
        date: "2026-09-04",
        dateLabel: "٤ سبتمبر ٢٠٢٦",
        quote:
          "تجربة جميلة خلال إقامتي في دبي. كان الفريق مرحباً ومهتماً، وجعلت كل تفصيلة الزيارة تبدو شخصية. لحظة هادئة ستبقى في ذاكرتي.",
      },
    ],
  },
};

export const getReviewsContent = (lang: Language) => content[lang];
