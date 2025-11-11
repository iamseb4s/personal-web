import React from 'react';
import Container from '@/components/ui/Container';
import TechIcon from '@/components/ui/TechIcon';
import { fetchAPI } from '@/lib/strapi';

type StrapiTechnology = {
  id: number;
  name: string;
};

type StrapiProject = {
  technologies: StrapiTechnology[];
};

const Stack = async () => {
  const strapiData = await fetchAPI('/projects', { populate: '*' });

  const allTechnologies = strapiData.data.flatMap((project: StrapiProject) =>
    project.technologies.map(tech => tech.name)
  );
  const uniqueTechnologies = [...new Set(allTechnologies)];

  return (
    <section className="py-5 xl:py-0">
      <Container>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {uniqueTechnologies.map((tech) => (
            <div key={tech} className="group relative flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 p-2 transition-transform duration-300 group-hover:scale-110 dark:bg-secondary/5 md:h-14 md:w-14 md:p-2.5 xl:h-16 xl:w-16 xl:p-3">
                <TechIcon name={tech} className="h-6 w-6 text-secondary dark:text-secondary md:h-7 md:w-7 xl:h-8 xl:w-8" />
              </div>
              <span className="absolute -bottom-7 scale-0 rounded bg-primary px-2 py-1 font-mono text-xs font-medium text-primary-foreground transition-all duration-300 group-hover:scale-100 whitespace-nowrap text-center md:-bottom-8 md:text-sm">
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
