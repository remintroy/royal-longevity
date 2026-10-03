"use client";

import {
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Language } from "@/data/site";

gsap.registerPlugin(useGSAP);

type CarouselLabels = {
  previous: string;
  next: string;
  pause: string;
  play: string;
};
type CarouselControlsHandle = { pause: (value: boolean) => void };

// Keep control updates outside the server-rendered recommendation subtree.
function CarouselControls({
  track,
  pausedRef,
  lang,
  labels,
  id,
  ref,
}: {
  track: RefObject<HTMLUListElement | null>;
  pausedRef: RefObject<boolean>;
  lang: Language;
  labels: CarouselLabels;
  id: string;
  ref: Ref<CarouselControlsHandle>;
}) {
  const [edges, setEdges] = useState({ start: true, end: false });
  const [paused, setPaused] = useState(false);
  function pause(value: boolean) {
    pausedRef.current = value;
    setPaused(value);
  }
  useImperativeHandle(ref, () => ({ pause }));
  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const update = () => {
      const position = Math.abs(node.scrollLeft);
      const start = position < 2;
      const end = position >= node.scrollWidth - node.clientWidth - 2;
      setEdges((previous) =>
        previous.start === start && previous.end === end
          ? previous
          : { start, end },
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(node);
    node.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", update);
    };
  }, [track]);

  function move(forward: boolean) {
    pause(true);
    const node = track.current;
    if (!node) return;
    const card = node.firstElementChild;
    const distance =
      (card?.getBoundingClientRect().width ?? node.clientWidth) +
      parseFloat(getComputedStyle(node).columnGap || "0");
    node.scrollBy({
      left: distance * (forward ? 1 : -1) * (lang === "ar" ? -1 : 1),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <div className="mb-5 flex justify-end gap-2">
      <button
        type="button"
        onClick={() => pause(!paused)}
        aria-label={paused ? labels.play : labels.pause}
        aria-controls={id}
        className="flex min-h-12 items-center gap-2 rounded-full border border-border bg-white px-4 text-sm hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:hidden"
      >
        <Play size={16} aria-hidden="true" className={paused ? "" : "hidden"} />
        <Pause
          size={16}
          aria-hidden="true"
          className={paused ? "hidden" : ""}
        />
        {paused ? labels.play : labels.pause}
      </button>
      <button
        type="button"
        onClick={() => move(false)}
        disabled={edges.start}
        aria-label={labels.previous}
        aria-controls={id}
        className="grid size-12 place-items-center rounded-full border border-border bg-white hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-default disabled:opacity-35"
      >
        <ArrowLeft size={18} className="rtl:rotate-180" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => move(true)}
        disabled={edges.end}
        aria-label={labels.next}
        aria-controls={id}
        className="grid size-12 place-items-center rounded-full border border-border bg-white hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-default disabled:opacity-35"
      >
        <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
      </button>
    </div>
  );
}

export function ExploreCarousel({
  children,
  lang,
  labels,
}: {
  children: ReactNode;
  lang: Language;
  labels: CarouselLabels;
}) {
  const track = useRef<HTMLUListElement>(null);
  const id = useId();
  const pausedRef = useRef(false);
  const hovered = useRef(false);
  const controls = useRef<CarouselControlsHandle>(null);

  function pause(value: boolean) {
    pausedRef.current = value;
    controls.current?.pause(value);
  }

  useGSAP(
    () => {
      const node = track.current;
      if (!node) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        let visible = false;
        let distance = 0;
        let position = Math.abs(node.scrollLeft);
        const measure = () => {
          const first = node.firstElementChild;
          const copy = node.querySelector("[data-loop-copy]");
          if (first && copy)
            distance = Math.abs(
              copy.getBoundingClientRect().left -
                first.getBoundingClientRect().left,
            );
          position = Math.abs(node.scrollLeft);
        };
        const observer = new ResizeObserver(measure);
        observer.observe(node);
        const visibility = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        visibility.observe(node);
        measure();
        // Native scrolling preserves touch swiping and browser focus scrolling.
        // Keep fractional progress so slow motion is smooth at high refresh rates.
        const tick = (_time: number, delta: number) => {
          if (
            !visible ||
            document.hidden ||
            pausedRef.current ||
            hovered.current ||
            !distance
          ) {
            position = Math.abs(node.scrollLeft);
            return;
          }
          position = (position + Math.min(delta, 64) * 0.022) % distance;
          node.scrollLeft = position * (lang === "ar" ? -1 : 1);
        };
        gsap.ticker.add(tick);
        return () => {
          gsap.ticker.remove(tick);
          observer.disconnect();
          visibility.disconnect();
        };
      });
      return () => media.revert();
    },
    { scope: track, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <>
      <CarouselControls
        ref={controls}
        track={track}
        pausedRef={pausedRef}
        lang={lang}
        labels={labels}
        id={id}
      />
      <div className="relative start-1/2 w-[100cqw] -translate-x-1/2 rtl:translate-x-1/2">
        <ul
          ref={track}
          id={id}
          aria-labelledby="explore-more-title"
          onMouseEnter={() => {
            hovered.current = true;
          }}
          onMouseLeave={() => {
            hovered.current = false;
          }}
          onFocusCapture={(event) => {
            pause(true);
            const link = (
              event.target as HTMLElement
            ).closest<HTMLAnchorElement>("[data-loop-copy] a");
            if (link) {
              const original = Array.from(
                track.current?.querySelectorAll<HTMLAnchorElement>(
                  "li:not([data-loop-copy]) a",
                ) ?? [],
              ).find((item) => item.href === link.href);
              original?.focus();
            }
          }}
          onPointerDown={(event) => {
            pause(true);
            // Duplicate links remain clickable but never take keyboard focus.
            if (
              event.pointerType === "mouse" &&
              (event.target as HTMLElement).closest("[data-loop-copy]")
            )
              event.preventDefault();
          }}
          onWheel={() => pause(true)}
          className="flex gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [--edge-fade:20px] min-[700px]:[--edge-fade:48px] min-[1000px]:[--edge-fade:80px] [mask-image:linear-gradient(to_right,transparent,black_var(--edge-fade),black_calc(100%_-_var(--edge-fade)),transparent)] focus-within:[mask-image:none] px-5 pt-2 pb-6 min-[700px]:px-8 min-[900px]:gap-5"
        >
          {children}
        </ul>
      </div>
    </>
  );
}
