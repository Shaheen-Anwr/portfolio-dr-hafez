"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { navItems, profile } from "@/lib/content";
import { useLocale, usePick, useUI } from "@/components/providers/LocaleProvider";
import { useActiveSection, useScrollLock } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/ui/Magnetic";
import { BrandMark } from "@/components/ui/Brand";
import { IconDownload, IconGlobe, IconMenu, IconX } from "@/components/icons";

const CV_FILE = "/Dr-Hafez-Farid-CV.pdf";
const CV_DOWNLOAD_NAME = "Dr-Hafez-Mohamed-Farid-CV.pdf";

const SECTION_IDS = navItems.map((n) => n.id);

function LangToggle({ className }: { className?: string }) {
  const { toggle } = useLocale();
  const t = useUI();
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-ink",
        className,
      )}
      aria-label={`Switch language to ${t.otherLangName}`}
    >
      <IconGlobe className="h-3.5 w-3.5" />
      {t.otherLangName}
    </button>
  );
}

export function Header() {
  const { dir } = useLocale();
  const pick = usePick();
  const t = useUI();
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
      >
        {t.skipToContent}
      </a>

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <BrandMark />
          <span className="hidden font-display text-sm font-semibold tracking-tight text-ink sm:block">
            {pick(profile.shortName)}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {pick(item.label)}
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-px h-px bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LangToggle />
          <Magnetic strength={0.25}>
            <a
              href={CV_FILE}
              download={CV_DOWNLOAD_NAME}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] active:scale-95"
            >
              <IconDownload className="h-4 w-4" />
              {t.downloadCv}
            </a>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink md:hidden"
          aria-label={t.menu}
        >
          <IconMenu className="h-5 w-5" />
        </button>
      </div>

      <motion.div
        style={{ scaleX: progress }}
        className={cn(
          "h-px bg-gradient-to-r from-accent via-accent to-transparent",
          dir === "rtl" ? "origin-right" : "origin-left",
        )}
      />

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-display text-sm font-semibold text-ink">{pick(profile.shortName)}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink"
                aria-label={t.close}
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-line py-4 font-display text-2xl font-semibold text-ink"
                >
                  <span className="me-3 font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {pick(item.label)}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center gap-3 px-6 pb-10">
              <LangToggle />
              <a
                href={CV_FILE}
                download={CV_DOWNLOAD_NAME}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg"
              >
                <IconDownload className="h-4 w-4" />
                {t.downloadCv}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
