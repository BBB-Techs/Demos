"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Divisions", "#divisions"],
  ["Contact", "#contact"],
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 80));

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* The hero now matches the theme, so nav text can stay themed over both hero and solid bg. */}
        <a href="#top" className="display text-xl tracking-tight text-paper">
          Carr<span className="text-accent">.</span>Company
        </a>
        <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="transition hover:text-accent">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <ThemeToggle className="border-line text-paper hover:border-accent hover:text-accent" />
          <a
            href="#contact"
            className="rounded-full border border-line px-5 py-2 text-sm text-paper transition hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
