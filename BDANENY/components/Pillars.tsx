"use client";

import { Reveal, Stagger, StaggerItem } from "./motion";
import { PILLARS } from "@/lib/content";

const ACCENTS: Record<string, { bg: string; text: string; ring: string }> = {
  brand: { bg: "bg-brand-soft", text: "text-brand-deep", ring: "group-hover:ring-brand/25" },
  coral: { bg: "bg-coral/10", text: "text-coral", ring: "group-hover:ring-coral/25" },
  green: { bg: "bg-green/10", text: "text-green", ring: "group-hover:ring-green/25" },
  orange: { bg: "bg-orange/15", text: "text-[#c9701f]", ring: "group-hover:ring-orange/30" },
};

const ICONS: Record<string, React.ReactNode> = {
  education: (
    <path
      d="M4 8.5 12 5l8 3.5-8 3.5-8-3.5Zm4 2v5c0 1.5 2 3 4 3s4-1.5 4-3v-5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  advocacy: (
    <path
      d="M12 3v13m0 0-4-2m4 2 4-2M6 8H3l2 5a2.5 2.5 0 0 0 4.9 0Zm12 0h3l-2 5a2.5 2.5 0 0 1-4.9 0Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  community: (
    <path
      d="M8.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 19c.5-2.8 2.6-4.5 5.5-4.5S13.5 16.2 14 19M13 19c.5-2.6 2.4-4.2 5-4.2s4.5 1.6 5 4.2"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  support: (
    <path
      d="M12 20.5s-7.5-4.4-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3.5c0 5.6-7.5 10-7.5 10Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

export default function Pillars() {
  return (
    <section id="pillars" className="section">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="kicker text-brand">What we do</p>
          <h2 className="display-2 mt-4">
            Four ways we show up for the community.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => {
            const a = ACCENTS[p.accent];
            return (
              <StaggerItem key={p.key}>
                <article className={`card group h-full p-7 ring-0 ring-inset transition-shadow ${a.ring}`}>
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${a.bg} ${a.text} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                      {ICONS[p.key]}
                    </svg>
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold">{p.title}</h3>
                  <p className="mt-2.5 text-[0.98rem] leading-relaxed text-muted">{p.body}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
