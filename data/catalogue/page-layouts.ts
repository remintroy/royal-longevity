/** Inner-page composition. Keep routing choices out of presentation components. */
export type PageSection =
  | "story"
  | "categories"
  | "beauty-categories"
  | "wellness-categories"
  | "salon-services"
  | "gallery"
  | "packages"
  | "contact"
  | "appointments"
  | "memberships"
  | "membership-journey"
  | "appointment-journey"
  | "pool-access"
  | "questions"
  | "all-questions";
export type PageLayout = {
  hero: "editorial" | "intro";
  sections: PageSection[];
};
export const pageLayouts: Record<string, PageLayout> = {
  services: { hero: "intro", sections: ["categories", "pool-access"] },
  memberships: {
    hero: "intro",
    sections: ["membership-journey", "memberships", "questions"],
  },
  appointments: {
    hero: "intro",
    sections: ["appointment-journey", "appointments", "questions"],
  },
  "our-space": { hero: "intro", sections: ["categories", "gallery"] },
  gallery: { hero: "intro", sections: ["gallery"] },
  about: { hero: "editorial", sections: ["story", "questions"] },
  packages: { hero: "intro", sections: ["packages", "questions"] },
  contact: { hero: "intro", sections: ["contact", "appointments"] },
  faq: { hero: "intro", sections: ["all-questions"] },
  // Preserve existing destinations, including those linked from the untouched homepage.
  beauty: { hero: "editorial", sections: ["beauty-categories", "questions"] },
  wellness: {
    hero: "editorial",
    sections: ["wellness-categories", "questions"],
  },
  salon: { hero: "editorial", sections: ["salon-services", "gallery"] },
  terms: { hero: "intro", sections: [] },
  privacy: { hero: "intro", sections: [] },
  careers: { hero: "intro", sections: [] },
  blog: { hero: "intro", sections: [] },
};
