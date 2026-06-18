import { ArrowRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ZamoraMap } from "@/components/ZamoraMap";
import { DisplayEventsResult } from "@/lib/events";

type ZamoraMapPreviewProps = {
  events: DisplayEventsResult["events"];
  mode: DisplayEventsResult["mode"];
};

export function ZamoraMapPreview({ events, mode }: ZamoraMapPreviewProps) {
  const isPastFallback = mode === "past";

  return (
    <section id="mapa" className="section-band bg-[var(--mv-white)]">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-10">
        <div>
          <SectionHeading
            eyebrow="Mapa"
            title="Actuaciones en Zamora"
            description={
              isPastFallback
                ? "Últimos pueblos y plazas donde ha sonado Malavida."
                : "Mapa de actuaciones de Charanga Malavida en Zamora, conectado al calendario real."
            }
          />
          <div className="mt-6 space-y-4 text-base font-bold leading-7 text-[#161616]/75 sm:mt-7 sm:text-lg sm:leading-8">
            <p>
              Localiza de un vistazo dónde suena la charanga: fiestas
              populares, pasacalles, peñas y música en directo por la provincia.
            </p>
          </div>

          <a
            className="mv-button mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--mv-pink)] px-5 py-3 font-black uppercase text-black sm:w-fit"
            href="/agenda"
          >
            Ver agenda completa
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>

        <div className="mv-sticker overflow-hidden bg-[var(--mv-paper)]">
          <div className="flex items-center justify-between gap-3 border-b-[3px] border-[var(--mv-black)] bg-[var(--mv-pink)] px-4 py-3 text-black sm:px-5">
            <p className="flex items-center gap-2 text-xs font-black uppercase sm:text-sm">
              <MapPin aria-hidden="true" size={18} />
              Provincia de Zamora
            </p>
            <p className="text-xs font-black uppercase sm:text-sm">
              {events.length} {events.length === 1 ? "fecha" : "fechas"}
            </p>
          </div>
          <ZamoraMap events={events} />
        </div>
      </div>
    </section>
  );
}
