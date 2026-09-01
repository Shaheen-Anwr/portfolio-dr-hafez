"use client";

import { institutionsMarquee } from "@/lib/content";
import { useUI } from "@/components/providers/LocaleProvider";
import { PathGlyph } from "@/components/ui/Brand";

export function Marquee() {
  const t = useUI();
  const items = [...institutionsMarquee, ...institutionsMarquee];

  return (
    <section aria-label={t.marqueeLead} className="relative border-y border-line py-6">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 sm:px-8">
        <span className="hidden shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-faint md:block">
          {t.marqueeLead}
        </span>
        <div className="marquee-group relative flex-1 overflow-hidden mask-fade-x">
          <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
            {items.map((name, i) => (
              <span key={`${name}-${i}`} className="flex items-center gap-10 text-sm text-muted">
                <span>{name}</span>
                <PathGlyph className="h-3.5 w-3.5 text-accent/40" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
