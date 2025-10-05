import React from 'react';
import { getAllProjects } from '@/lib/projects';
import Container from '@/components/ui/Container';
import TechIcon from '@/components/ui/TechIcon';

const Stack = () => {
  const projects = getAllProjects();
  const allTechnologies = projects.flatMap((project) => project.technologies);
  const uniqueTechnologies = [...new Set(allTechnologies)].sort();

  return (
    <section className="py-5 xl:py-0">
      <Container>
        <div className="flex flex-wrap justify-center gap-6">
          {uniqueTechnologies.map((tech) => (
            <div key={tech} className="group relative flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 dark:bg-secondary/5 p-3 transition-transform duration-300 group-hover:scale-110">
                <TechIcon name={tech} className="h-8 w-8 text-primary dark:text-secondary" />
              </div>
              <span className="absolute -bottom-8 scale-0 rounded bg-primary px-2 py-1 font-mono font-medium text-sm text-primary-foreground transition-all duration-300 group-hover:scale-100 whitespace-nowrap text-center">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Stack;
