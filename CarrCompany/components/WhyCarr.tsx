"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const WORDS = "Data is a force-multiplier. So is 80 years of trust.".split(" ");

export default function WhyCarr() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.25"] });

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-6 py-36 text-center">
      <p className="spec mb-8 text-accent">Why Carr Company</p>
      <h2 className="display flex flex-wrap justify-center gap-x-4 gap-y-2 text-[clamp(2rem,6vw,5.5rem)] leading-tight text-paper">
        {WORDS.map((word, i) => {
          const start = i / WORDS.length;
          const end = start + 1 / WORDS.length;
          // Opacity reveal (not color) so it works in both light and dark themes.
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1]);
          return (
            <motion.span key={i} style={{ opacity }}>
              {word}
            </motion.span>
          );
        })}
      </h2>
      <p className="mx-auto mt-10 max-w-xl text-lg text-muted">
        We pair the largest, best-trained team in the state with the analytics to back every
        decision — so the right product reaches the right project, every time.
      </p>
    </section>
  );
}
