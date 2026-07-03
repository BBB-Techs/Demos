"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="display text-accent">
      {val}
      {suffix}
    </span>
  );
}

const STATS: [number, string, string][] = [
  [80, "+", "Years of experience"],
  [2, "", "Warehouses · Tampa & Boca"],
  [2, "", "Regions · Florida & Carolinas"],
  [1, "", "Network of industry experts"],
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Intro() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <span className="spec text-accent">§ Who we are</span>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="display mt-4 max-w-4xl text-[clamp(2rem,5vw,4.5rem)] text-paper"
      >
        More than a sales rep — a{" "}
        <span className="text-accent">network of industry experts</span> advocating for your
        product across Florida.
      </motion.h2>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
        For over 80 years, Carr Company has been the advocate and intermediary connecting
        manufacturers of quality products to the projects, developments, homes, and showrooms
        that define the Southeast. The connections you need. The experience you trust. The name
        you can count on.
      </p>

      <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
        {STATS.map(([to, suffix, label], i) => (
          <motion.div
            key={label}
            custom={i}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="text-[clamp(2.5rem,6vw,5rem)] leading-none">
              <Counter to={to} suffix={suffix} />
            </div>
            <div className="mt-3 text-sm text-muted">{label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
