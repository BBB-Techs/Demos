"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { mapViewBox, statePaths, hqPoint } from "@/lib/usMap";

export function UsMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative">
      <svg
        viewBox={mapViewBox}
        className="w-full text-paper/10"
        role="img"
        aria-label="Map of the United States highlighting the seven Southeastern states WHB serves"
      >
        {statePaths.map((state, i) => (
          <motion.path
            key={state.id}
            d={state.d}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: state.served ? 0.15 + i * 0.01 : 0 }}
            onMouseEnter={() => state.served && setHovered(state.name)}
            onMouseLeave={() => setHovered(null)}
            className={
              state.served
                ? "cursor-pointer stroke-ink transition-colors duration-300"
                : "stroke-current"
            }
            fill={state.served ? "var(--color-copper)" : "currentColor"}
            fillOpacity={state.served ? (hovered === state.name ? 1 : 0.85) : 1}
            strokeWidth={state.served ? 1.5 : 1}
          />
        ))}
      </svg>

      {hqPoint && (
        <div
          className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{
            left: `${(hqPoint.x / 960) * 100}%`,
            top: `${(hqPoint.y / 600) * 100}%`,
          }}
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-light opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-light ring-2 ring-ink" />
          </span>
          <span className="font-mono mt-2 whitespace-nowrap rounded-full bg-ink/80 px-2.5 py-1 text-[10px] uppercase tracking-wide text-paper">
            Nashville HQ
          </span>
        </div>
      )}

      {hovered && (
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink shadow-sm">
          {hovered}
        </div>
      )}
    </div>
  );
}
