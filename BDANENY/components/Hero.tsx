"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { HERO } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const rise = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Generated ambient background (HiggsField) */}
      <div className="absolute inset-0 -z-10">
        <div
          className="relative h-full w-full"
          style={reduce ? undefined : { animation: "float-slow 22s ease-in-out infinite" }}
        >
          <Image
            src={withBasePath("/brand/hero.png")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>
        {/* Legibility + brand wash: warm cream fading from the left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, var(--color-cream) 6%, rgba(251,252,254,0.82) 34%, rgba(251,252,254,0.35) 62%, rgba(251,252,254,0) 90%)",
          }}
        />
        {/* Soft top fade so the nav reads cleanly */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cream to-transparent" />
      </div>

      <motion.div
        className="container-x pt-28 pb-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={rise}
          className="kicker mb-6 inline-flex items-center gap-2 text-brand"
        >
          <span className="h-px w-8 bg-brand" aria-hidden />
          {HERO.kicker}
        </motion.p>

        <h1 className="display-1 max-w-[16ch]">
          <Line reduce={reduce} delay={0.28}>
            {HERO.title[0]}
          </Line>
          <Line reduce={reduce} delay={0.42}>
            <span className="bg-gradient-to-r from-brand via-green to-coral bg-clip-text text-transparent">
              {HERO.title[1]}
            </span>
          </Line>
        </h1>

        <motion.p
          variants={rise}
          className="mt-7 max-w-[46ch] text-lg text-muted sm:text-xl"
        >
          {HERO.lead}
        </motion.p>

        <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-3">
          <a href={HERO.primary.href} className="btn btn-primary">
            {HERO.primary.label}
            <Arrow />
          </a>
          <a href={HERO.secondary.href} className="btn btn-ghost">
            {HERO.secondary.label}
          </a>
        </motion.div>

        <motion.p variants={rise} className="mt-6 text-sm text-muted/80">
          {HERO.trust}
        </motion.p>
      </motion.div>

      {!reduce && (
        <motion.div
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          aria-hidden
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-ink/25 p-1.5">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-brand"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}

/** One headline line that wipes up from behind a mask on load. */
function Line({
  children,
  reduce,
  delay,
}: {
  children: React.ReactNode;
  reduce: boolean | null;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? { y: 0 } : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: reduce ? 0 : delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
