import { PhotoCarousel } from "@/components/PhotoCarousel";
import { SectionHeading } from "@/components/SectionHeading";
import { VideoReelCarousel } from "@/components/VideoReelCarousel";

export function MediaSection() {
  return (
    <section id="media" className="section-band bg-[var(--mv-black)] text-white">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Media"
          title="Fotos y vídeos para enseñar cómo suena Malavida"
          description="Una muestra del ambiente, el repertorio y la energía que la charanga lleva a cada actuación."
          theme="dark"
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="overflow-hidden rounded-lg border-[3px] border-[var(--mv-white)] bg-[var(--mv-white)] text-black shadow-[5px_5px_0_var(--mv-pink)] sm:shadow-[8px_8px_0_var(--mv-pink)]">
            <PhotoCarousel />
          </article>

          <VideoReelCarousel />
        </div>
      </div>
    </section>
  );
}
