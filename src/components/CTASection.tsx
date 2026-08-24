import { CalendarStar } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { BUSINESS } from "../content/translations";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-ink-soft py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg border border-gold/50 bg-card px-6 py-14 text-center shadow-[0_0_60px_-15px_rgba(200,164,93,0.35)] sm:px-12 sm:py-16">
          <h2 className="font-display text-3xl text-cream sm:text-4xl">{t.cta.heading}</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-fog">{t.cta.text}</p>
          <a
            href={BUSINESS.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
          >
            <CalendarStar size={18} weight="fill" aria-hidden="true" />
            {t.cta.button}
          </a>
        </div>
      </div>
    </section>
  );
}
