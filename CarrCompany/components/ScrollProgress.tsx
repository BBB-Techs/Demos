"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin brass line that fills as you read — the "chapter progress" cue for a scroll-story page.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent to-accent-soft"
    />
  );
}
