import { Minus, Plus, ArrowCounterClockwise } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { useAccessibility } from "../context/AccessibilityContext";
import { Modal } from "./Modal";

function ToggleRow({ label, pressed, onToggle }: { label: string; pressed: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-sm text-cream">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={pressed}
        onClick={onToggle}
        className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors ${
          pressed ? "border-gold bg-gold" : "border-hairline bg-card"
        }`}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-ink transition-[inset-inline-start]"
          style={{ insetInlineStart: pressed ? "1.625rem" : "0.125rem" }}
        />
      </button>
    </div>
  );
}

export function AccessibilityPanel({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const a11y = useAccessibility();

  return (
    <Modal title={t.a11yPanel.title} closeLabel={t.a11yPanel.close} onClose={onClose}>
      <div className="divide-y divide-hairline">
        <div className="flex items-center justify-between gap-4 py-3">
          <span className="text-sm text-cream">{t.a11yPanel.textSize}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={a11y.decreaseText}
              aria-label={t.a11yPanel.decrease}
              className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-cream hover:border-gold hover:text-gold-light"
            >
              <Minus size={16} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={a11y.resetTextSize}
              className="rounded-full border border-hairline px-3 py-1.5 text-xs text-fog hover:border-gold hover:text-gold-light"
            >
              {t.a11yPanel.reset}
            </button>
            <button
              type="button"
              onClick={a11y.increaseText}
              aria-label={t.a11yPanel.increase}
              className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-cream hover:border-gold hover:text-gold-light"
            >
              <Plus size={16} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ToggleRow label={t.a11yPanel.highContrast} pressed={a11y.highContrast} onToggle={a11y.toggleHighContrast} />
        <ToggleRow label={t.a11yPanel.grayscale} pressed={a11y.grayscale} onToggle={a11y.toggleGrayscale} />
        <ToggleRow label={t.a11yPanel.highlightLinks} pressed={a11y.highlightLinks} onToggle={a11y.toggleHighlightLinks} />
        <ToggleRow label={t.a11yPanel.reduceMotion} pressed={a11y.reduceMotion} onToggle={a11y.toggleReduceMotion} />
      </div>

      <button
        type="button"
        onClick={a11y.resetAll}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-light hover:text-gold"
      >
        <ArrowCounterClockwise size={16} weight="bold" aria-hidden="true" />
        {t.a11yPanel.resetAll}
      </button>

      <p className="mt-5 border-t border-hairline pt-4 text-xs leading-relaxed text-fog">{t.a11yPanel.disclaimer}</p>
    </Modal>
  );
}
