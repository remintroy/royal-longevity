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
  timeHint: localized(
    "24-hour time · Dubai (GMT+4)",
    "نظام ٢٤ ساعة · دبي (GMT+4)",
  ),
};

export const enquiryLocales = {
  en: "en-GB-u-ca-gregory",
  ar: "ar-AE-u-ca-gregory",
};

export const enquiryHours = Array.from({ length: 24 }, (_, hour) =>
  String(hour).padStart(2, "0"),
);

export const enquiryMinutes = Array.from({ length: 60 }, (_, minute) =>
  String(minute).padStart(2, "0"),
);
