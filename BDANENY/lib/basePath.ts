// Mirrors next.config.ts's basePath. next/image doesn't auto-prefix local
// `src` values when images.unoptimized is true, so static-image src props
// must be built with this helper.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}

// Site pages ("/about") get the base path; external links, anchors, and tel: links are used as they are.
export function resolveHref(href: string) {
  return href.startsWith("/") ? withBasePath(href) : href;
}
