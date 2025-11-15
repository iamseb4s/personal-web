import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const publicStrapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337');
const internalStrapiUrl = new URL(process.env.STRAPI_INTERNAL_URL || 'http://localhost:1337');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: publicStrapiUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: publicStrapiUrl.hostname,
        port: publicStrapiUrl.port,
        pathname: '/uploads/**',
      },
      {
        protocol: internalStrapiUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: internalStrapiUrl.hostname,
        port: internalStrapiUrl.port,
        pathname: '/uploads/**',
      },
    ],
  },
};

const withMDX = createMDX({
  // Add MDX options here, if any
});

export default withMDX(nextConfig);
