'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { HeroSubtitle } from '@/components/ui/HeroSubtitle';
import Container from '@/components/ui/Container';
import { getStrapiURL } from '@/lib/strapi';
import { HeroSection as HeroSectionData } from '@/types/strapi';
import { TrackedInternalLink } from '@/components/ui/TrackedInternalLink';
import { ContactModal } from '@/components/ui/ContactModal';
import { trackEvent } from '@/lib/umami';

interface HeroProps {
  lang: string;
  defaultLocale: string;
  data: HeroSectionData;
}

const getUrlFromTarget = (targetId: string, lang: string, defaultLocale: string): string => {
  const isDefaultLang = lang === defaultLocale;
  const prefix = isDefaultLang ? '' : `/${lang}`;

  if (targetId === 'root') {
    return prefix || '/';
  }
  return `${prefix}/#${targetId}`;
};

export const Hero = ({ lang, defaultLocale, data }: HeroProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const internalLinkUrl = data.internal_link_button ? getUrlFromTarget(data.internal_link_button.target_id, lang, defaultLocale) : '';

  return (
    <section id="home" className="py-12 xl:py-20">
      <Container
        paddingX="px-10 lg:px-24"
        className="flex flex-col-reverse items-stretch gap-8 text-center lg:flex-row"
      >
        {/* Text Content */}
        <div className="flex flex-col justify-center items-center lg:items-start lg:text-left lg:w-1/2">
          <h1 className="mb-0 lg:mb-3 xl:mb-0 text-primary-foreground font-sans text-5xl xl:text-6xl">
            {data.greeting}
          </h1>
          <div className="mb-4 lg:mb-2 xl:mb-4 font-sans text-5xl xl:text-6xl text-secondary">
            <HeroSubtitle typewriterStrings={data.typewriter_text} />
          </div>
          <p className="max-w-md lg:max-w-max mb-6 xl:mb-14 font-mono text-foreground xl:text-xl">
            {data.description}
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            {data.internal_link_button && (
              <TrackedInternalLink
                href={internalLinkUrl}
                location="hero"
                target={data.internal_link_button.target_id}
                label={data.internal_link_button.text}
                className="inline-flex h-10 xl:h-12 items-center justify-center rounded-full bg-secondary dark:bg-primary px-6 md:px-8 text-md xl:text-xl font-mono text-secondary-foreground dark:text-primary-foreground shadow transition-colors hover:bg-secondary/90 hover:dark:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
              >
                {data.internal_link_button.text}
              </TrackedInternalLink>
            )}
            {data.contact_button && (
              <button
                onClick={() => {
                  trackEvent('navigation', {
                    type: 'external',
                    location: 'hero',
                    target: 'contact_modal',
                    label: data.contact_button?.text || 'Contact',
                  });
                  setIsContactModalOpen(true);
                }}
                className="inline-flex h-10 xl:h-12 items-center justify-center rounded-full border border-foreground bg-transparent px-6 md:px-8 text-md xl:text-xl font-mono text-foreground shadow transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
              >
                {data.contact_button.text}
              </button>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="w-full max-w-md mx-auto lg:w-9/20 lg:max-w-none lg:mx-0 aspect-[4/3] md:aspect-video relative rounded-3xl overflow-hidden">
          {data.day_image && (
            <Image
              src={getStrapiURL(data.day_image.url)}
              alt={data.day_image.alternativeText || 'Sebas working during the day'}
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="object-cover transition-opacity duration-500 ease-in-out opacity-100 dark:opacity-0"
              priority
            />
          )}
          {data.night_image && (
            <Image
              src={getStrapiURL(data.night_image.url)}
              alt={data.night_image.alternativeText || 'Sebas working at night'}
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="object-cover transition-opacity duration-500 ease-in-out opacity-0 dark:opacity-100"
              priority
            />
          )}
        </div>
      </Container>

      {/* Contact Modal */}
      {data.contact_button && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          title={data.contact_button.modal_title}
          email={data.contact_button.email}
          linkedinUrl={data.contact_button.linkedin_url}
          githubUrl={data.contact_button.github_url}
        />
      )}
    </section>
  );
};

