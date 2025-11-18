import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Roboto, Noto_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getHomePageContent } from "@/lib/strapi";
import { HomePageProps } from "@/types/home-page"; // Import HomePageProps from shared types

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hi, I am Sebas! 👾",
  description: "Check out my projects here!",
  icons: {
    icon: "/sebas_icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homePageData = await getHomePageContent();
  const homePageProps: HomePageProps = homePageData.data;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${ibmPlexMono.variable} ${roboto.variable} ${notoSerif.variable} antialiased bg-background text-foreground transition-colors duration-500 ease-in-out`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Header
            siteTitle={homePageProps.site_title}
            navHome={homePageProps.header_nav_home}
            navProjects={homePageProps.header_nav_projects}
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
        </ThemeProvider>
      </body>
    </html>
  );
}
