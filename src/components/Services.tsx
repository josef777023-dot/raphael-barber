import { Scissors, Gradient, UserFocus, Sparkle, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { BUSINESS } from "../content/translations";

const ICONS: Icon[] = [Scissors, Gradient, UserFocus, Sparkle];

export function Services() {
  const { t, locale } = useLanguage();
  const Arrow = locale === "he" ? ArrowLeft : ArrowRight;

  return (
    <section id="services" className="relative bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{t.services.kicker}</p>
          <h2 className="font-display text-3xl text-cream sm:text-4xl">{t.services.heading}</h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((service, index) => {
            const ServiceIcon = ICONS[index % ICONS.length];
            return (
              <a
                key={service.name}
                href={BUSINESS.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-lg border border-hairline bg-card p-6 transition-colors hover:border-gold hover:bg-card-hover"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold">
                  <ServiceIcon size={22} weight="light" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg text-cream">{service.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fog">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-light">
                  {t.services.cardCta}
                  <Arrow size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
