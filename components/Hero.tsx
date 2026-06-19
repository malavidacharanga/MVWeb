import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Disc3,
  Instagram,
  MapPin,
  Music4,
  Youtube
} from "lucide-react";
import { siteConfig } from "@/lib/mock-data";

const socialIcons = {
  Instagram,
  TikTok: Music4,
  YouTube: Youtube,
  Spotify: Disc3
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[var(--mv-black)] text-white"
    >
      <div className="absolute inset-x-0 top-0 h-4 bg-[var(--mv-pink)]" />
      <div className="absolute bottom-0 left-0 h-4 w-full bg-[var(--mv-pink)]" />
      <Image
        src="/logo/logo.webp"
        alt=""
        width={400}
        height={400}
        priority
        unoptimized
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-12 hidden w-[44vw] max-w-[520px] rounded-full opacity-20 lg:block"
      />

      <div className="container-shell relative flex min-h-[78svh] flex-col justify-center gap-6 py-12 sm:gap-8 md:min-h-[82svh] md:py-16">
        <div className="flex flex-col gap-6 lg:max-w-4xl">
          <Image
            src="/logo/logo.webp"
            alt="Logo de Charanga Malavida"
            width={400}
            height={400}
            priority
            unoptimized
            className="h-auto w-36 rounded-full border-[4px] border-[var(--mv-white)] bg-[var(--mv-white)] object-contain shadow-[6px_6px_0_var(--mv-pink)] sm:w-48 md:w-64"
          />

          <p className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border-[3px] border-[var(--mv-white)] bg-[var(--mv-pink)] px-3 py-2 text-xs font-black uppercase text-black shadow-[4px_4px_0_var(--mv-white)] sm:px-4 sm:text-sm">
            <MapPin aria-hidden="true" size={17} />
            Zamora
          </p>
          <h1 className="mv-display max-w-4xl text-[clamp(3.2rem,15vw,5.4rem)] uppercase leading-none text-white md:text-8xl">
            Charanga Malavida
          </h1>
          <p className="max-w-2xl text-base font-bold leading-7 text-white/85 sm:text-xl sm:leading-9">
            Charanga en Zamora y Castilla y León para fiestas populares,
            pasacalles, bodas, peñas y eventos con música en directo.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            className="mv-button inline-flex min-h-14 w-full items-center justify-center gap-2 bg-[var(--mv-pink)] px-5 py-3 text-base font-black uppercase text-black sm:w-auto sm:px-6"
            href="#contacto"
          >
            Contratar la charanga
            <ArrowRight aria-hidden="true" size={20} />
          </a>
          <a
            className="mv-button inline-flex min-h-14 w-full items-center justify-center gap-2 bg-[var(--mv-white)] px-5 py-3 text-base font-black uppercase text-black sm:w-auto sm:px-6"
            href="/agenda"
          >
            <CalendarDays aria-hidden="true" size={20} />
            Ver proximas actuaciones
          </a>
        </div>

        <div className="grid gap-3 border-t-[3px] border-[var(--mv-white)] pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.social.map((item) => {
            const Icon = socialIcons[item.label as keyof typeof socialIcons];

            return (
              <a
                key={item.label}
                aria-label={`Abrir ${item.label} de Charanga Malavida`}
                className="group flex min-h-14 items-center justify-center gap-3 rounded-full border-2 border-white/45 px-4 text-sm font-black uppercase text-white transition hover:border-[var(--mv-pink)] hover:bg-[var(--mv-pink)] hover:text-black"
                href={item.href}
                rel="noreferrer"
                target="_blank"
              >
                {Icon ? (
                  <Icon
                    aria-hidden="true"
                    className="shrink-0 text-[var(--mv-pink)] transition group-hover:text-black"
                    size={20}
                  />
                ) : null}
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
