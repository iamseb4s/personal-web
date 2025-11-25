import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getGlobalData, getNotFoundPageData, getStrapiURL } from '@/lib/strapi';
import { GlobalData, NotFoundPageData } from '@/types/strapi';

interface PageProps {
  params: Promise<{
    lang?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang = 'es-419' } = await params;

  const [globalData, notFoundPageData] = await Promise.all([
    getGlobalData(lang),
    getNotFoundPageData(lang),
  ]);

  const globalProps: GlobalData = globalData.data;
  const notFoundPageProps: NotFoundPageData = notFoundPageData.data;
  const seo = notFoundPageProps?.seo || globalProps?.default_seo;
  const siteBrandName = globalProps?.site_brand_name;

  const pageTitle = seo?.page_title;
  const pageDescription = seo?.page_description;
  const siteLogoUrl = globalProps.site_logo?.url;

  const metadata: Metadata = {
    title: `${pageTitle} | ${siteBrandName}`,
    description: pageDescription,
  };

  if (siteLogoUrl) {
    metadata.icons = {
      icon: getStrapiURL(siteLogoUrl),
    };
  }

  return metadata;
}

export default function NotFoundCatchAll() {
  notFound();
  return null;
}
