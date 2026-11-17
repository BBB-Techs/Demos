import Nav from "./Nav";
import Footer from "./Footer";
import { getBlocks, getTitle, mapHref, mapSrc, type Block } from "@/lib/pages";

type Group = { heading?: { text: string; level: number }; items: Block[] };

// Short all-capitals lines (such as "ANNUAL MEETING") are section labels too.
function isLabel(b: Block): boolean {
  return b.t === "p" && b.text.length <= 40 && b.text === b.text.toUpperCase() && /[A-Z]/.test(b.text);
}

// Each heading (or label) starts a section; the first level-1 heading is the page title.
// Every photo becomes its own section so photos show as cards.
function groupBlocks(blocks: Block[]): Group[] {
  const groups: Group[] = [];
  let current: Group | null = null;
  let skippedTitle = false;
  for (const b of blocks) {
    if (b.t === "h" && b.level === 1 && !skippedTitle) {
      skippedTitle = true;
      continue;
    }
    if (b.t === "h" || isLabel(b)) {
      const heading = b.t === "h" ? { text: b.text, level: b.level } : { text: b.t === "p" ? b.text : "", level: 2 };
      current = { heading, items: [] };
      groups.push(current);
      continue;
    }
    if (b.t === "img") {
      groups.push({ items: [b] });
      current = null;
      continue;
    }
    if (!current) {
      current = { items: [] };
      groups.push(current);
    }
    current.items.push(b);
  }
  return groups;
}

const hasImage = (g: Group) => g.items.some((i) => i.t === "img");

function LinkList({ links }: { links: Extract<Block, { t: "a" }>[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {links.map((l, j) => {
        const href = mapHref(l.href);
        const external = /^https?:\/\//.test(href);
        return (
          <a
            key={j}
            href={href}
            className="rounded-full border border-brand/25 bg-white px-4 py-2 text-sm font-semibold text-brand-deep transition-colors hover:border-brand hover:bg-brand-soft"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {l.text}
          </a>
        );
      })}
    </div>
  );
}

// Text, lists and links of a section.
function Body({ items }: { items: Block[] }) {
  const out: React.ReactNode[] = [];
  let i = 0;
  while (i < items.length) {
    const b = items[i];
    if (b.t === "p") {
      out.push(
        <p key={i} className="mt-4 leading-relaxed text-muted">
          {b.text}
        </p>
      );
      i++;
    } else if (b.t === "li") {
      const list: Block[] = [];
      while (i < items.length && items[i].t === "li") list.push(items[i++]);
      out.push(
        <ul key={`ul-${i}`} className="mt-4 list-disc space-y-2 pl-6 text-muted">
          {list.map((l, j) => (
            <li key={j}>{l.t === "li" ? l.text : ""}</li>
          ))}
        </ul>
      );
    } else if (b.t === "a") {
      const links: Extract<Block, { t: "a" }>[] = [];
      while (i < items.length && items[i].t === "a") {
        const x = items[i++];
        if (x.t === "a") links.push(x);
      }
      out.push(<LinkList key={`links-${i}`} links={links} />);
    } else {
      i++;
    }
  }
  return <>{out}</>;
}

function Photo({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={mapSrc(src)} alt={alt} className={className} loading="lazy" />
  );
}

function Section({ g }: { g: Group }) {
  const text = g.items.filter((i) => i.t !== "img");
  const photo = g.items.find((i): i is Extract<Block, { t: "img" }> => i.t === "img");
  const hasText = text.length > 0 || Boolean(g.heading);

  // Photo with text: a card with the photo on top, like the live site's About page.
  if (photo && hasText) {
    return (
      <article className="card flex h-full flex-col overflow-hidden p-0">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-soft">
          <Photo src={photo.src} alt={photo.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        </div>
        <div className="flex flex-1 flex-col p-7">
          {g.heading && <h2 className="text-xl font-extrabold text-ink">{g.heading.text}</h2>}
          <div className="flex-1 text-sm">
            <Body items={text} />
          </div>
        </div>
      </article>
    );
  }

  // Photo only: gallery tile.
  if (photo) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-sm">
        <Photo src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  // Text section.
  return (
    <section className="rounded-[1.75rem] border border-line bg-white p-8 shadow-sm md:p-10">
      {g.heading && (
        <h2 className={g.heading.level <= 2 ? "text-2xl font-extrabold text-ink md:text-3xl" : "text-xl font-bold text-brand-deep"}>
          {g.heading.text}
        </h2>
      )}
      <Body items={text} />
    </section>
  );
}

export default function SitePage({ pageKey }: { pageKey: string }) {
  const groups = groupBlocks(getBlocks(pageKey));
  // Consecutive photo-based sections share a responsive grid.
  const rows: React.ReactNode[] = [];
  let grid: Group[] = [];
  const flush = (k: number) => {
    if (!grid.length) return;
    rows.push(
      <div key={`grid-${k}`} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((g, j) => (
          <Section key={j} g={g} />
        ))}
      </div>
    );
    grid = [];
  };
  groups.forEach((g, gi) => {
    if (hasImage(g)) {
      grid.push(g);
    } else {
      flush(gi);
      rows.push(
        <div key={`s-${gi}`} className="mt-10">
          <Section g={g} />
        </div>
      );
    }
  });
  flush(groups.length);

  return (
    <>
      <Nav />
      <main>
        <div className="bg-brand-deep pb-16 pt-32 text-white">
          <div className="container-x">
            <p className="kicker text-orange">BDANENY</p>
            <h1 className="display-2 mt-4 max-w-3xl">{getTitle(pageKey)}</h1>
          </div>
        </div>
        <div className="container-x -mt-8 pb-24">{rows}</div>
      </main>
      <Footer />
    </>
  );
}
