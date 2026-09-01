"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Tracks which section is currently centered in the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Copy-to-clipboard with a transient "copied" flag keyed by an id. */
export function useClipboard(timeout = 1600) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    (text: string, key?: string) => {
      if (typeof navigator === "undefined" || !navigator.clipboard) return;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(key ?? text);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setCopied(null), timeout);
        })
        .catch(() => {});
    },
    [timeout],
  );

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return { copied, copy };
}

/** True only after the component has mounted on the client. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Locks body scroll while `locked` is true (used by the mobile menu). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
