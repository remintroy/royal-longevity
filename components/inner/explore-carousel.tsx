"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Language } from "@/data/site";

export function ExploreCarousel({
  children,
  lang,
  labels,
}: {
  children: ReactNode;
  lang: Language;
  labels: { previous: string; next: string };
}) {
  const track = useRef<HTMLUListElement>(null);
  const id = useId();
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const update = () => {
      const position = Math.abs(node.scrollLeft);
      setEdges({
        start: position < 2,
        end: position >= node.scrollWidth - node.clientWidth - 2,
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(node);
    node.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", update);
    };
  }, []);

  function move(forward: boolean) {
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
    <>
      <div className="mb-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => move(false)}
          disabled={edges.start}
          aria-label={labels.previous}
          aria-controls={id}
          className="grid size-12 place-items-center rounded-full border border-border bg-white hover:bg-ivory disabled:cursor-default disabled:opacity-35"
        >
          <ArrowLeft size={18} className="rtl:rotate-180" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => move(true)}
          disabled={edges.end}
          aria-label={labels.next}
          aria-controls={id}
          className="grid size-12 place-items-center rounded-full border border-border bg-white hover:bg-ivory disabled:cursor-default disabled:opacity-35"
        >
          <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
        </button>
      </div>
      <ul
        ref={track}
        id={id}
        aria-labelledby="explore-more-title"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2 pt-2 pb-6 min-[900px]:gap-5"
      >
        {children}
      </ul>
    </>
  );
}
