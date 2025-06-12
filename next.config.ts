import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://apstatic.prodam.am.gov.br/images/**/**")],
  },
};

export default nextConfig;
