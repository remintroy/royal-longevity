import Image from "next/image";
import type { CategoryId } from "@/data/catalogue";
import { cn } from "@/lib/utils";
import {
  interludeContours,
  getCollectionArt,
} from "@/data/catalogue/catalogue-art";
import { OpeningArt } from "./opening-art";
import { ServiceArtMotion } from "./service-art-motion";

/** Quiet chapter breaks connect the treatment, experience and brand signature. */
export function ServiceArtInterlude({
  category,
  signature = false,
  passage,
}: {
  category: CategoryId;
  signature?: boolean;
  passage?: "opening" | "closing";
}) {
  if (passage === "opening") return <OpeningArt />;

  const art = getCollectionArt(category);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative isolate mx-auto -my-6 h-24 w-full max-w-xl overflow-hidden select-none min-[700px]:-my-4 min-[700px]:h-32",
        passage === "closing" && "min-[700px]:ms-auto min-[700px]:me-8",
      )}
    >
      <ServiceArtMotion
        animation={art.animation}
        revealOnScroll
        className="inset-0 h-full opacity-100 min-[700px]:h-full min-[700px]:opacity-100 min-[900px]:top-0 rtl:scale-x-100"
      >
        <div
          data-service-art-line
          className="absolute inset-0 flex items-center justify-center gap-5 px-6 min-[700px]:gap-8"
        >
          {!passage && <span className="h-px max-w-24 flex-1 bg-gold/20" />}
          {passage && (
            <svg
              viewBox="0 0 600 210"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              focusable="false"
              className="h-full w-full text-gold/35 rtl:-scale-x-100"
            >
              {interludeContours[passage].map((path) => (
                <path key={path} d={path} vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
          )}
          {!passage && signature && (
            <Image
              src="/branding/icon-gold.png"
              alt=""
              width={500}
              height={500}
              sizes="(min-width: 700px) 40px, 32px"
              className="h-8 w-8 shrink-0 opacity-45 min-[700px]:h-10 min-[700px]:w-10"
            />
          )}
          {!passage && !signature && (
            <svg
              viewBox="0 0 760 300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
              className="h-20 w-40 shrink-0 text-gold/55 min-[700px]:h-28 min-[700px]:w-60 rtl:-scale-x-100"
            >
              {art.paths.map((path) => (
                <path key={path} d={path} vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
          )}
          {!passage && <span className="h-px max-w-24 flex-1 bg-gold/20" />}
        </div>
      </ServiceArtMotion>
    </div>
  );
}
