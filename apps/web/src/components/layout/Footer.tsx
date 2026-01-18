'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import { NavLink, ExternalLinkComponent } from '@/types/strapi';
import { TrackedExternalLink } from '@/components/ui/TrackedExternalLink';
import { trackEvent } from '@/lib/umami';

interface FooterProps {
  lang: string;
  defaultLocale: string;
  externalLinks: ExternalLinkComponent[];
  copyrightPrefix: string;
  copyrightAuthorLink: NavLink | null;
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
  const [activeEmail, setActiveEmail] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const authorPath = copyrightAuthorLink ? getUrlFromTarget(copyrightAuthorLink.target_id, lang, defaultLocale) : '';

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActiveEmail(null);
      }
    };

    if (activeEmail) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeEmail]);

  // Handle Escape key to close popover
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveEmail(null);
      }
    };
    if (activeEmail) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [activeEmail]);

  const handleCopy = async (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    e.stopPropagation();
    trackEvent('navigation', {
      type: 'external',
      location: 'footer',
      target: 'email_copy',
      label: 'Copy Email',
    });
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <footer className="w-full bg-secondary mb-6 md:mb-0">
      <Container
        paddingX="px-8 md:px-8 lg:px-8"
        maxWidth="max-w-screen-sm sm:max-w-none"
        className="flex flex-col-reverse items-center justify-center gap-1 py-3 md:h-27 md:flex-row md:justify-between md:py-0"
      >
        <p className="text-center font-mono text-sm sm:text-md  md:text-lg leading-loose text-secondary-foreground md:text-left">
          {copyrightPrefix}{' '}
          {copyrightAuthorLink && (
            <Link href={authorPath} className="relative group font-bold">
              {copyrightAuthorLink.text}
              <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-secondary-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
            </Link>
          )}
          {copyrightSuffix}
        </p>
        <div className="flex items-center">
          {externalLinks.map((link, index) => {
            const isEmail = link.url.startsWith('mailto:');
            const email = isEmail ? link.url.replace('mailto:', '') : null;

            return (
              <React.Fragment key={link.id}>
                <div className="relative flex items-center">
                  <TrackedExternalLink
                    href={link.url}
                    label={link.text}
                    location="footer"
                    targetType="external_link"
                    onClick={(e) => {
                      if (isEmail && email) {
                        e.preventDefault();
                        setActiveEmail(activeEmail === email ? null : email);
                      }
                    }}
                    className="group text-base md:text:xl sm:text-lg font-mono text-secondary-foreground transition"
                  >
                    <span className="hover:secondary-foreground">
                      {link.text}
                    </span>
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-secondary-foreground group-hover:bg-secondary-foreground"></span>
                  </TrackedExternalLink>

                  {/* Email Popover */}
                  <AnimatePresence>
                    {activeEmail === email && email && (
                      <motion.div
                        ref={popoverRef}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full right-0 mb-4 z-50 min-w-max"
                      >
                        <div className="relative flex items-center justify-between gap-4 rounded-xl border border-border bg-background p-3 shadow-2xl shadow-black/20 dark:shadow-black/50">
                          <a
                            href={`mailto:${email}`}
                            onClick={() => trackEvent('navigation', {
                              type: 'external',
                              location: 'footer',
                              target: 'email',
                              url: `mailto:${email}`,
                              label: 'Email Mailto',
                            })}
                            className="font-mono text-sm md:text-md text-foreground hover:text-foreground/70 transition-colors px-2"
                          >
                            {email}
                          </a>
                          <button
                            onClick={(e) => handleCopy(e, email)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-foreground transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
                            aria-label="Copy email"
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              {copied ? (
                                <motion.div
                                  key="check"
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.5, opacity: 0 }}
                                >
                                  <Check size={16} className="text-green-500" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="copy"
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.5, opacity: 0 }}
                                >
                                  <Copy size={16} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                          {/* Arrow */}
                          <div className="absolute top-full right-4 border-8 border-transparent border-t-background" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {index < externalLinks.length - 1 && (
                  <span aria-hidden="true" className="mx-5 sm:mx-5 text-secondary-foreground">·</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Container>
    </footer>
  );
};
