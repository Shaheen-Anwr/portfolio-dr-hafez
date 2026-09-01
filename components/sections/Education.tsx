"use client";

import { education } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { IconCap } from "@/components/icons";

export function Education() {
  const pick = usePick();
  const t = useUI();

  return (
    <Section id="education" kicker={t.education.kicker} title={t.education.heading}>
      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((ed, i) => (
          <Reveal key={i} delay={i * 0.04} className={cn(ed.featured && "sm:col-span-2")}>
            <article
              className={cn(
                "card group h-full p-6 transition-colors",
                ed.featured
                  ? "border-gold/30 bg-gradient-to-br from-gold/[0.06] to-transparent"
                  : "hover:border-line-strong",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {ed.featured ? (
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-gold/40 text-gold">
                      <IconCap className="h-4 w-4" />
                    </span>
                  ) : null}
                  <h3
                    className={cn(
                      "font-display font-semibold text-ink",
                      ed.featured ? "text-lg sm:text-xl" : "text-base",
                    )}
                  >
                    {pick(ed.degree)}
                  </h3>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-xs",
                    ed.featured ? "border-gold/40 text-gold" : "border-line text-muted",
                  )}
                >
                  {ed.year}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">{pick(ed.institution)}</p>

              {ed.note ? (
                ed.featured ? (
                  <p className="mt-4 border-s-2 border-gold/40 ps-4 text-sm leading-relaxed text-ink/80">
                    <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-gold">
                      {t.education.dissertation}
                    </span>
                    <span className="mt-1 block">{pick(ed.note)}</span>
                  </p>
                ) : (
                  <p className="mt-3 font-mono text-xs text-faint">{pick(ed.note)}</p>
                )
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
