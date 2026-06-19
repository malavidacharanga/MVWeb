"use client";

import {
  ChevronDown,
  ChevronUp,
  Play,
  Volume2,
  VolumeX
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { videoReelItems } from "@/lib/mock-data";

const AUTOPLAY_MS = 10000;

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

export function VideoReelCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [allowsAutoplay, setAllowsAutoplay] = useState(true);
  const [hasUserStarted, setHasUserStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const total = videoReelItems.length;

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "150px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateAutoplayPreference() {
      const saveData = (navigator as NavigatorWithConnection).connection
        ?.saveData;
      setAllowsAutoplay(!reducedMotion.matches && !saveData);
    }

    updateAutoplayPreference();
    reducedMotion.addEventListener("change", updateAutoplayPreference);

    return () =>
      reducedMotion.removeEventListener("change", updateAutoplayPreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = isMuted;

    if (!isInView || (!allowsAutoplay && !hasUserStarted)) {
      video.pause();
      return;
    }

    video.play().catch(() => undefined);
  }, [activeIndex, allowsAutoplay, hasUserStarted, isInView, isMuted]);

  useEffect(() => {
    if (!allowsAutoplay || !isInView || isPaused || total <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, allowsAutoplay, isInView, isPaused, total]);

  if (total === 0) {
    return null;
  }

  const activeVideo = videoReelItems[activeIndex];
  const shouldAttachSource = isInView && (allowsAutoplay || hasUserStarted);

  function goToPrevious() {
    setHasUserStarted(true);
    setActiveIndex((current) => (current - 1 + total) % total);
  }

  function goToNext() {
    setHasUserStarted(true);
    setActiveIndex((current) => (current + 1) % total);
  }

  function goToVideo(index: number) {
    setHasUserStarted(true);
    setActiveIndex(index);
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-lg border-[3px] border-[var(--mv-white)] bg-[var(--mv-black)] text-white shadow-[5px_5px_0_var(--mv-white)] sm:shadow-[8px_8px_0_var(--mv-white)] lg:max-w-none"
      onBlur={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        data-reel-carousel
        className="relative aspect-[9/16] min-h-[460px] overflow-hidden bg-black"
      >
        {shouldAttachSource ? (
          <video
            key={activeVideo.src}
            ref={videoRef}
            aria-label={activeVideo.ariaLabel}
            className="h-full w-full object-cover"
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            src={activeVideo.src}
          />
        ) : null}

        {!allowsAutoplay && !hasUserStarted && isInView ? (
          <button
            className="absolute left-1/2 top-1/2 z-10 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-pink)] text-black shadow-[4px_4px_0_var(--mv-black)]"
            type="button"
            aria-label="Reproducir video"
            onClick={() => setHasUserStarted(true)}
          >
            <Play aria-hidden="true" size={28} fill="currentColor" />
          </button>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 to-transparent" />

        <p className="absolute left-4 top-4 rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-pink)] px-3 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0_var(--mv-black)]">
          Videos
        </p>

        <button
          className="absolute right-3 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] text-black shadow-[3px_3px_0_var(--mv-black)] transition hover:bg-[var(--mv-pink)]"
          type="button"
          aria-label={isMuted ? "Activar sonido" : "Silenciar video"}
          onClick={() => {
            setHasUserStarted(true);
            setIsMuted((current) => !current);
          }}
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
              {activeVideo.title}
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
            onClick={() => goToVideo(index)}
          />
        ))}
      </div>
    </div>
  );
}
