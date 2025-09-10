'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import React from 'react';

// Custom SVG icon with adjusted proportions.
const WiderLockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Shackle adjusted for a wider body */}
    <path strokeWidth="3" d="M7 11V7a5 5 0 1 1 10 0v4"></path>
    {/* Body: wider and less tall */}
    <rect fill="currentColor" x="3" y="11" width="18" height="11" rx="2"></rect>
  </svg>
);

// Define the type for a single project, now including status
export type Project = {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'writing' | 'finished';
};

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isWip = project.status !== 'finished';

  const CardContent = (
    // Main container for positioning, hover effects, and clipping
    <div className="block rounded-xl h-full relative overflow-hidden group hover:shadow-lg transition-shadow">
      {/* Layer 1: Content (Background, Image, Text). This layer gets all filters. */}
      <div
        className={`bg-primary h-full transition-all duration-500 ${isWip ? 'grayscale brightness-90 blur-sm group-hover:blur-none' : ''}`}>
        <div className="relative h-40 lg:h-50 xl:h-60 w-full">
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
      </div>

      {/* Layer 2: Border. Sits on top of content, gets grayscaled independently. */}
      <div
        className={`absolute inset-0 rounded-xl border border-primary ${isWip ? 'grayscale brightness-90' : ''}`}>
      </div>

      {/* Layer 3: Lock Icon and Text. Sits on top of everything, no filters. */}
      {isWip && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <WiderLockIcon className="h-12 w-12 text-white" />
          <p className="mt-3 text-white font-sans text-3xl transition-opacity duration-250 opacity-100 group-hover:opacity-0">
            Coming Soon!
          </p>
        </div>
      )}
    </div>
  );

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
      {isWip ? (
        <div>{CardContent}</div>
      ) : (
        <Link href={`/projects/${project.slug}`}>{CardContent}</Link>
      )}
    </motion.div>
  );
};

export default ProjectCard;
