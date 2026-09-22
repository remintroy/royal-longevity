"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, MessageCircle } from "lucide-react";
import type { Language } from "@/data/site";
import { services, ui } from "@/data/inner-pages";
import { getBookingHref } from "@/lib/booking";
import { BookingCta } from "@/components/ui/booking-cta";
import styles from "./inner.module.css";

export function AppointmentEnquiry({ lang, initialService = "" }: { lang: Language; initialService?: string }) {
  const [service, setService] = useState(initialService);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const selected = services.find((item) => item.slug === service);
  const context = [selected?.title[lang] ?? ui.any[lang], date && `${ui.date[lang]}: ${date}`, time && `${ui.time[lang]}: ${time}`].filter(Boolean).join("\n");
  return (
    <section id="appointment" className={styles.section} aria-labelledby="appointment-title">
      <p className={styles.eyebrow}>{ui.visit[lang]}</p>
      <h2 id="appointment-title">{ui.visitTitle[lang]}</h2>
      <p className={styles.intro}>{ui.visitBody[lang]}</p>
      <div className={styles.bookingGrid}>
        <div className={styles.formPanel}>
          <label className={styles.field}><span>01 <span>{ui.select[lang]}</span></span><select value={service} onChange={(event) => setService(event.target.value)}><option value="">{ui.any[lang]}</option>{services.map((item) => <option key={item.slug} value={item.slug}>{item.title[lang]}</option>)}</select></label>
          <div className={styles.inputGrid}>
            <label className={styles.field}><span>02 <span>{ui.date[lang]}</span></span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
            <label className={styles.field}><span>03 <span>{ui.time[lang]}</span></span><input type="time" value={time} onChange={(event) => setTime(event.target.value)} /></label>
          </div>
          <p className={styles.requestNote}><MessageCircle size={20} aria-hidden="true" />{ui.requestNote[lang]}</p>
        </div>
        <aside className={styles.summary}>
          <div className={styles.summaryImage}><Image src={`/assets/images/gallery/${selected?.image ?? "salon"}.webp`} alt="" fill sizes="(max-width: 760px) 90vw, 400px" /></div>
          <h3>{selected?.title[lang] ?? ui.summary[lang]}</h3>
          {(date || time) && <p className={styles.summaryDate}><CalendarDays size={18} aria-hidden="true" /><span dir="ltr">{[date, time].filter(Boolean).join(" · ")}</span></p>}
          <BookingCta href={getBookingHref(lang, context)} label={ui.send[lang]} target="_blank" rel="noreferrer" />
        </aside>
      </div>
    </section>
  );
}
