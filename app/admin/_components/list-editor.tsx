"use client";

import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, buttonClass } from "./ui";

/**
 * Edits an ordered list of entries (FAQ questions, links, gallery photos…):
 * each entry can be expanded, reordered or removed, and new entries added
 * within the allowed range.
 */
export function ListEditor<Item extends { key: string }>({
  label,
  help,
  itemLabel,
  items,
  min,
  max,
  error,
  getTitle,
  hasErrors,
  isEdited,
  createItem,
  onChange,
  renderItem,
}: {
  label: string;
  help?: string;
  itemLabel: string;
  items: Item[];
  min: number;
  max: number;
  error?: string;
  getTitle: (item: Item) => string;
  hasErrors?: (item: Item) => boolean;
  isEdited?: (item: Item) => boolean;
  createItem: () => Item;
  onChange: (items: Item[]) => void;
  renderItem: (item: Item, update: (item: Item) => void) => ReactNode;
}) {
  const [openKeys, setOpenKeys] = useState<ReadonlySet<string>>(new Set());
  const fixedLength = min === max;
  const canAdd = items.length < max;
  const canRemove = items.length > min;

  const toggle = (key: string) =>
    setOpenKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const move = (index: number, offset: -1 | 1) => {
    const target = index + offset;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const add = () => {
    const item = createItem();
    onChange([...items, item]);
    setOpenKeys((current) => new Set(current).add(item.key));
  };

  const countLabel = fixedLength
    ? `${items.length} of ${max}`
    : `${items.length} · up to ${max}`;

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="grid gap-0.5">
          <span className="flex items-center gap-2 text-sm font-medium text-ink">
            {label}
            <Badge tone="muted">{countLabel}</Badge>
          </span>
          {help && <span className="text-xs text-espresso/60">{help}</span>}
        </div>
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-800">
          {error}
        </p>
      )}

      <ol className="grid gap-2">
        {items.map((item, index) => {
          const invalid = hasErrors?.(item) ?? false;
          const open = invalid || openKeys.has(item.key);
          const title =
            getTitle(item).trim() || `New ${itemLabel.toLowerCase()}`;
          const panelId = `list-item-${item.key}`;
          return (
            <li
              key={item.key}
              className={cn(
                "rounded-2xl border bg-white",
                invalid ? "border-red-700/50" : "border-border",
              )}
            >
              <div className="flex items-center gap-1 p-1.5 ps-2">
                <button
                  type="button"
                  onClick={() => toggle(item.key)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="flex min-h-11 min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-xl px-2 text-start hover:bg-espresso/5 focus-visible:outline-2 focus-visible:outline-gold"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ivory text-xs tabular-nums text-espresso">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-ink">
                    {title}
                  </span>
                  {invalid && <Badge tone="neutral">Needs attention</Badge>}
                  {!invalid && isEdited?.(item) && (
                    <Badge tone="gold">Edited</Badge>
                  )}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-4 shrink-0 text-espresso/60 transition-transform duration-200 motion-reduce:transition-none",
                      open && "rotate-180",
                    )}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className={buttonClass("ghost", "size-11 px-0")}
                  aria-label={`Move ${itemLabel.toLowerCase()} ${index + 1} up`}
                >
                  <ArrowUp className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  className={buttonClass("ghost", "size-11 px-0")}
                  aria-label={`Move ${itemLabel.toLowerCase()} ${index + 1} down`}
                >
                  <ArrowDown className="size-4" aria-hidden="true" />
                </button>
                {!fixedLength && (
                  <button
                    type="button"
                    onClick={() =>
                      onChange(items.filter((entry) => entry.key !== item.key))
                    }
                    disabled={!canRemove}
                    title={canRemove ? undefined : `At least ${min} required`}
                    className={buttonClass(
                      "ghost",
                      "size-11 px-0 hover:bg-red-50 hover:text-red-800",
                    )}
                    aria-label={`Remove ${itemLabel.toLowerCase()} ${index + 1}`}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              {open && (
                <div
                  id={panelId}
                  className="grid gap-5 border-t border-border p-4 sm:p-5"
                >
                  {renderItem(item, (updated) =>
                    onChange(
                      items.map((entry) =>
                        entry.key === item.key ? updated : entry,
                      ),
                    ),
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!fixedLength && (
        <button
          type="button"
          onClick={add}
          disabled={!canAdd}
          className={buttonClass(
            "secondary",
            "justify-self-start border-dashed",
          )}
        >
          <Plus className="size-4" aria-hidden="true" />
          {canAdd
            ? `Add ${itemLabel.toLowerCase()}`
            : `Maximum of ${max} reached`}
        </button>
      )}
    </div>
  );
}

/** A key that is unique within a list, for entries created in the editor. */
export function newItemKey(prefix = "item") {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
