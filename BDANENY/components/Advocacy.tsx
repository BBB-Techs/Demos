"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { ADVOCACY } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

export default function Advocacy() {
  return (
    <section id="advocacy" className="section overflow-hidden">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line shadow-xl shadow-brand/10">
            <Image
              src={withBasePath("/photos/advocacy.png")}
              alt="BDANENY families and advocates at Washington Days, standing together with the National Bleeding Disorders Foundation"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 42vw, 92vw"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-line bg-white px-5 py-4 shadow-lg sm:block">
            <p className="text-2xl font-black text-brand-deep">2</p>
            <p className="text-xs text-muted">levels of advocacy</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="kicker text-green-deep">{ADVOCACY.kicker}</p>
            <h2 className="display-2 mt-4">{ADVOCACY.title}</h2>
            <p className="mt-5 max-w-lg text-muted">{ADVOCACY.body}</p>
          </Reveal>

          <Stagger className="mt-8 space-y-4">
            {ADVOCACY.items.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex gap-4 rounded-2xl border border-line bg-white/70 p-5">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-green" aria-hidden />
                  <div>
                    <h3 className="font-bold text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <a href={ADVOCACY.cta.href} className="btn btn-primary mt-8">
              {ADVOCACY.cta.label}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
