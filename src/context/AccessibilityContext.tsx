import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "rb-a11y-prefs";
const MIN_SCALE = 0.875;
const MAX_SCALE = 1.375;
const STEP = 0.125;

interface A11yPrefs {
  scale: number;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  reduceMotion: boolean;
}

const defaultPrefs: A11yPrefs = {
  scale: 1,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  reduceMotion: false,
};

function readStoredPrefs(): A11yPrefs {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw);
    return { ...defaultPrefs, ...parsed };
  } catch {
    return defaultPrefs;
  }
}

interface AccessibilityContextValue extends A11yPrefs {
  increaseText: () => void;
  decreaseText: () => void;
  resetTextSize: () => void;
  toggleHighContrast: () => void;
  toggleGrayscale: () => void;
  toggleHighlightLinks: () => void;
  toggleReduceMotion: () => void;
  resetAll: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<A11yPrefs>(readStoredPrefs);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--a11y-scale", String(prefs.scale));
    root.classList.toggle("a11y-high-contrast", prefs.highContrast);
    root.classList.toggle("a11y-grayscale", prefs.grayscale);
    root.classList.toggle("a11y-highlight-links", prefs.highlightLinks);
    root.classList.toggle("a11y-reduce-motion", prefs.reduceMotion);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      ...prefs,
      increaseText: () => setPrefs((p) => ({ ...p, scale: Math.min(MAX_SCALE, +(p.scale + STEP).toFixed(3)) })),
      decreaseText: () => setPrefs((p) => ({ ...p, scale: Math.max(MIN_SCALE, +(p.scale - STEP).toFixed(3)) })),
      resetTextSize: () => setPrefs((p) => ({ ...p, scale: 1 })),
      toggleHighContrast: () => setPrefs((p) => ({ ...p, highContrast: !p.highContrast })),
      toggleGrayscale: () => setPrefs((p) => ({ ...p, grayscale: !p.grayscale })),
      toggleHighlightLinks: () => setPrefs((p) => ({ ...p, highlightLinks: !p.highlightLinks })),
      toggleReduceMotion: () => setPrefs((p) => ({ ...p, reduceMotion: !p.reduceMotion })),
      resetAll: () => setPrefs(defaultPrefs),
    }),
    [prefs],
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
}
