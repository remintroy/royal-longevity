"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import type { GalleryImage } from "@/data/gallery";
import type { Language } from "@/data/site";
import { spaceGalleryUi as copy } from "@/data/inner/space-gallery";
import { ui } from "@/data/inner/ui";

export function SpaceGallery({
  images,
  lang,
}: {
  images: GalleryImage[];
  lang: Language;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const openedFrom = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const current = selected === null ? null : images[selected];
  const numbers = new Intl.NumberFormat(lang === "ar" ? "ar-AE" : "en-GB");

  function close() {
    setSelected(null);
    openedFrom.current?.focus({ preventScroll: true });
  }
  function move(delta: number) {
    setSelected((index) =>
      index === null ? null : (index + delta + images.length) % images.length,
    );
  }

  return (
    <section
      className="my-10 min-[900px]:my-16"
      aria-labelledby="space-gallery-title"
    >
      <header className="mb-5 flex items-baseline justify-between gap-4 border-b border-border pb-4">
        <h2 id="space-gallery-title" className="text-xl min-[700px]:text-2xl">
          {copy.title[lang]}
        </h2>
        <p className="text-sm text-espresso/65">
          {numbers.format(images.length)} {copy.photos[lang]}
        </p>
      </header>
      <div className="grid grid-cols-2 gap-2 min-[700px]:grid-cols-12 min-[700px]:gap-3">
        {images.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`${copy.open[lang]}: ${item.title}`}
            aria-haspopup="dialog"
            onClick={(event) => {
              openedFrom.current = event.currentTarget;
              setSelected(index);
            }}
            className={`group relative isolate aspect-[4/3] overflow-hidden rounded-[20px] bg-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold min-[700px]:aspect-auto min-[700px]:h-[clamp(220px,23vw,340px)] ${index === 0 || index === 5 ? "col-span-2 min-[700px]:col-span-5" : index === 1 || index === 3 ? "min-[700px]:col-span-3" : "min-[700px]:col-span-4"}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={
                index === 0 || index === 5
                  ? "(min-width: 1440px) 565px, (min-width: 700px) 40vw, 90vw"
                  : "(min-width: 1440px) 450px, (min-width: 700px) 33vw, 45vw"
              }
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <span className="absolute inset-x-3 bottom-3 rounded-full bg-espresso/85 px-3 py-2 text-start text-xs text-ivory opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
              {item.title}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-espresso/65">
        {ui.imageNote[lang]}
      </p>
      <ModalOverlay
        isOpen={current !== null}
        onOpenChange={(open) => {
          if (!open) close();
        }}
        isDismissable
        className="fixed inset-0 z-[80] bg-ink text-ivory"
      >
        <Modal className="h-[100dvh] w-full" data-lenis-prevent>
          <Dialog aria-label={copy.title[lang]} className="h-full outline-none">
            <div
              className="flex h-full flex-col"
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  move(
                    (event.key === "ArrowRight" ? 1 : -1) *
                      (lang === "ar" ? -1 : 1),
                  );
                }
              }}
            >
              {current && (
                <>
                  <header className="flex shrink-0 items-center justify-between gap-4 px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))] min-[700px]:px-8">
                    <p
                      className="text-sm tabular-nums"
                      aria-live="polite"
                      dir="ltr"
                    >
                      {numbers.format((selected ?? 0) + 1)} /{" "}
                      {numbers.format(images.length)}
                    </p>
                    <button
                      autoFocus
                      type="button"
                      onClick={close}
                      aria-label={copy.close[lang]}
                      className="grid size-12 place-items-center rounded-full border border-ivory/30 hover:bg-ivory/10 focus-visible:outline-2 focus-visible:outline-ivory"
                    >
                      <X aria-hidden="true" size={22} />
                    </button>
                  </header>
                  <div
                    className="relative min-h-0 flex-1 touch-pan-y"
                    onTouchStart={(event) => {
                      const touch = event.touches[0];
                      touchStart.current =
                        event.touches.length === 1
                          ? { x: touch.clientX, y: touch.clientY }
                          : null;
                    }}
                    onTouchCancel={() => {
                      touchStart.current = null;
                    }}
                    onTouchEnd={(event) => {
                      const start = touchStart.current;
                      touchStart.current = null;
                      if (!start) return;
                      const touch = event.changedTouches[0];
                      const dx = touch.clientX - start.x;
                      if (
                        Math.abs(dx) > 60 &&
                        Math.abs(dx) > Math.abs(touch.clientY - start.y)
                      )
                        move((dx < 0 ? 1 : -1) * (lang === "ar" ? -1 : 1));
                    }}
                  >
                    <Image
                      key={current.id}
                      src={current.src}
                      alt={current.alt}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>
                  <footer className="flex shrink-0 items-center justify-between gap-4 px-4 pt-4 pb-[max(20px,env(safe-area-inset-bottom))] min-[700px]:px-8">
                    <button
                      type="button"
                      onClick={() => move(-1)}
                      aria-label={copy.previous[lang]}
                      disabled={images.length < 2}
                      className="grid size-12 shrink-0 place-items-center rounded-full border border-ivory/30 hover:bg-ivory/10 focus-visible:outline-2 focus-visible:outline-ivory disabled:opacity-40"
                    >
                      <ArrowLeft
                        size={22}
                        className="rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </button>
                    <Heading
                      slot="title"
                      className="text-center text-sm min-[700px]:text-lg"
                      aria-live="polite"
                    >
                      {current.title}
                    </Heading>
                    <button
                      type="button"
                      onClick={() => move(1)}
                      aria-label={copy.next[lang]}
                      disabled={images.length < 2}
                      className="grid size-12 shrink-0 place-items-center rounded-full border border-ivory/30 hover:bg-ivory/10 focus-visible:outline-2 focus-visible:outline-ivory disabled:opacity-40"
                    >
                      <ArrowRight
                        size={22}
                        className="rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </button>
                  </footer>
                </>
              )}
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </section>
  );
}
