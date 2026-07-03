"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { RotateCw } from "lucide-react";
import { brands } from "@/lib/content";

function BrandCard({
  brand,
  delay,
}: {
  brand: (typeof brands)[number];
  delay: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onBlur={() => setFlipped(false)}
      aria-pressed={flipped}
      aria-label={`${brand.name} — ${flipped ? "showing details" : "show details"}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      className="group relative min-h-[128px] cursor-pointer bg-white text-left [perspective:1000px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-inset"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative min-h-[128px] w-full"
      >
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 flex items-center justify-center p-4 transition-colors group-hover:bg-paper-dim"
        >
          <div className="relative h-16 w-full">
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              fill
              sizes="240px"
              className="object-contain"
              unoptimized
            />
          </div>
          <RotateCw
            size={12}
            className="absolute right-2 top-2 text-slate/40 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        </div>

        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-ink p-4 text-center"
        >
          <span className="font-mono text-[10px] uppercase tracking-wide text-copper">
            {brand.areas}
          </span>
          <span className="text-xs leading-snug text-paper/75">
            {brand.blurb}
          </span>
        </div>
      </motion.div>
    </motion.button>
  );
}

export function Manufacturers() {
  return (
    <section id="manufacturers" className="container-page py-28 md:py-36">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-copper">
          Manufacturers
        </p>
        <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
          The brands we&rsquo;re proud to represent.
        </h2>
        <p className="mt-3 text-sm text-slate">
          Tap a tile to see where each brand covers and what it brings to the
          line card.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 md:grid-cols-4">
        {brands.map((brand, i) => (
          <BrandCard key={brand.name} brand={brand} delay={(i % 8) * 0.05} />
        ))}
      </div>
    </section>
  );
}
