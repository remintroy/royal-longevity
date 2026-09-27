import type { CategoryId } from "@/data/catalogue";
import { directoryArt, getCollectionArt } from "@/data/catalogue/catalogue-art";
import { ServiceArtMotion } from "./service-art-motion";

export function CatalogueArt({ category }: { category?: CategoryId }) {
  const art = category ? getCollectionArt(category) : directoryArt;
  const directory = !category;

  return (
    <ServiceArtMotion
      key={category ?? "directory"}
      animation={art.animation}
      className={
        directory
          ? "h-full opacity-[0.18] min-[700px]:h-full min-[700px]:opacity-[0.28] min-[900px]:top-0 min-[900px]:bottom-auto"
          : "top-auto bottom-0 h-52 opacity-[0.1] min-[700px]:h-full min-[700px]:opacity-[0.14]"
      }
    >
      <svg
        data-catalogue-art={category ?? "directory"}
        viewBox={directory ? "0 0 1000 600" : "0 0 760 300"}
        fill="none"
        stroke="currentColor"
        strokeWidth={directory ? "1" : "0.8"}
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        className={
          directory
            ? "absolute -end-48 top-0 h-full w-[700px] min-[900px]:-end-24 min-[900px]:w-[1000px]"
            : "absolute -end-56 bottom-0 h-full w-[620px] min-[900px]:end-8 min-[900px]:w-[760px]"
        }
      >
        {art.paths.map((path) => (
          <path key={path} data-service-art-line d={path} />
        ))}
      </svg>
    </ServiceArtMotion>
  );
}
