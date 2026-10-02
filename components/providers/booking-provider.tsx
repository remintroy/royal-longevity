"use client";

import { createContext, useContext, useState } from "react";
import dynamic from "next/dynamic";
import type { Language } from "@/data/site";

const BookingDialog = dynamic(() => import("@/components/inner/booking-dialog"));
const BookingContext = createContext<((service?: string) => void) | null>(null);
export const useBookingDialog = () => useContext(BookingContext);

export function BookingProvider({ lang, children }: { lang: Language; children: React.ReactNode }) {
  const [request, setRequest] = useState<{ service?: string } | null>(null);
  return (
    <BookingContext.Provider value={(service) => setRequest({ service })}>
      {children}
      {request && <BookingDialog lang={lang} initialService={request.service} onClose={() => setRequest(null)} />}
    </BookingContext.Provider>
  );
}
