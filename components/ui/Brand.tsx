import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Brand mark — a three-node mediation path model (antecedent → mediator → outcome).
 * It is the through-line of Dr. Farid's research and reads, at a glance, as a
 * peak / apex. Uses `currentColor`, so colour comes from the parent.
 */
export function PathGlyph({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={cn("h-6 w-6", className)}
      aria-hidden
      {...props}
    >
      {/* direct path (c′) */}
      <path d="M6.6 19h10.8" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="0.1 3.2" opacity="0.7" />
      {/* a: antecedent → mediator */}
      <path d="M5.7 16.7 10 7.7" strokeWidth="1.6" strokeLinecap="round" />
      {/* b: mediator → outcome */}
      <path d="M14 7.7 18.3 16.7" strokeWidth="1.6" strokeLinecap="round" />
      {/* nodes */}
      <circle cx="12" cy="5.4" r="2.7" fill="currentColor" stroke="none" />
      <circle cx="4.7" cy="19" r="2.1" strokeWidth="1.6" />
      <circle cx="19.3" cy="19" r="2.1" strokeWidth="1.6" />
    </svg>
  );
}

/** Boxed mark used in the header / footer lockup. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid h-8 w-8 place-items-center rounded-lg border border-line-strong bg-white/[0.03] text-accent transition-colors group-hover:border-accent/50",
        className,
      )}
    >
      <PathGlyph className="h-[18px] w-[18px]" />
    </span>
  );
}
