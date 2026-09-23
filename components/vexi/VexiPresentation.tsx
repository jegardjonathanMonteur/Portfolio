import { VEXI_MODES, VEXI_TAGLINE } from "@/lib/vexi";

export function VexiPresentation() {
  return (
    <section
      id="presentation"
      className="mx-auto max-w-5xl px-6 pb-24 pt-16 md:px-12"
    >
      <p className="mb-4 font-sans text-xs uppercase tracking-[0.28em] text-vexi-accent">
        Jeu mobile
      </p>
      <h1 className="font-display text-[clamp(3rem,12vw,8rem)] font-light leading-[0.95] tracking-[0.12em] text-[#E8E0D0]">
        Vexi
      </h1>
      <p className="mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-[#E8E0D0]/70 md:text-lg">
        {VEXI_TAGLINE}
      </p>

      <h2 className="mb-8 mt-20 font-sans text-xs uppercase tracking-[0.24em] text-[#E8E0D0]/50">
        Six modes
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {VEXI_MODES.map((mode) => (
          <li
            key={mode.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6"
          >
            <h3 className="font-sans text-sm uppercase tracking-[0.18em] text-[#E8E0D0]">
              {mode.name}
            </h3>
            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-[#E8E0D0]/60">
              {mode.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
