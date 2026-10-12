"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Language } from "@/data/site";

type LegalContentsProps = {
  lang: Language;
  title: string;
  sections: { id: string; title: string }[];
};

export function LegalContents({ lang, title, sections }: LegalContentsProps) {
  const [activeId, setActiveId] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeSection = sections.find((section) => section.id === activeId);
  const navigationRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const elements = sections.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [element] : [];
    });
    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const mobile = window.innerWidth < 1000;
      const readingLine = mobile
        ? (navigationRef.current?.offsetHeight ?? 120) + 32
        : 48;
      let current: string | undefined;

      for (const element of elements) {
        const bounds = element.getBoundingClientRect();
        if (bounds.top <= readingLine && bounds.bottom > readingLine) {
          current = element.id;
          break;
        }
        if (bounds.top > readingLine && bounds.top < window.innerHeight / 2) {
          current = element.id;
          break;
        }
      }
      setActiveId(current);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    elements.forEach((element) => observer.observe(element));

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
    };
  }, [sections]);

  useEffect(() => {
    const list = listRef.current;
    const activeLink = list?.querySelector<HTMLElement>(
      '[aria-current="location"]',
    );
    if (!list || !activeLink) return;

    // Scroll only the contents list, never the document being read.
    const bounds = list.getBoundingClientRect();
    const activeBounds = activeLink.getBoundingClientRect();
    if (window.innerWidth < 1000 && !isOpen) return;
    if (activeBounds.top < bounds.top || activeBounds.bottom > bounds.bottom) {
      list.scrollTo({
        top: list.scrollTop + activeBounds.top - bounds.top,
        behavior: "instant",
      });
    }
  }, [activeId, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function dismissOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [isOpen]);

  return (
    <nav
      ref={navigationRef}
      id="legal-contents"
      aria-labelledby="legal-contents-title"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setIsOpen(false);
      }}
      className="sticky top-4 z-10 min-w-0 scroll-mt-4 rounded-3xl border border-border bg-white min-[1000px]:p-6"
    >
      <h2
        id="legal-contents-title"
        className="hidden text-lg font-medium min-[1000px]:mb-4 min-[1000px]:block"
      >
        {title}
      </h2>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="legal-contents-list"
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-20 w-full items-center gap-4 rounded-3xl px-5 py-4 text-start transition-colors duration-200 hover:bg-ivory/30 min-[1000px]:hidden"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium text-espresso/65">
            {title}
          </span>
          {activeSection && (
            <span
              lang={lang}
              dir={lang === "ar" ? "rtl" : "ltr"}
              className="mt-1 block truncate text-sm font-medium text-espresso"
            >
              {activeSection.title}
            </span>
          )}
        </span>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border">
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-4 transition-transform duration-200 motion-reduce:transition-none",
              isOpen && "rotate-180",
            )}
          />
        </span>
      </button>
      <ol
        id="legal-contents-list"
        ref={listRef}
        lang={lang}
        dir={lang === "ar" ? "rtl" : "ltr"}
        data-lenis-prevent
        className={cn(
          "space-y-1 overflow-y-auto overscroll-contain p-2 max-[999px]:absolute max-[999px]:inset-x-0 max-[999px]:top-[calc(100%+8px)] max-[999px]:max-h-[min(60dvh,24rem)] max-[999px]:rounded-3xl max-[999px]:border max-[999px]:border-border max-[999px]:bg-white max-[999px]:shadow-lg max-[999px]:shadow-espresso/10 min-[1000px]:max-h-[calc(100dvh-10rem)] min-[1000px]:p-1",
          !isOpen && "max-[999px]:hidden",
        )}
      >
        {sections.map((section) => (
          <li key={section.id} className="shrink-0">
            <a
              href={`#${section.id}`}
              onClick={() => {
                setIsOpen(false);
                if (window.innerWidth < 1000)
                  triggerRef.current?.focus({ preventScroll: true });
              }}
              aria-current={activeId === section.id ? "location" : undefined}
              className={cn(
                "flex min-h-11 items-center rounded-lg px-3 py-2 text-sm leading-6 underline-offset-4 transition-colors duration-200 hover:underline max-[999px]:rounded-2xl",
                activeId === section.id
                  ? "bg-espresso text-white underline"
                  : "hover:bg-ivory",
              )}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
