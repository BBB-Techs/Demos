"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import VideoBackground from "./VideoBackground";

const LINE1 = ["The", "connections", "you", "need."];
const LINE2 = ["The", "experience", "you", "trust."];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      {/* Theme-aware backgrounds: dark brass network in dark mode, bright navy network in light. */}
      <VideoBackground className="only-dark" poster="/media/hero.jpg" src="/media/hero.mp4" overlay="bg-black/45" />
      <VideoBackground className="only-light" poster="/media/hero-light.jpg" src="/media/hero-light.mp4" overlay="bg-white/20" />
      {/* vignette fades to the theme background colour */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-ink)_84%)]" />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="spec mb-6 text-accent"
        >
          Est. 1944 — Tampa · Boca Raton · The Carolinas
        </motion.span>

        <h1 className="display text-[clamp(2.8rem,9vw,8.5rem)] text-paper">
          <RevealLine words={LINE1} base={0.25} />
          <span className="block text-accent">
            <RevealLine words={LINE2} base={0.6} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-7 max-w-xl text-base text-muted sm:text-lg"
        >
          The name you can count on. 80+ years connecting the best manufacturers
          to the projects, builders, and showrooms that move Florida forward.
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="pointer-events-auto mt-10 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-ink transition hover:bg-accent-soft"
        >
          Let&apos;s connect
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        Scroll
      </motion.div>
    </section>
  );
}

function RevealLine({ words, base }: { words: string[]; base: number }) {
  return (
    <span className="block overflow-hidden">
      {words.map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-top">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: base + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
