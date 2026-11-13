"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./motion";
import { PHOTOS, upcomingEvents } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

const AUTO_ADVANCE_MS = 5000;
const FADE = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

export default function EventSpotlight() {
  const reduce = useReducedMotion();
  // Upcoming events only (past dates are filtered out).
  const events = useMemo(() => upcomingEvents(), []);
  const eventCount = events.length;
  const [eventIndex, setEventIndex] = useState(0);
  // Photo card on the right: photos shown one after another.
  const [photoIndex, setPhotoIndex] = useState(0);
  const photoCount = PHOTOS.length;

  const goEvent = useCallback((step: number) => setEventIndex((i) => (i + step + eventCount) % eventCount), [eventCount]);
  const goPhoto = useCallback((step: number) => setPhotoIndex((i) => (i + step + photoCount) % photoCount), [photoCount]);

  // Each change restarts the 5s timer, so a manual click also resets it.
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

  return (
    <section id="event" className="section bg-mist">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left: upcoming events. */}
        <Reveal>
          <div className="grid">
            {events.map((ev, i) => {
              const active = i === eventIndex;
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

          {eventCount > 1 && (
            <div className="mt-10 flex items-center gap-4">
              <button type="button" className="btn btn-ghost" onClick={() => goEvent(-1)} aria-label="Previous event">
                <span aria-hidden>←</span> Previous
              </button>
              <span className="text-sm tabular-nums text-muted" aria-live="polite">
                {eventIndex + 1} / {eventCount}
              </span>
              <button type="button" className="btn btn-ghost" onClick={() => goEvent(1)} aria-label="Next event">
                Next <span aria-hidden>→</span>
              </button>
            </div>
          )}
        </Reveal>

        {/* Right: photo card, 400px tall, same as the website's slideshow. */}
        <Reveal>
          <div
            onClick={() => goPhoto(1)}
            className="relative h-[400px] w-full cursor-pointer select-none overflow-hidden rounded-[2rem] border border-line bg-white shadow-xl shadow-brand/10"
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
                  transition={FADE}
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
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center" aria-hidden>
              <div className="flex gap-2 rounded-full bg-white/80 px-3 py-2 shadow">
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
