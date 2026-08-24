import { Wheelchair } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";

interface FloatingControlsProps {
  onOpenAccessibility: () => void;
  accessibilityPanelOpen: boolean;
}

export function FloatingControls({ onOpenAccessibility, accessibilityPanelOpen }: FloatingControlsProps) {
  const { t, locale, toggleLocale } = useLanguage();

  return (
    <div className="fixed end-3 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-3 sm:end-5">
      <div
        className="hidden flex-col overflow-hidden rounded-full border border-hairline bg-ink-soft/95 shadow-lg backdrop-blur-sm lg:flex"
        role="group"
        aria-label={t.langSwitch.label}
      >
        <button
          type="button"
          onClick={() => locale !== "he" && toggleLocale()}
          aria-pressed={locale === "he"}
          className={`px-3 py-2.5 text-xs font-semibold transition-colors ${
            locale === "he" ? "bg-gold text-ink" : "text-fog hover:text-cream"
          }`}
        >
          עב
        </button>
        <button
          type="button"
          onClick={() => locale !== "en" && toggleLocale()}
          aria-pressed={locale === "en"}
          className={`px-3 py-2.5 text-xs font-semibold transition-colors ${
            locale === "en" ? "bg-gold text-ink" : "text-fog hover:text-cream"
          }`}
        >
          EN
        </button>
      </div>

      <button
        type="button"
        onClick={onOpenAccessibility}
        aria-label={t.floatingControls.accessibilityLabel}
        aria-haspopup="dialog"
        aria-expanded={accessibilityPanelOpen}
        className="grid h-12 w-12 place-items-center rounded-full border border-hairline bg-ink-soft/95 text-gold shadow-lg backdrop-blur-sm transition-colors hover:border-gold hover:text-gold-light"
      >
        <Wheelchair size={22} weight="light" aria-hidden="true" />
      </button>
    </div>
  );
}
