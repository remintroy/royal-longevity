"use client";

import { useEffect, useEffectEvent, type ReactNode } from "react";
import { Check, LoaderCircle } from "lucide-react";
import type { ActionResult } from "@/lib/cms/action-result";
import { cn } from "@/lib/utils";
import { buttonClass } from "./ui";

/**
 * Warns before leaving with unsaved edits (closing the tab or following a link
 * inside the admin) and saves with Ctrl/⌘ + S.
 */
export function useUnsavedChanges(dirty: boolean, onSave: () => void) {
  const save = useEffectEvent(onSave);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    const onClick = (event: MouseEvent) => {
      const link =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.target === "_blank" ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey
      ) {
        return;
      }
      if (!window.confirm("You have unsaved changes. Leave without saving?")) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("click", onClick, true);
    };
  }, [dirty]);
}

/** Sticky footer with the save state and primary actions of an editor. */
export function SaveBar({
  dirty,
  pending,
  result,
  saveLabel = "Save changes",
  onSave,
  onDiscard,
  extra,
}: {
  dirty: boolean;
  pending: boolean;
  result: ActionResult | null;
  saveLabel?: string;
  onSave: () => void;
  onDiscard?: () => void;
  extra?: ReactNode;
}) {
  let status: ReactNode;
  if (pending) {
    status = "Saving…";
  } else if (result && !result.ok) {
    status = <span className="text-red-800">{result.message}</span>;
  } else if (dirty) {
    status = "Unsaved changes";
  } else if (result?.ok) {
    status = (
      <span className="inline-flex items-center gap-1.5 text-emerald-900">
        <Check className="size-4" aria-hidden="true" />
        {result.message}
      </span>
    );
  } else {
    status = "All changes saved";
  }

  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-2 border-t border-border bg-white/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:mx-0 lg:mb-4 lg:rounded-3xl lg:border">
      <div className="flex flex-wrap items-center gap-3">
        <p
          aria-live="polite"
          className={cn(
            "min-w-0 flex-1 text-sm",
            dirty ? "text-espresso" : "text-espresso/60",
          )}
        >
          {dirty && !pending && (
            <span
              aria-hidden="true"
              className="me-2 inline-block size-2 rounded-full bg-gold align-middle"
            />
          )}
          {status}
        </p>
        {extra}
        {onDiscard && dirty && (
          <button
            type="button"
            onClick={onDiscard}
            disabled={pending}
            className={buttonClass("ghost")}
          >
            Discard
          </button>
        )}
        <button
          type="button"
          onClick={onSave}
          disabled={!dirty || pending}
          className={buttonClass("primary", "min-w-36")}
        >
          {pending && (
            <LoaderCircle
              className="size-4 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          )}
          {saveLabel}
        </button>
      </div>
    </div>
  );
}
