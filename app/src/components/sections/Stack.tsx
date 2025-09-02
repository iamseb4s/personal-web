import React from 'react';
import { getAllProjects } from '@/lib/projects';

const Stack = () => {
  const projects = getAllProjects();
  const allTechnologies = projects.flatMap((project) => project.technologies);
  const uniqueTechnologies = [...new Set(allTechnologies)];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto max-w-screen-lg px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">
          My Tech Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {uniqueTechnologies.map((tech) => (
            <div
              key={tech}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {/* Icon can be added here later */}
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;
