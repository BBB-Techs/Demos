"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { Reveal } from "./motion";
import { EVENT } from "@/lib/content";

export default function EventSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

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
          <p className="kicker text-coral-deep">{EVENT.badge}</p>
          <h2 className="display-2 mt-4 max-w-xl">{EVENT.title}</h2>
          <dl className="mt-7 space-y-3">
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 font-semibold text-brand-deep">When</dt>
              <dd className="text-muted">{EVENT.date}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 font-semibold text-brand-deep">Where</dt>
              <dd className="text-muted">{EVENT.location}</dd>
            </div>
          </dl>
          <p className="mt-6 max-w-md text-muted">{EVENT.body}</p>
          <a href={EVENT.cta.href} className="btn btn-primary mt-8">
            {EVENT.cta.label}
          </a>
        </Reveal>

        <motion.div
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          style={{ rotateX: reduce ? 0 : rotX, rotateY: reduce ? 0 : rotY, transformPerspective: 900 }}
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-brand via-green to-coral p-1 shadow-2xl shadow-brand/20"
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
            <div className="relative flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
              <span className="kicker rounded-full bg-brand-soft px-4 py-1.5 text-brand-deep">
                Save the date
              </span>
              <p className="display-2 font-black leading-none text-brand-deep">
                07<span className="text-coral">.</span>12
              </p>
              <p className="text-lg font-semibold text-ink/80">2026 Cornhole Tournament</p>
              <p className="max-w-[24ch] text-sm text-muted">
                Fort Orange Brewing Company · Albany, NY
              </p>
              <div className="mt-2 flex gap-1.5" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-brand" />
                <span className="h-2 w-2 rounded-full bg-green" />
                <span className="h-2 w-2 rounded-full bg-coral" />
                <span className="h-2 w-2 rounded-full bg-orange" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
