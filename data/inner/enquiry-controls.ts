import { localized } from "./localization";

export const enquiryControlsUi = {
  chooseDate: localized("Choose a date", "اختاري التاريخ"),
  chooseTime: localized("Choose a time", "اختاري الوقت"),
  clear: localized("Clear", "مسح"),
  done: localized("Use this time", "اعتماد الوقت"),
  close: localized("Close", "إغلاق"),
  previousMonth: localized("Previous month", "الشهر السابق"),
  nextMonth: localized("Next month", "الشهر التالي"),
  hour: localized("Hour", "الساعة"),
  minute: localized("Minute", "الدقيقة"),
  period: localized("AM or PM", "صباحاً أو مساءً"),
  am: localized("AM", "صباحاً"),
  pm: localized("PM", "مساءً"),
  next: localized("Next", "التالي"),
  back: localized("Back", "السابق"),
  selectHour: localized("Choose the hour", "اختاري الساعة"),
  selectMinute: localized("Choose the minutes", "اختاري الدقائق"),
  selectPeriod: localized("Choose AM or PM", "اختاري صباحاً أو مساءً"),
  hourHelp: localized(
    "Select an hour from 1 to 12, then tap Next.",
    "اختاري ساعة من ١ إلى ١٢، ثم اضغطي التالي.",
  ),
  minuteHelp: localized(
    "Select the minutes, including 00 for the start of an hour.",
    "اختاري الدقائق، بما فيها ٠٠ لبداية الساعة.",
  ),
  periodHelp: localized(
    "AM is before noon. PM is noon and later.",
    "صباحاً: قبل الظهر. مساءً: من الظهر حتى منتصف الليل.",
  ),
  editHint: localized(
    "Tap any part of the time to change it.",
    "اضغطي أي جزء من الوقت لتعديله.",
  ),
  timeHint: localized("Dubai time (GMT+4)", "توقيت دبي (GMT+4)"),
};

export const enquiryLocales = {
  en: "en-GB-u-ca-gregory",
  ar: "ar-AE-u-ca-gregory",
};

export const enquiryHours = Array.from({ length: 12 }, (_, hour) =>
  String(hour + 1).padStart(2, "0"),
);

export const enquiryMinutes = Array.from({ length: 60 }, (_, minute) =>
  String(minute).padStart(2, "0"),
);
