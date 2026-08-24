import React, { useEffect, useState } from 'react';
import { Project } from '../../types/project';
import { ProjectParser } from '../../lib/parser/projectParser';
import { config } from '../../config/config';
import FeaturedProjectCard from '../ui/FeaturedProjectCard';
import UpcomingProjectCard from '../ui/UpcomingProjectCard';
import ProjectModal from '../ui/ProjectModal';

const parser = new ProjectParser();

/**
 * ProjectsSection – Modern Silver & Slate Responsive Edition
 * Fully responsive project grid from mobile to wide desktop
 * Requirements: 3.3, 5.1, 5.2, 5.3, 6.9, 7.3, 7.4, 7.5, 7.14, 7.15, 9.8
 */
function ProjectsSection(): React.ReactElement {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [upcomingCount, setUpcomingCount] = useState(3);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filterTab, setFilterTab] = useState<'all' | 'featured' | 'upcoming'>('all');

  useEffect(() => {
    parser
      .parse(config.projectConfigPath)
      .then((result) => {
        if (!result.success) {
          setErrorMsg(result.error ?? 'Failed to load projects');
          return;
        }
        const projects = result.data ?? [];
        setFeaturedProjects(projects.filter((p) => p.isFeatured));
        const upcoming = projects.filter((p) => !p.isFeatured);
        setUpcomingCount(Math.max(3, upcoming.length));
      })
      .catch((err) => {
        setErrorMsg(String(err));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const openModal = (project: Project): void => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const showComingSoon = (): void => {
    setToastMessage('Coming Soon! Stay tuned for updates.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#121214] relative border-t border-[#464646]/30"
      aria-label="Projects section"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title & Filter Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12">
          <div>
            <p className="text-xs font-semibold font-mono text-[#7693A1] uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-1.5 sm:mb-2">
              My Work
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white">Projects</h2>
          </div>

          {/* Filter Pills – scrollable on very small screens */}
          <div className="flex items-center gap-1 bg-[#18181b] border border-[#464646]/60 p-1 rounded-xl w-full sm:w-auto overflow-x-auto no-scrollbar">
            {(['all', 'featured', 'upcoming'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilterTab(tab)}
                className={[
                  'flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium tracking-wide transition-all duration-200 whitespace-nowrap',
                  filterTab === tab
                    ? 'bg-gradient-to-r from-[#E8E8E8] to-[#d1d5db] text-[#121214] font-semibold shadow-sm'
                    : 'text-[#8e8e93] hover:text-white',
                ].join(' ')}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Error state */}
        {errorMsg && (
          <div
            className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-mono"
            role="alert"
          >
            <strong>Failed to load projects:</strong> {errorMsg}
          </div>
        )}

        {/* ── Featured Projects ── */}
        {(filterTab === 'all' || filterTab === 'featured') && (
          <section aria-labelledby="featured-heading" className="mb-10 sm:mb-16">
            <h3
              id="featured-heading"
              className="text-sm sm:text-lg font-bold font-display text-white mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#7693A1] flex-shrink-0" />
              Featured Projects
              <span className="text-xs font-mono font-normal text-[#8e8e93]">
                ({featuredProjects.length})
              </span>
            </h3>

            {isLoading ? (
              <ProjectGrid>
                {[1, 2].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </ProjectGrid>
            ) : featuredProjects.length === 0 ? (
              <p className="text-[#8e8e93] text-sm py-8 text-center font-mono">
                Belum ada featured project.
              </p>
            ) : (
              <ProjectGrid>
                {featuredProjects.map((project) => (
                  <FeaturedProjectCard
                    key={project.id}
                    project={project}
                    onClick={openModal}
                  />
                ))}
              </ProjectGrid>
            )}
          </section>
        )}

        {/* ── Upcoming Projects ── */}
        {(filterTab === 'all' || filterTab === 'upcoming') && (
          <section aria-labelledby="upcoming-heading">
            <h3
              id="upcoming-heading"
              className="text-sm sm:text-lg font-bold font-display text-white mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#464646] flex-shrink-0" />
              Upcoming Projects
              <span className="text-xs font-mono font-normal text-[#8e8e93]">
                ({upcomingCount} in pipeline)
              </span>
            </h3>

            <ProjectGrid>
              {Array.from({ length: upcomingCount }).map((_, i) => (
                <UpcomingProjectCard key={i} onClick={showComingSoon} />
              ))}
            </ProjectGrid>
          </section>
        )}
      </div>

      {/* Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />

      {/* Toast notification */}
      {toastMessage && (
        <div
          className={[
            'fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[200]',
            'px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-medium',
            'bg-[#18181b] text-[#E8E8E8] border border-[#E8E8E8]/40',
            'shadow-2xl shadow-black/80 animate-fade-in-up flex items-center gap-2 max-w-[90vw]',
          ].join(' ')}
          role="status"
          aria-live="polite"
        >
          <span className="w-2 h-2 rounded-full bg-[#7693A1] animate-ping flex-shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}
    </section>
  );
}

/** Responsive grid wrapper */
function ProjectGrid({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">{children}</div>
  );
}

/** Skeleton loading card */
function SkeletonCard(): React.ReactElement {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#18181b] border border-[#464646]/40 animate-pulse">
      <div className="aspect-video bg-[#202024]" />
      <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3">
        <div className="h-4 sm:h-5 bg-[#202024] rounded w-3/4" />
        <div className="h-3 bg-[#202024] rounded w-full" />
        <div className="h-3 bg-[#202024] rounded w-5/6" />
        <div className="flex gap-2 mt-3 sm:mt-4">
          <div className="h-5 w-16 rounded-full bg-[#202024]" />
          <div className="h-5 w-14 rounded-full bg-[#202024]" />
        </div>
      </div>
    </div>
  );
}

export default ProjectsSection;
