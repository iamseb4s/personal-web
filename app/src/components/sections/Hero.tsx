import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSubtitle from '@/components/ui/HeroSubtitle';

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col-reverse items-center gap-12 px-4 py-16 text-center sm:flex-row sm:py-24 lg:py-32 max-w-screen-lg">
      {/* Text Content */}
      <div className="flex flex-col items-center sm:items-start sm:text-left">
        <h1 className="mb-4 text-4xl font-black sm:text-5xl md:text-6xl">
          Hey, I'm Sebas
        </h1>
        <div className="mb-4 text-xl font-medium text-gray-600 dark:text-gray-400 sm:text-2xl h-8 sm:h-14">
          <HeroSubtitle />
        </div>
        <p className="mb-8 max-w-md text-gray-500 dark:text-gray-400 md:text-lg">
          Bienvenido a mi rincón digital. Aquí encontrarás una selección de mis proyectos y las tecnologías que me apasionan.
        </p>
        <Link
          href="/#projects"
          className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-bold text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          View My Work
        </Link>
      </div>

      {/* Image */}
      <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 relative">
        <Image
          src="/next.svg" // Placeholder image
          alt="Pixel art placeholder"
          layout="fill"
          objectFit="contain"
          className="dark:invert"
        />
      </div>
    </section>
  );
};

export default Hero;
