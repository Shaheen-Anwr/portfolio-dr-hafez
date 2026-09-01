import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, kicker, title, intro, action, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-28 py-16 sm:py-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent/60" />
                <span className="kicker">{kicker}</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-3xl font-semibold sm:text-4xl md:text-5xl">
                <span className="text-gradient">{title}</span>
              </h2>
            </Reveal>
            {intro ? (
              <Reveal delay={0.1}>
                <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>
              </Reveal>
            ) : null}
          </div>
          {action ? (
            <Reveal delay={0.12} className="shrink-0">
              {action}
            </Reveal>
          ) : null}
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
