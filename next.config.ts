import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the same home/office network open the dev server
  // (http://192.168.x.x:3000). Applies to `npm run dev` only, not to production.
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
