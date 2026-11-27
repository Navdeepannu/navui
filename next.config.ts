import type { NextConfig } from "next";
import { retiredComponents } from "./registry/catalog";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...retiredComponents.flatMap((item) => "replacement" in item ? [
        { source: `/components/${item.slug}`, destination: `/components/${item.replacement}`, permanent: true },
        { source: `/preview/components/${item.slug}`, destination: `/preview/components/${item.replacement}`, permanent: true },
      ] : []),
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
