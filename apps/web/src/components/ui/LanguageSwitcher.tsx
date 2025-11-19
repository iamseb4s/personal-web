'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

// Icon for the dropdown indicator
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

interface LocaleInfo {
  id: number;
  name: string;
  code: string;
}

interface LanguageSwitcherProps {
  currentLang: string;
  availableLocales: LocaleInfo[];
}

export const LanguageSwitcher = ({ currentLang, availableLocales }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  const toggleOpen = () => setIsOpen(!isOpen);

  const getLocalizedPath = (targetLangCode: string) => {
    // pathname will be like /es-419/projects/my-slug or /es-419
    const pathSegments = pathname.split('/');
    // Replace the current locale segment with the target locale
    pathSegments[1] = targetLangCode;
    return pathSegments.join('/');
  };

  const currentDisplayLang = currentLang === 'es-419' ? 'es' : currentLang.toUpperCase().substring(0,2);

  return (
    <div className="relative" ref={ref}>
      {/* Main button that is always visible */}
      <button
        aria-label="Toggle language menu"
        onClick={toggleOpen}
        className="p-3 rounded-full hover:bg-background/50 dark:hover:bg-background/50 cursor-pointer flex items-center justify-center gap-1 w-14 h-14 aspect-square"
      >
        <span className="font-mono font-bold text-lg">{currentDisplayLang.toUpperCase()}</span>
        <ChevronDownIcon />
      </button>

      {/* Dropdown menu item */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full mt-2"
          >
            {availableLocales
              .filter((locale) => locale.code !== currentLang)
              .map((locale) => (
                <Link
                  key={locale.id}
                  href={getLocalizedPath(locale.code)}
                  onClick={() => setIsOpen(false)} // Close menu on click
                  className="p-3 rounded-full bg-secondary/50 hover:bg-secondary/20 dark:bg-secondary/50 dark:hover:bg-secondary/10 cursor-pointer shadow-lg w-14 h-14 aspect-square flex items-center justify-center"
                >
                  <span className="font-mono font-bold text-lg">{locale.code.toUpperCase().substring(0,2)}</span>
                </Link>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
