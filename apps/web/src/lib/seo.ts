import type { Metadata } from 'next';
import { getStrapiMedia } from './strapi';
import { SharedSeo } from '../types/strapi';

interface GenerateMetadataProps {
  seo: SharedSeo;
  path: string;
  global: {
    site_brand_name: string;
    site_logo: { url: string } | null;
  };
  alternates?: {
    [key: string]: string;
  };
}

type OpenGraphType = Metadata['openGraph'] extends { type: infer T } ? T : 'website';


export function generateSeoMetadata({ seo, path, global, alternates }: GenerateMetadataProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4100';
  
  // Image for Social Media (Open Graph / Twitter)
  // Priority: Page Specific Meta Image -> Site Logo -> null
  const shareImageUrl = seo.metaImage ? getStrapiMedia(seo.metaImage.url) : global.site_logo ? getStrapiMedia(global.site_logo.url) : null;

  // Image for Favicon (Always Site Logo)
  const faviconUrl = global.site_logo ? getStrapiMedia(global.site_logo.url) : null;

  // Restore the convention: "Page Title | Brand Name"
  const fullTitle = `${seo.metaTitle} | ${global.site_brand_name}`;

  const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description: seo.metaDescription,
    keywords: seo.keywords ? seo.keywords.split(',').map(keyword => keyword.trim()) : undefined,
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: alternates,
    },
    robots: seo.metaRobots ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: seo.openGraph?.ogTitle || fullTitle,
      description: seo.openGraph?.ogDescription || seo.metaDescription,
      url: `${siteUrl}${path}`,
      type: (seo.openGraph?.ogType || 'website') as OpenGraphType,
      images: shareImageUrl ? [{ url: shareImageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.openGraph?.ogTitle || fullTitle,
      description: seo.openGraph?.ogDescription || seo.metaDescription,
      images: shareImageUrl ? [shareImageUrl] : [],
    },
  };

  if (faviconUrl) {
    metadata.icons = {
      icon: faviconUrl,
    };
  }

  return metadata;
}
