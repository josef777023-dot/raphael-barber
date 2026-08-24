import { CalendarStar, WhatsappLogo, MapPin } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { BUSINESS } from "../content/translations";

import hero640 from "../assets/images/hero-raphael-cutting-640.webp";
import hero1024 from "../assets/images/hero-raphael-cutting-1024.webp";
import hero1536 from "../assets/images/hero-raphael-cutting-1536.webp";

export function Hero() {
  const { t, locale } = useLanguage();

  return (
    <section id="hero" className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink">
      <img
        src={hero1536}
        srcSet={`${hero640} 640w, ${hero1024} 1024w, ${hero1536} 1536w`}
        sizes="100vw"
        alt={locale === "he" ? "רפאל מבצע תספורת מדויקת ללקוח בסלון" : "Raphael giving a client a precise haircut in the barbershop"}
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover object-[78%_center]"
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/5" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-transparent" aria-hidden="true" />

      <div className="relative z-10 w-full px-4 pb-16 pt-40 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24">
        <div className="max-w-xl text-start">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">{t.hero.eyebrow}</p>
          <h1 className="font-display text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            <span className="block">{t.hero.headlineLine1}</span>
            <span className="block">{t.hero.headlineLine2}</span>
          </h1>
          <p className="relative mt-3 inline-block font-display text-xl text-gold sm:text-2xl">
            {t.hero.headlineGold}
            <span className="absolute -bottom-2 start-0 h-px w-full bg-gradient-to-r from-gold to-transparent rtl:bg-gradient-to-l ltr:origin-left rtl:origin-right animate-razor-line" />
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-fog sm:text-lg">{t.hero.subtext}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={BUSINESS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
            >
              <CalendarStar size={18} weight="fill" aria-hidden="true" />
              {t.hero.primaryCta}
            </a>
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-ink/40 px-6 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm transition-colors hover:border-gold hover:text-gold-light"
            >
              <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
              {t.hero.secondaryCta}
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-fog">
            <MapPin size={16} weight="light" aria-hidden="true" />
            {t.hero.location}
          </p>
        </div>
      </div>
    </section>
  );
}
