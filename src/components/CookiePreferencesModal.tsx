import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { useCookieConsent } from "../context/CookieConsentContext";
import { Modal } from "./Modal";

export function CookiePreferencesModal({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const { t } = useLanguage();
  const { analytics, marketing, savePreferences, closePreferences } = useCookieConsent();
  const [draftAnalytics, setDraftAnalytics] = useState(analytics);
  const [draftMarketing, setDraftMarketing] = useState(marketing);

  return (
    <Modal title={t.cookieBanner.title} closeLabel={t.legal.close} onClose={closePreferences}>
      <p className="text-sm leading-relaxed text-fog">{t.cookieBanner.body}</p>

      <div className="mt-5 divide-y divide-hairline">
        <div className="flex items-start justify-between gap-4 py-4">
          <div>
            <p className="text-sm font-semibold text-cream">{t.cookieBanner.essential}</p>
            <p className="mt-1 text-xs leading-relaxed text-fog">{t.cookieBanner.essentialDesc}</p>
          </div>
          <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline px-3 py-1 text-xs text-fog">
            <Check size={13} weight="bold" className="text-gold" aria-hidden="true" />
            {t.cookieBanner.alwaysOn}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4 py-4">
          <div>
            <p className="text-sm font-semibold text-cream">{t.cookieBanner.analytics}</p>
            <p className="mt-1 text-xs leading-relaxed text-fog">{t.cookieBanner.analyticsDesc}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={draftAnalytics}
            aria-label={t.cookieBanner.analytics}
            onClick={() => setDraftAnalytics((v) => !v)}
            className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full border transition-colors ${
              draftAnalytics ? "border-gold bg-gold" : "border-hairline bg-card"
            }`}
          >
            <span
              className="absolute top-0.5 h-5 w-5 rounded-full bg-ink transition-[inset-inline-start]"
              style={{ insetInlineStart: draftAnalytics ? "1.625rem" : "0.125rem" }}
            />
          </button>
        </div>

        <div className="flex items-start justify-between gap-4 py-4">
          <div>
            <p className="text-sm font-semibold text-cream">{t.cookieBanner.marketing}</p>
            <p className="mt-1 text-xs leading-relaxed text-fog">{t.cookieBanner.marketingDesc}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={draftMarketing}
            aria-label={t.cookieBanner.marketing}
            onClick={() => setDraftMarketing((v) => !v)}
            className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full border transition-colors ${
              draftMarketing ? "border-gold bg-gold" : "border-hairline bg-card"
            }`}
          >
            <span
              className="absolute top-0.5 h-5 w-5 rounded-full bg-ink transition-[inset-inline-start]"
              style={{ insetInlineStart: draftMarketing ? "1.625rem" : "0.125rem" }}
            />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={onOpenPrivacy} className="text-sm text-fog underline underline-offset-2 hover:text-gold-light">
          {t.cookieBanner.privacyLink}
        </button>
        <button
          type="button"
          onClick={() => savePreferences({ analytics: draftAnalytics, marketing: draftMarketing })}
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
        >
          {t.cookieBanner.savePreferences}
        </button>
      </div>
    </Modal>
  );
}
