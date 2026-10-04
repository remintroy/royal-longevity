import type { GalleryImage } from "@/data/gallery";
import type { Language } from "@/data/site";
import { localized, type LocalizedText } from "./localization";

export type GalleryPhoto = GalleryImage & {
  width: number;
  height: number;
  blurDataURL: string;
};

type PhotoRecord = {
  blurDataURL: string;
  id: string;
  width: number;
  height: number;
  title: LocalizedText;
  alt: LocalizedText;
};

// Supplied gallery photographs; dimensions preserve their original composition.
const photos: PhotoRecord[] = [
  {
    id: "img_9803",
    blurDataURL:
      "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADQAQCdASoQAAkAA8BgJbACdACZCO5TYAD+aRvplfKvuBQdQrHHky+tNsBrIUMQSapzsbnzUsXj2Yvr5jG8c/NvNWE+wR27s16IZO16gMAAAA==",
    width: 1672,
    height: 941,
    title: localized("Movement studio", "استوديو الحركة"),
    alt: localized(
      "Bright fitness studio with pink and turquoise flooring and exercise equipment",
      "استوديو لياقة بأرضية وردية وفيروزية ومعدات تمارين",
    ),
  },
  {
    id: "img_9804",
    blurDataURL:
      "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAQCdASoJABAAA8BgJbACdAD0liMIwAD+VGeHbXNCOaXxGXPhK9ILwhJsDHt18b31M/D9DYFlJ4MXXCyB+xfGV4PcYcyW9EAAAA==",
    width: 941,
    height: 1672,
    title: localized("Studio details", "تفاصيل الاستوديو"),
    alt: localized(
      "Vertical view of the fitness studio with plants and large windows",
      "منظر رأسي لاستوديو اللياقة مع نباتات ونوافذ كبيرة",
    ),
  },
  {
    id: "img_9805",
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoQAAkAA8BgJYgCdADiPQJxaSAAzjaBp2aW5DT2JIURoi5gDii4ERwpYLYFXX4DhJ4R2bzjOX/lDTS3JYgaeuaEU4W5nBqPrXRhNMGi7H3DqgAA",
    width: 1672,
    height: 941,
    title: localized("Salon entrance", "مدخل الصالون"),
    alt: localized(
      "Dark framed salon entrance surrounded by patterned walls and mirrors",
      "مدخل صالون بإطار داكن تحيط به جدران مزخرفة ومرايا",
    ),
  },
  {
    id: "img_9806",
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAABQAgCdASoQAAkAA8BgJagCdAEeojsFjiPG7wAA4n0my9EPY4GS9Ua3Bouw/QYTSAMyVF031xgcf8k0a0pVxwje19DkZvIrtMaHj1w75eQF4vOleFfPAAAA",
    width: 1672,
    height: 941,
    title: localized("Welcome lounge", "ردهة الاستقبال"),
    alt: localized(
      "Warmly lit lounge with upholstered seating and framed artwork",
      "ردهة بإضاءة دافئة ومقاعد منجدة ولوحات مؤطرة",
    ),
  },
  {
    id: "img_9807",
    blurDataURL:
      "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAQCdASoJABAAA8BgJYgCdAEQDNjzPKAA/tWQo3GosrhaLG18hynVG9awhM9joZPUGrd6WOu+xM8zRYwfO9oGH/SS0s9wWkuhnvBNM5AAAA==",
    width: 941,
    height: 1672,
    title: localized("Beauty corridor", "ممر الجمال"),
    alt: localized(
      "Arched passage leading to white salon chairs and tall mirrors",
      "ممر مقوس يؤدي إلى كراسي صالون بيضاء ومرايا طويلة",
    ),
  },
  {
    id: "img_9808",
    blurDataURL:
      "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAAAQAgCdASoJABAAA8BgJZACdAEO5gUXvGrAAP6ufr/8n0pEBKsN/i1wHZ4+UvWGoFECsuNxCdw4Bu5YHBCdGwf+aON4KTiApFFNuVwAAAA=",
    width: 941,
    height: 1672,
    title: localized("Styling space", "مساحة التصفيف"),
    alt: localized(
      "White styling chairs beside illuminated mirrors and dark wall panels",
      "كراسي تصفيف بيضاء بجوار مرايا مضاءة وألواح جدارية داكنة",
    ),
  },
  {
    id: "img_9809",
    blurDataURL:
      "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAQAgCdASoQAAkAA8BgJQBOgrwAgUDxdJLgAPYXR1WpyE17xgn5pLn1qHzxGMCZGr1VtphnC8gMaPQ/1ktoRobugO/uBayFQ96lFL3LcFqQdj2uAAA=",
    width: 1672,
    height: 941,
    title: localized("Salon seating", "مقاعد الصالون"),
    alt: localized(
      "Wide view of white salon chairs arranged around styling stations",
      "منظر واسع لكراسي صالون بيضاء موزعة حول محطات التصفيف",
    ),
  },
  {
    id: "img_9810",
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAQCdASoJABAAA8BgJbACdADdIgxfyADypRa6AQGwBJTW+Lnc70mvqFHHt+AWeusT8MP6sUbbZfIkF3xstQPEPQzTd+rKhuovTtZUtuy3efwa72fU0wAA",
    width: 941,
    height: 1672,
    title: localized("Stairway details", "تفاصيل الدرج"),
    alt: localized(
      "Warm wooden staircase with a gold toned handrail and decorative shelving",
      "درج خشبي دافئ بدرابزين ذهبي ورفوف للزينة",
    ),
  },
  {
    id: "img_9811",
    blurDataURL:
      "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADwAQCdASoQAAkAA8BgJbACdADp6+LO1gAA/mWWzOHBXKam73evVKgMDFduJYxDXDhhokT/Cu3joM2fUqDK52dLgjH2Cb5MNA0rx3wSdvy+qlAA",
    width: 1672,
    height: 941,
    title: localized("Indoor pool", "المسبح الداخلي"),
    alt: localized(
      "Indoor swimming pool beside loungers and a painted landscape mural",
      "مسبح داخلي بجوار كراسي استرخاء ولوحة جدارية لمنظر طبيعي",
    ),
  },
  {
    id: "img_9812",
    blurDataURL:
      "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADwAQCdASoQAAkAA8BgJaACdAYrS+yNbwAA/bLma/Yxg499feEnnCvpNeJMcU9Ca/GClsbH6ofw8B7gFGpn4Us42vPodcqArzjE51XanuU7e6S6HAijJ4KXwAA=",
    width: 1672,
    height: 941,
    title: localized("Mirror lined salon", "صالون تحيط به المرايا"),
    alt: localized(
      "Salon stations with tall mirrors beneath a patterned ceiling",
      "محطات صالون بمرايا طويلة تحت سقف مزخرف",
    ),
  },
  {
    id: "img_9813",
    blurDataURL:
      "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADQAQCdASoJABAAA8BgJbACdADcdpwgAAD8xMHnfqLLSJS2JP86hChkYOFSFa1S9mR5VnIpe3/4mn3fuK0te+HbnAobSqMaurLUZEv0KAA=",
    width: 941,
    height: 1672,
    title: localized("Open studio", "الاستوديو المفتوح"),
    alt: localized(
      "Spacious wood floored studio with ceiling lights and windows",
      "استوديو واسع بأرضية خشبية وإضاءة سقفية ونوافذ",
    ),
  },
  {
    id: "img_9814",
    blurDataURL:
      "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAACwAQCdASoQAAkAA8BgJbACdACU+0+AAP2cIqTsCZKFlRMefJ0lcFrtsd3jarNDkH8h4z4zEi3CqMIuK+oznps9oRHF+X/TBj3waBc7xqtJtXzwAAA=",
    width: 1670,
    height: 942,
    title: localized("Personal styling", "تصفيف شخصي"),
    alt: localized(
      "Styling chairs and gold framed mirrors against dark walls",
      "كراسي تصفيف ومرايا بإطارات ذهبية أمام جدران داكنة",
    ),
  },
  {
    id: "img_9815",
    blurDataURL:
      "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAAAQAgCdASoJABAAA8BgJbACdAEemPGY1BxQAMyckGAPcurXdtPuPbLsNnzm179HwS58IA377HlcKQte8TCt8mOsXTgB9e4GtsVpJ+R/KpPrkAAA",
    width: 941,
    height: 1672,
    title: localized("A quiet corner", "ركن هادئ"),
    alt: localized(
      "Salon chair framed by a mirrored doorway and warm lighting",
      "كرسي صالون يظهر عبر مدخل ذي مرايا وإضاءة دافئة",
    ),
  },
  {
    id: "img_9816",
    blurDataURL:
      "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADQAQCdASoQAAkAA8BgJagCdADpxOs6AAD+V5xxx2OJz4DyhtDmMo+8KrXO0Or2N5GLfDaWhzWyEHELjLFAx2vQrpjSAGdjzScQFIc1l54qjQAA",
    width: 1672,
    height: 941,
    title: localized("Turquoise lounge", "الردهة الفيروزية"),
    alt: localized(
      "Turquoise lounge chairs and small tables beneath a decorative chandelier",
      "كراسي استراحة فيروزية وطاولات صغيرة تحت ثريا مزخرفة",
    ),
  },
  {
    id: "img_9817",
    blurDataURL:
      "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADwAQCdASoQAAkAA8BgJZgCdAYuvEzrrAAA/mgYdrg/5ioM3nhwUuYsBsOGd58Qyum/WqkOdew5fhPp+CJtsg98CXELqzzSa0CUXOEgZxrd7JgrQJzs/WAyFz1kAAAA",
    width: 1672,
    height: 941,
    title: localized("Beauty lounge", "ردهة الجمال"),
    alt: localized(
      "Turquoise seating alongside bright salon stations and decorative mirrors",
      "مقاعد فيروزية بجوار محطات صالون مضاءة ومرايا مزخرفة",
    ),
  },
  {
    id: "img_9818",
    blurDataURL:
      "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAAAQAgCdASoQAAkAA8BgJZACdAYtpnysYDzAAPvh5/M2V5DWH8l764O5xtTYAYXZUiaI6I3V75QUkXtuHe2Im8LVSC2zpRSwTPXLTodEu3rR8Zom78ZAAA==",
    width: 1672,
    height: 941,
    title: localized("The salon floor", "مساحة الصالون"),
    alt: localized(
      "Wide salon interior with patterned walls and rows of mirrors",
      "منظر واسع لصالون بجدران مزخرفة وصفوف من المرايا",
    ),
  },
  {
    id: "img_9819",
    blurDataURL:
      "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADQAQCdASoQAAkAA8BgJQBOgBwk5L17AAD9LCTHam+LE/qcgWGe5rnzVTyp++nIbWv3ZGpLJuAtPqXYCDhpgLwuijNkKqXrSKxPXY+KaoAAAA==",
    width: 1671,
    height: 941,
    title: localized("Care in progress", "لحظات العناية"),
    alt: localized(
      "Guests and staff at styling stations in a softly lit salon",
      "زوار وفريق عمل في محطات تصفيف داخل صالون بإضاءة ناعمة",
    ),
  },
  {
    id: "img_9820",
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoQAAkAA8BgJaACdAEDG5G6FsAA/dOW5jMY4FqDqkF14W9pIilWOrQ4Eeg2+UnIP9ith8QnJZ4BDii9+tU72gUwTvKjZbjEeOMNapHegoVVneAA",
    width: 1672,
    height: 941,
    title: localized("Beauty reception", "استقبال الجمال"),
    alt: localized(
      "Bright beauty area with seating and black and white interior details",
      "مساحة جمال مضاءة مع مقاعد وتفاصيل داخلية بالأبيض والأسود",
    ),
  },
  {
    id: "img_9821",
    blurDataURL:
      "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAQAgCdASoQAAkAA8BgJZACdAD1qOm1jvIAAP7qULRJkdgo7py3seR3wqByr1to5AqhS6Nwy3xRNlPjKqYv5dPn1Vd33O1jMQmGLZap3Op7nrghmMtWNbfV8PJ6WJzdZPCLWIgA",
    width: 1652,
    height: 952,
    title: localized("Nail care space", "مساحة العناية بالأظافر"),
    alt: localized(
      "Guests seated at white manicure tables beneath illuminated product shelves",
      "زوار يجلسون أمام طاولات مانيكير بيضاء تحت رفوف منتجات مضاءة",
    ),
  },
  {
    id: "img_9822",
    blurDataURL:
      "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAQAgCdASoQAAkAA8BgJZACdAD1qOm1jvIAAP7qULRJkdgo7py3seR3wqByr1to5AqhS6Nwy3xRNlPjKqYv5dPn1Vd33O1jMQmGLZap3Op7nrghmMtWNbfV8PJ6WJzdZPCLWIgA",
    width: 1652,
    height: 952,
    title: localized("Manicure moments", "لحظات المانيكير"),
    alt: localized(
      "Another view of the manicure area with white tables and product displays",
      "منظر آخر لمساحة المانيكير مع طاولات بيضاء وعرض للمنتجات",
    ),
  },
  {
    id: "img_9823",
    blurDataURL:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAACQAgCdASoQAAkAA8BgJQBOgP0Ax4fmAD0nZW8sAADJJ/vsO4Ion1ir3e/6W0vu2j1ho+xWFJp95u7oqQzCRdhzeS8VjHQYmGNYJUqKy4YI9zalP6Gi7aooaQAAAA==",
    width: 1672,
    height: 941,
    title: localized("Through the salon", "داخل الصالون"),
    alt: localized(
      "Long salon corridor with mirrors and styling stations on either side",
      "ممر صالون طويل مع مرايا ومحطات تصفيف على الجانبين",
    ),
  },
  {
    id: "img_9824",
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAQAgCdASoQAAkAA8BgJbACdAD0uSa081YAAN4qieJPXoxdFbBLs+0X4T7N0GPD3D0rj4uTQhIEnYOUFlXdMPYPR8olVsnHd6w9V9uJnKGxxgVqJ3Eh+AAA",
    width: 1671,
    height: 941,
    title: localized("Reception details", "تفاصيل الاستقبال"),
    alt: localized(
      "Ivory reception area with warm lighting and decorative display niches",
      "مساحة استقبال عاجية بإضاءة دافئة وتجويفات عرض مزخرفة",
    ),
  },
  {
    id: "img_9825",
    blurDataURL:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADwAQCdASoQAAkAA8BgJbACdADdpYQKbQAA3mF0U5g4vlAbRDir/ddaLI+iuLRliPxAlsaKq3wQFF6ZFWzW9yfS9+NTVs8CK62Q1Wye0tgYktWjAg/5PbDwTeAAAA==",
    width: 1672,
    height: 941,
    title: localized("Room to move", "مساحة للحركة"),
    alt: localized(
      "People stretching on mats in the colourful fitness studio",
      "أشخاص يمارسون تمارين التمدد على حصائر في استوديو لياقة ملون",
    ),
  },
  {
    id: "img_9826",
    blurDataURL:
      "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAACQAgCdASoQAAwAA8BgJbACdDBNyIjMEr8WvZ/b8AD+qg29dF+QORBrwZkX0MGK3CknxF/S9CpsIT+iRamb2yVsMC8V97tftNYOmPBc7d2OLsqYb6KEcWDzXgajprsnpglW6fr+9+boq0a0GymRAAAA",
    width: 1448,
    height: 1086,
    title: localized("Fitness from above", "اللياقة من الأعلى"),
    alt: localized(
      "Elevated view of the pink and turquoise gym floor and exercise equipment",
      "منظر علوي لأرضية النادي الوردية والفيروزية ومعدات التمارين",
    ),
  },
  {
    id: "img_9827",
    blurDataURL:
      "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAADQAQCdASoQAAkAA8BgJbACdAB3ekiUAADhmqUminTWNKznrs3Yhy23k0+odzzFDvC5AVquxfOCnCjONbRh/khlFyq31d7XdArbMII/5nfwb2N/wAAAAA==",
    width: 1672,
    height: 941,
    title: localized("Training floor", "مساحة التدريب"),
    alt: localized(
      "Wide view of gym equipment across a bright pink and turquoise floor",
      "منظر واسع لمعدات النادي على أرضية وردية وفيروزية",
    ),
  },
  {
    id: "img_9828",
    blurDataURL:
      "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAADQAQCdASoQAAkAA8BgJbACdAB3ekiUAADhmqUminTWNKznrs3Yhy23k0+odzzFDvC5AVquxfOCnCjONbRh/khlFyq31d7XdArbMII/5nfwb2N/wAAAAA==",
    width: 1672,
    height: 941,
    title: localized("Fitness studio panorama", "منظر شامل لاستوديو اللياقة"),
    alt: localized(
      "Panoramic view of exercise machines and mirrored walls in the gym",
      "منظر شامل لأجهزة التمارين والجدران ذات المرايا في النادي",
    ),
  },
  {
    id: "img_9829",
    blurDataURL:
      "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADwAQCdASoJABAAA8BgJZgCdADcowRIKbQA4nnrco/4Rsge7qqHs8AWdyUuh0/U+1cMkFX8iMLjfirf4HIsUXdI+/9iF4xFOlc3B/yyMQ8UGW2nwAA=",
    width: 941,
    height: 1672,
    title: localized("Styling details", "تفاصيل التصفيف"),
    alt: localized(
      "White styling chairs and illuminated gold framed mirrors",
      "كراسي تصفيف بيضاء ومرايا مضاءة بإطارات ذهبية",
    ),
  },
  {
    id: "img_9830",
    blurDataURL:
      "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADQAQCdASoJABAAA8BgJbACdAD5hYH0AAD9z2B166UdO4HilcGU50iQiVoBwvIrOMX2/44cz42HTgMzIQJvBTL+ROZ2ftFedKn3kd4CM+uwAA==",
    width: 941,
    height: 1672,
    title: localized("Treatment room", "غرفة العناية"),
    alt: localized(
      "Treatment bed with white linens in a warmly lit private room",
      "سرير عناية ببياضات بيضاء داخل غرفة خاصة بإضاءة دافئة",
    ),
  },
  {
    id: "img_9831",
    blurDataURL:
      "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACwAQCdASoJABAAA8BgJbACdADYrRSQAMrhiPvquCuGLsVWQIC/f2HCa5Q1Gq75Wb6js4WdPtQtAR2fo8a6/M7x4a+2dW++8Vrk5AAA",
    width: 941,
    height: 1672,
    title: localized("A moment of care", "لحظة عناية"),
    alt: localized(
      "Therapist beside a treatment bed in a softly lit room",
      "معالجة بجوار سرير عناية في غرفة بإضاءة ناعمة",
    ),
  },
  {
    id: "img_9832",
    blurDataURL:
      "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACQAQCdASoQAAkAA8BgJbACdABV8gAA/M/lHq9phUC6cxenVdidnO1dKk4NGUMWaP1gcW9skT5xgGsLjS7Sch7pie8/K3o/T7YLl9fm3RdGmuBBHiuAAA==",
    width: 1672,
    height: 941,
    title: localized("Time to unwind", "وقت للاسترخاء"),
    alt: localized(
      "Reclining lounge chairs in a warm room with framed botanical artwork",
      "كراسي استرخاء في غرفة دافئة بلوحات نباتية مؤطرة",
    ),
  },
  {
    id: "img_9833",
    blurDataURL:
      "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAQAgCdASoQAAkAA8BgJagCdAEDFnl5Yct2APve8L4TdXflAsaIdG+cCi6mk+k/USyR1dsbaHDJID6KF2EjbgE8L1OFND/vKNt5r8uQmoQXIghHAAA=",
    width: 1672,
    height: 941,
    title: localized("A warm welcome", "ترحيب دافئ"),
    alt: localized(
      "Reception desk with decorative wall panels and warm gold details",
      "مكتب استقبال مع ألواح جدارية مزخرفة وتفاصيل ذهبية دافئة",
    ),
  },
];

export function getGalleryPhotos(lang: Language): GalleryPhoto[] {
  return photos.map((photo) => ({
    id: photo.id,
    src: `/assets/images/gallery/photos/${photo.id}.webp`,
    blurDataURL: photo.blurDataURL,
    width: photo.width,
    height: photo.height,
    title: photo.title[lang],
    alt: photo.alt[lang],
  }));
}
