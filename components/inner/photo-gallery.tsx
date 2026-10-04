"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import type { GalleryPhoto } from "@/data/inner/gallery-photos";
import type { Language } from "@/data/site";
import { photoGalleryUi as copy } from "@/data/inner/photo-gallery";
import { cn } from "@/lib/utils";

function ViewerPhoto({
  photo,
  lang,
  previewSrc,
}: {
  photo: GalleryPhoto;
  lang: Language;
  previewSrc?: string;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div
      className="relative"
      style={{
        aspectRatio: photo.width / photo.height,
        width: `min(100cqw, ${(photo.width / photo.height) * 100}cqh)`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${previewSrc ?? photo.blurDataURL}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      />
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="100vw"
        loading="eager"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={cn(
          "absolute inset-0 h-full w-full object-contain transition-opacity duration-200 motion-reduce:transition-none",
          status === "loaded" ? "opacity-100" : "opacity-0",
        )}
      />
      {status !== "loaded" && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <p
            role="status"
            className="flex items-center gap-3 rounded-full bg-ink/85 px-5 py-3 text-sm text-ivory"
          >
            {status === "loading" && (
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-ivory/30 border-t-ivory motion-reduce:animate-none"
              />
            )}
            {status === "loading" ? copy.loading[lang] : copy.loadError[lang]}
          </p>
        </div>
      )}
    </div>
  );
}

export function PhotoGallery({
  images,
  lang,
}: {
  images: GalleryPhoto[];
  lang: Language;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const openedFrom = useRef<HTMLButtonElement | null>(null);
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
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
      aria-labelledby="photo-gallery-title"
    >
      <header className="mb-5 flex items-baseline justify-between gap-4 border-b border-border pb-4">
        <h2 id="photo-gallery-title" className="text-xl min-[700px]:text-2xl">
          {copy.title[lang]}
        </h2>
        <p className="text-sm text-espresso/65">
          {numbers.format(images.length)} {copy.photos[lang]}
        </p>
      </header>
      <div className="flex flex-wrap items-start gap-2 after:grow-[10] after:content-[''] min-[700px]:gap-3">
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
            style={{
              aspectRatio: item.width / item.height,
              flexGrow: item.width / item.height,
              flexBasis: `calc(${item.width / item.height} * clamp(100px, 18vw, 230px))`,
            }}
            className="group relative isolate min-w-0 overflow-hidden rounded-[5px] bg-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              placeholder="blur"
              blurDataURL={item.blurDataURL}
              sizes="(min-width: 1440px) 600px, (min-width: 700px) 45vw, 100vw"
              onLoad={(event) => {
                const src = event.currentTarget.currentSrc;
                setThumbnails((loaded) => ({ ...loaded, [item.id]: src }));
              }}
              className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <span className="absolute inset-x-3 bottom-3 rounded-full bg-espresso/85 px-3 py-2 text-start text-xs text-ivory opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
              {item.title}
            </span>
          </button>
        ))}
      </div>
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
                    className="relative grid min-h-0 flex-1 touch-pan-y place-items-center [container-type:size]"
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
                    <ViewerPhoto
                      key={current.id}
                      photo={current}
                      lang={lang}
                      previewSrc={thumbnails[current.id]}
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
