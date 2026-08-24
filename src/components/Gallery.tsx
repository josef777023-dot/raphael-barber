import { useEffect, useState } from "react";
import { InstagramLogo, MagnifyingGlassPlus } from "@phosphor-icons/react";
import { useLanguage } from "../context/LanguageContext";
import { BUSINESS } from "../content/translations";
import { Lightbox } from "./Lightbox";

import taperFade500 from "../assets/images/gallery-taper-fade-500.webp";
import taperFade800 from "../assets/images/gallery-taper-fade-800.webp";
import wavyFringe500 from "../assets/images/gallery-wavy-fringe-500.webp";
import wavyFringe800 from "../assets/images/gallery-wavy-fringe-800.webp";
import texturedCrop500 from "../assets/images/gallery-textured-crop-500.webp";
import texturedCrop800 from "../assets/images/gallery-textured-crop-800.webp";
import classicFade500 from "../assets/images/gallery-classic-fade-500.webp";
import classicFade800 from "../assets/images/gallery-classic-fade-800.webp";
import cleanFade500 from "../assets/images/gallery-clean-fade-500.webp";
import cleanFade800 from "../assets/images/gallery-clean-fade-800.webp";

export interface GalleryImage {
  src800: string;
  src500: string;
  altHe: string;
  altEn: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  { src800: taperFade800, src500: taperFade500, altHe: "תספורת פייד נקייה עם קו מדויק", altEn: "Clean taper fade with a sharp line-up" },
  { src800: wavyFringe800, src500: wavyFringe500, altHe: "תספורת עם שכבות גליות מלמעלה", altEn: "Textured wavy fringe on top" },
  { src800: texturedCrop800, src500: texturedCrop500, altHe: "תספורת קרופ טקסטורית עם פייד גבוה", altEn: "Textured crop with a high fade" },
  { src800: classicFade800, src500: classicFade500, altHe: "תספורת קלאסית עם פייד וזקן מעוצב", altEn: "Classic fade with a shaped beard" },
  { src800: cleanFade800, src500: cleanFade500, altHe: "פייד נקי וגימור חד סביב האוזן", altEn: "Clean fade with sharp finishing around the ear" },
];

export function Gallery({ onLightboxToggle }: { onLightboxToggle?: (open: boolean) => void }) {
  const { t, locale } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    onLightboxToggle?.(activeIndex !== null);
  }, [activeIndex, onLightboxToggle]);

  return (
    <section id="gallery" className="relative bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{t.gallery.kicker}</p>
          <h2 className="font-display text-3xl text-cream sm:text-4xl">{t.gallery.heading}</h2>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {GALLERY_IMAGES.map((image, index) => (
            <li key={image.src800}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block aspect-square w-full overflow-hidden rounded-sm border border-hairline"
              >
                <img
                  src={image.src800}
                  srcSet={`${image.src500} 500w, ${image.src800} 800w`}
                  sizes="(min-width: 1024px) 30vw, 45vw"
                  alt={locale === "he" ? image.altHe : image.altEn}
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-gold" aria-hidden="true" />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
                  <MagnifyingGlassPlus size={26} weight="light" className="text-cream" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}

          <li>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-sm border border-gold/40 bg-card text-center transition-colors hover:border-gold hover:bg-card-hover"
            >
              <InstagramLogo size={30} weight="light" className="text-gold transition-transform group-hover:scale-110" aria-hidden="true" />
              <span className="max-w-[10rem] text-sm font-semibold text-cream">{t.gallery.instagramCard}</span>
            </a>
          </li>
        </ul>
      </div>

      {activeIndex !== null && (
        <Lightbox images={GALLERY_IMAGES} index={activeIndex} onClose={() => setActiveIndex(null)} onIndexChange={setActiveIndex} />
      )}
    </section>
  );
}
