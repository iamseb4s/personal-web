'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';

export function MdxContent({ source }: { source: MDXRemoteProps['source'] }) {
  const components = useMDXComponents();
  return <MDXRemote source={source} components={components} />;
}
