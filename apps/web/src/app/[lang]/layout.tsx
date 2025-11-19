import type { Metadata } from 'next';
import { Bebas_Neue, IBM_Plex_Mono, Roboto, Noto_Serif } from 'next/font/google';
import './globals.css'; // Global styles
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getHomePageContent, getAvailableLocales } from '@/lib/strapi';
import { HomePageProps } from '@/types/home-page';

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
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;
  const homePageData = await getHomePageContent(lang);
  const homePageProps: HomePageProps = homePageData.data;

  return {
    title: homePageProps.site_metadata_title,
    description: homePageProps.hero_description,
    icons: {
      icon: '/sebas_icon.svg',
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const { lang } = await params;
  const [homePageData, localesData] = await Promise.all([
    getHomePageContent(lang),
    getAvailableLocales(),
  ]);
  const homePageProps: HomePageProps = homePageData.data;
  const availableLocales: { id: number; name: string; code: string }[] = localesData;


  return (
    <>
      <Header
        siteTitle={homePageProps.site_title}
        navHome={homePageProps.header_nav_home}
        navProjects={homePageProps.header_nav_projects}
        lang={lang}
        availableLocales={availableLocales}
      />
      <main>{children}</main>
      <Footer
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
