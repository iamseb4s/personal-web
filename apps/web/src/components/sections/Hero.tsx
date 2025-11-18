import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSubtitle } from '@/components/ui/HeroSubtitle';
import Container from '@/components/ui/Container';
import { getStrapiURL } from '@/lib/strapi';

interface ImageProps {
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

interface HeroProps {
  heroGreeting: string;
  heroDescription: string;
  heroButton1: string;
  heroButton2: string;
  heroDayImage: ImageProps;
  heroNightImage: ImageProps;
  heroTypewriter: string;
  socialLinkEmail: string;
}

export const Hero = ({
  heroGreeting,
  heroDescription,
  heroButton1,
  heroButton2,
  heroDayImage,
  heroNightImage,
  heroTypewriter,
  socialLinkEmail,
}: HeroProps) => {
  return (
    <section id="home" className="py-12 xl:py-20">
      <Container
        paddingX="px-10 lg:px-24"
        className="flex flex-col-reverse items-stretch gap-8 text-center lg:flex-row"
      >
        {/* Text Content */}
        <div className="flex flex-col justify-center items-center lg:items-start lg:text-left lg:w-1/2">
          <h1 className="mb-0 lg:mb-3 xl:mb-0 text-primary-foreground font-sans text-5xl xl:text-6xl">
            {heroGreeting}
          </h1>
          <div className="mb-4 lg:mb-2 xl:mb-4 font-sans text-5xl xl:text-6xl text-secondary">
            <HeroSubtitle typewriterStrings={heroTypewriter} />
          </div>
          <p className="max-w-md lg:max-w-max mb-6 xl:mb-14 font-mono text-foreground xl:text-xl">
            {heroDescription}
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <Link
              href="/#projects"
              className="inline-flex h-10 xl:h-12 items-center justify-center rounded-full bg-secondary dark:bg-primary px-6 md:px-8 text-md xl:text-xl font-mono text-secondary-foreground dark:text-primary-foreground shadow transition-colors hover:bg-secondary/90 hover:dark:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
            >
              {heroButton1}
            </Link>
            <Link
              href={socialLinkEmail}
              className="inline-flex h-10 xl:h-12 items-center justify-center rounded-full border border-foreground bg-transparent px-6 md:px-8 text-md xl:text-xl font-mono text-foreground shadow transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
            >
              {heroButton2}
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="w-full max-w-md mx-auto lg:w-9/20 lg:max-w-none lg:mx-0 aspect-[4/3] md:aspect-video relative rounded-3xl overflow-hidden">
          <Image
            src={getStrapiURL(heroDayImage.url)}
            alt={heroDayImage.alternativeText || 'Sebas working during the day'}
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            className="object-cover transition-opacity duration-500 ease-in-out opacity-100 dark:opacity-0"
          />
          <Image
            src={getStrapiURL(heroNightImage.url)}
            alt={heroNightImage.alternativeText || 'Sebas working at night'}
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            className="object-cover transition-opacity duration-500 ease-in-out opacity-0 dark:opacity-100"
          />
        </div>
      </Container>
    </section>
  );
};
