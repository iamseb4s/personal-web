import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';

interface NavLink {
  id: number;
  text: string;
  target_id: string;
}

interface ExternalLink {
  id: number;
  text: string;
  url: string;
}

interface FooterProps {
  lang: string;
  defaultLocale: string;
  externalLinks: ExternalLink[];
  copyrightPrefix: string;
  copyrightAuthorLink: NavLink;
  copyrightSuffix: string;
}

const getUrlFromTarget = (targetId: string, lang: string, defaultLocale: string): string => {
  const isDefaultLang = lang === defaultLocale;
  const prefix = isDefaultLang ? '' : `/${lang}`;

  if (targetId === 'root') {
    return prefix || '/';
  }
  return `${prefix}/#${targetId}`;
};

export const Footer = ({
  lang,
  defaultLocale,
  externalLinks,
  copyrightPrefix,
  copyrightAuthorLink,
  copyrightSuffix,
}: FooterProps) => {
  const authorPath = getUrlFromTarget(copyrightAuthorLink.target_id, lang, defaultLocale);

  return (
    <footer className="w-full bg-secondary mb-6 md:mb-0">
      <Container
        paddingX="px-8 md:px-8 lg:px-8"
        maxWidth="max-w-screen-sm sm:max-w-none"
        className="flex flex-col-reverse items-center justify-center gap-1 py-3 md:h-27 md:flex-row md:justify-between md:py-0"
      >
        <p className="text-center font-mono text-sm sm:text-md  md:text-lg leading-loose text-secondary-foreground md:text-left">
          {copyrightPrefix}{' '}
          <Link href={authorPath} className="relative group font-bold">
            {copyrightAuthorLink.text}
            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-secondary-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
          </Link>
          {copyrightSuffix}
        </p>
        <div className="flex items-center">
          {externalLinks.map((link, index) => (
            <React.Fragment key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group text-base md:text:xl sm:text-lg font-mono text-secondary-foreground transition"
              >
                <span className="hover:secondary-foreground">
                  {link.text}
                </span>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-secondary-foreground group-hover:bg-secondary-foreground"></span>
              </a>
              {index < externalLinks.length - 1 && (
                <span aria-hidden="true" className="mx-5 sm:mx-5 text-secondary-foreground">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </footer>
  );
};
