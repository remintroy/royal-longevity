"use client";

import { Check, ChevronDown } from "lucide-react";
import {
  Button,
  Header,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

type EnquirySelectOption = { id: string; label: string };
type EnquirySelectGroup = {
  id: string;
  label: string;
  options: EnquirySelectOption[];
};

type EnquirySelectProps = {
  label: string;
  step?: string;
  value: string;
  onChange: (value: string) => void;
  defaultOption: EnquirySelectOption;
  groups: EnquirySelectGroup[];
};

export function EnquirySelect({
  label,
  step,
  value,
  onChange,
  defaultOption,
  groups,
}: EnquirySelectProps) {
  return (
    <Select
      className="grid min-w-0 gap-[15px] text-sm"
      selectedKey={value || defaultOption.id}
      onSelectionChange={(key) => {
        if (key !== null) onChange(key === defaultOption.id ? "" : String(key));
      }}
    >
      <Label className="flex items-center gap-[15px] text-espresso">
        {step && (
          <span className="text-gold" aria-hidden="true">
            {step}
          </span>
        )}
        {label}
      </Label>
      <Button className="flex min-h-14 w-full min-w-0 items-center justify-between gap-3 rounded-2xl border border-border bg-ivory/20 px-4 py-3 text-start text-base text-espresso transition-colors duration-200 hover:border-espresso/30 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-gold data-pressed:bg-ivory/60 motion-reduce:transition-none">
        <SelectValue className="min-w-0 flex-1 truncate" />
        <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
      </Button>
      <Popover
        placement="bottom start"
        offset={8}
        className="z-50 w-[var(--trigger-width)] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-border bg-white text-espresso shadow-lg shadow-espresso/10"
      >
        <ListBox
          className="max-h-80 overflow-y-auto overscroll-contain p-2 outline-none"
          data-lenis-prevent
        >
          <ListBoxItem
            id={defaultOption.id}
            textValue={defaultOption.label}
            className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-2xl px-3 py-3 text-sm outline-none data-focused:bg-ivory/60 data-selected:bg-ivory"
          >
            {({ isSelected }) => (
              <>
                {defaultOption.label}
                {isSelected && (
                  <Check className="size-4 shrink-0" aria-hidden="true" />
                )}
              </>
            )}
          </ListBoxItem>
          {groups.map((group) => (
            <ListBoxSection key={group.id} id={group.id} className="mt-2">
              <Header className="px-3 py-3 text-xs font-medium text-espresso/65">
                {group.label}
              </Header>
              {group.options.map((option) => (
                <ListBoxItem
                  key={option.id}
                  id={option.id}
                  textValue={option.label}
                  className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-2xl px-3 py-3 text-sm outline-none data-focused:bg-ivory/60 data-selected:bg-ivory"
                >
                  {({ isSelected }) => (
                    <>
                      <span>{option.label}</span>
                      {isSelected && (
                        <Check className="size-4 shrink-0" aria-hidden="true" />
                      )}
                    </>
                  )}
                </ListBoxItem>
              ))}
            </ListBoxSection>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}
