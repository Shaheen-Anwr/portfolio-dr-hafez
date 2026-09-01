"use client";

import { speaking } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowUpRight, IconMic } from "@/components/icons";

export function Speaking() {
  const pick = usePick();
  const t = useUI();

  return (
    <Section id="speaking" kicker={t.speaking.kicker} title={t.speaking.heading}>
      <ul className="divide-y divide-line border-y border-line">
        {speaking.map((talk, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <li className="group flex items-center gap-5 py-5 transition-[padding] duration-300 hover:ps-2">
              <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                <IconMic className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-base font-semibold text-ink">{pick(talk.title)}</h3>
                <p className="text-sm text-muted">{pick(talk.host)}</p>
              </div>
              <IconArrowUpRight className="h-4 w-4 shrink-0 text-faint opacity-0 transition-opacity group-hover:opacity-100" />
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
