// Mirrors next.config.ts's basePath. next/image doesn't auto-prefix local
// `src` values when images.unoptimized is true, so static-image src props
// must be built with this helper.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}
