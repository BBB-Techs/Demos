"use client";

import { Stagger, StaggerItem, CountUp } from "./motion";
import { STATS } from "@/lib/content";

export default function Stats() {
  return (
    <section className="relative border-y border-line bg-white/60 py-14">
      <div className="container-x">
        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-4">
          {STATS.map((s) => (
            <StaggerItem key={s.label} className="text-center lg:text-left">
              <div className="display-2 font-black tabular-nums text-brand-deep">
                {s.format === "year" ? (
                  <CountUp value={s.value} duration={1.2} />
                ) : (
                  <CountUp value={s.value} suffix={"suffix" in s ? s.suffix : ""} />
                )}
              </div>
              <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
