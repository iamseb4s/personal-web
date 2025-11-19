import type { Metadata } from 'next';
import { Bebas_Neue, IBM_Plex_Mono, Roboto, Noto_Serif } from 'next/font/google';
import './globals.css'; // Global styles
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getHomePageContent, getAvailableLocales } from '@/lib/strapi';
import { HomePageProps } from '@/types/home-page';

interface Locale {
  code: string;
  isDefault: boolean;
}

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
  const [homePageData, localesData] = await Promise.all([
    getHomePageContent(lang),
    getAvailableLocales(),
  ]);
  const homePageProps: HomePageProps = homePageData.data;
  const defaultLocale = localesData.find((l: Locale) => l.isDefault)?.code || 'es-419';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4100';

  const alternates: { [key: string]: string } = {};
  localesData.forEach((locale: Locale) => {
    const localePath = locale.isDefault ? '' : `/${locale.code}`;
    alternates[locale.code] = `${siteUrl}${localePath}`;
  });

  return {
    title: homePageProps.site_metadata_title,
    description: homePageProps.hero_description,
    icons: {
      icon: '/sebas_icon.svg',
    },
    alternates: {
      canonical: `${siteUrl}/${lang === defaultLocale ? '' : lang}`,
      languages: alternates,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const [homePageData, localesData] = await Promise.all([
    getHomePageContent(lang),
    getAvailableLocales(),
  ]);
  const homePageProps: HomePageProps = homePageData.data;
  const availableLocales: { id: number; name: string; code: string; isDefault: boolean }[] = localesData;
  const defaultLocale = availableLocales.find(l => l.isDefault)?.code || 'es-419';

  return (
    <>
      <Header
        siteTitle={homePageProps.site_title}
        navHome={homePageProps.header_nav_home}
        navProjects={homePageProps.header_nav_projects}
        lang={lang}
        defaultLocale={defaultLocale}
        availableLocales={availableLocales}
      />
      <main>{children}</main>
      <Footer
        lang={lang}
        defaultLocale={defaultLocale}
        footerBuiltByPrefix={homePageProps.footer_built_by_prefix}
        footerAuthorName={homePageProps.footer_author_name}
        footerBuiltBySuffix={homePageProps.footer_built_by_suffix}
        socialLinkGithub={homePageProps.social_link_github}
        socialLinkLinkedin={homePageProps.social_link_linkedin}
        socialLinkEmail={homePageProps.social_link_email}
      />
    </>
  );
}
