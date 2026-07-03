# WHB Sales — Wiggs, Haun & Bohan

A from-scratch rebuild of [whbsales.com](https://www.whbsales.com/), a manufacturer's
representative firm for plumbing, HVAC, and building-supply brands across seven
Southeastern states.

**Live preview:** https://bbb-techs.github.io/Demos/WHB/preview/

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Motion (Framer Motion) for scroll-driven animation
- d3-geo + topojson-client for the territory map
- A Higgsfield-generated hero video

## Highlights

- Full-bleed hero video with a kinetic headline reveal
- A scroll-linked "supply line" spine connecting sections down the page
- An accurate US map (Albers USA projection) highlighting the 7 states served
- Click-to-flip manufacturer tiles showing each brand's real logo, coverage
  area, and description (sourced from the live site)
- Content pulled from the real business: real manufacturer roster, real
  territory, real contact details

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building for GitHub Pages

This repo's `/preview` folder is a static export of this project, built with:

```bash
GITHUB_PAGES=true npm run build
```

This sets `output: "export"` and a `/Demos/WHB/preview` base path (see
`next.config.ts` and `src/lib/basePath.ts`). A plain `npm run build` (no
`GITHUB_PAGES` env var) builds normally with no base path, for deploying
anywhere else.
