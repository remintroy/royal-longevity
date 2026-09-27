/** Timing is in seconds; offsets are in pixels. Keep entry motion brief and subtle. */
export type ServiceArtAnimation = {
  fromOpacity: number;
  offsetY: number;
  duration: number;
  staggerAmount: number;
  ease: "power2.out" | "power3.out" | "sine.out";
};

export const defaultServiceArtAnimation: ServiceArtAnimation = {
  fromOpacity: 0,
  offsetY: 6,
  duration: 0.65,
  staggerAmount: 0.18,
  ease: "power3.out",
};

// Add a service slug with only the values that differ from the shared defaults.
// Example: "lap-swimming": { offsetY: 4, duration: 0.7 }
export const serviceArtAnimationOverrides: Partial<
  Record<string, Partial<ServiceArtAnimation>>
> = {};

export function getServiceArtAnimation(slug: string): ServiceArtAnimation {
  return {
    ...defaultServiceArtAnimation,
    ...serviceArtAnimationOverrides[slug],
  };
}
