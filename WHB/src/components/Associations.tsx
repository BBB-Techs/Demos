"use client";

import { motion } from "motion/react";
import { associations } from "@/lib/content";

export function Associations() {
  return (
    <section className="border-t border-border bg-paper-dim py-24 md:py-28">
      <div className="container-page">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-copper">
          Industry Standing
        </p>
        <h2 className="font-display mt-4 max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Active where the industry sets its standards.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {associations.map((a, i) => (
            <motion.div
              key={a.abbr}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-white p-7"
            >
              <div className="font-display flex h-12 w-12 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper">
                {a.abbr.replace("/", "")}
              </div>
              <h3 className="font-display mt-5 text-base font-semibold text-ink">
                {a.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {a.blurb}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
