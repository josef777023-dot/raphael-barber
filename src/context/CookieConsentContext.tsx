import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "rb-cookie-consent";

interface ConsentPrefs {
  analytics: boolean;
  marketing: boolean;
}

interface StoredConsent extends ConsentPrefs {
  hasChosen: true;
}

function readStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.hasChosen) return parsed as StoredConsent;
    return null;
  } catch {
    return null;
  }
}

interface CookieConsentContextValue {
  hasChosen: boolean;
  analytics: boolean;
  marketing: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: ConsentPrefs) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(readStoredConsent);
  const [isPreferencesOpen, setPreferencesOpen] = useState(false);

  const persist = (prefs: ConsentPrefs) => {
    const next: StoredConsent = { hasChosen: true, ...prefs };
    setConsent(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setPreferencesOpen(false);
  };

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      hasChosen: consent !== null,
      analytics: consent?.analytics ?? false,
      marketing: consent?.marketing ?? false,
      isPreferencesOpen,
      acceptAll: () => persist({ analytics: true, marketing: true }),
      rejectNonEssential: () => persist({ analytics: false, marketing: false }),
      savePreferences: (prefs) => persist(prefs),
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
    }),
    [consent, isPreferencesOpen],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}
