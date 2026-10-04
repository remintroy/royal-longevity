/** Inner-page composition. Keep routing choices out of presentation components. */
export type PageSection =
  | "story"
  | "about"
  | "categories"
  | "beauty-categories"
  | "wellness-categories"
  | "salon-services"
  | "gallery"
  | "packages"
  | "contact"
  | "appointments"
  | "memberships"
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
    sections: ["memberships"],
  },
  appointments: {
    hero: "intro",
    sections: ["appointment-journey", "appointments"],
  },
  "our-space": { hero: "intro", sections: ["gallery"] },
  gallery: { hero: "intro", sections: ["gallery"] },
  about: { hero: "intro", sections: ["about"] },
  packages: { hero: "intro", sections: ["packages"] },
  contact: { hero: "intro", sections: ["contact"] },
  faq: { hero: "intro", sections: ["all-questions"] },
  // Preserve legacy destinations for existing bookmarks and inbound links.
  beauty: { hero: "editorial", sections: ["beauty-categories"] },
  wellness: {
    hero: "editorial",
    sections: ["wellness-categories"],
  },
  salon: { hero: "editorial", sections: ["salon-services", "gallery"] },
  terms: { hero: "intro", sections: [] },
  privacy: { hero: "intro", sections: [] },
  careers: { hero: "intro", sections: [] },
  blog: { hero: "intro", sections: [] },
};
