"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { Reveal } from "./motion";
import { PHOTOS, upcomingEvents } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

const AUTO_ADVANCE_MS = 5000;
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export default function EventSpotlight() {
  const reduce = useReducedMotion();
  // Upcoming events only: past dates are removed automatically.
  const events = useMemo(() => upcomingEvents(), []);
  const eventCount = events.length;
  const [eventIndex, setEventIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const photoCount = PHOTOS.length;

  const goEvent = useCallback((step: number) => setEventIndex((i) => (i + step + eventCount) % eventCount), [eventCount]);
  const goPhoto = useCallback((step: number) => setPhotoIndex((i) => (i + step + photoCount) % photoCount), [photoCount]);

  // Each change restarts the timer, so a click also resets it.
  useEffect(() => {
    if (reduce || eventCount < 2) return;
    const timer = setTimeout(() => goEvent(1), AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [eventIndex, reduce, eventCount, goEvent]);

  useEffect(() => {
    if (reduce || photoCount < 2) return;
    const timer = setTimeout(() => goPhoto(1), AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [photoIndex, reduce, photoCount, goPhoto]);

  if (eventCount === 0) {
    return (
      <section id="event" className="section bg-mist">
        <div className="container-x text-center">
          <p className="kicker text-coral-deep">Events</p>
          <h2 className="display-2 mt-4">No upcoming events right now.</h2>
          <p className="mx-auto mt-5 max-w-lg text-muted">Check back soon, or follow us on Facebook and Instagram.</p>
        </div>
      </section>
    );
  }

  const ev = events[eventIndex];
  const month = MONTHS[Number(ev.card.month) - 1] ?? "";

  return (
    <section id="event" className="section bg-mist">
      <div className="container-x grid items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left: the upcoming event, in a card. */}
        <Reveal className="flex">
          <div className="relative flex w-full flex-col overflow-hidden rounded-[2rem] border border-line bg-white p-8 shadow-xl shadow-brand/10 md:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange/15 blur-3xl" aria-hidden />
            <div className="relative flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-brand-deep text-white shadow-lg shadow-brand-deep/30">
                <span className="text-xs font-bold tracking-widest text-orange">{month}</span>
                <span className="text-3xl font-black leading-none">{ev.card.day}</span>
              </div>
              <div>
                <p className="kicker text-coral-deep">{ev.badge}</p>
                <h2 className="mt-1 text-2xl font-extrabold leading-tight text-ink md:text-3xl">{ev.title}</h2>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={ev.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-7 flex flex-1 flex-col"
              >
                <dl className="space-y-3">
                  <div className="flex items-start gap-3 rounded-xl bg-brand-soft/60 px-4 py-3">
                    <dt className="w-16 shrink-0 text-xs font-bold uppercase tracking-wider text-brand-deep">When</dt>
                    <dd className="text-sm font-semibold text-ink">{ev.date}</dd>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-brand-soft/60 px-4 py-3">
                    <dt className="w-16 shrink-0 text-xs font-bold uppercase tracking-wider text-brand-deep">Where</dt>
                    <dd className="text-sm font-semibold text-ink">{ev.location}</dd>
                  </div>
                </dl>
                <div className="mt-6 space-y-3 text-muted">
                  {ev.body.map((line) => (
                    <p key={line} className="leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="mt-auto pt-8">
                  <a href={ev.cta.href} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    {ev.cta.label}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {eventCount > 1 && (
              <div className="relative mt-8 flex items-center gap-3">
                <button type="button" className="btn btn-ghost" onClick={() => goEvent(-1)} aria-label="Previous event">
                  <span aria-hidden>←</span>
                </button>
                <span className="text-sm font-semibold tabular-nums text-muted" aria-live="polite">
                  {eventIndex + 1} / {eventCount}
                </span>
                <button type="button" className="btn btn-ghost" onClick={() => goEvent(1)} aria-label="Next event">
                  <span aria-hidden>→</span>
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {/* Right: the photos, one after another, in a card of the same height as the event. */}
        <Reveal className="flex">
          <div
            onClick={() => goPhoto(1)}
            className="group relative min-h-[400px] w-full cursor-pointer select-none overflow-hidden rounded-[2rem] border border-line bg-white shadow-xl shadow-brand/10"
          >
            {PHOTOS.map((photo, i) => {
              const active = i === photoIndex;
              return (
                <motion.div
                  key={photo.src}
                  className="absolute inset-0"
                  aria-hidden={!active}
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, scale: active || reduce ? 1 : 1.04 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Blurred copy fills the space around the photo, so the whole photo stays visible. */}
                  <Image
                    src={withBasePath(photo.src)}
                    alt=""
                    aria-hidden
                    fill
                    className="scale-110 object-cover blur-2xl"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <Image
                    src={withBasePath(photo.src)}
                    alt={photo.alt}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={i === 0}
                  />
                </motion.div>
              );
            })}

            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-ink/50 to-transparent p-5">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-wider text-brand-deep">PHOTOS</span>
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold tabular-nums text-brand-deep">
                {photoIndex + 1} / {photoCount}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPhoto(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-deep opacity-0 shadow transition-opacity group-hover:opacity-100 focus:opacity-100"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPhoto(1);
              }}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-deep opacity-0 shadow transition-opacity group-hover:opacity-100 focus:opacity-100"
            >
              <span aria-hidden>→</span>
            </button>

            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center" aria-hidden>
              <div className="flex gap-2 rounded-full bg-white/85 px-3 py-2 shadow">
                {PHOTOS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full transition-colors ${i === photoIndex ? "bg-brand-deep" : "bg-brand-deep/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
