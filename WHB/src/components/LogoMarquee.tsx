import { brands } from "@/lib/content";

export function LogoMarquee() {
  const loop = [...brands, ...brands];

  return (
    <section
      aria-label="Manufacturer brands represented"
      className="border-y border-border bg-paper-dim py-8"
    >
      <div
        className="group flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
          {loop.map((brand, i) => (
            <span
              key={`${brand.name}-${i}`}
              className="font-display shrink-0 whitespace-nowrap text-lg font-medium text-slate/70"
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
