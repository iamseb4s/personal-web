import React from 'react';
import ProjectCard, { type Project } from '@/components/ui/ProjectCard';
import Container from '@/components/ui/Container';
import { fetchAPI, getStrapiURL } from '@/lib/strapi';

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

const Projects = async () => {
  const strapiData = await fetchAPI('/projects', {
    populate: {
      main_image: {
        fields: ['url'],
      },
      technologies: {
        fields: ['name'],
      },
    },
  });

  if (!strapiData || !strapiData.data) {
    return null;
  }

  // Sort projects: finished projects first, then by creation date
  strapiData.data.sort((a: StrapiProject, b: StrapiProject) => {
    // Sort by 'finished' status in descending order (true comes first)
    const finishedSort = (b.finished ? 1 : 0) - (a.finished ? 1 : 0);
    if (finishedSort !== 0) {
      return finishedSort;
    }

    // If 'finished' status is the same, sort by 'created' date in descending order (newest first)
    const dateA = new Date(a.created).getTime();
    const dateB = new Date(b.created).getTime();
    return dateB - dateA;
  });

  const projects: Project[] = strapiData.data.map((item: StrapiProject) => ({
    slug: item.slug,
    title: item.title,
    description: item.description || '',
    finished: item.finished,
    technologies: item.technologies ? item.technologies.map((tech) => tech.name) : [],
    repoUrl: item.repo_url,
    liveDemoUrl: item.live_demo || undefined,
    main_image: item.main_image
      ? getStrapiURL(item.main_image.url)
      : '/project_default.png',
  }));

  return (
    <section id="projects" className="py-8 md:py-12 lg:py-12 xl:py-20">
      <Container>
        <h2 className="text-center font-sans text-5xl sm:text-6xl md:text-6xl tracking-tight mb-6">
          MIS PROYECTOS
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Projects;
