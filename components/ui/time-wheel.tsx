"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type TimeWheelProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  labelledBy: string;
  describedBy: string;
  formatValue: (value: string) => string;
};

const rowHeight = 48;

export function TimeWheel({
  options,
  value,
  onChange,
  labelledBy,
  describedBy,
  formatValue,
}: TimeWheelProps) {
  const id = useId();
  const wheel = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const values = ["", ...options];
  const selectedIndex = Math.max(0, values.indexOf(value));
  const initialIndex = useRef(selectedIndex);

  useGSAP(
    (context) => {
      const element = wheel.current;
      const strip = track.current;
      if (!element || !strip) return;
      const entries = ["", ...options];
      const maximum = (entries.length - 1) * rowHeight;
      const clamp = gsap.utils.clamp(0, maximum);
      const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
      const motion = { position: initialIndex.current * rowHeight };
      const translate = gsap.quickSetter(strip, "y", "px");
      let currentIndex = initialIndex.current;
      let target = motion.position;
      let tween: gsap.core.Tween | undefined;
      let settleTimer: ReturnType<typeof setTimeout> | undefined;
      let pointer:
        | {
            id: number;
            startY: number;
            lastY: number;
            lastTime: number;
            velocity: number;
            moved: boolean;
          }
        | undefined;
      let suppressClick = false;
      let interacted = false;
      let lastPulse = 0;

      function draw() {
        translate(-motion.position);
        const index = Math.round(clamp(motion.position) / rowHeight);
        if (index === currentIndex) return;
        currentIndex = index;
        onChange(entries[index]);
        // Optional, short tactile ticks: no pulses on mount or in reduced-motion mode.
        const now = performance.now();
        if (
          interacted &&
          !preference.matches &&
          now - lastPulse >= 60 &&
          typeof navigator.vibrate === "function"
        ) {
          lastPulse = now;
          try {
            navigator.vibrate(5);
          } catch {
            /* Unsupported or blocked haptics stay silent. */
          }
        }
      }

      function stop() {
        tween?.kill();
        clearTimeout(settleTimer);
      }

      function animate(destination: number, duration = 0.28) {
        stop();
        target = clamp(destination);
        if (preference.matches) {
          motion.position = target;
          draw();
          return;
        }
        context.add(() => {
          tween = gsap.to(motion, {
            position: target,
            duration,
            ease: "power3.out",
            onUpdate: draw,
          });
        });
      }

      function snap(position = motion.position, duration = 0.28) {
        animate(Math.round(clamp(position) / rowHeight) * rowHeight, duration);
      }

      function pointerDown(event: PointerEvent) {
        if (!event.isPrimary || event.button !== 0) return;
        stop();
        interacted = true;
        suppressClick = false;
        target = motion.position;
        pointer = {
          id: event.pointerId,
          startY: event.clientY,
          lastY: event.clientY,
          lastTime: event.timeStamp,
          velocity: 0,
          moved: false,
        };
        element!.focus({ preventScroll: true });
      }

      function pointerMove(event: PointerEvent) {
        if (!pointer || event.pointerId !== pointer.id) return;
        if (!pointer.moved && Math.abs(event.clientY - pointer.startY) < 4)
          return;
        if (!pointer.moved) {
          pointer.moved = true;
          element!.setPointerCapture(event.pointerId);
        }
        const delta = pointer.lastY - event.clientY;
        const elapsed = Math.max(1, event.timeStamp - pointer.lastTime);
        pointer.velocity = 0.65 * (delta / elapsed) + 0.35 * pointer.velocity;
        motion.position = clamp(motion.position + delta);
        pointer.lastY = event.clientY;
        pointer.lastTime = event.timeStamp;
        draw();
      }

      function pointerEnd(event: PointerEvent) {
        // Touch starts with implicit capture on the number under the finger.
        // Transferring capture to the wheel emits a bubbling loss event from
        // that number; it is not the end of the ongoing drag.
        if (event.type === "lostpointercapture" && event.target !== element)
          return;
        if (!pointer || event.pointerId !== pointer.id) return;
        const { moved, velocity, lastTime } = pointer;
        pointer = undefined;
        suppressClick = moved;
        if (element!.hasPointerCapture(event.pointerId))
          element!.releasePointerCapture(event.pointerId);
        if (!moved) return;
        // Project a recent flick, cap its travel, then ease into an exact row.
        const speed =
          event.type !== "pointerup" || event.timeStamp - lastTime > 100
            ? 0
            : velocity;
        // Gentle drags stay precise; faster flicks gain distance progressively.
        // Short columns (especially AM/PM) never inherit the minute wheel's travel.
        const magnitude = Math.abs(speed);
        const projection = 180 + Math.min(magnitude, 2.5) * 130;
        const limit = Math.min(rowHeight * 12, maximum * 0.6);
        const travel =
          preference.matches || magnitude < 0.12
            ? 0
            : gsap.utils.clamp(-limit, limit, speed * projection);
        const destination = clamp(motion.position + travel);
        const distance = Math.abs(destination - motion.position);
        snap(destination, Math.min(0.95, 0.28 + distance / 850));
      }

      function wheelMove(event: WheelEvent) {
        if (event.ctrlKey || pointer) return;
        event.preventDefault();
        interacted = true;
        const unit =
          event.deltaMode === 1
            ? rowHeight
            : event.deltaMode === 2
              ? rowHeight * 5
              : 1;
        animate(target + event.deltaY * unit, 0.18);
        settleTimer = setTimeout(() => snap(target), 100);
      }

      function click(event: MouseEvent) {
        if (suppressClick) {
          suppressClick = false;
          return;
        }
        const option = (event.target as HTMLElement).closest<HTMLElement>(
          "[data-wheel-index]",
        );
        if (!option) return;
        interacted = true;
        element!.focus({ preventScroll: true });
        snap(Number(option.dataset.wheelIndex) * rowHeight);
      }

      function keyDown(event: KeyboardEvent) {
        const index = Math.round(target / rowHeight);
        const destinations: Record<string, number> = {
          ArrowDown: index + 1,
          ArrowUp: index - 1,
          Home: 1,
          End: entries.length - 1,
          PageDown: index + 5,
          PageUp: index - 5,
        };
        if (!(event.key in destinations)) return;
        event.preventDefault();
        interacted = true;
        snap(destinations[event.key] * rowHeight, 0.18);
      }

      function preferenceChanged() {
        snap();
      }
      draw();
      element.addEventListener("pointerdown", pointerDown);
      element.addEventListener("pointermove", pointerMove);
      element.addEventListener("pointerup", pointerEnd);
      element.addEventListener("pointercancel", pointerEnd);
      element.addEventListener("lostpointercapture", pointerEnd);
      element.addEventListener("wheel", wheelMove, { passive: false });
      element.addEventListener("click", click);
      element.addEventListener("keydown", keyDown);
      preference.addEventListener("change", preferenceChanged);
      return () => {
        stop();
        element.removeEventListener("pointerdown", pointerDown);
        element.removeEventListener("pointermove", pointerMove);
        element.removeEventListener("pointerup", pointerEnd);
        element.removeEventListener("pointercancel", pointerEnd);
        element.removeEventListener("lostpointercapture", pointerEnd);
        element.removeEventListener("wheel", wheelMove);
        element.removeEventListener("click", click);
        element.removeEventListener("keydown", keyDown);
        preference.removeEventListener("change", preferenceChanged);
      };
    },
    { scope: wheel, dependencies: [options, onChange], revertOnUpdate: true },
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-ivory/20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 top-24 h-12 rounded-xl border border-espresso/20 bg-ivory"
      />
      <div
        ref={wheel}
        role="listbox"
        tabIndex={0}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        aria-activedescendant={`${id}-${selectedIndex}`}
        aria-orientation="vertical"
        data-lenis-prevent
        className="relative h-60 touch-none overflow-hidden overscroll-contain text-center focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold"
      >
        <div
          ref={track}
          role="presentation"
          className="py-24 will-change-transform"
        >
          {values.map((option, index) => (
            <div
              key={option}
              id={`${id}-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              data-wheel-index={index}
              className={cn(
                "flex h-12 cursor-pointer items-center justify-center text-2xl tabular-nums select-none",
                index === selectedIndex
                  ? "font-medium text-espresso"
                  : "text-espresso/50 hover:text-espresso",
              )}
            >
              {option ? formatValue(option) : "—"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
