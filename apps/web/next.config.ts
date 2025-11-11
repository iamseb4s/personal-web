import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'dev-cms',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

const withMDX = createMDX({
  // Add MDX options here, if any
});

export default withMDX(nextConfig);
