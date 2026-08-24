import { Cookie } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { useCookieConsent } from "../context/CookieConsentContext";

export function CookieBanner({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const { t } = useLanguage();
  const { hasChosen, acceptAll, rejectNonEssential, openPreferences, isPreferencesOpen } = useCookieConsent();

  if (hasChosen) return null;

  return (
    <div
      role="region"
      aria-label={t.cookieBanner.title}
      className="fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 px-3 sm:px-4 lg:bottom-4"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-lg border border-hairline bg-ink-soft p-5 shadow-2xl sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <Cookie size={26} weight="light" className="hidden shrink-0 text-gold sm:block" aria-hidden="true" />
        <div className="flex-1">
          <h2 className="font-display text-base text-cream">{t.cookieBanner.title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-fog">
            {t.cookieBanner.body}{" "}
            <button type="button" onClick={onOpenPrivacy} className="underline underline-offset-2 hover:text-gold-light">
              {t.cookieBanner.privacyLink}
            </button>
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:shrink-0">
          <div className="flex flex-col gap-2 xs:flex-row">
            <button
              type="button"
              onClick={rejectNonEssential}
              className="rounded-full border border-gold px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-gold hover:text-ink"
            >
              {t.cookieBanner.rejectNonEssential}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full border border-gold bg-gold px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
            >
              {t.cookieBanner.acceptAll}
            </button>
          </div>
          <button
            type="button"
            onClick={openPreferences}
            aria-haspopup="dialog"
            aria-expanded={isPreferencesOpen}
            className="text-sm font-medium text-fog underline underline-offset-2 hover:text-gold-light"
          >
            {t.cookieBanner.customize}
          </button>
        </div>
      </div>
    </div>
  );
}
