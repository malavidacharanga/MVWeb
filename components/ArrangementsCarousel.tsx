"use client";

import { ChevronLeft, ChevronRight, FileMusic, Music2 } from "lucide-react";
import { useState } from "react";
import { arrangements } from "@/lib/mock-data";

export function ArrangementsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = arrangements.length;

  if (total === 0) {
    return null;
  }

  const activeArrangement = arrangements[activeIndex];

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + total) % total);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % total);
  }

  return (
    <article className="mv-sticker min-w-0 bg-[var(--mv-white)] p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="inline-flex items-center gap-2 rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-pink)] px-3 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0_var(--mv-black)]">
          <FileMusic aria-hidden="true" size={16} />
          Audio de arreglo
        </p>
        <p className="shrink-0 rounded-full border-2 border-[var(--mv-black)] bg-[var(--mv-paper)] px-3 py-2 text-xs font-black text-black">
          {activeIndex + 1}/{total}
        </p>
      </div>

      <div className="mt-6 min-w-0">
        <h3 className="mv-display text-[2.7rem] uppercase leading-none text-black sm:text-[4rem]">
          {activeArrangement.title}
        </h3>
        <p className="mt-3 max-w-2xl font-bold leading-7 text-[#161616]/75">
          {activeArrangement.description}
        </p>
      </div>

      <div className="mt-6 min-w-0 rounded-lg border-[3px] border-[var(--mv-black)] bg-[var(--mv-paper)] p-3 shadow-[4px_4px_0_var(--mv-black)] sm:p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase text-black">
          <Music2 aria-hidden="true" size={18} />
          Escuchar muestra
        </div>
        <audio
          key={activeArrangement.audioSrc}
          className="block w-full max-w-full"
          controls
          preload="none"
          src={activeArrangement.audioSrc}
        >
          Tu navegador no puede reproducir este audio.
        </audio>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <button
            className="mv-button inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-[var(--mv-white)] px-4 py-2 text-sm font-black uppercase text-black sm:flex-none"
            type="button"
            aria-label="Arreglo anterior"
            onClick={goToPrevious}
          >
            <ChevronLeft aria-hidden="true" size={18} />
            Anterior
          </button>
          <button
            className="mv-button inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-[var(--mv-pink)] px-4 py-2 text-sm font-black uppercase text-black sm:flex-none"
            type="button"
            aria-label="Arreglo siguiente"
            onClick={goToNext}
          >
            Siguiente
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 sm:justify-end">
          {arrangements.map((arrangement, index) => (
            <button
              key={arrangement.audioSrc}
              className={`h-3 rounded-full border-2 border-[var(--mv-black)] transition-all ${
                index === activeIndex
                  ? "w-8 bg-[var(--mv-pink)]"
                  : "w-3 bg-[var(--mv-white)]"
              }`}
              type="button"
              aria-label={`Ver arreglo ${arrangement.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
