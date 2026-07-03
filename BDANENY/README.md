# BDANENY

Homepage rebuild for the Bleeding Disorders Association of Northeastern
New York — Next.js 16 (App Router) + React 19 + Tailwind v4 + `motion`.

**Live preview:** https://bbb-techs.github.io/Demos/BDANENY/preview/

## Develop

```bash
npm install
npm run dev
```

## Publish the preview

```bash
npm run build:pages
```

Produces a static export in `out/` (base path baked in for
`/Demos/BDANENY/preview`). Copy its contents into `Demos/BDANENY/preview/`
in the `BBB-Techs/Demos` repo, commit, and push to `main` — GitHub Pages
serves that repo directly from the branch root, no build step on their
end. See the `publish-to-demos` skill for the full process and the
gotchas it exists to avoid (Jekyll stripping `_next/`, base-path
prefixing on static images).
