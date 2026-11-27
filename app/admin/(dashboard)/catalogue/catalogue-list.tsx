"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ImageIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, inputClass, panelClass } from "../../_components/ui";

export type CatalogueRow = {
  id: string;
  href: string;
  title: string;
  titleAr: string;
  image: string;
  /** Secondary line, e.g. the category or service count. */
  meta: string;
  /** Filter value, e.g. the category id. */
  group?: string;
  hidden?: boolean;
  origin: "built-in" | "custom";
  edited: boolean;
};

type StatusFilter = "all" | "live" | "hidden" | "edited" | "custom";

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "hidden", label: "Hidden" },
  { value: "edited", label: "Edited" },
  { value: "custom", label: "Added in admin" },
];

function matchesStatus(row: CatalogueRow, status: StatusFilter) {
  switch (status) {
    case "live":
      return !row.hidden;
    case "hidden":
      return Boolean(row.hidden);
    case "edited":
      return row.edited;
    case "custom":
      return row.origin === "custom";
    default:
      return true;
  }
}

/** Searchable, filterable list of catalogue entries linking to their editors. */
export function CatalogueList({
  rows,
  noun,
  groups,
  showVisibility,
}: {
  rows: CatalogueRow[];
  noun: string;
  /** Options for the group filter (e.g. categories), when relevant. */
  groups?: { value: string; label: string }[];
  showVisibility?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const search = query.trim().toLowerCase();
  const visibleRows = rows.filter(
    (row) =>
      (!search ||
        row.title.toLowerCase().includes(search) ||
        row.titleAr.includes(query.trim()) ||
        row.id.includes(search)) &&
      (!group || row.group === group) &&
      matchesStatus(row, status),
  );
  const filters = statusFilters.filter(
    (filter) =>
      showVisibility || (filter.value !== "live" && filter.value !== "hidden"),
  );

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="relative block">
          <span className="sr-only">Search {noun}</span>
          <Search
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-espresso/50"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${noun} in English or Arabic`}
            className={cn(inputClass, "ps-9")}
          />
        </label>
        {groups && (
          <label className="block">
            <span className="sr-only">Category</span>
            <select
              value={group}
              onChange={(event) => setGroup(event.target.value)}
              className={cn(inputClass, "min-h-11 sm:w-56")}
            >
              <option value="">All categories</option>
              {groups.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div
        role="group"
        aria-label="Filter by status"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={status === filter.value}
            onClick={() => setStatus(filter.value)}
            className={cn(
              "min-h-9 rounded-full border px-3.5 text-sm transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
              status === filter.value
                ? "border-espresso bg-espresso text-ivory"
                : "border-border bg-white text-espresso/80 hover:border-espresso/40",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="text-sm text-espresso/60">
        Showing {visibleRows.length} of {rows.length} {noun}
      </p>

      {visibleRows.length === 0 ? (
        <div
          className={cn(panelClass, "p-8 text-center text-sm text-espresso/60")}
        >
          No {noun} match these filters.
        </div>
      ) : (
        <ul
          className={cn(panelClass, "divide-y divide-border overflow-hidden")}
        >
          {visibleRows.map((row) => (
            <li key={row.id}>
              <Link
                href={row.href}
                className="group flex items-center gap-3 px-3 py-3 transition-colors duration-200 hover:bg-ivory/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold sm:gap-4 sm:px-4"
              >
                <span className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-ivory/60">
                  {row.image ? (
                    <Image
                      src={row.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <ImageIcon
                      className="size-5 text-espresso/40"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span className="grid min-w-0 flex-1 gap-0.5">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="truncate text-sm font-medium text-ink">
                      {row.title}
                    </span>
                    <span
                      className="truncate text-sm text-espresso/60"
                      dir="rtl"
                      lang="ar"
                    >
                      {row.titleAr}
                    </span>
                  </span>
                  <span className="truncate text-xs text-espresso/60">
                    {row.meta}
                  </span>
                  <span className="mt-1 flex flex-wrap gap-1.5">
                    {showVisibility &&
                      (row.hidden ? (
                        <Badge tone="muted">Hidden</Badge>
                      ) : (
                        <Badge tone="success">Live</Badge>
                      ))}
                    {row.origin === "custom" && <Badge>Added in admin</Badge>}
                    {row.edited && <Badge tone="gold">Edited</Badge>}
                  </span>
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-espresso/40 transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
