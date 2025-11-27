import path from "path";
import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const contentlayerAlias = path.join(process.cwd(), ".contentlayer/generated");

const nextConfig: NextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = config.resolve.alias || {};
        config.resolve.alias["contentlayer/generated"] = contentlayerAlias;
        return config;
    },
    experimental: {
        turbo: {
            resolveAlias: {
                "contentlayer/generated": contentlayerAlias,
            },
        },
    },
    // すべてSSG前提なら cache: 'force-cache' なfetch設計を心がける
};

export default withContentlayer(nextConfig);
