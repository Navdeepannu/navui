import type { NextConfig } from "next";
import { retiredComponents } from "./registry/catalog";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...retiredComponents.flatMap(({ slug, replacement }) => [
        { source: `/components/${slug}`, destination: `/components/${replacement}`, permanent: true },
        { source: `/preview/components/${slug}`, destination: `/preview/components/${replacement}`, permanent: true },
      ]),
      { source: "/blocks/:system(iris|pro)/:path*", destination: "/blocks/base/:path*", permanent: true },
      { source: "/preview/:system(iris|pro)/:slug", destination: "/preview/base/:slug", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "p1r7j2dwef.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
