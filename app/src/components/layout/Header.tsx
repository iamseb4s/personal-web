import React from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-screen-lg items-center justify-between px-4">
        <Link href="/" className="font-black text-lg">
          Sebas Nolasco
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/#home"
            className="relative group text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Home
            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gray-900 dark:bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
          </Link>
          <Link
            href="/#projects"
            className="relative group text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Projects
            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gray-900 dark:bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
          </Link>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default Header;
