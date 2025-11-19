'use client';

import Link from 'next/link';
import React from 'react';

// Icon for Live Demo
const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

// Icon for GitHub Repository
const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

type ActionButtonsProps = {
  liveDemoUrl?: string;
  repoUrl?: string;
  className?: string; // Prop for external styling classes
  size?: 'small' | 'normal';
  disabled?: boolean;
  liveDemoText?: string;
  repoText?: string;
  liveDemoTextShort?: string;
  repoTextShort?: string;
};

export const ActionButtons = ({
  liveDemoUrl,
  repoUrl,
  className,
  size = 'normal',
  disabled = false,
  liveDemoText,
  repoText,
  liveDemoTextShort,
  repoTextShort,
}: ActionButtonsProps) => {
  // If neither URL is provided, render nothing.
  if (!liveDemoUrl && !repoUrl) {
    return null;
  }

  const sizeClasses = {
    normal: 'px-4 py-1.5 text-md',
    small: 'px-3 py-1 sm:px-3 sm:py-1 text-sm',
  };

  const disabledClasses = disabled ? 'pointer-events-none' : '';

  // Use the external className, or a default if not provided
  return (
    <div className={className || 'mt-4 flex flex-wrap gap-2 sm:gap-4'}>
      {liveDemoUrl && (
        <Link
          href={liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`flex items-center justify-center gap-2 rounded-full bg-primary font-mono font-medium text-primary-foreground transition-transform duration-300 ease-in-out hover:scale-105 border-2 border-secondary ${sizeClasses[size]} ${disabledClasses}`}
        >
          <GlobeIcon className="h-4 w-4" />
          <span className="inline sm:hidden">{liveDemoTextShort}</span>
          <span className="hidden sm:inline">{liveDemoText}</span>
        </Link>
      )}
      {repoUrl && (
        <Link
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`flex items-center justify-center gap-2 rounded-full bg-secondary font-mono font-medium text-secondary-foreground transition-transform duration-300 ease-in-out hover:scale-105 ${sizeClasses[size]} ${disabledClasses}`}
        >
          <GitHubIcon className="h-4 w-4" />
          <span className="inline sm:hidden">{repoTextShort}</span>
          <span className="hidden sm:inline">{repoText}</span>
        </Link>
      )}
    </div>
  );
};