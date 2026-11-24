import { categories } from "./catalogue";
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
// The marquee lists the service categories (filled in by getExperienceContent).
const content: Record<Language, ExperienceContent> = {
  en: {
    title: "The Royal Longevity experience",
    team: "Your personal care team",
    message: "A little time for yourself, a lasting feeling of care. We bring together thoughtful beauty rituals and moments of calm, so every visit feels entirely your own.",
    contactLabel: "Chat with our team on WhatsApp",
    pauseLabel: "Pause movement",
    playLabel: "Resume movement",
    highlights: [],
  },
  ar: {
    title: "تجربة رويال لونجيفيتي",
    team: "فريق العناية الخاص بك",
    message: "قليل من الوقت لنفسك، وإحساس بالعناية يدوم. نجمع بين طقوس الجمال المتقنة ولحظات الهدوء، لتكون كل زيارة تجربة تشبهك وحدك.",
    contactLabel: "تواصلي مع فريقنا عبر واتساب",
    pauseLabel: "إيقاف الحركة",
    playLabel: "استئناف الحركة",
    highlights: [],
  },
};

export const getExperienceContent = (lang: Language): ExperienceContent => ({
  ...content[lang],
  highlights: categories.map((category) => category.title[lang]),
});
