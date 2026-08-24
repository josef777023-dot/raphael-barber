import { useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { BUSINESS } from "../content/translations";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

export function MobileMenu({ open, onClose, navItems }: MobileMenuProps) {
  const { t, locale, toggleLocale } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, open, onClose);
  useBodyScrollLock(open);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t.nav.menuOpen}>
      <button
        type="button"
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        aria-label={t.nav.menuClose}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="absolute inset-y-0 start-0 flex w-[86%] max-w-sm flex-col gap-8 border-e border-hairline bg-ink-soft p-6 animate-fade-up"
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg text-cream">Raphael Barber</span>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-cream"
            aria-label={t.nav.menuClose}
          >
            <X size={20} weight="light" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label={t.footer.navHeading} className="flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-base font-medium text-cream transition-colors hover:bg-card hover:text-gold-light"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-hairline pt-6">
          <p className="mb-3 text-xs uppercase tracking-wider text-fog">{t.langSwitch.label}</p>
          <div className="flex gap-2" role="group" aria-label={t.langSwitch.label}>
            <button
              type="button"
              onClick={() => locale !== "he" && toggleLocale()}
              aria-pressed={locale === "he"}
              className={`flex-1 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                locale === "he" ? "border-gold bg-gold text-ink" : "border-hairline text-fog hover:text-cream"
              }`}
            >
              {t.langSwitch.he}
            </button>
            <button
              type="button"
              onClick={() => locale !== "en" && toggleLocale()}
              aria-pressed={locale === "en"}
              className={`flex-1 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                locale === "en" ? "border-gold bg-gold text-ink" : "border-hairline text-fog hover:text-cream"
              }`}
            >
              {t.langSwitch.en}
            </button>
          </div>
        </div>

        <a
          href={BUSINESS.booking}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto rounded-full bg-gold px-5 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
        >
          {t.nav.book}
        </a>
      </div>
    </div>,
    document.body,
  );
}
