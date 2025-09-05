import React from 'react';
import { getAllProjects } from '@/lib/projects';
import Container from '@/components/ui/Container';

const Stack = () => {
  const projects = getAllProjects();
  const allTechnologies = projects.flatMap((project) => project.technologies);
  const uniqueTechnologies = [...new Set(allTechnologies)];

  return (
    <section className="py-5 xl:py-0">
      <Container>
        {/* <h2 className="text-center font-sans text-primary-foreground text-5xl sm:text-6xl md:text-6xl tracking-tight mb-6">
          My Tech Stack
        </h2> */}
        <div className="flex flex-wrap justify-center gap-4">
          {uniqueTechnologies.map((tech) => (
            <div
              key={tech}
              className="rounded-full bg-primary dark:bg-secondary px-4 py-2 text-primary-foreground dark:text-secondary-foreground text-sm font-mono"
            >
              {/* Icon can be added here later */}
              {tech}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Stack;
