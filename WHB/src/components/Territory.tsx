"use client";

import { motion } from "motion/react";
import { territory } from "@/lib/content";
import { UsMap } from "@/components/UsMap";

export function Territory() {
  return (
    <section
      id="territory"
      className="border-y border-border bg-ink py-28 md:py-36"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-light">
                  Territory
                </p>
                <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                  A footprint across the Southeast.
                </h2>
              </div>
              <div className="font-mono shrink-0 text-5xl font-medium text-copper">
                07
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/60 md:text-base">
              Seven states, one point of contact for the manufacturers we
              represent and the contractors who depend on them, run out of our
              Nashville office and 25,000 sq. ft. warehouse.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {territory.map((state, i) => (
                <motion.span
                  key={state}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-center gap-2.5 rounded-full border border-paper/15 px-4 py-2 text-sm font-medium text-paper/85"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                  {state}
                </motion.span>
              ))}
            </div>
          </div>

          <UsMap />
        </div>
      </div>
    </section>
  );
}
