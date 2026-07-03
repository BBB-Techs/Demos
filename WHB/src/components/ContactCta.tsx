"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function ContactCta() {
  return (
    <section id="contact" className="container-page pb-28 md:pb-36">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center md:px-16 md:py-24"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, var(--color-blue) 0%, transparent 45%), radial-gradient(circle at 80% 90%, var(--color-copper) 0%, transparent 40%)",
          }}
        />
        <div className="relative">
          <h2 className="font-display mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-paper sm:text-4xl md:text-5xl">
            Let&rsquo;s talk territory, lines, and lead times.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-paper/60 md:text-base">
            Contractors, distributors, and manufacturers — reach the WHB team
            directly.
          </p>
          <a
            href="mailto:office@whbsales.com"
            className="group mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-blue-light hover:text-paper"
          >
            office@whbsales.com
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-paper/60">
            <a href="tel:+16153508334" className="hover:text-paper">
              615-350-8334
            </a>
            <span>Fax 615-350-8559</span>
            <span>7:30&ndash;4:30, Monday&ndash;Friday</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
