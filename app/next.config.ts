import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
};

const withMDX = createMDX({
  // Add MDX options here, if any
});

export default withMDX(nextConfig);
