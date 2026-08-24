import { List } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { BUSINESS } from "../content/translations";
import logoMark from "../assets/images/logo-mark-160.webp";
import { MobileMenu } from "./MobileMenu";

const SECTION_IDS = {
  home: "hero",
  about: "about",
  services: "services",
  beforeAfter: "before-after",
  gallery: "gallery",
  contact: "contact",
} as const;

interface HeaderProps {
  scrolled: boolean;
  menuOpen: boolean;
  onMenuOpen: () => void;
  onMenuClose: () => void;
}

export function Header({ scrolled, menuOpen, onMenuOpen, onMenuClose }: HeaderProps) {
  const { t } = useLanguage();

  const navItems: { key: keyof typeof SECTION_IDS; label: string }[] = [
    { key: "home", label: t.nav.home },
    { key: "about", label: t.nav.about },
    { key: "services", label: t.nav.services },
    { key: "beforeAfter", label: t.nav.beforeAfter },
    { key: "gallery", label: t.nav.gallery },
    { key: "contact", label: t.nav.contact },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled ? "border-b border-hairline bg-ink/90 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#hero" className="flex items-center gap-2 shrink-0" aria-label={`Raphael Barber — ${t.nav.home}`}>
            <img src={logoMark} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="font-display text-lg tracking-wide text-cream">Raphael Barber</span>
          </a>

          <nav aria-label={t.footer.navHeading} className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${SECTION_IDS[item.key]}`}
                className="text-sm font-medium text-fog transition-colors hover:text-gold-light"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={BUSINESS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
            >
              {t.nav.book}
            </a>
          </div>

          <button
            type="button"
            onClick={onMenuOpen}
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-cream lg:hidden"
            aria-label={t.nav.menuOpen}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
          >
            <List size={22} weight="light" aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={onMenuClose}
        navItems={navItems.map((item) => ({ label: item.label, href: `#${SECTION_IDS[item.key]}` }))}
      />
    </>
  );
}
