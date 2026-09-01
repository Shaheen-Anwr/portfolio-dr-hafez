"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function Experience() {
  const pick = usePick();
  const t = useUI();
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 55%"],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <Section id="experience" kicker={t.experience.kicker} title={t.experience.heading}>
      <div ref={railRef} style={{ position: "relative" }} className="ms-2">
        <div className="absolute inset-y-1 start-0 w-px bg-line" aria-hidden />
        <motion.div
          className="absolute inset-y-1 start-0 w-px origin-top bg-accent"
          style={{ scaleY: reduce ? 1 : railScale }}
          aria-hidden
        />

        <ol className="relative space-y-10">
          {experience.map((job, i) => (
            <li key={i} className="relative ps-8 sm:ps-10">
              <span
                className={cn(
                  "absolute -start-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg",
                  job.current && "pulse-dot",
                )}
                aria-hidden
              />
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-accent">
                    {pick(job.period)}
                  </span>
                  {job.current ? (
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[0.65rem] font-medium text-accent">
                      {t.experience.current}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink sm:text-xl">
                  {pick(job.institution)}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {pick(job.role)} · {pick(job.location)}
                </p>
                <ul className="mt-4 space-y-2">
                  {pick(job.points).map((point, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
