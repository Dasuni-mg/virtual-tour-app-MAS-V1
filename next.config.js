const cdkExports = require("./cdk-exports.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => [
    {
      source: "/tours/live/:slug*",
      destination: `${cdkExports.InsightStack.awsCloudfrontDomain}/:slug*`,
    },
  ],
  headers: () => [
    {
      source: "/tours/live/:slug*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
