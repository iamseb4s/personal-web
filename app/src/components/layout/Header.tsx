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
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#projects"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Projects
          </Link>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default Header;
