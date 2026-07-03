"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Cinematic background: poster image paints instantly (great LCP + reduced-motion fallback),
// the muted loop plays on top once ready. ponytail: one component reused by hero + every
// division. Pass a HiggsField still as `poster` and its Kling loop as `src`.
export default function VideoBackground({
  src,
  poster,
  className = "",
  overlay = "bg-black/55",
}: {
  src?: string;
  poster: string;
  className?: string;
  overlay?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  // Only set for the static GitHub Pages export (see next.config.ts); empty/no-op otherwise.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const posterSrc = `${base}${poster}`;
  const videoSrc = src ? `${base}${src}` : undefined;

  // React doesn't reliably set the `muted` DOM property from the prop, and unmuted autoplay
  // is blocked — so force muted imperatively. Play only while near the viewport (5 videos on
  // the page; no point decoding off-screen ones) and pause when scrolled away.
  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    v.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "200px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce, src]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={posterSrc} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      {videoSrc && !reduce && (
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
