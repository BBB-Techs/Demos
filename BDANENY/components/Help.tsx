"use client";

import { Reveal, Stagger, StaggerItem } from "./motion";
import { HELP } from "@/lib/content";

const ICONS: Record<string, React.ReactNode> = {
  Scholarships: (
    <path d="M12 3 2 8l10 5 8-4v6M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  "Emergency Assistance": (
    <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Zm0 5v6m0 3h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  "BDA Cares Grant": (
    <path d="M12 20.5s-7.5-4.4-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3.5c0 5.6-7.5 10-7.5 10Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
  ),
  Camperships: (
    <path d="m4 18 5-9 3 5 2-3 6 7H4Zm4-13a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
};

export default function Help() {
  return (
    <section id="help" className="section bg-brand-deep text-white">
      <div className="container-x">
        <Reveal className="max-w-xl">
          <p className="kicker text-orange">{HELP.kicker}</p>
          <h2 className="display-2 mt-4">{HELP.title}</h2>
          <p className="mt-5 text-white/75">{HELP.body}</p>
        </Reveal>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HELP.programs.map((p) => (
            <StaggerItem key={p.title}>
              <div className="group h-full rounded-2xl border border-white/15 bg-white/5 p-6 transition-colors duration-300 hover:border-orange/50 hover:bg-white/10">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange/15 text-orange transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                    {ICONS[p.title]}
                  </svg>
                </span>
                <h3 className="mt-4 text-lg font-extrabold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10">
          <a href={HELP.cta.href} className="btn btn-coral">
            {HELP.cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
