import { getServiceArtAnimation } from "@/data/catalogue/service-art-motion";
import type { Service } from "@/data/catalogue";
import { getServiceArt } from "@/data/catalogue/service-art";
import { ServiceArtMotion } from "./service-art-motion";
import { SwimmingArt } from "./swimming-art";

export function ServiceArt({ service }: { service: Service }) {
  const animation = getServiceArtAnimation(service.slug);

  if (service.category === "swimming-pool") {
    return <SwimmingArt key={service.slug} animation={animation} />;
  }

  const art = getServiceArt(service.category, service.slug);

  return (
    <ServiceArtMotion key={service.slug} animation={animation}>
      <svg
        data-service-art={art.motif}
        viewBox="0 0 760 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        className="absolute -bottom-10 -start-16 h-full w-[640px] min-[700px]:-bottom-12 min-[700px]:start-0 min-[700px]:w-[900px]"
      >
        {art.paths.map((path) => (
          <path key={path} data-service-art-line d={path} />
        ))}
      </svg>
    </ServiceArtMotion>
  );
}
