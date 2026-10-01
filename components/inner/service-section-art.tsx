import Image from "next/image";
import type { CategoryId } from "@/data/catalogue";
import { getCollectionArt } from "@/data/catalogue/catalogue-art";
import { cn } from "@/lib/utils";
import { ServiceArtMotion } from "./service-art-motion";

/** Edge compositions leave the reading area and photographs visually quiet. */
export function ServiceSectionArt({
  category,
  variant,
}: {
  category: CategoryId;
  variant: "gallery" | "collection";
}) {
  const art = getCollectionArt(category);
  const gallery = variant === "gallery";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-20 start-0 -z-10 ms-[calc((100%-100cqw)/2)] w-[100cqw] overflow-hidden select-none"
    >
      <ServiceArtMotion
        animation={art.animation}
        revealOnScroll
        className="inset-0 h-full opacity-100 min-[700px]:h-full min-[700px]:opacity-100 min-[900px]:top-0 rtl:scale-x-100"
      >
        <div
          data-service-art-line
          className={cn(
            "absolute top-2 w-28 opacity-[0.09] min-[700px]:top-0 min-[700px]:w-48 min-[1100px]:w-60",
            gallery ? "end-3 min-[700px]:end-8" : "end-4 min-[700px]:end-12",
          )}
        >
          <Image
            src="/branding/icon-gold.png"
            alt=""
            width={500}
            height={500}
            sizes="(min-width: 1100px) 240px, (min-width: 700px) 192px, 112px"
            className="h-auto w-full"
          />
        </div>
        <svg
          viewBox="0 0 760 300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
          className={cn(
            "absolute h-44 w-[440px] opacity-[0.2] min-[700px]:h-64 min-[700px]:w-[700px] rtl:-scale-x-100",
            gallery
              ? "-start-28 -bottom-12 min-[700px]:-start-20 min-[700px]:-bottom-16"
              : "-start-32 -top-10 min-[700px]:-start-24 min-[700px]:-top-14",
          )}
        >
          {art.paths.map((path) => (
            <path key={path} data-service-art-line d={path} />
          ))}
        </svg>
      </ServiceArtMotion>
    </div>
  );
}
