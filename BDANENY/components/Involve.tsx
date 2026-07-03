"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { INVOLVE } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

export default function Involve() {
  return (
    <section id="involve" className="section">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[1.75rem] border border-line shadow-xl shadow-coral/10">
              <Image
                src={withBasePath("/photos/community.png")}
                alt="A member of the BDANENY community smiling at a walk event, wearing a flower crown"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 32vw, 92vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="kicker text-coral-deep">{INVOLVE.kicker}</p>
              <h2 className="display-2 mt-4">{INVOLVE.title}</h2>
              <p className="mt-5 max-w-lg text-muted">{INVOLVE.body}</p>
            </Reveal>

            <Stagger className="mt-9 grid gap-4 sm:grid-cols-3">
              {INVOLVE.cards.map((c) => (
                <StaggerItem key={c.title}>
                  <div className="card group flex h-full flex-col p-6">
                    <h3 className="font-extrabold text-ink">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted">{c.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep">
                      {c.cta}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
