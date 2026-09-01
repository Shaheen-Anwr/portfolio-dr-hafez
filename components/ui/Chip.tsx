import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

type FilterChipProps = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function FilterChip({ children, active, onClick, className }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200",
        active
          ? "border-accent/50 bg-accent/12 text-accent"
          : "border-line bg-white/[0.02] text-muted hover:border-line-strong hover:text-ink",
        className,
      )}
    >
      {children}
    </button>
  );
}
