"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";

// The signature element: one continuous thread that fills as you journey
// down the page — the line of care connecting families since 1968.
const PATH =
  "M20 0 C 32 60, 8 120, 20 180 C 32 240, 8 300, 20 360 C 32 420, 8 480, 20 540 C 28 570, 20 586, 20 600";

export default function Lifeline() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const length = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 });
  const dotY = useTransform(length, [0, 1], [3, 597]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-5 z-20 hidden h-screen w-12 lg:block xl:left-9"
    >
      <svg viewBox="0 0 40 600" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="lifeline-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d5d9c" />
            <stop offset="42%" stopColor="#23a14c" />
            <stop offset="72%" stopColor="#e44e56" />
            <stop offset="100%" stopColor="#ff9e45" />
          </linearGradient>
        </defs>

        {/* faint full track */}
        <path d={PATH} fill="none" stroke="#0d5d9c" strokeOpacity="0.1" strokeWidth="2" />

        {/* the drawn progress thread */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="url(#lifeline-grad)"
          strokeWidth="2.25"
          strokeLinecap="round"
          style={{ pathLength: reduce ? 1 : length }}
        />

        {/* heartbeat at the growing tip */}
        {!reduce && (
          <>
            <motion.circle cy={dotY} cx={20} r={9} fill="#e44e56" opacity={0.16} className="lifeline-pulse" />
            <motion.circle cy={dotY} cx={20} r={3.5} fill="#e44e56" />
            <motion.circle cy={dotY} cx={20} r={1.5} fill="#fff" />
          </>
        )}
      </svg>
    </div>
  );
}
