"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { stats } from "@/lib/content";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const numeric = parseInt(value, 10);
  const [display, setDisplay] = useState(Number.isNaN(numeric) ? value : "0");

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) return;
    const controls = animate(0, numeric, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, numeric, value]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {display}
    </span>
  );
}

export function StatsAbout() {
  return (
    <section id="about" className="container-page py-28 md:py-36">
      <div className="grid gap-16 md:grid-cols-2 md:gap-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-copper">
            About WHB
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Proud to support the best in the business.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-slate md:text-base">
            Wiggs, Haun &amp; Bohan is a manufacturer&rsquo;s representative
            and sales organization built on relationships. Out of our
            Nashville office and 25,000 sq. ft. warehouse, our fully staffed
            team and eight outside salesmen cover the wholesale and
            contractor levels across seven Southeastern states.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate md:text-base">
            We strive to develop and maintain long-term relationships within
            our industry while staying focused on our customers&rsquo; needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="border-l-2 border-copper pl-5"
            >
              <div className="font-display text-4xl font-semibold text-ink md:text-5xl">
                <Counter value={stat.value} />
              </div>
              <p className="mt-2 text-sm leading-snug text-slate">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
