'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Define the type for a single project
export type Project = {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
};

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 1, y: 0 }}
      animate={{
        scale: isHovered ? 1.03 : 1,
        y: isHovered ? -5 : 0,
      }}
      transition={{
        duration: isHovered ? 0.15 : 0.3, // Fast hover-in, slow hover-out
        ease: 'easeOut',
      }}
      className="h-full"
    >
      <Link href={`/projects/${project.slug}`} className="group block rounded-xl border border-primary hover:shadow-lg transition-shadow bg-primary h-full">
        <div className="relative h-40 lg:h-50 xl:h-60 w-full overflow-hidden rounded-t-xl">
          {/* Placeholder for project image */}
          <Image
            src="/project_default.png" // Placeholder
            alt={`Image of ${project.title}`}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover scale-118 p-0"
          />
        </div>
        <div className="p-6">
          <h3 className="text-4xl text-primary-foreground font-sans mb-2 under">{project.title}</h3>
          <p className="text-secondary mb-4 text-sm lg:text-lg font-mono">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
