import type { NextConfig } from "next";

// STATIC_EXPORT=1 produces a static site in /out (used for shareable previews).
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isExport ? { output: "export", trailingSlash: true } : {}),
  // PREVIEW_RELATIVE=1: relative asset URLs so the export works from any sub-folder.
  ...(process.env.PREVIEW_RELATIVE === "1" ? { assetPrefix: "." } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
