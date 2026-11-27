import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Shared presentation for the admin. Server-safe: no hooks or browser APIs.

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-espresso text-ivory hover:bg-ink disabled:bg-espresso/40 disabled:text-ivory/80",
  secondary:
    "border border-border bg-white text-espresso hover:border-espresso/40 disabled:text-espresso/40",
  ghost: "text-espresso hover:bg-espresso/5 disabled:text-espresso/40",
  danger:
    "border border-red-700/30 bg-white text-red-800 hover:border-red-700 hover:bg-red-50 disabled:opacity-50",
};

export function buttonClass(
  variant: ButtonVariant = "secondary",
  className?: string,
) {
  return cn(
    "inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-medium",
    "transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
    buttonVariants[variant],
    className,
  );
}

export const inputClass = cn(
  "w-full min-w-0 rounded-xl border border-border bg-white px-3 py-2.5 text-base text-ink",
  "placeholder:text-espresso/40 focus:border-espresso/50 focus:outline-2 focus:outline-offset-1 focus:outline-gold/60",
  "aria-invalid:border-red-700 disabled:bg-ivory/40 disabled:text-espresso/60",
);

export const panelClass = "rounded-3xl border border-border bg-white";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: ReactNode;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="grid gap-2">
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.14em] text-espresso/60">
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl leading-tight text-ink sm:text-3xl">{title}</h1>
        {description && (
          <p className="max-w-2xl text-sm leading-relaxed text-espresso/70">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

type Tone = "success" | "error" | "info" | "warning";

const noticeTones: Record<Tone, string> = {
  success: "border-emerald-800/20 bg-emerald-50 text-emerald-900",
  error: "border-red-700/25 bg-red-50 text-red-900",
  info: "border-border bg-white text-espresso",
  warning: "border-gold/40 bg-ivory/70 text-espresso",
};

export function Notice({
  tone = "info",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm leading-relaxed",
        noticeTones[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}

const badgeTones = {
  neutral: "border-border bg-white text-espresso/70",
  gold: "border-gold/40 bg-ivory/60 text-espresso",
  success: "border-emerald-800/20 bg-emerald-50 text-emerald-900",
  muted: "border-border bg-espresso/5 text-espresso/60",
} as const;

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof badgeTones;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs whitespace-nowrap",
        badgeTones[tone],
      )}
    >
      {children}
    </span>
  );
}
