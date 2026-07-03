"use client";

import { motion } from "motion/react";

const words = "We do not just sell one product — we sell our Agency.".split(
  " ",
);

export function PullQuote() {
  return (
    <section className="container-page py-24 md:py-32">
      <motion.blockquote
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.045 }}
        className="font-display mx-auto max-w-4xl text-center text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0.15, y: 8 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className={`inline-block ${
              word === "Agency."
                ? "text-copper"
                : word === "one" || word === "product"
                  ? "text-slate"
                  : ""
            }`}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.blockquote>
    </section>
  );
}
