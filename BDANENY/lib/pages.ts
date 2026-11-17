// Every inner page of bdaneny.org, copied word for word into lib/site-content.json
// (see the extraction script). This file maps those blocks to links and photos on our site.
import content from "./site-content.json";
import { resolveHref, withBasePath } from "./basePath";
import { EVENTS, upcomingEvents } from "./content";

export type Block =
  | { t: "h"; level: number; text: string }
  | { t: "p"; text: string }
  | { t: "li"; text: string }
  | { t: "a"; text: string; href: string }
  | { t: "img"; src: string; alt: string };

const DATA = content as Record<string, Block[]>;

// Inner pages, keyed by path without the leading slash, e.g. "about/staff".
export const PAGE_KEYS = Object.keys(DATA).filter((k) => k !== "home");

const KNOWN_PATHS = new Set(["/", ...PAGE_KEYS.map((k) => `/${k}`)]);

// Site pages stay on this site; other bdaneny.org files (PDFs, login) and outside links keep their real URLs.
export function mapHref(href: string): string {
  if (!href) return "#";
  if (/^(https?:|tel:|mailto:|#)/.test(href)) return href;
  const path = href.split("?")[0].replace(/\/$/, "") || "/";
  if (KNOWN_PATHS.has(path)) return resolveHref(path);
  if (href.startsWith("/")) return `https://bdaneny.org${href}`;
  return href;
}

// Photos are copied into public/site under their file name.
export function mapSrc(src: string): string {
  const name = (src.split("/").pop() ?? "").replace(/%20/g, "-");
  return withBasePath(`/site/${name}`);
}

// Two partner logos on bdaneny.org could not be downloaded, so they are left out.
const MISSING_IMAGES = /ALBANYMED|WFH-LOGO/;

// Events on the programs page: the block that starts each event, and where its registration link goes.
const EVENT_BY_LABEL: Record<string, { id: string; href: string }> = {
  "ANNUAL MEETING": { id: "annual-meeting", href: EVENTS.find((e) => e.id === "annual-meeting")?.cta.href ?? "" },
  "VIRTUAL EDUCATION EVENT": { id: "virtual-education", href: EVENTS.find((e) => e.id === "virtual-education")?.cta.href ?? "" },
};

export function getBlocks(key: string): Block[] {
  const upcoming = new Set(upcomingEvents().map((e) => e.id));
  const blocks = (DATA[key] ?? []).filter((b) => !(b.t === "img" && MISSING_IMAGES.test(b.src)));
  if (key !== "programs-events") return blocks;

  // Drop events whose date has passed, and turn each "Register here" line into a button for its event.
  const out: Block[] = [];
  let label: string | null = null;
  let skipping = false;
  for (const b of blocks) {
    if (b.t === "p" && EVENT_BY_LABEL[b.text]) {
      label = b.text;
      skipping = !upcoming.has(EVENT_BY_LABEL[b.text].id);
    }
    if (skipping) continue;
    if (b.t === "p" && b.text === "Register here" && label) {
      out.push({ t: "a", text: "Register here", href: EVENT_BY_LABEL[label].href });
      continue;
    }
    out.push(b);
  }
  return out;
}

export function getTitle(key: string): string {
  const h = getBlocks(key).find((b) => b.t === "h" && b.level === 1);
  return h && h.t === "h" ? h.text : key;
}

// The homepage text, with lookups by the text that starts each block.
export const HOME = DATA.home;

export function homeText(startsWith: string): string {
  const b = HOME.find((x) => (x.t === "p" || x.t === "h" || x.t === "li") && x.text.startsWith(startsWith));
  return b && "text" in b ? b.text : "";
}
