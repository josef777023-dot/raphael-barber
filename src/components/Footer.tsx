import { InstagramLogo, WhatsappLogo, Phone, CalendarStar } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { useCookieConsent } from "../context/CookieConsentContext";
import { BUSINESS } from "../content/translations";
import logoMark from "../assets/images/logo-mark-96.webp";

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenAccessibilityStatement: () => void;
}

export function Footer({ onOpenPrivacy, onOpenAccessibilityStatement }: FooterProps) {
  const { t, locale, toggleLocale } = useLanguage();
  const { openPreferences } = useCookieConsent();
  const year = new Date().getFullYear();

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.beforeAfter, href: "#before-after" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="relative border-t border-hairline bg-ink-soft pb-28 pt-14 lg:pb-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <a href="#hero" className="inline-flex items-center gap-2">
            <img src={logoMark} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
            <span className="font-display text-lg text-cream">Raphael Barber</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">{t.footer.tagline}</p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.contact.instagramButton}
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-fog transition-colors hover:border-gold hover:text-gold-light"
            >
              <InstagramLogo size={18} weight="light" aria-hidden="true" />
            </a>
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.contact.whatsappButton}
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-fog transition-colors hover:border-gold hover:text-gold-light"
            >
              <WhatsappLogo size={18} weight="light" aria-hidden="true" />
            </a>
            <a
              href={BUSINESS.phoneLink}
              aria-label={t.contact.callButton}
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-fog transition-colors hover:border-gold hover:text-gold-light"
            >
              <Phone size={18} weight="light" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label={t.footer.navHeading}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-fog">{t.footer.navHeading}</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-cream/90 transition-colors hover:text-gold-light">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-fog">{t.footer.contactHeading}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="text-cream/90">{locale === "he" ? BUSINESS.addressHe : BUSINESS.addressEn}</li>
            <li>
              <a href={BUSINESS.phoneLink} className="text-cream/90 hover:text-gold-light">
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={BUSINESS.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gold-light hover:text-gold"
              >
                <CalendarStar size={15} weight="fill" aria-hidden="true" />
                {t.nav.book}
              </a>
            </li>
          </ul>

          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-wider text-fog">{t.langSwitch.label}</p>
            <div className="flex gap-2" role="group" aria-label={t.langSwitch.label}>
              <button
                type="button"
                onClick={() => locale !== "he" && toggleLocale()}
                aria-pressed={locale === "he"}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  locale === "he" ? "border-gold bg-gold text-ink" : "border-hairline text-fog hover:text-cream"
                }`}
              >
                {t.langSwitch.he}
              </button>
              <button
                type="button"
                onClick={() => locale !== "en" && toggleLocale()}
                aria-pressed={locale === "en"}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  locale === "en" ? "border-gold bg-gold text-ink" : "border-hairline text-fog hover:text-cream"
                }`}
              >
                {t.langSwitch.en}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-hairline px-4 pt-6 text-xs text-fog sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {year} Raphael Barber. {t.footer.rights}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <button type="button" onClick={onOpenPrivacy} className="hover:text-gold-light">
            {t.footer.privacy}
          </button>
          <button type="button" onClick={openPreferences} className="hover:text-gold-light">
            {t.footer.cookieSettings}
          </button>
          <button type="button" onClick={onOpenAccessibilityStatement} className="hover:text-gold-light">
            {t.footer.accessibility}
          </button>
        </div>
      </div>
    </footer>
  );
}
