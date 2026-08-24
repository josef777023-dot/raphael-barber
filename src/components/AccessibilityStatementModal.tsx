import { useLanguage } from "../context/LanguageContext";
import { Modal } from "./Modal";

export function AccessibilityStatementModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();

  return (
    <Modal title={t.a11yStatement.title} closeLabel={t.legal.close} onClose={onClose}>
      <p className="mb-4 text-xs text-fog">{t.a11yStatement.lastUpdated}</p>
      <div className="space-y-4">
        {t.a11yStatement.body.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-fog">
            {paragraph}
          </p>
        ))}
      </div>
    </Modal>
  );
}
