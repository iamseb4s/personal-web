'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { trackEvent, NavigationEventData } from '@/lib/umami';

interface TrackedInternalLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  // Tracking props
  location: NavigationEventData['location'];
  target: string; // The target identifier (e.g., '#projects', 'home')
  label: string;
  additionalEventData?: Record<string, string | number>;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const TrackedInternalLink = ({
  children,
  location,
  target,
  label,
  additionalEventData,
  onClick,
  ...props
}: TrackedInternalLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent('navigation', {
      type: 'anchor',
      location,
      target,
      label,
      ...additionalEventData,
    });

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};
