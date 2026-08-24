import { useRef, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import type { GalleryImage } from "./Gallery";

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const { t, locale } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, true, onClose);
  useBodyScrollLock(true);

  const goPrev = () => onIndexChange((index - 1 + images.length) % images.length);
  const goNext = () => onIndexChange((index + 1) % images.length);

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowRight") goNext();
    if (event.key === "ArrowLeft") goPrev();
  };

  const image = images[index];
  const currentAlt = locale === "he" ? image.altHe : image.altEn;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={currentAlt}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
    >
      <p className="sr-only" aria-live="polite">
        {t.gallery.lightboxCounter(index + 1, images.length)}. {currentAlt}
      </p>

      <button
        type="button"
        onClick={onClose}
        aria-label={t.gallery.lightboxClose}
        className="absolute top-4 end-4 grid h-11 w-11 place-items-center rounded-full border border-hairline text-cream hover:border-gold hover:text-gold-light"
      >
        <X size={22} weight="light" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={goPrev}
        aria-label={t.gallery.lightboxPrev}
        className="absolute start-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-hairline text-cream hover:border-gold hover:text-gold-light sm:start-6"
      >
        <CaretLeft size={22} weight="light" className="rtl:rotate-180" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label={t.gallery.lightboxNext}
        className="absolute end-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-hairline text-cream hover:border-gold hover:text-gold-light sm:end-6"
      >
        <CaretRight size={22} weight="light" className="rtl:rotate-180" aria-hidden="true" />
      </button>

      <figure className="max-h-[80svh] max-w-[min(90vw,32rem)]">
        <img
          src={image.src800}
          alt={currentAlt}
          className="max-h-[80svh] w-full rounded-sm object-contain"
        />
        <figcaption className="mt-3 text-center text-sm text-fog">
          {t.gallery.lightboxCounter(index + 1, images.length)}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}
