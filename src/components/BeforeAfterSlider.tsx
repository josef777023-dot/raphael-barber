import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowsLeftRight } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";

import before420 from "../assets/images/before-fade-portrait-420.webp";
import before640 from "../assets/images/before-fade-portrait-640.webp";
import before800 from "../assets/images/before-fade-portrait-800.webp";
import after420 from "../assets/images/after-fade-portrait-420.webp";
import after640 from "../assets/images/after-fade-portrait-640.webp";
import after800 from "../assets/images/after-fade-portrait-800.webp";

const STEP = 5;

export function BeforeAfterSlider() {
  const { t, dir } = useLanguage();
  const [value, setValue] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const fraction = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const physicalPercent = fraction * 100;
      const next = dir === "ltr" ? physicalPercent : 100 - physicalPercent;
      setValue(Math.round(next));
    },
    [dir],
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setValue((v) => Math.min(100, v + STEP));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setValue((v) => Math.max(0, v - STEP));
    } else if (event.key === "Home") {
      event.preventDefault();
      setValue(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setValue(100);
    }
  };

  const clipPath = dir === "ltr" ? `inset(0 ${100 - value}% 0 0)` : `inset(0 0 0 ${100 - value}%)`;

  return (
    <section id="before-after" className="relative bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{t.beforeAfter.kicker}</p>
        <h2 className="font-display text-3xl text-cream sm:text-4xl">{t.beforeAfter.heading}</h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-fog">{t.beforeAfter.subtext}</p>
      </div>

      <div className="mx-auto mt-10 max-w-md px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="relative aspect-[4/5] w-full touch-none select-none overflow-hidden rounded-sm border border-hairline"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <img
            src={before800}
            srcSet={`${before420} 420w, ${before640} 640w, ${before800} 800w`}
            sizes="(min-width: 640px) 448px, 90vw"
            alt=""
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <img
            src={after800}
            srcSet={`${after420} 420w, ${after640} 640w, ${after800} 800w`}
            sizes="(min-width: 640px) 448px, 90vw"
            alt=""
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ clipPath }}
          />

          <span className="pointer-events-none absolute top-3 start-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream backdrop-blur-sm">
            {t.beforeAfter.before}
          </span>
          <span className="pointer-events-none absolute top-3 end-3 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink backdrop-blur-sm">
            {t.beforeAfter.after}
          </span>

          <div
            className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-gold-light rtl:translate-x-1/2"
            style={{ insetInlineStart: `${value}%` }}
            aria-hidden="true"
          />

          <div
            role="slider"
            tabIndex={0}
            aria-label={t.beforeAfter.sliderLabel}
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            aria-valuetext={`${value}%`}
            onKeyDown={onKeyDown}
            className="absolute top-1/2 z-10 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-gold-light bg-ink text-gold-light shadow-lg rtl:translate-x-1/2"
            style={{ insetInlineStart: `${value}%` }}
          >
            <ArrowsLeftRight size={18} weight="bold" aria-hidden="true" />
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-fog">{t.beforeAfter.instructions}</p>
      </div>
    </section>
  );
}
