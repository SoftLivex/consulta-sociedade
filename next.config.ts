import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    assetPrefix: './',
    basePath: process.env.PAGES_BASE_PATH,
    trailingSlash: true,
    reactStrictMode: true,
    // images: {
    //     unoptimized: true,
    // },
};

export default nextConfig;
