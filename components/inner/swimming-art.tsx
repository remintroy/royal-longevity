import type { ServiceArtAnimation } from "@/data/catalogue/service-art-motion";
import { ServiceArtMotion } from "./service-art-motion";

import { swimmingWakeLines } from "@/data/catalogue/service-art";

export function SwimmingArt({ animation }: { animation: ServiceArtAnimation }) {
  return (
    <ServiceArtMotion animation={animation}>
      <svg
        data-service-art="water"
        viewBox="0 0 760 300"
        fill="none"
        focusable="false"
        className="absolute -bottom-10 -start-16 h-full w-[640px] min-[700px]:-bottom-12 min-[700px]:start-0 min-[700px]:w-[900px]"
      >
        {swimmingWakeLines.map((line) => (
          <path
            key={line}
            data-service-art-line
            d={line}
            stroke="currentColor"
            strokeWidth="0.8"
          />
        ))}
        <g
          data-service-art-line
          stroke="currentColor"
          strokeWidth="0.7"
          transform="rotate(-12 485 198)"
        >
          <ellipse cx="485" cy="198" rx="44" ry="10" />
          <ellipse cx="485" cy="198" rx="65" ry="17" opacity="0.7" />
          <ellipse cx="485" cy="198" rx="86" ry="25" opacity="0.45" />
        </g>
      </svg>
    </ServiceArtMotion>
  );
}
