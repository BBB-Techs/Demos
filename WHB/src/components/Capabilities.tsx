"use client";

import { motion } from "motion/react";
import { capabilities } from "@/lib/content";

export function Capabilities() {
  return (
    <section id="capabilities" className="container-page py-28 md:py-36">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-copper">
          What we move
        </p>
        <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
          One rep firm, three product worlds.
        </h2>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="rounded-2xl border border-border bg-white p-8"
          >
            <p className="font-mono text-xs text-slate">{cap.stat}</p>
            <h3 className="font-display mt-3 text-2xl font-semibold text-ink">
              {cap.label}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              {cap.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
