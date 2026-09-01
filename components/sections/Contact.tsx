"use client";

import { useState } from "react";
import { profile } from "@/lib/content";
import { usePick, useUI } from "@/components/providers/LocaleProvider";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { useClipboard } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import {
  IconArrowUpRight,
  IconCheck,
  IconCopy,
  IconLinkedin,
  IconMail,
  IconMapPin,
  IconOrcid,
  IconPhone,
} from "@/components/icons";

function Field({
  id,
  label,
  type = "text",
  textarea,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const shared =
    "peer w-full rounded-xl border border-line bg-bg/50 px-3.5 pb-2.5 pt-6 text-sm text-ink placeholder:text-transparent focus:border-accent/50 focus:outline-none";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          placeholder={label}
          required={required}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(shared, "resize-none")}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={label}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-3.5 top-2 font-mono text-[0.65rem] uppercase tracking-wider text-faint transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-muted peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-accent"
      >
        {label}
      </label>
    </div>
  );
}

export function Contact() {
  const pick = usePick();
  const t = useUI();
  const { copied, copy } = useClipboard();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      pick({ en: `Portfolio enquiry — ${name}`, ar: `استفسار من الموقع — ${name}` }),
    );
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  const rows = [
    {
      key: "email",
      Icon: IconMail,
      label: t.contact.email,
      value: profile.email,
      action: () => copy(profile.email, "email"),
      copyable: true,
    },
    {
      key: "phone",
      Icon: IconPhone,
      label: pick({ en: "Phone", ar: "الهاتف" }),
      value: pick(profile.phoneDisplay),
      action: () => copy(profile.phoneHref, "phone"),
      copyable: true,
    },
    {
      key: "location",
      Icon: IconMapPin,
      label: pick({ en: "Location", ar: "الموقع" }),
      value: pick(profile.location),
    },
    {
      key: "linkedin",
      Icon: IconLinkedin,
      label: "LinkedIn",
      value: profile.linkedinHandle,
      href: profile.linkedin,
    },
    {
      key: "orcid",
      Icon: IconOrcid,
      label: "ORCID",
      value: profile.orcid,
      href: profile.orcidUrl,
    },
  ];

  return (
    <Section id="contact" kicker={t.contact.kicker} title={t.contact.heading} intro={t.contact.body}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">{t.contact.direct}</h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {rows.map(({ key, Icon, label, value, action, href, copyable }) => (
              <li key={key} className="flex items-center gap-4 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line text-muted">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[0.65rem] uppercase tracking-wider text-faint">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-ink hover:text-accent"
                    >
                      {value}
                      <IconArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : (
                    <p className="truncate text-sm text-ink">{value}</p>
                  )}
                </div>
                {copyable ? (
                  <button
                    type="button"
                    onClick={action}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {copied === key ? (
                      <>
                        <IconCheck className="h-3 w-3" /> {t.copied}
                      </>
                    ) : (
                      <>
                        <IconCopy className="h-3 w-3" /> {t.copy}
                      </>
                    )}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={handleSubmit} className="card space-y-4 p-6 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="cf-name" label={t.contact.name} value={name} onChange={setName} required />
              <Field id="cf-email" label={t.contact.email} type="email" value={email} onChange={setEmail} required />
            </div>
            <Field id="cf-message" label={t.contact.message} textarea value={message} onChange={setMessage} required />
            <Magnetic strength={0.15}>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.01] active:scale-95 sm:w-auto"
              >
                <IconMail className="h-4 w-4" />
                {t.contact.send}
              </button>
            </Magnetic>
            <p className="font-mono text-[0.7rem] text-faint">{t.contact.note}</p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
