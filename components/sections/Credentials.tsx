"use client";

import { certifications } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IconCheck } from "@/components/icons";

export function Credentials() {
  const pick = usePick();
  const t = useUI();

  return (
    <Section id="credentials" kicker={t.credentials.kicker} title={t.credentials.heading}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={i} delay={(i % 3) * 0.05}>
            <article className="card group flex h-full gap-4 p-5 transition-colors hover:border-line-strong">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                <IconCheck className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-display text-sm font-semibold leading-snug text-ink">
                  {pick(c.title)}
                </h3>
                <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-wide text-faint">
                  {pick(c.issuer)}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
