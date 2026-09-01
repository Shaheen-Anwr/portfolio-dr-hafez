"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ui, type Locale, type Localized } from "@/lib/content";

type LocaleContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/** Inline boot script — sets <html> lang/dir before hydration to avoid a flash. */
export const LOCALE_BOOT = `try{var l=localStorage.getItem('hf-locale');if(l!=='ar'&&l!=='en'){l=(navigator.language||'').toLowerCase().indexOf('ar')===0?'ar':'en';}var r=document.documentElement;r.lang=l;r.dir=l==='ar'?'rtl':'ltr';r.classList.toggle('lang-ar',l==='ar');}catch(e){}`;

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    let initial: Locale = "en";
    try {
      const saved = localStorage.getItem("hf-locale");
      if (saved === "ar" || saved === "en") initial = saved;
      else if (navigator.language?.toLowerCase().startsWith("ar")) initial = "ar";
    } catch {
      /* ignore */
    }
    setLocaleState(initial);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("hf-locale", l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === "en" ? "ar" : "en";
      try {
        localStorage.setItem("hf-locale", next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
    root.classList.toggle("lang-ar", locale === "ar");
  }, [locale, dir]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, dir, setLocale, toggle }),
    [locale, dir, setLocale, toggle],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}

/** Returns a resolver that picks the active-locale value out of an `L(en, ar)` pair. */
export function usePick() {
  const { locale } = useLocale();
  return useCallback(<T,>(value: Localized<T>): T => value[locale], [locale]);
}

/** UI string dictionary for the active locale. */
export function useUI() {
  const { locale } = useLocale();
  return ui[locale];
}
