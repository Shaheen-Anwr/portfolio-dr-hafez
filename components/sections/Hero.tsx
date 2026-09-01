"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile, researchModel } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { MediationDiagram } from "@/components/ui/MediationDiagram";
import { IconArrowDown, IconLinkedin, IconMail, IconOrcid } from "@/components/icons";

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 dot-field [mask-image:radial-gradient(ellipse_64%_54%_at_50%_36%,#000_4%,transparent_80%)]" />
      <div className="absolute -left-[10%] -top-[16%] h-[38rem] w-[38rem] rounded-full bg-accent/10 blur-[130px] [animation:blob-drift-a_26s_ease-in-out_infinite]" />
      <div className="absolute -right-[12%] top-[8%] h-[32rem] w-[32rem] rounded-full bg-indigo-500/10 blur-[140px] [animation:blob-drift-b_30s_ease-in-out_infinite]" />

      {/* ambient path-model constellation */}
      <svg
        className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_72%_62%_at_50%_40%,#000,transparent_76%)]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <g
          className="text-accent/[0.09]"
          stroke="currentColor"
          fill="none"
          strokeWidth="1"
          style={{ animation: "constellation-drift 20s ease-in-out infinite" }}
        >
          <path d="M120 630 L300 470" />
          <path d="M300 470 L520 560" />
          <path d="M300 470 L470 300" />
          <path d="M470 300 L700 250" />
          <path d="M700 250 L900 380" />
          <path d="M900 380 L1080 250" />
          <path d="M520 560 L760 610" />
        </g>
        <g
          className="text-accent/30"
          fill="currentColor"
          style={{ animation: "constellation-drift 20s ease-in-out infinite" }}
        >
          {[
            [120, 630, 3], [300, 470, 4.5], [520, 560, 3], [470, 300, 3.5],
            [700, 250, 4.5], [900, 380, 3], [1080, 250, 3.5], [760, 610, 3],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}

function RotatingWord({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [reduce, words.length]);

  if (reduce) return <span className="accent-gradient font-display">{words[0]}</span>;

  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="accent-gradient font-display inline-block"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function HeroModel() {
  const pick = usePick();
  return (
    <div className="plate relative overflow-hidden p-5">
      <div className="absolute inset-0 plot-grid opacity-[0.45] [mask-image:radial-gradient(120%_100%_at_50%_20%,#000,transparent_80%)]" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-px w-5 bg-accent/50" />
          <span className="kicker">{pick(researchModel.heroKicker)}</span>
        </div>
        <span className="font-mono text-[0.6rem] uppercase tracking-wider text-faint">Farid · 2021</span>
      </div>

      <div className="relative mx-auto mt-1 h-[16.5rem] w-full max-w-[22rem]">
        <MediationDiagram
          animate
          labels={{
            antecedent: pick(researchModel.antecedent),
            mediator: pick(researchModel.mediator),
            outcome: pick(researchModel.outcome),
          }}
        />
      </div>

      <div className="relative mt-1 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3 font-mono text-[0.62rem] leading-relaxed text-faint">
        {pick(researchModel.legend).map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const pick = usePick();
  const t = useUI();
  const spotRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  const name = pick(profile.name);
  const words = name.split(" ");
  const focus = pick(profile.specializations);

  function handleMove(e: React.MouseEvent) {
    const el = spotRef.current;
    if (!el) return;
    const { clientX, clientY } = e;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - r.left}px`);
      el.style.setProperty("--my", `${clientY - r.top}px`);
    });
  }

  return (
    <section
      id="top"
      onMouseMove={handleMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      <HeroBackdrop />
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 30%), color-mix(in oklab, var(--color-accent) 8%, transparent), transparent 45%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <div className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs tracking-wide text-muted">{t.hero.availability}</span>
            </div>

            <h1 className="mt-7 text-balance text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.03] tracking-tight">
              {words.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="rise me-[0.28em] inline-block text-gradient"
                  style={{ animationDelay: `${100 + i * 70}ms` }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="rise mt-5 max-w-xl text-base text-muted sm:text-lg" style={{ animationDelay: "260ms" }}>
              {pick(profile.role)}
            </p>

            <div
              className="rise mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-lg"
              style={{ animationDelay: "320ms" }}
            >
              <span className="text-sm text-faint">{t.hero.focusLead}</span>
              <RotatingWord words={focus} />
            </div>

            <p
              className="rise mt-7 max-w-xl text-sm leading-relaxed text-muted sm:text-base"
              style={{ animationDelay: "380ms" }}
            >
              {pick(profile.intro)}
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "440ms" }}>
              <Magnetic strength={0.25}>
                <a
                  href="#research"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] active:scale-95"
                >
                  {t.hero.exploreResearch}
                  <IconArrowDown className="h-4 w-4" />
                </a>
              </Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
              >
                {t.hero.getInTouch}
              </a>

              <span className="mx-1 hidden h-6 w-px bg-line sm:block" />

              <div className="flex items-center gap-2">
                {[
                  { href: `mailto:${profile.email}`, Icon: IconMail, label: "Email" },
                  { href: profile.linkedin, Icon: IconLinkedin, label: "LinkedIn" },
                  { href: profile.orcidUrl, Icon: IconOrcid, label: "ORCID" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <dl
              className="rise mt-12 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
              style={{ animationDelay: "520ms" }}
            >
              {[
                { n: "16", l: pick({ en: "years teaching", ar: "سنة تدريس" }) },
                { n: "10+", l: pick({ en: "publications", ar: "بحثًا" }) },
                { n: "5", l: pick({ en: "institutions", ar: "مؤسسات" }) },
                { n: "GCC", l: pick({ en: "available", ar: "متاح" }) },
              ].map((s) => (
                <div key={s.l} className="bg-bg px-4 py-3.5">
                  <dd className="font-display text-xl font-semibold text-ink">{s.n}</dd>
                  <dt className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-faint">{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="rise hidden lg:block" style={{ animationDelay: "560ms" }}>
            <HeroModel />
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="rise absolute inset-x-0 bottom-7 mx-auto hidden w-fit flex-col items-center gap-2 text-faint sm:flex"
        style={{ animationDelay: "900ms" }}
        aria-label={t.hero.scroll}
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em]">{t.hero.scroll}</span>
        <IconArrowDown className="h-4 w-4 [animation:scroll-nudge_1.8s_ease-in-out_infinite]" />
      </a>
    </section>
  );
}
