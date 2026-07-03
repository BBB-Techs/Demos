"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

const SERVICES: [string, string, string][] = [
  ["01", "Outside Sales", "Florida's largest and best-trained sales team, in the field where deals get made."],
  ["02", "Inside Sales", "Responsive customer service backed by cutting-edge technology and real data analysis."],
  ["03", "Communication", "Networking and telecommunications coordination that keeps every partner in sync."],
  ["04", "Data Analytics", "A force-multiplier — turning market data into measurable business growth."],
  ["05", "Commercial Training", "Expert-led sessions that keep commercial teams ahead of the spec."],
  ["06", "Residential Training", "Continuing-education programs for the residential channel."],
  ["07", "Warehousing", "Two strategic locations — Tampa and Boca Raton — close to the work."],
  ["08", "Design Group", "Project design and specification services that make your brand stand out."],
];

function Card({ idx, title, body }: { idx: string; title: string; body: string }) {
  return (
    <div className="group flex h-[60vh] w-[80vw] shrink-0 flex-col justify-between rounded-3xl border border-line bg-ink-soft p-8 transition-colors hover:border-accent sm:p-10 md:w-[38vw]">
      <span className="display text-7xl text-line transition-colors group-hover:text-accent/40">
        {idx}
      </span>
      <div>
        <h3 className="display text-3xl text-paper sm:text-4xl">{title}</h3>
        <p className="mt-4 max-w-sm text-muted">{body}</p>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // Reduced-motion: a plain stacked grid, no pin, fully readable.
  if (reduce) {
    return (
      <section id="services" className="mx-auto max-w-7xl px-6 py-28">
        <Header />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(([i, t, b]) => (
            <Card key={i} idx={i} title={t} body={b} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="services" ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6">
          <Header />
        </div>
        <motion.div ref={trackRef} style={{ x }} className="mt-10 flex gap-6 px-6">
          {SERVICES.map(([i, t, b]) => (
            <Card key={i} idx={i} title={t} body={b} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <span className="spec text-accent">§ Services — 08 disciplines</span>
        <h2 className="display mt-4 text-[clamp(2rem,5vw,4rem)] text-paper">
          What we <span className="text-accent">do</span>
        </h2>
      </div>
      <p className="max-w-sm text-sm text-muted">
        Eight ways Carr Company connects manufacturers to the projects, builders, and showrooms
        that move the Southeast forward.
      </p>
    </div>
  );
}
