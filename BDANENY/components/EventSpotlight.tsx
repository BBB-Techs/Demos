"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { Reveal } from "./motion";
import { EVENTS } from "@/lib/content";

const AUTO_ADVANCE_MS = 5000;
const FADE = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

export default function EventSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = EVENTS.length;

  const go = useCallback((step: number) => setIndex((i) => (i + step + count) % count), [count]);

  // Restarts on every change of `index`, so a manual click also resets the 5s timer.
  useEffect(() => {
    if (reduce || count < 2) return;
    const timer = setTimeout(() => go(1), AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [index, reduce, count, go]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 });
  const glowX = useTransform(mx, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(my, [0, 1], ["10%", "90%"]);

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <section id="event" className="section bg-mist">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          {/* Every event sits in the same grid cell, so the section keeps the height of the longest one. */}
          <div className="grid">
            {EVENTS.map((ev, i) => {
              const active = i === index;
              return (
                <motion.div
                  key={ev.id}
                  className="col-start-1 row-start-1"
                  aria-hidden={!active}
                  inert={!active}
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, y: active || reduce ? 0 : 14 }}
                  transition={FADE}
                >
                  <p className="kicker text-coral-deep">{ev.badge}</p>
                  <h2 className="display-2 mt-4 max-w-xl">{ev.title}</h2>
                  <dl className="mt-7 space-y-3">
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 font-semibold text-brand-deep">When</dt>
                      <dd className="text-muted">{ev.date}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 font-semibold text-brand-deep">Where</dt>
                      <dd className="text-muted">{ev.location}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 max-w-md space-y-3 text-muted">
                    {ev.body.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <a href={ev.cta.href} className="btn btn-primary mt-8">
                    {ev.cta.label}
                  </a>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        <div className="flex flex-col items-center gap-6">
          <motion.div
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            onClick={() => go(1)}
            style={{ rotateX: reduce ? 0 : rotX, rotateY: reduce ? 0 : rotY, transformPerspective: 900 }}
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm cursor-pointer select-none overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-brand via-green to-coral p-1 shadow-2xl shadow-brand/20"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-white">
              <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                  background: useTransform(
                    [glowX, glowY],
                    ([x, y]) => `radial-gradient(340px circle at ${x} ${y}, rgba(255,158,69,0.5), transparent 65%)`
                  ),
                }}
              />
              {EVENTS.map((ev, i) => {
                const active = i === index;
                return (
                  <motion.div
                    key={ev.id}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center"
                    aria-hidden={!active}
                    initial={false}
                    animate={{ opacity: active ? 1 : 0, scale: active || reduce ? 1 : 0.96 }}
                    transition={FADE}
                  >
                    <span className="kicker rounded-full bg-brand-soft px-4 py-1.5 text-brand-deep">
                      Save the date
                    </span>
                    <p className="display-2 font-black leading-none text-brand-deep">
                      {ev.card.month}
                      <span className="text-coral">.</span>
                      {ev.card.day}
                    </p>
                    <p className="text-lg font-semibold text-ink/80">{ev.card.title}</p>
                    <p className="max-w-[24ch] text-sm text-muted">{ev.card.location}</p>
                    <div className="mt-2 flex gap-1.5" aria-hidden>
                      <span className="h-2 w-2 rounded-full bg-brand" />
                      <span className="h-2 w-2 rounded-full bg-green" />
                      <span className="h-2 w-2 rounded-full bg-coral" />
                      <span className="h-2 w-2 rounded-full bg-orange" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <button type="button" className="btn btn-ghost" onClick={() => go(-1)} aria-label="Previous event">
              <span aria-hidden>←</span> Previous
            </button>
            <span className="text-sm tabular-nums text-muted" aria-live="polite">
              {index + 1} / {count}
            </span>
            <button type="button" className="btn btn-ghost" onClick={() => go(1)} aria-label="Next event">
              Next <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
