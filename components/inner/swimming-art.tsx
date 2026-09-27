import type { ServiceArtAnimation } from "@/data/catalogue/service-art-motion";
import { ServiceArtMotion } from "./service-art-motion";

// Fine lane-like contours suggest a swimmer's wake without literal pool graphics.
const wakeLines = [
  "M-60 155 C100 85 180 225 350 150 S570 75 760 130",
  "M-60 176 C100 106 180 246 350 171 S570 96 760 151",
  "M-60 197 C100 127 180 267 350 192 S570 117 760 172",
  "M-60 218 C100 148 180 288 350 213 S570 138 760 193",
  "M-60 239 C100 169 180 309 350 234 S570 159 760 214",
  "M-60 260 C100 190 180 330 350 255 S570 180 760 235",
];

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
        {wakeLines.map((line) => (
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
