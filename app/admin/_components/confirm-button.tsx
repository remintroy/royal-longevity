"use client";

import { useState, type ReactNode } from "react";
import { buttonClass } from "./ui";

/** A destructive action that asks for an explicit second click before running. */
export function ConfirmButton({
  children,
  confirmLabel,
  question,
  disabled,
  pending,
  onConfirm,
}: {
  children: ReactNode;
  confirmLabel: string;
  question: string;
  disabled?: boolean;
  pending?: boolean;
  onConfirm: () => void;
}) {
  const [asking, setAsking] = useState(false);

  if (!asking) {
    return (
      <button
        type="button"
        disabled={disabled || pending}
        onClick={() => setAsking(true)}
        className={buttonClass("danger")}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label={question}
      className="flex flex-wrap items-center gap-2 rounded-full border border-red-700/25 bg-red-50 p-1 ps-4"
    >
      <span className="text-sm text-red-900">{question}</span>
      <button
        type="button"
        autoFocus
        onClick={() => setAsking(false)}
        className={buttonClass("ghost", "min-h-9")}
      >
        Cancel
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setAsking(false);
          onConfirm();
        }}
        className={buttonClass(
          "primary",
          "min-h-9 bg-red-800 hover:bg-red-900",
        )}
      >
        {confirmLabel}
      </button>
    </div>
  );
}
