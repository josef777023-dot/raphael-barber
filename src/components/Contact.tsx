import { Phone, WhatsappLogo, CalendarStar, InstagramLogo, MapPin } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { BUSINESS } from "../content/translations";

import workstation640 from "../assets/images/workstation-tools-640.webp";
import workstation900 from "../assets/images/workstation-tools-900.webp";
import workstation1200 from "../assets/images/workstation-tools-1200.webp";

export function Contact() {
  const { t, locale } = useLanguage();
  const address = locale === "he" ? BUSINESS.addressHe : BUSINESS.addressEn;

  return (
    <section id="contact" className="relative bg-ink py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{t.contact.kicker}</p>
          <h2 className="font-display text-3xl text-cream sm:text-4xl">{t.contact.heading}</h2>

          <dl className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <MapPin size={20} weight="light" className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <dt className="text-xs uppercase tracking-wide text-fog">{t.contact.addressLabel}</dt>
                <dd className="text-base text-cream">{address}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={20} weight="light" className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <dt className="text-xs uppercase tracking-wide text-fog">{t.contact.phoneLabel}</dt>
                <dd className="text-base text-cream">
                  <a href={BUSINESS.phoneLink} className="hover:text-gold-light">
                    {BUSINESS.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-fog">{t.contact.hoursNote}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BUSINESS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
            >
              <CalendarStar size={17} weight="fill" aria-hidden="true" />
              {t.contact.bookButton}
            </a>
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm font-semibold text-cream transition-colors hover:border-[#25D366] hover:text-[#25D366]"
            >
              <WhatsappLogo size={17} weight="fill" aria-hidden="true" />
              {t.contact.whatsappButton}
            </a>
            <a
              href={BUSINESS.phoneLink}
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold-light"
            >
              <Phone size={17} weight="light" aria-hidden="true" />
              {t.contact.callButton}
            </a>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold-light"
            >
              <InstagramLogo size={17} weight="light" aria-hidden="true" />
              {t.contact.instagramButton}
            </a>
          </div>

          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold-light underline underline-offset-4 hover:text-gold"
          >
            {t.contact.mapButton}
          </a>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-hairline">
          <img
            src={workstation1200}
            srcSet={`${workstation640} 640w, ${workstation900} 900w, ${workstation1200} 1200w`}
            sizes="(min-width: 1024px) 44vw, 100vw"
            alt={
              locale === "he"
                ? "עמדת העבודה של Raphael Barber עם כלים מקצועיים ומראה מוארת"
                : "The Raphael Barber workstation with professional tools and a lit mirror"
            }
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
