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

// Icon for Repository
const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
);


type ActionButtonsProps = {
  liveDemoUrl?: string;
  repoUrl?: string;
  className?: string; // Prop for external styling classes
};

const ActionButtons = ({ liveDemoUrl, repoUrl, className }: ActionButtonsProps) => {
  // If neither URL is provided, render nothing.
  if (!liveDemoUrl && !repoUrl) {
    return null;
  }

  // Use the external className, or a default if not provided
  return (
    <div className={className || 'mt-4 flex flex-wrap gap-4'}>
      {liveDemoUrl && (
        <Link
          href={liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <GlobeIcon className="h-4 w-4" />
          Live Demo
        </Link>
      )}
      {repoUrl && (
        <Link
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90"
        >
          <FolderIcon className="h-4 w-4" />
          Repository
        </Link>
      )}
    </div>
  );
};

export default ActionButtons;