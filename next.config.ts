import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // すべてSSG前提なら cache: 'force-cache' なfetch設計を心がける
};

export default withContentlayer(nextConfig);
