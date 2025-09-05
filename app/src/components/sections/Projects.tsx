import React from 'react';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/ui/ProjectCard';
import Container from '@/components/ui/Container';

const Projects = () => {
  const projects = getAllProjects();

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
