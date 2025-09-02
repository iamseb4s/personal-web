import React from 'react';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/ui/ProjectCard';

const Projects = () => {
  const projects = getAllProjects();

  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="container mx-auto max-w-screen-lg px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">
          My Projects
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
