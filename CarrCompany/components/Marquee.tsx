const WORDS = [
  "Outside Sales",
  "Inside Sales",
  "Data Analytics",
  "Warehousing",
  "Design Group",
  "Commercial Training",
  "Residential Training",
  "Communication",
];

export default function Marquee() {
  // Duplicated list so the -50% keyframe loops seamlessly.
  const items = [...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden border-y border-line bg-ink-soft py-6">
      <div className="marquee-track">
        {items.map((w, i) => (
          <span key={i} className="display flex items-center text-2xl text-paper/70 sm:text-4xl">
            <span className="mx-8">{w}</span>
            <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
