/**
 * Resolves a /public asset path. NEXT_PUBLIC_ASSET_BASE lets a static
 * preview be served from a sub-folder (set it to "." for relative URLs).
 */
const base = process.env.NEXT_PUBLIC_ASSET_BASE ?? "";

export function asset(path: string): string {
  return `${base}/${path.replace(/^\//, "")}`;
}
