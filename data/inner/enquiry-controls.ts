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
  wheelHelp: localized(
    "Scroll each column or tap a value. The middle row is selected.",
    "مرّري كل عمود أو اضغطي على قيمة. الصف الأوسط هو المحدد.",
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

export const enquiryPeriods = ["am", "pm"];
