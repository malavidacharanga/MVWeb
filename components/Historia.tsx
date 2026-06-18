import { Sparkles, UsersRound, Zap } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const highlights = [
  {
    icon: UsersRound,
    value: "Calle",
    label: "Formato cercano para moverse con la fiesta."
  },
  {
    icon: Zap,
    value: "Directo",
    label: "Repertorio reconocible, bailable y adaptable."
  },
  {
    icon: Sparkles,
    value: "Zamora",
    label: "Base local y actuaciones por toda la provincia."
  }
];

export function Historia() {
  return (
    <section id="historia" className="section-band mv-section-dots bg-[var(--mv-paper)]">
      <div className="container-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
        <div className="bg-[var(--mv-paper)]">
          <SectionHeading
            eyebrow="La charanga"
            title="Malavida suena a fiesta de pueblo, calle llena y canción compartida."
            description="Una propuesta directa para quien quiere música en vivo con presencia, ritmo y buen ambiente desde el primer compás."
          />
          <div className="mt-6 space-y-4 text-base font-bold leading-7 text-[#161616]/75 sm:mt-7 sm:text-lg sm:leading-8">
            <p>
              Malavida nace para llevar la energía de una charanga de calle a
              esos momentos en los que una plaza, una peña o una boda necesitan
              música cercana, reconocible y con ritmo.
            </p>
            <p>
              La propuesta combina pasacalles, vermú musical y canciones de
              fiesta para que el público participe desde el primer tema.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.value}
                className="mv-sticker bg-[var(--mv-white)] p-5 sm:p-6"
              >
                <Icon aria-hidden="true" className="text-[#d93d82]" size={30} />
                <h3 className="mv-display mt-4 text-[2rem] uppercase text-black sm:text-4xl">
                  {item.value}
                </h3>
                <p className="mt-2 font-bold leading-7 text-[#161616]/75">
                  {item.label}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
