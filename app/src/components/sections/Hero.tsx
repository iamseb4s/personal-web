import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSubtitle from '@/components/ui/HeroSubtitle';
import Container from '@/components/ui/Container';

const Hero = () => {
  return (
    <section id="home" className="py-12 xl:py-20">
      <Container 
        paddingX="px-10 lg:px-24"
        className="flex flex-col-reverse items-stretch gap-8 text-center lg:flex-row">
        {/* Text Content */}
        <div className="flex flex-col justify-center items-center lg:items-start lg:text-left lg:w-1/2">
          <h1 className="mb-0 lg:mb-3 xl:mb-0 text-primary-foreground font-sans text-5xl xl:text-6xl">
            Hola, soy Sebas!
          </h1>
          <div className="mb-4 lg:mb-2 xl:mb-4 font-sans text-5xl xl:text-6xl text-secondary">
            <HeroSubtitle />
          </div>
          <p className="max-w-md lg:max-w-max mb-6 xl:mb-14 font-mono text-foreground xl:text-xl">
            Bienvenido a mi rincón digital! Aquí encontrarás una selección de mis proyectos y las tecnologías que me apasionan.
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <Link
              href="/#projects"
              className="inline-flex h-10 xl:h-12 items-center justify-center rounded-full bg-secondary dark:bg-primary px-6 md:px-8 text-md xl:text-xl font-mono text-secondary-foreground dark:text-primary-foreground shadow transition-colors hover:bg-secondary/90 hover:dark:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
            >
              MIS PROYECTOS
            </Link>
            <Link
              href="mailto:sebas@iamsebas.dev"
              className="inline-flex h-10 xl:h-12 items-center justify-center rounded-full border border-foreground bg-transparent px-6 md:px-8 text-md xl:text-xl font-mono text-foreground shadow transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
            >
              CONTACTO
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="w-full max-w-md mx-auto lg:w-9/20 lg:max-w-none lg:mx-0 aspect-[4/3] md:aspect-video relative rounded-3xl overflow-hidden">
          <Image
            src="/sebas_day.jpg"
            alt="Sebas working during the day"
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            className="object-cover scale-105 transition-opacity duration-500 ease-in-out opacity-100 dark:opacity-0"
          />
          <Image
            src="/sebas_night.jpg"
            alt="Sebas working at night"
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            className="object-cover scale-105 transition-opacity duration-500 ease-in-out opacity-0 dark:opacity-100"
          />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
