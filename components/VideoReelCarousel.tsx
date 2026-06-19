"use client";

import { ChevronDown, ChevronUp, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { videoReelItems } from "@/lib/mock-data";

const AUTOPLAY_MS = 10000;

export function VideoReelCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const total = videoReelItems.length;

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      video.muted = isMuted;

      if (index === activeIndex) {
        video.currentTime = video.currentTime || 0;
        video.play().catch(() => undefined);
        return;
      }

      video.pause();
    });
  }, [activeIndex, isMuted]);

  useEffect(() => {
    if (isPaused || total <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [isPaused, total]);

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + total) % total);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % total);
  }

  if (total === 0) {
    return null;
  }

  const translateY = `-${activeIndex * 100}%`;

  return (
    <div
      className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-lg border-[3px] border-[var(--mv-white)] bg-[var(--mv-black)] text-white shadow-[5px_5px_0_var(--mv-white)] sm:shadow-[8px_8px_0_var(--mv-white)] lg:max-w-none"
      onBlur={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        data-reel-carousel
        className="relative aspect-[9/16] min-h-[460px] overflow-hidden"
      >
        <div
          className="flex h-full flex-col transition-transform duration-500 ease-out"
          style={{ transform: `translateY(${translateY})` }}
        >
          {videoReelItems.map((video, index) => (
            <div
              key={video.src}
              className="relative h-full w-full shrink-0 bg-black"
              aria-hidden={index !== activeIndex}
            >
              <video
                ref={(element) => {
                  videoRefs.current[index] = element;
                }}
                aria-label={video.ariaLabel}
                className="h-full w-full object-cover"
                loop
                muted={isMuted}
                playsInline
                preload={index === activeIndex ? "auto" : "none"}
                src={video.src}
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 to-transparent" />

        <p className="absolute left-4 top-4 rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-pink)] px-3 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0_var(--mv-black)]">
          Videos
        </p>

        <button
          className="absolute right-3 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] text-black shadow-[3px_3px_0_var(--mv-black)] transition hover:bg-[var(--mv-pink)]"
          type="button"
          aria-label={isMuted ? "Activar sonido" : "Silenciar vídeo"}
          onClick={() => setIsMuted((current) => !current)}
        >
          {isMuted ? (
            <VolumeX aria-hidden="true" size={22} />
          ) : (
            <Volume2 aria-hidden="true" size={22} />
          )}
        </button>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase text-[var(--mv-pink)]">
              Reels Malavida
            </p>
            <h3 className="mv-display mt-1 text-[2rem] uppercase leading-none text-white">
              {videoReelItems[activeIndex].title}
            </h3>
          </div>
          <p className="shrink-0 rounded-full border-2 border-[var(--mv-white)] bg-[var(--mv-black)] px-3 py-2 text-xs font-black text-white">
            {activeIndex + 1}/{total}
          </p>
        </div>

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-3">
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] text-black shadow-[3px_3px_0_var(--mv-black)] transition hover:bg-[var(--mv-pink)]"
            type="button"
            aria-label="Video anterior"
            onClick={goToPrevious}
          >
            <ChevronUp aria-hidden="true" size={24} />
          </button>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-pink)] text-black shadow-[3px_3px_0_var(--mv-black)] transition hover:bg-[var(--mv-white)]"
            type="button"
            aria-label="Video siguiente"
            onClick={goToNext}
          >
            <ChevronDown aria-hidden="true" size={24} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 border-t-[3px] border-[var(--mv-white)] bg-[var(--mv-white)] px-4 py-3">
        {videoReelItems.map((video, index) => (
          <button
            key={video.src}
            className={`h-3 rounded-full border-2 border-[var(--mv-black)] transition-all ${
              index === activeIndex
                ? "w-7 bg-[var(--mv-pink)]"
                : "w-3 bg-[var(--mv-white)]"
            }`}
            type="button"
            aria-label={`Ver video ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
