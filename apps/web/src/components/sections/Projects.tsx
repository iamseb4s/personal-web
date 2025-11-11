import React from 'react';
import ProjectCard, { type Project } from '@/components/ui/ProjectCard';
import Container from '@/components/ui/Container';
import { fetchAPI, getStrapiURL } from '@/lib/strapi';

type StrapiProject = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  technologies: string | null;
  finished: boolean;
  repo_url?: string;
  live_demo?: string | null;
  main_image: {
    data?: {
      attributes: {
        url: string;
      };
    };
  } | null;
};

const Projects = async () => {
  const strapiData = await fetchAPI('/projects', {
    populate: 'main_image',
  });

  const projects: Project[] = strapiData.data.map((item: StrapiProject) => ({
    slug: item.slug,
    title: item.title,
    description: item.description || '',
    status: item.finished ? 'completed' : 'writing',
    technologies: item.technologies
      ? item.technologies.split(',').map((t) => t.trim())
      : [],
    repoUrl: item.repo_url,
    liveDemoUrl: item.live_demo || undefined,
    main_image: item.main_image?.data
      ? getStrapiURL(item.main_image.data.attributes.url)
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
