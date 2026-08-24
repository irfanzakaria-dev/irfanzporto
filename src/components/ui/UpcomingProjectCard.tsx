import React, { useCallback } from 'react';
import { UpcomingProjectCardProps } from '../../types/components';

/**
 * UpcomingProjectCard – "Coming Soon" editorial placeholder card
 * Soft White Harmony minimal dashed aesthetic
 * Requirements: 1.3, 3.6, 6.5, 6.6, 6.7, 7.9, 7.15
 */
function UpcomingProjectCard({
  className = '',
  onClick,
}: UpcomingProjectCardProps): React.ReactElement {
  const handleClick = useCallback((): void => {
    onClick?.();
  }, [onClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    },
    [onClick]
  );

  return (
    <article
      className={[
        'group relative flex flex-col rounded-2xl overflow-hidden',
        'bg-[#18181b]/50 border border-dashed border-[#464646]/60',
        'hover:border-[#7693A1]/70 hover:bg-[#18181b]/80',
        'transition-all duration-300 hover:-translate-y-1.5',
        className,
      ].join(' ')}
    >
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="w-full text-left flex flex-col flex-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-2xl"
        aria-label="Upcoming project – Coming soon"
      >
        {/* Placeholder image area */}
        <div className="aspect-video w-full flex items-center justify-center bg-[#121214]/60 border-b border-dashed border-[#464646]/40">
          <div className="relative flex flex-col items-center gap-2.5">
            <div className="w-14 h-14 rounded-2xl bg-[#464646]/20 border border-[#464646]/50 flex items-center justify-center group-hover:scale-110 group-hover:border-[#7693A1]/60 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[#8e8e93] group-hover:text-[#7693A1] transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <span className="text-[10px] font-mono text-[#8e8e93] group-hover:text-[#E8E8E8] tracking-widest uppercase font-semibold">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5 w-full">
          <h3 className="text-sm sm:text-base font-bold font-display text-[#8e8e93] mb-1.5 group-hover:text-[#E8E8E8] transition-colors duration-200">
            Upcoming Project
          </h3>

          <p className="text-xs text-[#8e8e93]/80 leading-relaxed flex-1 font-light">
            Something exciting is in the works. Stay tuned for release!
          </p>

          {/* Placeholder badges */}
          <ul className="flex flex-wrap gap-1.5 mt-4" aria-hidden="true">
            {['SOON', 'EXPERIMENTAL'].map((t, i) => (
              <li key={i}>
                <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-[#121214] text-[#8e8e93] border border-[#464646]/40">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </button>
    </article>
  );
}

export default UpcomingProjectCard;
