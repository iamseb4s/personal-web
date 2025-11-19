import type { Metadata } from 'next';
import { Bebas_Neue, IBM_Plex_Mono, Roboto, Noto_Serif } from 'next/font/google';
import './globals.css'; // Global styles
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAvailableLocales, getGlobalData, getStrapiURL, getHeaderData, getFooterData } from '@/lib/strapi';
import { GlobalData, HeaderData, FooterData, Locale } from '@/types/strapi';

export const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

// Metadata can be dynamic based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const [globalResponse, localesData] = await Promise.all([
    getGlobalData(lang),
    getAvailableLocales(),
  ]);

  if (!globalResponse.data) {
    return {
      title: 'iamsebas.dev | Content Error',
      description: 'Global content is not available. Please check the CMS.',
    };
  }

  const globalProps: GlobalData = globalResponse.data;
  const defaultLocale = localesData.find((l: Locale) => l.isDefault)?.code || 'es-419';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4100';

  const alternates: { [key: string]: string } = {};
  localesData.forEach((locale: Locale) => {
    const localePath = locale.isDefault ? '' : `/${locale.code}`;
    alternates[locale.code] = `${siteUrl}${localePath}`;
  });

  const pageTitle = globalProps.default_seo?.page_title ? `${globalProps.default_seo.page_title} | ${globalProps.site_brand_name}` : globalProps.site_brand_name;
  const pageDescription = globalProps.default_seo?.page_description || '';
  const siteLogoUrl = globalProps.site_logo?.url;

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `${siteUrl}/${lang === defaultLocale ? '' : lang}`,
      languages: alternates,
    },
  };

  if (siteLogoUrl) {
    metadata.icons = {
      icon: getStrapiURL(siteLogoUrl),
    };
  }

  return metadata;
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const [localesData, headerData, footerData] = await Promise.all([
    getAvailableLocales(),
    getHeaderData(lang),
    getFooterData(lang),
  ]);

  const headerProps: HeaderData = headerData.data;
  const footerProps: FooterData = footerData.data;
  const availableLocales: { id: number; name: string; code: string; isDefault: boolean }[] = localesData;
  const defaultLocale = availableLocales.find(l => l.isDefault)?.code || 'es-419';

  return (
    <>
      <Header
        displayText={headerProps.display_text}
        navLinks={headerProps.nav_links}
        lang={lang}
        defaultLocale={defaultLocale}
        availableLocales={availableLocales}
      />
      <main>{children}</main>
      <Footer
        lang={lang}
        defaultLocale={defaultLocale}
        externalLinks={footerProps.external_links}
        copyrightPrefix={footerProps.copyright_prefix}
        copyrightAuthorLink={footerProps.copyright_author_link}
        copyrightSuffix={footerProps.copyright_suffix}
      />
    </>
  );
}
