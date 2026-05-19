import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to a static HTML/CSS/JS bundle in /out, deployable as a Static Site
  // on Digital Ocean App Platform (or any plain static host).
  output: "export",
  // Image optimization requires a Next server; static export ships raw images.
  images: { unoptimized: true },
  // Match the in-app routing convention so client-side <Link>s resolve correctly
  // when served as static files.
  trailingSlash: true,
};

export default nextConfig;
