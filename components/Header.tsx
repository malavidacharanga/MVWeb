"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/mock-data";

const navItems = [
  { label: "Historia", href: "/#historia" },
  { label: "Agenda", href: "/agenda" },
  { label: "Mapa", href: "/#mapa" },
  { label: "Media", href: "/#media" },
  { label: "Arreglos", href: "/#repertorio" }
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[var(--mv-black)] bg-[var(--mv-white)]">
      <div className="container-shell flex min-h-20 items-center justify-between gap-4">
        <Link className="flex items-center gap-3" href="/#inicio">
          <Image
            src="/logo/logo.webp"
            alt="Charanga Malavida"
            width={72}
            height={72}
            priority
            className="h-14 w-14 rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] object-contain"
          />
          <span className="mv-display hidden text-2xl uppercase leading-none text-black sm:block">
            Malavida
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="rounded-full px-4 py-2 text-sm font-black uppercase text-black transition hover:bg-[var(--mv-pink-soft)]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            className="mv-button inline-flex min-h-11 items-center gap-2 bg-[var(--mv-white)] px-4 py-2 text-sm font-black uppercase text-black"
            href="/agenda"
          >
            <CalendarDays aria-hidden="true" size={18} />
            Agenda
          </Link>
          <a
            className="mv-button inline-flex min-h-11 items-center gap-2 bg-[var(--mv-pink)] px-4 py-2 text-sm font-black uppercase text-black"
            href={siteConfig.contact.whatsappHref}
          >
            <MessageCircle aria-hidden="true" size={18} />
            Contratar
          </a>
        </div>

        <button
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-pink)] text-black xl:hidden"
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] xl:hidden">
          <nav className="container-shell flex flex-col py-4" aria-label="Móvil">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="border-b-2 border-[var(--mv-black)] py-4 text-base font-black uppercase"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              className="mv-button mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--mv-pink)] px-5 py-3 font-black uppercase text-black"
              href={siteConfig.contact.whatsappHref}
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle aria-hidden="true" size={19} />
              Contratar la charanga
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
