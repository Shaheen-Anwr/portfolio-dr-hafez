"use client";

import { navItems, profile } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { BrandMark } from "@/components/ui/Brand";
import { IconArrowUpRight, IconLinkedin, IconMail, IconOrcid } from "@/components/icons";

export function Footer() {
  const pick = usePick();
  const t = useUI();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <BrandMark />
              <span className="font-display text-sm font-semibold text-ink">{pick(profile.name)}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{pick(profile.role)}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-muted transition-colors hover:text-ink"
              >
                {pick(item.label)}
              </a>
            ))}
          </nav>

          <div className="flex gap-2">
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

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {pick(profile.name)}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <span>{t.footer.builtWith}</span>
            <a href="#top" className="inline-flex items-center gap-1 text-muted transition-colors hover:text-ink">
              {t.backToTop}
              <IconArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
