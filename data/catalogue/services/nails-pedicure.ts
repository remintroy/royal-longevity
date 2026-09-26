import { localized } from "@/data/inner/localization";
import type { Service } from "../types";

export const nails_pedicure: Service[] = [
  {
    slug: "manicure",
    category: "nails-pedicure",
    title: localized("Manicure", "المانيكير"),
    description: localized(
      "Thoughtful care for your hands and nails.",
      "عناية مدروسة بيديك وأظافرك.",
    ),
    access: "appointment",
    image: "services/manicure",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "pedicure",
    category: "nails-pedicure",
    title: localized("Pedicure", "البديكير"),
    description: localized(
      "Make time for a refreshing foot-care ritual.",
      "خصصي وقتاً لطقوس منعشة للعناية بالقدمين.",
    ),
    access: "appointment",
    image: "services/pedicure",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "nail-polish",
    category: "nails-pedicure",
    title: localized("Nail Polish", "طلاء الأظافر"),
    description: localized(
      "Choose a finishing colour that suits your style.",
      "اختاري لوناً نهائياً يناسب أسلوبك.",
    ),
    access: "appointment",
    image: "services/nail-polish",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "nail-art",
    category: "nails-pedicure",
    title: localized("Nail Art", "فن الأظافر"),
    description: localized(
      "Discuss personal details and nail-art designs.",
      "ناقشي التفاصيل الشخصية وتصاميم فن الأظافر.",
    ),
    access: "appointment",
    image: "services/nail-art",
    published: true,
    homepageOrder: null,
  },
  {
    slug: "gel-nails",
    category: "nails-pedicure",
    title: localized("Gel Nails", "أظافر الجل"),
    description: localized(
      "Enquire about gel finishes and the available options.",
      "استفسري عن لمسات الجل والخيارات المتاحة.",
    ),
    access: "appointment",
    image: "services/gel-nails",
    published: true,
    homepageOrder: null,
  },
];
