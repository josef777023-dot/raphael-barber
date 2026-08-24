import { Check } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";

import about640 from "../assets/images/about-raphael-working-640.webp";
import about900 from "../assets/images/about-raphael-working-900.webp";
import about1200 from "../assets/images/about-raphael-working-1200.webp";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-hairline">
            <img
              src={about1200}
              srcSet={`${about640} 640w, ${about900} 900w, ${about1200} 1200w`}
              sizes="(min-width: 1024px) 44vw, 100vw"
              alt={t.about.imageAlt}
              width={1200}
              height={1500}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 start-6 hidden h-24 w-24 rounded-full border border-gold/60 sm:block" aria-hidden="true" />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{t.about.kicker}</p>
          <h2 className="font-display text-3xl text-cream sm:text-4xl">{t.about.heading}</h2>

          <div className="mt-6 space-y-4">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-xl text-base leading-relaxed text-fog">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {t.about.benefits.map((benefit) => (
              <li
                key={benefit.title}
                className="flex items-center gap-2 rounded-lg border border-hairline bg-card px-4 py-3 text-sm font-medium text-cream"
              >
                <Check size={16} weight="bold" className="shrink-0 text-gold" aria-hidden="true" />
                {benefit.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
