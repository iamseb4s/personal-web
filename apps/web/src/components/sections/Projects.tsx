import React from 'react';
import { ProjectCard, type Project } from '@/components/ui/ProjectCard';
import Container from '@/components/ui/Container';
import { getStrapiURL } from '@/lib/strapi';

type StrapiTechnology = {
  id: number;
  name: string;
};

type StrapiProject = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  technologies: StrapiTechnology[];
  finished: boolean;
  created: string;
  repo_url?: string;
  live_demo?: string | null;
  main_image: {
    url: string;
  } | null;
};

interface ImageProps {
  url: string;
}

interface ProjectsFeedData {
  title: string;
  wip_text: string;
  project_default_image: ImageProps;
}

interface ProjectPageProps {
  action_button_texts: {
    live_demo_button_text: string;
    repo_button_text: string;
    live_demo_button_text_short: string;
    repo_button_text_short: string;
  }
}

interface ProjectsProps {
  lang: string;
  defaultLocale: string;
  data: ProjectsFeedData;
  projectPageProps: ProjectPageProps;
  projectsData: StrapiProject[];
}

export const Projects = async ({
  lang,
  defaultLocale,
  data,
  projectPageProps,
  projectsData,
}: ProjectsProps) => {
  if (!projectsData) {
    return null;
  }

  // Sort projects: finished projects first, then by creation date
  projectsData.sort((a: StrapiProject, b: StrapiProject) => {
    const finishedSort = (b.finished ? 1 : 0) - (a.finished ? 1 : 0);
    if (finishedSort !== 0) {
      return finishedSort;
    }
    const dateA = new Date(a.created).getTime();
    const dateB = new Date(b.created).getTime();
    return dateB - dateA;
  });

  const defaultImageUrl = data.project_default_image
    ? getStrapiURL(data.project_default_image.url)
    : '';

  const projects: Project[] = projectsData.map((item: StrapiProject) => ({
    slug: item.slug,
    title: item.title,
    description: item.description || '',
    finished: item.finished,
    technologies: item.technologies ? item.technologies.map((tech) => tech.name) : [],
    repoUrl: item.repo_url,
    liveDemoUrl: item.live_demo || undefined,
    main_image: item.main_image
      ? getStrapiURL(item.main_image.url)
      : defaultImageUrl,
  }));

  return (
    <section id="projects" className="py-8 md:py-12 lg:py-12 xl:py-20">
      <Container>
        <h2 className="text-center font-sans text-5xl sm:text-6xl md:text-6xl tracking-tight mb-6">
          {data.title}
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              lang={lang}
              defaultLocale={defaultLocale}
              projectWipText={data.wip_text}
              liveDemoText={projectPageProps.action_button_texts?.live_demo_button_text}
              repoText={projectPageProps.action_button_texts?.repo_button_text}
              liveDemoTextShort={projectPageProps.action_button_texts?.live_demo_button_text_short}
              repoTextShort={projectPageProps.action_button_texts?.repo_button_text_short}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
