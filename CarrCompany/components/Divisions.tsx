"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import VideoBackground from "./VideoBackground";

// Each division is a living cinematic panel: HiggsField still (poster) + Kling loop (video),
// parallaxed on scroll. data-asset marks the slot; swap the media paths to re-art-direct.
type Division = { title: string; tag: string; body: string; poster: string; video?: string };

const DIVISIONS: Division[] = [
  {
    title: "Residential",
    tag: "01 / New homes & showrooms",
    body: "A seamless, satisfying journey with a hand-selected roster of manufacturers — from first spec to final walkthrough.",
    poster: "/media/residential.jpg",
    video: "/media/residential.mp4",
  },
  {
    title: "Commercial",
    tag: "02 / Projects & developments",
    body: "Partnerships that put cutting-edge materials and expertise in the hands of the people building Florida's future.",
    poster: "/media/commercial.jpg",
    video: "/media/commercial.mp4",
  },
  {
    title: "Design Group",
    tag: "03 / Specification services",
    body: "From door handles to shower heads — specification services that make your brand the one written into the plans.",
    poster: "/media/design.jpg",
    video: "/media/design.mp4",
  },
  {
    title: "Carolinas Division",
    tag: "04 / Regional operation",
    body: "A dedicated regional operation extending the Carr Company network across the Carolinas.",
    poster: "/media/carolinas.jpg",
    video: "/media/carolinas.mp4",
  },
];

function Row({ div, flip }: { div: Division; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 md:grid-cols-2 ${flip ? "md:[direction:rtl]" : ""}`}
    >
      <div className="relative h-[62vh] overflow-hidden rounded-3xl border border-line [direction:ltr]">
        {/* parallax layer is oversized so the translate never reveals an edge */}
        <motion.div style={{ y }} data-asset={`division-${div.title}`} className="absolute inset-x-0 -inset-y-[10%]">
          <VideoBackground poster={div.poster} src={div.video} overlay="bg-black/45" />
        </motion.div>
        <span className="absolute bottom-6 left-6 display text-[clamp(2.5rem,7vw,6rem)] text-white/85 mix-blend-plus-lighter">
          {div.title}
        </span>
      </div>
      <div className="[direction:ltr]">
        <span className="spec text-accent">{div.tag}</span>
        <h3 className="display mt-4 text-[clamp(2rem,4vw,3.5rem)] text-paper">{div.title}</h3>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{div.body}</p>
        <a
          href="#contact"
          className="spec mt-8 inline-block text-accent transition hover:text-accent-soft"
        >
          Work with us →
        </a>
      </div>
    </div>
  );
}

export default function Divisions() {
  return (
    <section id="divisions" className="mx-auto max-w-7xl px-6 py-28">
      <span className="spec text-accent">§ Divisions</span>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="display mb-20 mt-4 text-[clamp(2rem,5vw,4rem)] text-paper"
      >
        Four divisions. <span className="text-accent">One network.</span>
      </motion.h2>
      <div className="flex flex-col gap-24">
        {DIVISIONS.map((d, i) => (
          <Row key={d.title} div={d} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
