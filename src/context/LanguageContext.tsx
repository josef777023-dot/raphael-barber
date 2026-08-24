import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Locale, type Translation } from "../content/translations";

const STORAGE_KEY = "rb-locale";

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "he";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "he" ? stored : "he";
}

interface LanguageContextValue {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: Translation;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  useEffect(() => {
    const dir = locale === "he" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.title = translations[locale].meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.setAttribute("content", translations[locale].meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", translations[locale].meta.title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", translations[locale].meta.description);

    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: locale === "he" ? "rtl" : "ltr",
      t: translations[locale],
      setLocale: setLocaleState,
      toggleLocale: () => setLocaleState((prev) => (prev === "he" ? "en" : "he")),
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
