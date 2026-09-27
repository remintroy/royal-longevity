import type { CategoryId } from "./types";
import { getServiceArt, swimmingWakeLines } from "./service-art";
import { defaultServiceArtAnimation } from "./service-art-motion";

// Open, nested contours frame the directory without imitating the brand mark.
export const directoryArt = {
  paths: [
    "M850 -80 C280 -20 210 170 460 310 S860 470 630 680",
    "M885 -80 C315 -20 245 170 495 310 S895 470 665 680",
    "M920 -80 C350 -20 280 170 530 310 S930 470 700 680",
    "M955 -80 C385 -20 315 170 565 310 S965 470 735 680",
    "M990 -80 C420 -20 350 170 600 310 S1000 470 770 680",
    "M1025 -80 C455 -20 385 170 635 310 S1035 470 805 680",
  ],
  animation: { ...defaultServiceArtAnimation, offsetY: 4 },
};

export function getCollectionArt(category: CategoryId) {
  const paths =
    category === "swimming-pool"
      ? swimmingWakeLines
      : getServiceArt(category, "").paths;
  return { paths, animation: defaultServiceArtAnimation };
}
