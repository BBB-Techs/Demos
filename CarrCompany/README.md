# Carr Company — site rebuild

Single-page cinematic scroll site for Carr Company (Florida's manufacturers' rep, 80+ years).
Next.js 16 (App Router) + Motion + Tailwind v4. Light theme (corporate navy/white) is the
default, with a dark cinematic theme available via the toggle in the nav.

**Live preview:** https://bbb-techs.github.io/Demos/CarrCompany/preview/

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure
- `app/page.tsx` — assembles the sections top→bottom
- `app/layout.tsx` — fonts (Anton display + Hanken Grotesk body + Space Mono labels), no-FOUC
  theme script, metadata
- `app/globals.css` — mode-aware `@theme` tokens (light default, `html.light` override for dark)
- `components/` — one file per section (Hero, Marquee, Intro, Services, WhyCarr, Divisions,
  Contact, Footer, Nav, ThemeToggle, VideoBackground, ScrollProgress)
- `app/actions.ts` — contact form server action (real send path; not used by the static preview)
- `components/ContactStatic.tsx` — client-only twin of Contact.tsx with no server dependency,
  used only by the GitHub Pages static export (see below)

## Contact form
Works out of the box (logs submissions in dev). To actually email leads, set:
```
RESEND_API_KEY=...        # from resend.com
CONTACT_TO=you@carrcompany.com
```
No DB/CRM yet — add when lead storage is needed.

## Publish the preview
```bash
npm run build:pages
```
Runs `scripts/build-static-preview.sh`, which builds a static export in `./out` (base path
baked in for `/Demos/CarrCompany/preview`). A plain `output: "export"` build isn't possible
directly from this source tree — the real contact form is a Next.js Server Action, and static
export doesn't support those at all — so the script builds from a throwaway copy of the repo
with `app/actions.ts` removed and `Contact.tsx` swapped for `ContactStatic.tsx`; the real
source here is untouched. Copy `out/`'s contents into `Demos/CarrCompany/preview/` in the
`BBB-Techs/Demos` repo, commit, and push to `main` — GitHub Pages serves that repo directly
from the branch root, no build step on their end. See the `publish-to-demos` skill for the
full process and the gotchas it exists to avoid (Jekyll stripping `_next/`, base-path
prefixing on static images).

## HiggsField assets (generated)
`public/media/` holds a cinematic still (`.jpg` poster) + Kling 3.0 loop (`.mp4`) for the hero
(one pair per theme: `hero`/`hero-light`) and each division: `residential`, `commercial`,
`design`, `carolinas`. `components/VideoBackground.tsx` renders the poster instantly and plays
the muted loop only while it's near the viewport (IntersectionObserver); reduced-motion users
get the poster. It also prefixes both paths with `NEXT_PUBLIC_BASE_PATH` when set, so the same
component works unmodified in the static export.

To regenerate/replace via HiggsField (Higgsfield MCP tools — the CLI is flaky):
1. `gpt_image_2` still, 16:9, 2k → download.
2. `kling3_0` image-to-video with that still's job id as `start_image`, 5s, 16:9 (~10 credits).
3. Optimize the still: `sips -Z 1920 -s format jpeg -s formatOptions 82 in.png --out out.jpg`.
Swap the `poster`/`src` paths in `components/Hero.tsx` and `components/Divisions.tsx`.
