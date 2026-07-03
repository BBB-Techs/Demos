import type { NextConfig } from "next";

// GitHub Pages serves this repo from the root of `main` with no build step,
// so deployment needs a static export living at /Demos/CarrCompany/preview.
// Local dev/build stays at "/" — only `npm run build:pages` sets these env vars.
const isPagesExport = process.env.GH_PAGES_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isPagesExport && { output: "export" }),
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
};

export default nextConfig;
