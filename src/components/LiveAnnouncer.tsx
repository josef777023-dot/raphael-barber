import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

/**
 * Announces language changes to screen reader users via a polite live region.
 * Silent on first mount so it only fires on an actual user-triggered switch.
 */
export function LiveAnnouncer() {
  const { locale, t } = useLanguage();
  const hasMounted = useRef(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasMounted.current) {
      setMessage(t.langSwitch.announcement);
    }
    hasMounted.current = true;
  }, [locale, t]);

  return (
    <div aria-live="polite" role="status" className="sr-only">
      {message}
    </div>
  );
}
