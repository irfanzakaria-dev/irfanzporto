import React from 'react';
import { SkipLinkProps } from '../../types/components';

/**
 * SkipLink component for keyboard accessibility
 * Allows keyboard users to skip navigation and jump to main content
 * Hidden by default, visible on focus
 * Requirements: 6.10
 */
function SkipLink({ targetId, text = 'Skip to main content' }: SkipLinkProps): React.ReactElement {
  return (
    <a
      href={`#${targetId}`}
      className={[
        'sr-only focus:not-sr-only',
        'focus:fixed focus:top-4 focus:left-4 focus:z-[9999]',
        'focus:px-4 focus:py-2 focus:rounded-lg',
        'focus:bg-primary-600 focus:text-white focus:font-semibold',
        'focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white',
        'transition-all duration-150',
      ].join(' ')}
    >
      {text}
    </a>
  );
}

export default SkipLink;
