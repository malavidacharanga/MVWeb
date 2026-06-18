import Image from "next/image";
import { Disc3, Instagram, Mail, Music4, Youtube } from "lucide-react";
import { siteConfig } from "@/lib/mock-data";

const socialIcons = {
  Instagram,
  TikTok: Music4,
  YouTube: Youtube,
  Spotify: Disc3
};

export function Footer() {
  return (
    <footer className="border-t-[3px] border-[var(--mv-black)] bg-[var(--mv-black)] py-10 text-white">
      <div className="container-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Image
            src="/logo/logo.png"
            alt="Charanga Malavida"
            width={78}
            height={78}
            className="h-14 w-14 shrink-0 rounded-full border-[3px] border-[var(--mv-white)] bg-[var(--mv-white)] object-contain sm:h-16 sm:w-16"
          />
          <div className="min-w-0">
            <p className="mv-display text-2xl uppercase leading-none sm:text-3xl">
              {siteConfig.name}
            </p>
            <p className="mt-1 text-sm font-bold text-white/75">
              Música en directo en Zamora
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {siteConfig.social.map((item) => {
            const Icon = socialIcons[item.label as keyof typeof socialIcons];

            return (
              <a
                key={item.label}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--mv-white)] px-4 py-2 text-sm font-black uppercase transition hover:bg-[var(--mv-pink)] hover:text-black sm:w-auto"
                href={item.href}
              >
                {Icon ? <Icon aria-hidden="true" size={17} /> : null}
                {item.label}
              </a>
            );
          })}
          <a
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--mv-white)] px-4 py-2 text-sm font-black uppercase transition hover:bg-[var(--mv-pink)] hover:text-black sm:w-auto"
            href={`mailto:${siteConfig.contact.email}`}
          >
            <Mail aria-hidden="true" size={17} />
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
