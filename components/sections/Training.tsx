"use client";

import { training, trainingAreas, profile } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Magnetic } from "@/components/ui/Magnetic";
import { IconArrowUpRight, IconGlobe } from "@/components/icons";

export function Training() {
  const pick = usePick();
  const t = useUI();
  const [featured, ...rest] = training;

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    pick({ en: "Training programme enquiry", ar: "استفسار عن برنامج تدريبي" }),
  )}`;

  return (
    <Section id="training" kicker={t.training.kicker} title={t.training.heading} intro={t.training.sub}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal className="lg:col-span-3">
          <article className="card relative overflow-hidden border-accent/25 p-6 sm:p-8">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" aria-hidden />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[0.65rem] font-medium text-accent">
                    <IconGlobe className="h-3 w-3" />
                    {t.training.international}
                  </span>
                  <span className="font-mono text-xs text-faint">{pick(featured.period)}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                  {pick(featured.org)}
                </h3>
                <p className="text-sm text-muted">{pick(featured.place)}</p>
              </div>
            </div>

            <div className="relative mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-bg/40 p-4">
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-accent">
                  {t.training.program}
                </span>
                <p className="mt-1.5 text-sm leading-relaxed text-ink">{pick(featured.program!)}</p>
              </div>
              <div className="rounded-xl border border-line bg-bg/40 p-4">
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-accent">
                  {t.training.client}
                </span>
                <p className="mt-1.5 text-sm text-ink">{pick(featured.client!)}</p>
                <ul className="mt-3 space-y-1.5">
                  {pick(featured.points).map((p, i) => (
                    <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </Reveal>

        {rest.map((eng, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <article className="card h-full p-6">
              <span className="font-mono text-xs text-faint">{pick(eng.period)}</span>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">{pick(eng.org)}</h3>
              <p className="text-sm text-muted">{pick(eng.place)}</p>
              <ul className="mt-4 space-y-2">
                {pick(eng.points).map((p, j) => (
                  <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">{t.training.areas}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {pick(trainingAreas).map((area) => (
            <Chip key={area} className="border-line-strong bg-white/[0.04] px-3.5 py-1.5 text-sm text-ink">
              {area}
            </Chip>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <div className="card relative flex flex-col items-start gap-4 overflow-hidden bg-gradient-to-br from-accent/[0.08] to-transparent p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-xl">
            <h3 className="font-display text-lg font-semibold text-ink">{t.training.availabilityTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.training.availabilityBody}</p>
          </div>
          <Magnetic strength={0.2}>
            <a
              href={mailto}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] active:scale-95"
            >
              {t.training.availabilityCta}
              <IconArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
        </div>
      </Reveal>
    </Section>
  );
}
