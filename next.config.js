/** @type {import('next').NextConfig} */
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    workerThreads: false,
    cpus: 1,
    // fix for puppeteer >> https://github.com/puppeteer/puppeteer/issues/11052
    serverComponentsExternalPackages: ['puppeteer-core'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      }
    );

    // llama index: https://github.com/run-llama/LlamaIndexTS?tab=readme-ov-file
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
      mongodb$: false,
    };

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
