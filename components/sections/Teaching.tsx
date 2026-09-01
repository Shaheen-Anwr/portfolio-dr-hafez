"use client";

import { useRef } from "react";
import { teachingSubjects } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

function SubjectTile({ index, name, blurb, levels }: { index: number; name: string; blurb: string; levels: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--tx", `${e.clientX - r.left}px`);
    el.style.setProperty("--ty", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="group relative h-full overflow-hidden bg-panel p-6 transition-colors duration-300 hover:bg-surface"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--tx, 50%) var(--ty, 50%), color-mix(in oklab, var(--color-accent) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-faint">{String(index).padStart(2, "0")}</span>
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-faint opacity-0 transition-opacity group-hover:opacity-100">
            {levels}
          </span>
        </div>
        <h3 className="mt-4 font-display text-base font-semibold text-ink">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>
      </div>
    </div>
  );
}

export function Teaching() {
  const pick = usePick();
  const t = useUI();

  return (
    <Section id="teaching" kicker={t.teaching.kicker} title={t.teaching.heading} intro={t.teaching.sub}>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {teachingSubjects.map((s, i) => (
          <Reveal key={i} delay={(i % 3) * 0.05}>
            <SubjectTile
              index={i + 1}
              name={pick(s.name)}
              blurb={pick(s.blurb)}
              levels={t.teaching.levels}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
