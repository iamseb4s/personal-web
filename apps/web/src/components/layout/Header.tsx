import React from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import Container from '@/components/ui/Container';

interface LocaleInfo {
  id: number;
  name: string;
  code: string;
}

interface HeaderProps {
  siteTitle: string;
  navHome: string;
  navProjects: string;
  lang: string;
  availableLocales: LocaleInfo[];
}

export const Header = ({ siteTitle, navHome, navProjects, lang, availableLocales }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary backdrop-blur-sm shadow-lg">
      <Container
        paddingX="px-8 md:px-8 lg:px-8"
        maxWidth="max-w-screen-sm sm:max-w-none"
        className="flex h-16 lg:h-20 items-center justify-between"
      >
        <Link href={`/${lang}`} className="font-sans text-2xl xl:text-4xl">
          {siteTitle}
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 text-md xl:text-xl">
          {/* Text Buttons Group */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <Link
              href={`/${lang}/#home`}
              className="font-mono  relative group text-foreground transition-colors"
            >
              {navHome}
              <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center "></span>
            </Link>
            <Link
              href={`/${lang}/#projects`}
              className="font-mono relative group text-foreground transition-colors"
            >
              {navProjects}
              <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
            </Link>
          </div>

          {/* Circular Buttons Group */}
          <div className="flex items-center gap-0.5"> {/* Reduced gap here */}
            <LanguageSwitcher currentLang={lang} availableLocales={availableLocales} />
            <ThemeSwitcher />
          </div>
        </nav>
      </Container>
    </header>
  );
};
