"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** seconds */
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Scroll-reveal wrapper that never ships hidden content in SSR / first paint.
 * - SSR & first client paint: plain, visible.
 * - After mount: elements already on screen stay put; only off-screen ones arm
 *   the fade-up so it plays as they scroll in.
 * - Reduced motion / no JS: always visible.
 */
export function Reveal({ children, className, delay = 0, y = 20, once = true }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"static" | "animate">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    if (!inView) setMode("animate");
  }, [reduce]);

  if (mode === "static") {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
