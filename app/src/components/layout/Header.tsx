import React from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import Container from '@/components/ui/Container';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary backdrop-blur-sm shadow-lg">
      <Container
        paddingX="px-8 md:px-8 lg:px-8"
        maxWidth="max-w-screen-sm sm:max-w-none"
        className="flex h-16 lg:h-20 items-center justify-between"
      >
        <Link href="/" className="font-sans text-2xl xl:text-4xl">
          iamsebas.dev
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 text-md xl:text-xl">
          <Link
            href="/#home"
            className="font-mono  relative group text-foreground transition-colors"
          >
            INICIO
            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center "></span>
          </Link>
          <Link
            href="/#projects"
            className="font-mono relative group text-foreground transition-colors"
          >
            PROYECTOS
            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
          </Link>
          <ThemeSwitcher />
        </nav>
      </Container>
    </header>
  );
};

export default Header;
