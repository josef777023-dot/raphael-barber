import { CalendarStar, WhatsappLogo } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { BUSINESS } from "../content/translations";

export function MobileActionBar({ hidden }: { hidden: boolean }) {
  const { t } = useLanguage();

  if (hidden) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-ink-soft/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-2.5 p-2.5">
        <a
          href={BUSINESS.booking}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-ink"
        >
          <CalendarStar size={18} weight="fill" aria-hidden="true" />
          {t.mobileBar.book}
        </a>
        <a
          href={BUSINESS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full border border-[#25D366] px-4 py-3 text-sm font-semibold text-[#25D366]"
        >
          <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
          {t.mobileBar.whatsapp}
        </a>
      </div>
    </div>
  );
}
