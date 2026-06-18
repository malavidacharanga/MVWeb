import Image from "next/image";
import { MessageCircle, Sparkles } from "lucide-react";
import { ArrangementsCarousel } from "@/components/ArrangementsCarousel";
import { SectionHeading } from "@/components/SectionHeading";
import { arrangementsContact, scorePreviewImages } from "@/lib/mock-data";

export function Repertorio() {
  return (
    <section id="repertorio" className="section-band bg-[var(--mv-paper)]">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Arreglos"
            title="Partituras listas para sonar"
            description="Arreglos propios para charanga, preparados para ensayar, tocar en calle y mover la fiesta con sello Malavida."
          />
          <div className="mv-button flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--mv-pink)] px-5 py-3 font-black uppercase text-black sm:w-fit">
            <Sparkles aria-hidden="true" size={18} />
            Audios y partituras
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="order-3 mv-sticker bg-[var(--mv-black)] p-5 text-white sm:p-6 lg:order-1 lg:col-span-2 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-7">
            <div className="max-w-3xl">
              <h3 className="mv-display text-[2.6rem] uppercase leading-none text-white sm:text-[3.5rem] lg:text-[4.5rem]">
                Compra los arreglos
              </h3>
              <p className="mt-3 text-base font-bold leading-7 text-white/80 lg:max-w-2xl lg:text-lg">
                Para comprar partituras o pedir arreglos, contacta por
                WhatsApp en el {arrangementsContact.phoneLabel}.
              </p>
            </div>
            <a
              className="mv-button mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--mv-pink)] px-5 py-3 text-center font-black uppercase text-black sm:w-fit lg:mt-0 lg:min-w-[240px]"
              href={arrangementsContact.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle aria-hidden="true" size={19} />
              Comprar partituras
            </a>
          </div>

          <div className="order-1 lg:order-2">
            <ArrangementsCarousel />
          </div>

          <aside className="order-2 grid gap-5 lg:order-3">
            <div className="mv-sticker relative min-h-[360px] overflow-hidden bg-[var(--mv-pink-soft)] p-4 sm:min-h-[430px] sm:p-6 lg:min-h-[460px] xl:min-h-[500px]">
              <p className="relative z-20 inline-flex rounded-full border-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] px-3 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0_var(--mv-black)]">
                Partituras reales
              </p>

              <div className="absolute inset-x-4 bottom-6 top-16 sm:inset-x-8 sm:bottom-8 sm:top-20">
                <div className="absolute left-0 top-10 w-[76%] -rotate-6 rounded-lg border-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] p-2 shadow-[6px_6px_0_var(--mv-black)]">
                  <Image
                    src={scorePreviewImages[0].src}
                    alt={scorePreviewImages[0].alt}
                    width={900}
                    height={1250}
                    sizes="(min-width: 1024px) 360px, 72vw"
                    className="h-auto w-full rounded-sm object-cover"
                  />
                </div>

                <div className="absolute right-0 top-0 w-[76%] rotate-4 rounded-lg border-[3px] border-[var(--mv-black)] bg-[var(--mv-white)] p-2 shadow-[6px_6px_0_var(--mv-pink-dark)]">
                  <Image
                    src={scorePreviewImages[1].src}
                    alt={scorePreviewImages[1].alt}
                    width={900}
                    height={1250}
                    sizes="(min-width: 1024px) 360px, 72vw"
                    className="h-auto w-full rounded-sm object-cover"
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
