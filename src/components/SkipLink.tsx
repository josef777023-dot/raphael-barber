import type { MouseEvent as ReactMouseEvent } from "react";
import { useLanguage } from "../context/LanguageContext";

export function SkipLink() {
  const { t } = useLanguage();

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const main = document.getElementById("main-content");
    if (!main) return;
    main.focus();
    main.scrollIntoView();
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="skip-link fixed top-3 start-3 z-[100] -translate-y-24 rounded bg-gold px-4 py-3 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
    >
      {t.skipLink}
    </a>
  );
}
