import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getHomePageContent, fetchAPI } from "@/lib/strapi";
import { HomePageProps } from "@/types/home-page"; // Import HomePageProps from shared types

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const homePageData = await getHomePageContent(lang);
  const homePageProps: HomePageProps = homePageData.data;

  const projectsData = await fetchAPI('/projects', {
    locale: lang, // Fetch the specific locale
    populate: {
      main_image: {
        fields: ['url'],
      },
      technologies: {
        fields: ['name'],
      },
    },
  });

  return (
    <>
      <Hero
        heroGreeting={homePageProps.hero_greeting}
        heroDescription={homePageProps.hero_description}
        heroButton1={homePageProps.hero_button_1}
        heroButton2={homePageProps.hero_button_2}
        heroDayImage={homePageProps.hero_day_image}
        heroNightImage={homePageProps.hero_night_image}
        heroTypewriter={homePageProps.hero_typewriter}
        socialLinkEmail={homePageProps.social_link_email}
      />
      <ScrollReveal delay={0.25}>
        <Stack
          stackSectionTitle={homePageProps.stack_section_title}
          projectsData={projectsData}
        />
      </ScrollReveal>
      <ScrollReveal delay={0.25}>
        <Projects
          lang={lang}
          projectsSectionTitle={homePageProps.projects_section_title}
          projectDefaultImage={homePageProps.project_default_image}
          projectWipText={homePageProps.project_wip_text}
          projectLiveDemoButtonText={homePageProps.project_live_demo_button_text}
          projectRepoButtonText={homePageProps.project_repo_button_text}
          projectLiveDemoButtonTextShort={homePageProps.project_live_demo_button_text_short}
          projectRepoButtonTextShort={homePageProps.project_repo_button_text_short}
          projectsData={projectsData}
        />
      </ScrollReveal>
    </>
  );
}