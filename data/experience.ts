import type { Language } from "./site";

export type ExperienceContent = {
  title: string;
  team: string;
  message: string;
  contactLabel: string;
  pauseLabel: string;
  playLabel: string;
  highlights: string[];
};

// Demo brand copy, pending business approval.
const content: Record<Language, ExperienceContent> = {
  en: {
    title: "The Royal Longevity experience",
    team: "Your personal care team",
    message: "A little time for yourself, a lasting feeling of care. We bring together thoughtful beauty rituals and moments of calm, so every visit feels entirely your own.",
    contactLabel: "Chat with our team on WhatsApp",
    pauseLabel: "Pause movement",
    playLabel: "Resume movement",
    highlights: ["Thoughtful skin care", "Restorative rituals", "Personal attention", "Beauty in every detail", "Considered treatments", "Your signature style", "Room to unwind"],
  },
  ar: {
    title: "تجربة رويال لونجيفيتي",
    team: "فريق العناية الخاص بك",
    message: "قليل من الوقت لنفسك، وإحساس بالعناية يدوم. نجمع بين طقوس الجمال المتقنة ولحظات الهدوء، لتكون كل زيارة تجربة تشبهك وحدك.",
    contactLabel: "تواصلي مع فريقنا عبر واتساب",
    pauseLabel: "إيقاف الحركة",
    playLabel: "استئناف الحركة",
    highlights: ["عناية متقنة بالبشرة", "طقوس تجدد نشاطك", "اهتمام شخصي", "جمال في كل التفاصيل", "علاجات مختارة بعناية", "أسلوبك الخاص", "مساحة للاسترخاء"],
  },
};

export const getExperienceContent = (lang: Language) => content[lang];
