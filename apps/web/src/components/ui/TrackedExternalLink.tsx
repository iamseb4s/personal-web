'use client';

import React from 'react';
import { trackEvent } from '@/lib/umami';
import { NavigationEventData } from '@/lib/umami';

interface TrackedExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  location: NavigationEventData['location'];
  targetType: NavigationEventData['target']; // e.g., 'github', 'linkedin', 'email'
  children: React.ReactNode;
}

export const TrackedExternalLink = ({
  href,
  label,
  location,
  targetType,
  children,
  onClick,
  ...rest
}: TrackedExternalLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent('navigation', {
      type: 'external',
      location,
      target: targetType,
      url: href,
      label,
    });
    // Propagate original onClick if it exists
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a href={href} onClick={handleClick} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
};
