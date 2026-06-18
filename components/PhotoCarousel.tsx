"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Disc3,
  Instagram,
  Music4,
  Youtube
} from "lucide-react";
import { useEffect, useState } from "react";
import { photoCarouselItems, siteConfig } from "@/lib/mock-data";

const AUTOPLAY_MS = 4200;
const socialIcons = {
  Instagram,
  TikTok: Music4,
  YouTube: Youtube,
  Spotify: Disc3
};

export function PhotoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = photoCarouselItems.length;

  useEffect(() => {
    if (isPaused || total <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, isPaused, total]);

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + total) % total);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % total);
  }

  function goToSlide(index: number) {
    setActiveIndex(index);
  }

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden bg-[var(--mv-black)]"
      onBlur={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative aspect-[4/3] min-h-[280px] shrink-0 sm:aspect-[16/10] lg:min-h-[430px]">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {photoCarouselItems.map((photo, index) => (
            <div
              key={photo.src}
              className="relative h-full w-full shrink-0"
              aria-hidden={index !== activeIndex}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 680px, calc(100vw - 32px)"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />

        <p className="absolute left-4 top-4 rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-pink)] px-3 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0_var(--mv-black)] sm:left-5 sm:top-5 sm:text-sm">
          Fotos
        </p>

        <div className="absolute bottom-4 left-4 right-7 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-9 lg:right-12">
          <p className="max-w-[68%] text-sm font-black uppercase leading-tight text-white sm:text-base">
            Bodas, fiestas, pasacalles
          </p>
          <p className="rounded-full border-2 border-[var(--mv-white)] bg-[var(--mv-black)] px-3 py-2 text-xs font-black text-white">
            {activeIndex + 1}/{total}
          </p>
        </div>

        <button
          className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] text-black shadow-[3px_3px_0_var(--mv-black)] transition hover:bg-[var(--mv-pink)] sm:left-4"
          type="button"
          aria-label="Foto anterior"
          onClick={goToPrevious}
        >
          <ChevronLeft aria-hidden="true" size={24} />
        </button>
        <button
          className="absolute right-6 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] text-black shadow-[3px_3px_0_var(--mv-black)] transition hover:bg-[var(--mv-pink)] sm:right-8 lg:right-10"
          type="button"
          aria-label="Foto siguiente"
          onClick={goToNext}
        >
          <ChevronRight aria-hidden="true" size={24} />
        </button>
      </div>

      <div className="grid gap-3 border-t-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] px-3 py-3 sm:px-4 lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:gap-5 lg:p-5">
        <div className="flex items-center justify-center gap-2">
          {photoCarouselItems.map((photo, index) => (
            <button
              key={photo.src}
              className={`h-3 rounded-full border-2 border-[var(--mv-black)] transition-all ${
                index === activeIndex
                  ? "w-8 bg-[var(--mv-pink)]"
                  : "w-3 bg-[var(--mv-white)]"
              }`}
              type="button"
              aria-label={`Ver foto ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 lg:gap-3 xl:grid-cols-4">
          {siteConfig.social.map((social) => {
            const Icon =
              socialIcons[social.label as keyof typeof socialIcons] ?? Music4;

            return (
              <a
                key={social.label}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] px-2 text-[0.68rem] font-black uppercase text-black shadow-[3px_3px_0_var(--mv-black)] transition hover:-translate-y-0.5 hover:bg-[var(--mv-pink)] sm:px-3 lg:min-h-[64px] lg:flex-col lg:gap-1 lg:rounded-lg lg:text-sm lg:shadow-[4px_4px_0_var(--mv-black)] xl:flex-row"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir ${social.label} de Charanga Malavida`}
              >
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 lg:h-7 lg:w-7"
                  strokeWidth={3}
                />
                <span>{social.label}</span>
              </a>
            );
          })}
        </div>

        <div
          data-lume-banner
          className="hidden rounded-lg border-[3px] border-[var(--mv-black)] bg-[var(--mv-pink)] text-black shadow-[4px_4px_0_var(--mv-black)] lg:block lg:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="mv-display text-[2.4rem] uppercase leading-none sm:text-[3rem] lg:text-[4.5rem]">
              LUME
            </p>
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] text-2xl shadow-[3px_3px_0_var(--mv-black)] sm:h-14 sm:w-14 sm:text-3xl lg:h-20 lg:w-20 lg:text-5xl"
              aria-hidden="true"
            >
              🪵
            </span>
          </div>
          <p className="mt-1 text-xs font-black uppercase leading-tight sm:text-sm lg:mt-2 lg:text-base">
            Fiesta con sello Malavida
          </p>
        </div>
      </div>
    </div>
  );
}
