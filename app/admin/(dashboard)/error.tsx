"use client";

import { buttonClass, Notice } from "../_components/ui";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid max-w-xl gap-4">
      <h1 className="text-2xl text-ink">Something went wrong</h1>
      <Notice tone="error">
        The admin could not load this page. This is usually a temporary database
        connection problem — please try again.
        {error.digest && (
          <span className="mt-1 block text-xs opacity-70">
            Reference: {error.digest}
          </span>
        )}
      </Notice>
      <button
        type="button"
        onClick={reset}
        className={buttonClass("primary", "justify-self-start")}
      >
        Try again
      </button>
    </div>
  );
}
