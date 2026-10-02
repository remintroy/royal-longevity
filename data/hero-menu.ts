import { getMenuContent } from "./catalogue/navigation";

export const getHeroMenuContent = getMenuContent;
export type HeroMenuContent = ReturnType<typeof getMenuContent>;
