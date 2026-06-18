type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light"
}: SectionHeadingProps) {
  const titleClass = theme === "dark" ? "text-white" : "text-black";
  const descriptionClass = theme === "dark" ? "text-white/80" : "text-[#161616]/75";

  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      <p className="mb-3 inline-flex max-w-full rounded-full border-2 border-[var(--mv-black)] bg-[var(--mv-pink)] px-3 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0_var(--mv-black)] sm:px-4 sm:text-sm">
        {eyebrow}
      </p>
      <h2 className={`mv-display text-[clamp(2.2rem,10vw,3.75rem)] uppercase leading-none lg:text-6xl ${titleClass}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-base leading-7 sm:text-lg sm:leading-8 ${descriptionClass}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
