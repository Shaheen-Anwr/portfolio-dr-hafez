"use client";

import { awards } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IconTrophy } from "@/components/icons";

export function Recognition() {
  const pick = usePick();
  const t = useUI();

  return (
    <Section id="recognition" kicker={t.recognition.kicker} title={t.recognition.heading}>
      <div className="grid gap-4">
        {awards.map((award, i) => (
          <Reveal key={i}>
            <article className="card relative flex items-center gap-6 overflow-hidden border-gold/25 bg-gradient-to-br from-gold/[0.07] to-transparent p-6 sm:p-8">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" aria-hidden />
              <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-gold/40 text-gold">
                <IconTrophy className="h-6 w-6" />
              </span>
              <p className="relative font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                {pick(award)}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
