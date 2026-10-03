# Reusable date and time pickers

Import `DatePicker`, `TimePicker`, `PickerProps`, `formatPickerDate`, and
`formatPickerTime` from `@/components/ui/date-time-picker` in a Client Component.

```tsx
const [date, setDate] = useState("");
const [time, setTime] = useState("");

<DatePicker lang={lang} label={dateLabel} value={date} onChange={setDate} />
<TimePicker lang={lang} label={timeLabel} value={time} onChange={setTime} />
```

Supply localized labels. `step` is optional, for numbered forms. Each picker
provides its own English/Arabic locale context. Values are empty strings or
`YYYY-MM-DD` for dates and `HH:mm` (24-hour storage) for times. The time picker
displays 12-hour AM/PM and commits its draft only on confirmation. Closing cancels
draft changes; Clear emits an empty string. These Royal Longevity controls use
Dubai time; the date picker blocks dates before today in Dubai.

Time choices run from 9:00 AM through 8:45 PM in 15-minute intervals (closing
time is 9:00 PM). The AM wheel offers 9–11; PM offers noon through 8. Changing
AM/PM clears an incompatible hour and requires a new choice before confirmation.
Minutes are limited to 00, 15, 30 and 45. The hour wheel remounts when AM/PM changes so
its scroll position matches the new options. Confirmation validates the full
time, and reopening ignores saved values outside the allowed range. These are
preferred enquiry times, not live appointment availability.

The three time wheels share `TimeWheel`. GSAP controls drag momentum and snapping:
slow drags remain precise, faster flicks project farther, and travel is bounded
by the column length. New gestures interrupt existing motion. Reduced motion
disables momentum and haptics. Brief vibration ticks are best effort on browsers
with the Vibration API; native Apple haptic behavior is not guaranteed.
