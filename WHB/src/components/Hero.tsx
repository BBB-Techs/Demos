"use client";

import { motion } from "motion/react";
import { withBasePath } from "@/lib/basePath";

const headline = ["Proud to support", "the best", "in the business."];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-ink"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={withBasePath("/video/hero-loop.mp4")} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

      <div className="container-page relative z-10 pt-16 md:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-blue-light"
        >
          Manufacturer&rsquo;s Representative · Southeast U.S.
        </motion.p>

        <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-6xl md:text-7xl">
          {headline.map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: EASE }}
                className="block"
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-6 max-w-md text-base text-paper/70 md:text-lg"
        >
          Wiggs, Haun &amp; Bohan connects twenty-three trusted plumbing, HVAC, and
          building-supply brands to the contractors and distributors of seven
          Southeastern states.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="cursor-pointer rounded-full bg-blue px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-blue-light"
          >
            Contact Sales
          </a>
          <a
            href="#territory"
            className="cursor-pointer rounded-full border border-paper/30 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper/60"
          >
            View Territory
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-6 rounded-full border border-paper/40 p-1"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-copper" />
        </motion.div>
      </motion.div>
    </section>
  );
}
