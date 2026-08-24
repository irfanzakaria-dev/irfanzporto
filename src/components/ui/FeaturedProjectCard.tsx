import React, { useCallback } from 'react';
import { FeaturedProjectCardProps } from '../../types/components';
import { Project } from '../../types/project';
import LazyImage from './LazyImage';

/**
 * FeaturedProjectCard – Modern Silver & Slate Responsive Edition
 * Responsive card that scales cleanly from 320px mobile to wide desktop
 * Requirements: 1.2, 3.6, 6.5, 6.6, 6.7, 7.8, 7.10
 */
function FeaturedProjectCard({
  project,
  onClick,
  className = '',
  lazyLoad = true,
}: FeaturedProjectCardProps): React.ReactElement {
  const handleClick = useCallback((): void => onClick(project), [onClick, project]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(project);
      }
    },
    [onClick, project]
  );

  return (
    <article
      className={[
        'group relative flex flex-col rounded-2xl overflow-hidden',
        'bg-[#18181b] border border-[#464646]/50',
        'hover:border-[#E8E8E8]/70 hover:shadow-xl hover:shadow-black/60',
        'transition-all duration-300 hover:-translate-y-1',
        className,
      ].join(' ')}
    >
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="w-full text-left flex flex-col flex-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-2xl"
        aria-label={`View details for ${project.title}`}
      >
        {/* Project Image Container */}
        <div className="w-full overflow-hidden bg-[#0d0d0f] relative border-b border-[#464646]/30 flex items-center justify-center" style={{ minHeight: '220px', maxHeight: '320px' }}>
          {lazyLoad ? (
            <LazyImage
              src={project.imageUrl}
              alt={`Screenshot of ${project.title}`}
              className="w-full h-full object-contain max-h-[320px] transition-transform duration-500"
            />
          ) : (
            <img
              src={project.imageUrl}
              alt={`Screenshot of ${project.title}`}
              className="w-full h-full object-contain transition-transform duration-500"
              style={{ maxHeight: '320px' }}
            />
          )}
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5 w-full">
          <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-[#E8E8E8] transition-colors duration-200 mb-1.5 sm:mb-2 line-clamp-2">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed flex-1 line-clamp-3 font-light mb-3 sm:mb-4">
            {project.description}
          </p>

          {/* Tech Badges */}
          <TechBadges technologies={project.technologies} />

          {/* "View Details" Cue */}
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#464646]/30 flex items-center justify-between text-xs text-[#7693A1] font-mono font-medium">
            <span className="group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1.5">
              <span>View details</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}

/** Technology badge list */
function TechBadges({ technologies }: { technologies: Project['technologies'] }): React.ReactElement {
  return (
    <ul className="flex flex-wrap gap-1 sm:gap-1.5 mt-auto" aria-label="Technologies used">
      {technologies.slice(0, 5).map((tech) => (
        <li key={tech}>
          <span className="px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono rounded-full bg-[#7693A1]/15 text-[#E8E8E8] border border-[#7693A1]/30">
            {tech}
          </span>
        </li>
      ))}
      {technologies.length > 5 && (
        <li>
          <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-[#464646]/40 text-[#8e8e93] border border-[#464646]/50">
            +{technologies.length - 5}
          </span>
        </li>
      )}
    </ul>
  );
}

export default FeaturedProjectCard;
