"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  modelKind,
  profile,
  publications,
  pubThemes,
  researchInProgress,
  type ModelKind,
  type Publication,
  type ThemeKey,
} from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FilterChip } from "@/components/ui/Chip";
import { IconArrowUpRight, IconSearch, IconX } from "@/components/icons";
import { cn } from "@/lib/cn";

type Origin = "all" | "en" | "ar";
type Order = "newest" | "oldest";

const CHART_YEARS = [2020, 2021, 2022, 2023, 2024, 2025];
const MODEL_ORDER: ModelKind[] = ["mediation", "moderation", "direct"];

/** Tiny path-diagram icon for a paper's methodological shape. */
function ModelGlyph({ kind, className }: { kind: ModelKind; className?: string }) {
  return (
    <svg viewBox="0 0 34 20" className={className} fill="none" stroke="currentColor" aria-hidden>
      {kind === "mediation" && (
        <>
          <path d="M7 13.5 15 6.5" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M19 6.5 27 13.5" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8 16.5h18" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="0.1 3" opacity="0.7" />
          <circle cx="17" cy="5" r="2.4" fill="currentColor" stroke="none" />
          <circle cx="5" cy="15" r="1.9" strokeWidth="1.4" />
          <circle cx="29" cy="15" r="1.9" strokeWidth="1.4" />
        </>
      )}
      {kind === "moderation" && (
        <>
          <path d="M7 13h20" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M17 6.5v4.2M17 13l-1.7-2.2M17 13l1.7-2.2" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="17" cy="4.5" r="2.4" fill="currentColor" stroke="none" />
          <circle cx="5" cy="13" r="1.9" strokeWidth="1.4" />
          <circle cx="29" cy="13" r="1.9" strokeWidth="1.4" />
        </>
      )}
      {kind === "direct" && (
        <>
          <path d="M8 10h16M24 10l-2.4-2.2M24 10l-2.4 2.2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="5" cy="10" r="1.9" strokeWidth="1.4" />
          <circle cx="29" cy="10" r="1.9" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[0.7rem] uppercase tracking-wider text-faint">{label}</span>
      <div className="flex rounded-full border border-line p-0.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              value === o.value ? "bg-accent text-bg" : "text-muted hover:text-ink",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function YearChart({ data }: { data: { year: number; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="flex h-32 items-end gap-2 sm:gap-3">
      {data.map((d, i) => (
        <div key={d.year} className="flex flex-1 flex-col items-center gap-2">
          <span className="font-mono text-[0.7rem] text-muted">{d.count || ""}</span>
          <div
            className="w-full origin-bottom rounded-t bg-gradient-to-t from-accent/25 to-accent/70 [animation:grow-bar_0.7s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ height: Math.max(4, Math.round((d.count / max) * 92)), animationDelay: `${i * 60}ms` }}
          />
          <span className="font-mono text-[0.65rem] text-faint">{`’${String(d.year).slice(2)}`}</span>
        </div>
      ))}
    </div>
  );
}

function PublicationCard({ pub, index }: { pub: Publication; index: number }) {
  const pick = usePick();
  const t = useUI();
  const kind = modelKind(pub.title.en);
  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="group card relative overflow-hidden p-5 sm:p-6"
    >
      <span className="absolute inset-y-0 start-0 w-0.5 scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="flex shrink-0 items-baseline gap-3 sm:w-24 sm:flex-col sm:items-start sm:gap-1">
          <span className="font-mono text-xs text-faint">{String(index).padStart(2, "0")}</span>
          <span className="font-display text-2xl font-semibold text-ink/80">{pub.year}</span>
          <span className="mt-1 hidden items-center gap-1.5 sm:flex" title={t.research[kind]}>
            <ModelGlyph kind={kind} className="h-3.5 w-6 text-accent/70" />
            <span className="font-mono text-[0.58rem] uppercase tracking-wide text-faint">
              {t.research[kind]}
            </span>
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-balance font-display text-base font-semibold leading-snug text-ink">
            {pick(pub.title)}
          </h3>
          <p className="mt-2 text-sm text-muted">
            <span className="text-ink/80">{pick(pub.journal)}</span>
            <span className="text-faint"> · {pick(pub.publisher)}</span>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-line bg-white/[0.02] px-2.5 py-0.5 font-mono text-[0.7rem] text-muted">
              {pick(pub.issue)} · {pick(pub.date)}
            </span>
            {pub.themes.map((th) => {
              const meta = pubThemes.find((x) => x.key === th);
              return meta ? (
                <span key={th} className="rounded-full border border-accent/25 bg-accent/[0.07] px-2.5 py-0.5 text-[0.7rem] text-accent">
                  {pick(meta.label)}
                </span>
              ) : null;
            })}
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.65rem] uppercase text-faint">
              {pub.origin === "ar" ? t.research.langAr : t.research.langEn}
            </span>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export function Research() {
  const pick = usePick();
  const t = useUI();

  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<ThemeKey | "all">("all");
  const [origin, setOrigin] = useState<Origin>("all");
  const [order, setOrder] = useState<Order>("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications
      .filter((p) => {
        if (theme !== "all" && !p.themes.includes(theme)) return false;
        if (origin !== "all" && p.origin !== origin) return false;
        if (q) {
          const hay = `${p.title.en} ${p.title.ar} ${p.journal.en} ${p.journal.ar} ${p.publisher.en} ${p.publisher.ar}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => (order === "newest" ? b.sort - a.sort : a.sort - b.sort));
  }, [query, theme, origin, order]);

  const chartData = useMemo(
    () => CHART_YEARS.map((year) => ({ year, count: publications.filter((p) => p.year === year).length })),
    [],
  );

  const mix = useMemo(() => {
    const counts: Record<ModelKind, number> = { mediation: 0, moderation: 0, direct: 0 };
    for (const p of publications) counts[modelKind(p.title.en)] += 1;
    const max = Math.max(1, ...Object.values(counts));
    return MODEL_ORDER.map((kind) => ({ kind, count: counts[kind], pct: (counts[kind] / max) * 100 }));
  }, []);

  const dirty = query !== "" || theme !== "all" || origin !== "all";
  function clearAll() {
    setQuery("");
    setTheme("all");
    setOrigin("all");
  }

  const orcidButton = (
    <a
      href={profile.orcidUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
    >
      {t.research.orcid}
      <IconArrowUpRight className="h-4 w-4" />
    </a>
  );

  return (
    <Section
      id="research"
      kicker={t.research.kicker}
      title={t.research.heading}
      intro={t.research.sub}
      action={orcidButton}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
        <Reveal className="order-2 lg:order-1">
          <div className="card p-4 sm:p-5">
            <div className="relative">
              <IconSearch className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.research.search}
                className="w-full rounded-lg border border-line bg-bg/60 py-2.5 pe-3 ps-9 text-sm text-ink placeholder:text-faint focus:border-accent/50 focus:outline-none"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <FilterChip active={theme === "all"} onClick={() => setTheme("all")}>
                {t.all}
              </FilterChip>
              {pubThemes.map((th) => (
                <FilterChip key={th.key} active={theme === th.key} onClick={() => setTheme(th.key)}>
                  {pick(th.label)}
                </FilterChip>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Segmented<Origin>
                label={t.research.language}
                value={origin}
                onChange={setOrigin}
                options={[
                  { value: "all", label: t.all },
                  { value: "en", label: t.research.langEn },
                  { value: "ar", label: t.research.langAr },
                ]}
              />
              <Segmented<Order>
                label={t.research.sort}
                value={order}
                onChange={setOrder}
                options={[
                  { value: "newest", label: t.research.newest },
                  { value: "oldest", label: t.research.oldest },
                ]}
              />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <span className="font-mono text-xs text-faint">
                {t.research.showing(filtered.length, publications.length)}
              </span>
              {dirty ? (
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline"
                >
                  <IconX className="h-3 w-3" />
                  {t.research.clear}
                </button>
              ) : null}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="order-1 lg:order-2">
          <div className="card flex h-full flex-col gap-5 p-4 sm:p-5">
            <div>
              <h3 className="font-mono text-[0.7rem] uppercase tracking-wider text-faint">
                {t.research.byYear}
              </h3>
              <div className="mt-4">
                <YearChart data={chartData} />
              </div>
            </div>

            <div className="border-t border-line pt-4">
              <h3 className="font-mono text-[0.7rem] uppercase tracking-wider text-faint">
                {t.research.modelMix}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {mix.map((row) => (
                  <li key={row.kind} className="flex items-center gap-2.5">
                    <ModelGlyph kind={row.kind} className="h-4 w-6 shrink-0 text-accent/75" />
                    <span className="w-[4.5rem] shrink-0 text-xs text-muted">{t.research[row.kind]}</span>
                    <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                      <span
                        className="absolute inset-y-0 start-0 rounded-full bg-accent/60"
                        style={{ width: `${row.pct}%` }}
                      />
                    </span>
                    <span className="w-4 shrink-0 text-end font-mono text-xs text-faint">{row.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-8">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.ul layout className="grid gap-3">
              {filtered.map((pub, i) => (
                <PublicationCard key={pub.id} pub={pub} index={i + 1} />
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card grid place-items-center p-12 text-center text-sm text-muted"
            >
              {t.research.empty}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Reveal className="mt-3">
        <div className="card relative flex items-start gap-4 border-dashed border-accent/40 p-5 sm:p-6">
          <span className="mt-1.5 flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <div>
            <span className="font-mono text-[0.7rem] uppercase tracking-wider text-accent">
              {t.research.inProgress}
            </span>
            <p className="mt-1.5 font-display text-base font-medium leading-snug text-ink">
              {pick(researchInProgress[0])}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
