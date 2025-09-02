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
        duration: isHovered ? 0.15 : 0.75, // Fast hover-in, slow hover-out
        ease: 'easeOut',
      }}
      className="h-full"
    >
      <Link href={`/projects/${project.slug}`} className="group block rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow bg-white dark:bg-gray-900 h-full">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          {/* Placeholder for project image */}
          <Image
            src="/next.svg" // Placeholder
            alt={`Screenshot of ${project.title}`}
            layout="fill"
            objectFit="cover"
            className="dark:invert p-8"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
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
