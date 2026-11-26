import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
