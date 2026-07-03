"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const NODES = [8, 26, 44, 62, 80, 96];

export function PipelineSpine({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.4,
  });
  const dashoffset = useTransform(progress, [0, 1], [100, 0]);
  const flowY = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-5 hidden md:left-10 lg:block"
      >
        <svg
          className="absolute inset-0 h-full w-1 overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 4 100"
        >
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="100"
            stroke="var(--color-border)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <motion.line
            x1="2"
            y1="0"
            x2="2"
            y2="100"
            stroke="url(#spine-gradient)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            pathLength={100}
            strokeDasharray={100}
            style={{ strokeDashoffset: dashoffset }}
          />
          <defs>
            <linearGradient id="spine-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-blue)" />
              <stop offset="100%" stopColor="var(--color-copper)" />
            </linearGradient>
          </defs>
        </svg>

        {NODES.map((pos) => (
          <Node key={pos} pos={pos} progress={progress} />
        ))}

        <motion.div
          aria-hidden
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue shadow-[0_0_16px_4px_rgba(29,78,216,0.5)]"
          style={{ top: flowY }}
        />
      </div>
      {children}
    </div>
  );
}

function Node({
  pos,
  progress,
}: {
  pos: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const scale = useTransform(progress, [pos / 100 - 0.04, pos / 100], [0, 1]);
  return (
    <motion.div
      className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper"
      style={{ top: `${pos}%`, scale }}
    />
  );
}
