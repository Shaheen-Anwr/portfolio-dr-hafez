"use client";

import { metrics } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

export function Metrics() {
  const pick = usePick();
  const t = useUI();

  return (
    <Section id="metrics" kicker={t.metrics.kicker} title={t.metrics.heading}>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="group relative h-full bg-panel p-6 transition-colors hover:bg-surface">
              <span className="absolute end-5 top-5 font-mono text-[0.7rem] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="font-display text-4xl font-semibold text-ink sm:text-5xl">
                <span className="accent-gradient">
                  <Counter value={m.value} suffix={m.suffix} />
                </span>
              </div>
              <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted">{pick(m.label)}</p>
              <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
