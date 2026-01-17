'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Copy, Check, X } from 'lucide-react';
import { trackEvent } from '@/lib/umami';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

const ensureAbsoluteUrl = (url: string) => {
  if (!url) return '';
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:')
  ) {
    return url;
  }
  return `https://${url}`;
};

export const ContactModal = ({
  isOpen,
  onClose,
  title,
  email,
  linkedinUrl,
  githubUrl,
}: ContactModalProps) => {
  const [copied, setCopied] = useState(false);

  const absoluteLinkedinUrl = ensureAbsoluteUrl(linkedinUrl);
  const absoluteGithubUrl = ensureAbsoluteUrl(githubUrl);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 dark:bg-black/60 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-background p-8 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center gap-8 text-center">
              <h2 className="text-3xl font-sans font-bold text-foreground">
                {title}
              </h2>

              {/* Social Icons Row */}
              <div className="flex items-center gap-10">
                <a
                  href={absoluteLinkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('navigation', {
                      type: 'external',
                      location: 'hero',
                      target: 'linkedin',
                      url: absoluteLinkedinUrl,
                      label: 'LinkedIn',
                    })
                  }
                  className="text-muted-foreground hover:text-secondary dark:hover:text-primary transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={40} />
                </a>
                <a
                  href={absoluteGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('navigation', {
                      type: 'external',
                      location: 'hero',
                      target: 'github',
                      url: absoluteGithubUrl,
                      label: 'GitHub',
                    })
                  }
                  className="text-muted-foreground hover:text-secondary dark:hover:text-primary transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github size={40} />
                </a>
              </div>

              {/* Email Box */}
              <div className="relative flex w-full items-center justify-center rounded-2xl border border-border bg-secondary/30">
                <a
                  href={`mailto:${email}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    trackEvent('navigation', {
                      type: 'external',
                      location: 'hero',
                      target: 'email',
                      url: `mailto:${email}`,
                      label: 'Email Mailto',
                    });
                  }}
                  className="block w-full py-4 px-14 truncate font-mono text-lg text-foreground hover:text-foreground/70 transition-colors text-center"
                >
                  {email}
                </a>
                <button
                  onClick={(e) => {
                    handleCopy(e);
                    trackEvent('navigation', {
                      type: 'external',
                      location: 'hero',
                      target: 'email_copy',
                      label: 'Copy Email',
                    });
                  }}
                  className="absolute right-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background text-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
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
                        <Check size={20} className="text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Copy size={20} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
