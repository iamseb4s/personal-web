import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getGlobalData, getNotFoundPageData, getStrapiURL } from '@/lib/strapi';
import { GlobalData, NotFoundPageData } from '@/types/strapi';
import { generateSeoMetadata } from "@/lib/seo";

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
  const siteLogoUrl = globalProps.site_logo?.url;

  // 1. Try Specific 404 SEO Component
  if (notFoundPageProps.seo) {
    return generateSeoMetadata({
      seo: notFoundPageProps.seo,
      path: "/404",
      global: {
        site_brand_name: globalProps.site_brand_name,
        site_logo: globalProps.site_logo,
      },
    });
  }

  // 2. Fallback to 404 Page Content (Title/Description) from CMS
  // This ensures we show "Página no encontrada | Brand" instead of "undefined | Brand"
  if (notFoundPageProps.title) {
    const metadata: Metadata = {
      title: `${notFoundPageProps.title} | ${globalProps.site_brand_name}`,
      description: notFoundPageProps.description,
    };

    if (siteLogoUrl) {
      metadata.icons = {
        icon: getStrapiURL(siteLogoUrl),
      };
    }
    return metadata;
  }

  // 3. Last Resort: Global Default SEO
  if (globalProps.default_seo) {
    return generateSeoMetadata({
      seo: globalProps.default_seo,
      path: "/404",
      global: {
        site_brand_name: globalProps.site_brand_name,
        site_logo: globalProps.site_logo,
      },
    });
  }

  return {
    title: `404 | ${globalProps.site_brand_name}`,
  };
}

export default function NotFoundCatchAll() {
  notFound();
  return null;
}
