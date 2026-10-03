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
  wheelHelp: localized("Scroll to select time", "مرّري لاختيار الوقت"),
  timeHint: localized("Dubai time (GMT+4)", "توقيت دبي (GMT+4)"),
  timeSlotsHint: localized(
    "Available choices: 9:00 AM–8:45 PM, every 15 minutes.",
    "الأوقات المتاحة للاختيار: من ٩:٠٠ صباحاً إلى ٨:٤٥ مساءً، بفواصل ١٥ دقيقة.",
  ),
};

export const enquiryLocales = {
  en: "en-GB-u-ca-gregory",
  ar: "ar-AE-u-ca-gregory",
};

const enquiryHoursByPeriod = {
  am: ["09", "10", "11"],
  pm: ["12", "01", "02", "03", "04", "05", "06", "07", "08"],
};

const enquiryHours = [...enquiryHoursByPeriod.am, ...enquiryHoursByPeriod.pm];

export function getEnquiryHours(period: string) {
  return period === "am" || period === "pm"
    ? enquiryHoursByPeriod[period]
    : enquiryHours;
}

export const enquiryMinutes = ["00", "15", "30", "45"];

export const enquiryPeriods = ["am", "pm"];

export function isEnquiryTime(value: string) {
  return /^(09|1[0-9]|20):(00|15|30|45)$/.test(value);
}
