import React, { useEffect, useState } from 'react';
import { PlaceholderData } from '../../types/project';
import { loadPlaceholderData } from '../../lib/utils/loadPlaceholder';

/**
 * SkillsSection – Modern Silver & Slate Responsive Edition
 * Fully responsive grid that adapts from 320px mobile to wide desktop
 * Requirements: 3.3, 6.9, 7.6, 11.5, 11.7
 */
function SkillsSection(): React.ReactElement {
  const [data, setData] = useState<PlaceholderData | null>(null);

  useEffect(() => {
    loadPlaceholderData()
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#121214] relative border-t border-[#464646]/30"
      aria-label="Skills section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <p className="text-xs font-semibold font-mono text-[#7693A1] uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-2">
            What I work with
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-3 sm:mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xs sm:text-sm text-[#8e8e93] font-light leading-relaxed px-2 sm:px-0">
            Technologies, languages, and frameworks used to build reliable and responsive digital products.
          </p>
        </div>

        {/* Skills Grid */}
        {data ? (
          <div className="max-w-4xl mx-auto">
            <ul
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
              aria-label="List of technologies"
            >
              {data.skills.map((skill, i) => (
                <li key={skill}>
                  <div
                    className={[
                      'group flex items-center justify-between p-3 sm:p-4 rounded-xl',
                      'bg-[#18181b] border border-[#464646]/50',
                      'hover:border-[#E8E8E8]/70 hover:bg-[#1f2024]',
                      'hover:shadow-lg hover:shadow-black/50',
                      'transition-all duration-300 hover:-translate-y-1',
                      'cursor-default',
                    ].join(' ')}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <span className="text-xs sm:text-sm font-bold font-display text-[#E8E8E8] group-hover:text-white transition-colors truncate pr-2">
                      {skill}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#7693A1] opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all flex-shrink-0" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-14 sm:h-16 rounded-xl bg-[#18181b] animate-pulse border border-[#464646]/30"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SkillsSection;
