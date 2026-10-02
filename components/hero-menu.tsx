"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/ui/icon-button";
import { BookingCta } from "@/components/ui/booking-cta";
import type { HeroMenuContent } from "@/data/hero-menu";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

export function HeroMenu({
  content,
  bookingHref,
  bookingLabel,
}: {
  content: HeroMenuContent;
  bookingHref: string;
  bookingLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      gsap.to(panelRef.current, {
        autoAlpha: open ? 1 : 0,
        duration: reducedMotion ? 0 : open ? 0.3 : 0.2,
        ease: "power2.out",
        overwrite: true,
      });
      if (!open) gsap.set("[data-menu-arrow]", { opacity: 0, x: 0 });
    },
    { scope: containerRef, dependencies: [open] },
  );

  const revealArrow = contextSafe(
    (link: HTMLAnchorElement, visible: boolean) => {
      const arrow = link.querySelector("[data-menu-arrow]");
      if (!arrow) return;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const direction = document.documentElement.dir === "rtl" ? -1 : 1;
      gsap.to(arrow, {
        opacity: visible ? 1 : 0,
        x: visible && !reducedMotion ? direction * 3 : 0,
        duration: reducedMotion ? 0 : 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    },
  );

  const arrowEvents = {
    onMouseEnter: (event: React.MouseEvent<HTMLAnchorElement>) =>
      revealArrow(event.currentTarget, true),
    onMouseLeave: (event: React.MouseEvent<HTMLAnchorElement>) =>
      revealArrow(
        event.currentTarget,
        event.currentTarget === document.activeElement,
      ),
    onFocus: (event: React.FocusEvent<HTMLAnchorElement>) =>
      revealArrow(event.currentTarget, true),
    onBlur: (event: React.FocusEvent<HTMLAnchorElement>) =>
      revealArrow(event.currentTarget, event.currentTarget.matches(":hover")),
  };

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !panelRef.current?.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      )
        setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <IconButton
        ref={triggerRef}
        type="button"
        aria-label={open ? content.closeLabel : content.openLabel}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <span className="relative block size-5" aria-hidden="true">
          <span
            className={cn(
              "absolute start-0 top-1 block h-px w-5 bg-current transition-transform duration-300 motion-reduce:transition-none",
              open && "translate-y-1.5 rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute start-0 top-2.5 block h-px w-5 bg-current transition-opacity duration-200",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute start-0 top-4 block h-px w-5 bg-current transition-transform duration-300 motion-reduce:transition-none",
              open && "-translate-y-1.5 -rotate-45",
            )}
          />
        </span>
      </IconButton>
      <div
        ref={panelRef}
        id={panelId}
        data-lenis-prevent
        inert={!open}
        aria-hidden={!open}
        className="invisible absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-[calc(100svh-100px)] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-white p-3 text-espresso opacity-0 shadow-[0_16px_48px_rgb(45_29_18/0.08)] min-[700px]:p-4"
      >
        <nav aria-label={content.label} onClick={() => setOpen(false)}>
          <ul className="grid grid-cols-2 min-[700px]:grid-cols-3">
            {content.links.map((item) => (
              <li
                key={item.href}
                className="border-espresso/15 max-[699px]:[&:nth-child(2n)]:border-s max-[699px]:[&:nth-child(n+3)]:border-t min-[700px]:[&:not(:nth-child(3n+1))]:border-s min-[700px]:[&:nth-child(n+4)]:border-t"
              >
                <Link
                  href={item.href}
                  {...arrowEvents}
                  className="flex h-full min-h-[60px] items-center justify-between gap-2 px-3 py-2 transition-colors duration-200 hover:text-espresso/70 focus-visible:outline-2 focus-visible:outline-gold min-[700px]:px-4"
                >
                  <span>
                    <span className="block text-base">{item.label}</span>
                    {item.description && (
                      <span className="mt-1 block text-xs leading-relaxed text-espresso/70">
                        {item.description}
                      </span>
                    )}
                  </span>
                  <ChevronRight
                    size={16}
                    data-menu-arrow
                    strokeWidth={1}
                    className="shrink-0 opacity-0 rtl:rotate-180"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-between gap-x-4 px-3 py-2 text-sm min-[700px]:px-4">
            {content.secondaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                {...arrowEvents}
                className="inline-flex min-h-11 items-center gap-2 rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-gold"
              >
                {item.label}
                <ChevronRight
                  size={14}
                  data-menu-arrow
                  strokeWidth={1}
                  className="opacity-0 rtl:rotate-180"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </nav>
        <div className="relative isolate flex min-h-32 items-center justify-center overflow-hidden rounded-[20px] p-4">
          <Image
            src="/assets/images/booking-banner-desktop.webp"
            alt=""
            fill
            sizes="(min-width: 1434px) 1336px, calc(100vw - 64px)"
            className="-z-20 object-cover"
          />
          <div
            className="absolute inset-0 -z-10 bg-ink/55"
            aria-hidden="true"
          />
          <BookingCta
            enquiry
            href={bookingHref}
            label={bookingLabel}
            target={bookingHref.startsWith("/") ? undefined : "_blank"}
            rel={bookingHref.startsWith("/") ? undefined : "noreferrer"}
            className="bg-ivory text-espresso hover:bg-white"
          />
        </div>
      </div>
    </div>
  );
}
