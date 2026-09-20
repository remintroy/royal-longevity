"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/ui/brand-logo";
import type { Language } from "@/data/site";

type Props = { lang: Language; items: { href: string; label: string }[]; menuLabel: string; closeLabel: string; languageLabel: string };
export function SiteHeader({ lang, items, menuLabel, closeLabel, languageLabel }: Props) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return <header className="site-header wrap" ref={header} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
    <a className="logo-pill" href={`/${lang}`}><BrandLogo lang={lang} /></a>
    <div className="header-controls">
      <a className="circle-control" href={lang === "en" ? "/ar" : "/en"} aria-label={languageLabel} lang={lang === "en" ? "ar" : "en"}>{lang === "en" ? "ع" : "EN"}</a>
      <button ref={toggle} className="circle-control menu-toggle" aria-expanded={open} aria-controls="site-menu" aria-label={open ? closeLabel : menuLabel} onClick={() => setOpen(!open)}><span /><span /><span /></button>
    </div>
    <nav id="site-menu" className="menu-panel" hidden={!open} aria-label={menuLabel}>
      {items.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<span className="direction-arrow" aria-hidden="true">↗</span></a>)}
    </nav>
  </header>;
}
