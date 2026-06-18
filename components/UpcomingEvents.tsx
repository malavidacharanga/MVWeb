import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { DisplayEventsResult } from "@/lib/events";

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "long"
});

type UpcomingEventsProps = {
  eventResult: DisplayEventsResult;
};

export function UpcomingEvents({ eventResult }: UpcomingEventsProps) {
  const { events, mode } = eventResult;
  const isPastFallback = mode === "past";

  return (
    <section id="actuaciones" className="section-band bg-[var(--mv-pink-soft)]">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Agenda"
            title={isPastFallback ? "Últimas actuaciones" : "Próximas actuaciones"}
            description={
              isPastFallback
                ? "Ahora mismo no hay fechas futuras publicadas; mientras tanto, estas son las últimas actuaciones de Malavida."
                : "Fechas destacadas para seguir a Malavida por Zamora y reservar la charanga con margen."
            }
          />
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              className="mv-button inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--mv-white)] px-5 py-3 font-black uppercase text-black sm:w-fit"
              href="/agenda"
            >
              Ver agenda completa
              <CalendarDays aria-hidden="true" size={18} />
            </a>
            <a
              className="mv-button inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--mv-pink)] px-5 py-3 font-black uppercase text-black sm:w-fit"
              href="#contacto"
            >
              Reservar una fecha
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.slug}
              className="mv-sticker bg-[var(--mv-white)] p-5 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:flex-col xl:flex-row">
                <div className="min-w-0">
                  <p className="inline-flex rounded-full border-2 border-[var(--mv-black)] bg-[var(--mv-pink)] px-3 py-1 text-xs font-black uppercase text-black">
                    {event.type}
                  </p>
                  <h3 className="mv-display mt-3 text-[2rem] uppercase leading-none text-black sm:text-4xl">
                    {event.title}
                  </h3>
                </div>
                <div className="w-fit rounded-md border-[3px] border-[var(--mv-black)] bg-[var(--mv-black)] px-3 py-2 text-center text-xs font-black uppercase text-white sm:text-sm">
                  {dateFormatter.format(new Date(event.date))}
                </div>
              </div>
              <p className="mt-5 flex items-center gap-2 text-base font-black text-black">
                <MapPin aria-hidden="true" size={18} />
                {event.municipality}, Zamora
              </p>
              <p className="mt-3 flex items-center gap-2 text-base font-black text-black">
                <CalendarDays aria-hidden="true" size={18} />
                {event.time}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
