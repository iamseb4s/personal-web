import type { Metadata } from 'next';
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { fetchAPI, getAvailableLocales, getHomePageData, getProjectPageData, getGlobalData } from "@/lib/strapi";
import { HomePageData, HomePageSection, ProjectPageData, GlobalData } from "@/types/strapi";
import { Project as StrapiProject } from "@/types/project"; // Assuming Project type is defined here

interface HomeProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { lang } = await params;
  const [homePageResponse, globalDataResponse] = await Promise.all([
    getHomePageData(lang),
    getGlobalData(lang),
  ]);

  const homePageProps: HomePageData = homePageResponse.data;
  const globalProps: GlobalData = globalDataResponse.data;

  const pageSeo = homePageProps?.seo || globalProps?.default_seo;
  const siteBrandName = globalProps?.site_brand_name;

  const pageTitle = pageSeo?.page_title ? `${pageSeo.page_title} | ${siteBrandName}` : siteBrandName;
  const pageDescription = pageSeo?.page_description || '';

  return {
    title: pageTitle,
    description: pageDescription,
  };
}

// Helper component to render sections dynamically
const SectionRenderer = ({
  section,
  projectsData,
  projectPageProps,
  lang,
  defaultLocale,
}: {
  section: HomePageSection;
  projectsData: StrapiProject[];
  projectPageProps: ProjectPageData;
  lang: string;
  defaultLocale: string;
}) => {
  switch (section.__component) {
    case "sections.hero":
      return <Hero lang={lang} defaultLocale={defaultLocale} data={section} />;
    case "sections.projects-feed":
      return (
        <Projects
          lang={lang}
          defaultLocale={defaultLocale}
          data={section}
          projectsData={projectsData}
          projectPageProps={projectPageProps}
        />
      );
    case "sections.stack":
      return <Stack data={section} projectsData={projectsData} />;
    default:
      return null;
  }
};

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const [homePageResponse, projectsResponse, localesData, projectPageResponse] = await Promise.all([
    getHomePageData(lang),
    fetchAPI('/projects', {
      locale: lang,
      populate: {
        main_image: { fields: ['url'] },
        technologies: { fields: ['name'] },
      },
    }),
    getAvailableLocales(),
    getProjectPageData(lang),
  ]);

  const homePageProps: HomePageData = homePageResponse.data;
  const projectsData: StrapiProject[] = projectsResponse.data;
  const projectPageProps: ProjectPageData = projectPageResponse.data;
  
  const sections = homePageProps?.sections || [];
  const defaultLocale = localesData.find((l: {isDefault: boolean}) => l.isDefault)?.code || 'es-419';

  return (
    <>
      {sections.map((section: HomePageSection, index: number) => (
        <ScrollReveal key={index} delay={0.25}>
          <SectionRenderer
            section={section}
            projectsData={projectsData}
            projectPageProps={projectPageProps}
            lang={lang}
            defaultLocale={defaultLocale}
          />
        </ScrollReveal>
      ))}
    </>
  );
}