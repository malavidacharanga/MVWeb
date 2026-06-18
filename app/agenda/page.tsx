import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, MapPin } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDisplayEvents } from "@/lib/events";
import { siteConfig } from "@/lib/mock-data";
import type { EventItem } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agenda | Charanga Malavida",
  description:
    "Consulta las proximas actuaciones de Charanga Malavida, charanga en Zamora para fiestas populares, pasacalles, bodas y musica en directo.",
  openGraph: {
    title: "Agenda | Charanga Malavida",
    description:
      "Proximas actuaciones de Charanga Malavida: charanga en Zamora para fiestas, pasacalles y musica en directo.",
    url: "https://charangamalavida.es/agenda",
    images: [
      {
        url: "/logo/logo.png",
        width: 1600,
        height: 1600,
        alt: "Logo de Charanga Malavida"
      }
    ]
  }
};

const AGENDA_EVENTS_LIMIT = 50;

const monthFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "long",
  year: "numeric",
  timeZone: "Europe/Madrid"
});

const dayFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  timeZone: "Europe/Madrid"
});

const shortMonthFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "short",
  timeZone: "Europe/Madrid"
});

const weekdayFormatter = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  timeZone: "Europe/Madrid"
});

type MonthGroup = {
  key: string;
  label: string;
  events: EventItem[];
};

export default async function AgendaPage() {
  const eventResult = await getDisplayEvents(AGENDA_EVENTS_LIMIT);
  const { events, mode } = eventResult;
  const isPastFallback = mode === "past";
  const monthGroups = groupEventsByMonth(events);

  return (
    <>
      <Header />
      <Link
        aria-label="Volver a la home"
        className="mv-button fixed bottom-4 left-4 z-40 inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--mv-pink)] px-5 py-3 text-sm font-black uppercase text-black"
        href="/#inicio"
      >
        <ArrowLeft aria-hidden="true" size={18} />
        Inicio
      </Link>

      <main>
        <section
          id="calendario"
          className="bg-[var(--mv-paper)] py-8 pb-24 sm:py-10 sm:pb-24 lg:py-12"
        >
          <div className="container-shell">
            {isPastFallback ? (
              <p className="mb-6 border-b-[3px] border-[var(--mv-black)] pb-4 text-sm font-black uppercase text-black">
                Ahora mismo no hay fechas futuras publicadas. Mostramos las
                ultimas actuaciones.
              </p>
            ) : null}

            <div className="space-y-10">
              {monthGroups.map((group) => (
                <section key={group.key} aria-labelledby={`month-${group.key}`}>
                  <div className="border-b-[3px] border-[var(--mv-black)] pb-3">
                    <h1
                      id={`month-${group.key}`}
                      className="mv-display text-[clamp(2.2rem,10vw,4.25rem)] uppercase leading-none text-black"
                    >
                      {group.label}
                    </h1>
                  </div>

                  <div className="mt-5 grid gap-5">
                    {group.events.map((event) => (
                      <AgendaEventCard key={event.slug} event={event} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contacto-agenda"
          className="section-band bg-[var(--mv-pink-soft)]"
        >
          <div className="container-shell">
            <div className="mv-sticker grid gap-6 bg-[var(--mv-white)] p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase text-[#161616]/70">
                  Quieres una fecha para tu fiesta?
                </p>
                <h2 className="mv-display mt-2 text-[clamp(2.3rem,11vw,4.75rem)] uppercase leading-none text-black">
                  Dinos dia, pueblo y tipo de evento
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  className="mv-button inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--mv-pink)] px-5 py-3 font-black uppercase text-black sm:w-auto lg:w-full"
                  href={siteConfig.contact.whatsappHref}
                >
                  Contratar la charanga
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
                <Link
                  className="mv-button inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--mv-white)] px-5 py-3 font-black uppercase text-black sm:w-auto lg:w-full"
                  href="/#contacto"
                >
                  Ver contacto
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function AgendaEventCard({ event }: { event: EventItem }) {
  const eventDate = new Date(event.date);

  return (
    <article className="mv-sticker grid gap-5 bg-[var(--mv-white)] p-4 sm:grid-cols-[8rem_1fr] sm:p-5 lg:grid-cols-[9rem_1fr] lg:items-center">
      <div className="rounded-md border-[3px] border-[var(--mv-black)] bg-[var(--mv-black)] p-3 text-center text-white">
        <p className="mv-display text-5xl uppercase leading-none sm:text-6xl">
          {dayFormatter.format(eventDate)}
        </p>
        <p className="mt-1 text-xs font-black uppercase text-[var(--mv-pink)] sm:text-sm">
          {shortMonthFormatter.format(eventDate)}
        </p>
        <p className="mt-2 border-t-2 border-white/30 pt-2 text-xs font-black uppercase text-white/80">
          {weekdayFormatter.format(eventDate)}
        </p>
      </div>

      <div className="min-w-0">
        <h2 className="mv-display text-[clamp(2rem,9vw,3.75rem)] uppercase leading-none text-black">
          {event.title}
        </h2>

        <div className="mt-4 grid gap-3 text-base font-black text-black md:grid-cols-[minmax(0,1fr)_auto]">
          <p className="flex min-w-0 items-start gap-2">
            <MapPin
              aria-hidden="true"
              className="mt-1 shrink-0 text-[var(--mv-pink-dark)]"
              size={19}
            />
            <span className="min-w-0 break-words">{event.location}</span>
          </p>
          <p className="flex items-start gap-2">
            <Clock
              aria-hidden="true"
              className="mt-1 shrink-0 text-[var(--mv-pink-dark)]"
              size={19}
            />
            {event.time}
          </p>
        </div>
      </div>
    </article>
  );
}

function groupEventsByMonth(events: EventItem[]): MonthGroup[] {
  const groups = new Map<string, MonthGroup>();

  events.forEach((event) => {
    const date = new Date(event.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    const existingGroup = groups.get(key);

    if (existingGroup) {
      existingGroup.events.push(event);
      return;
    }

    groups.set(key, {
      key,
      label: monthFormatter.format(date),
      events: [event]
    });
  });

  return Array.from(groups.values());
}
