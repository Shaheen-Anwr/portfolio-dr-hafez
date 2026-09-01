"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { about, profile, researchModel } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { MediationDiagram } from "@/components/ui/MediationDiagram";
import { IconArrowUpRight, IconQuote } from "@/components/icons";

/**
 * There is no photograph. In its place: the doctoral model itself, drawn as a
 * figure plate — the antecedent → mediator → outcome structure that defines the
 * whole research record, with the monogram sitting in the mediator position.
 */
function PortraitCard() {
  const pick = usePick();
  const t = useUI();
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 16 });
  const sry = useSpring(ry, { stiffness: 150, damping: 16 });

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.figure
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className="plate group relative aspect-[4/5] w-full max-w-[20rem] overflow-hidden"
    >
      <div className="absolute inset-0 plot-grid opacity-[0.5] [mask-image:radial-gradient(120%_100%_at_50%_30%,#000,transparent_78%)]" />

      <span className="absolute left-8 top-[11px] z-10 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-accent/80">
        {pick(researchModel.figLabel)}
      </span>

      <div className="absolute inset-x-4 top-10 bottom-[4.75rem]">
        <MediationDiagram
          labels={{
            antecedent: pick(researchModel.antecedent),
            mediator: pick(researchModel.mediator),
            outcome: pick(researchModel.outcome),
          }}
          mediatorGlyph={pick({ en: "HF", ar: "ح ف" })}
          mediatorSubLabel={pick(researchModel.mediator)}
        />
      </div>

      {!reduce ? (
        <span className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-accent/15 to-transparent [animation:scan-y_6s_ease-in-out_infinite]" />
      ) : null}

      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-accent/50" />
      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-accent/50" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-accent/50" />
      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-accent/50" />

      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-panel via-panel/90 to-transparent p-4">
        <p className="font-display text-sm font-semibold text-ink">{pick(profile.name)}</p>
        <p className="mt-1 text-[0.7rem] leading-snug text-muted">{pick(researchModel.figCaption)}</p>
      </figcaption>
    </motion.figure>
  );
}

export function About() {
  const pick = usePick();
  const t = useUI();
  const body = pick(about.body);
  const facts: { label: string; value: string; href?: string }[] = [
    { label: t.about.factRole, value: pick(profile.role) },
    { label: t.about.factBased, value: pick(profile.location) },
    { label: t.about.factLanguages, value: pick(about.languages).join(" · ") },
    { label: t.about.factDoctorate, value: pick({ en: "Business Administration, 2021", ar: "إدارة الأعمال، ٢٠٢١" }) },
    { label: t.about.factOrcid, value: profile.orcid, href: profile.orcidUrl },
  ];

  return (
    <Section id="about" kicker={t.about.kicker} title={t.about.heading}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-6 bg-accent/50" />
            <span className="kicker">{t.about.figKicker}</span>
          </div>
          <PortraitCard />
          <ul className="mt-4 grid gap-1.5 font-mono text-[0.7rem] leading-relaxed text-faint">
            {pick(researchModel.legend).map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-accent/70">·</span>
                {line}
              </li>
            ))}
          </ul>
          <dl className="mt-7 space-y-0 text-sm">
            {facts.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-3"
              >
                <dt className="pt-0.5 font-mono text-[0.7rem] uppercase tracking-wider text-faint">
                  {f.label}
                </dt>
                <dd className="text-ink">
                  {f.href ? (
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:underline"
                    >
                      {f.value}
                      <IconArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : (
                    f.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-ink/90">{body[0]}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <figure className="my-8 border-s-2 border-accent/50 ps-5">
              <IconQuote className="h-5 w-5 text-accent/70" />
              <blockquote className="mt-2 font-display text-lg font-medium leading-snug text-ink">
                {pick({
                  en: "Job satisfaction as the mechanism that links ethical climate to human-resource sustainability.",
                  ar: "الرضا الوظيفي بوصفه الآلية التي تربط المناخ الأخلاقي باستدامة الموارد البشرية.",
                })}
              </blockquote>
              <figcaption className="mt-2 font-mono text-xs text-faint">
                {pick({ en: "— Doctoral research focus", ar: "— محور بحث الدكتوراه" })}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="leading-relaxed text-muted">{body[1]}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {t.about.focusHeading}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {pick(about.focusAreas).map((area) => (
                <Chip key={area} className="border-line-strong bg-white/[0.04] px-3.5 py-1.5 text-sm text-ink">
                  {area}
                </Chip>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
