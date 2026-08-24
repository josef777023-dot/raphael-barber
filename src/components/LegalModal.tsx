import { useLanguage } from "../context/LanguageContext";
import { Modal } from "./Modal";

export function LegalModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();

  return (
    <Modal title={t.legal.title} closeLabel={t.legal.close} onClose={onClose}>
      <p className="mb-6 text-xs text-fog">{t.legal.lastUpdated}</p>
      <div className="space-y-8">
        <section>
          <h3 className="font-display text-base text-gold-light">{t.legal.ownerTitle}</h3>
          <div className="mt-2 space-y-3">
            {t.legal.ownerBody.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-fog">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
        <section>
          <h3 className="font-display text-base text-gold-light">{t.legal.privacyTitle}</h3>
          <div className="mt-2 space-y-3">
            {t.legal.privacyBody.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-fog">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
        <section>
          <h3 className="font-display text-base text-gold-light">{t.legal.retentionTitle}</h3>
          <div className="mt-2 space-y-3">
            {t.legal.retentionBody.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-fog">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
        <section>
          <h3 className="font-display text-base text-gold-light">{t.legal.termsTitle}</h3>
          <div className="mt-2 space-y-3">
            {t.legal.termsBody.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-fog">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
        <section>
          <h3 className="font-display text-base text-gold-light">{t.legal.cookieTitle}</h3>
          <div className="mt-2 space-y-3">
            {t.legal.cookieBody.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-fog">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </div>
    </Modal>
  );
}
