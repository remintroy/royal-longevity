import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return ["en", "ar"].map((lang) => ({
      source: `/${lang}/our-space`,
      destination: `/${lang}/gallery`,
      permanent: true,
    }));
  },
};

export default nextConfig;
