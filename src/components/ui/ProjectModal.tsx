import React, { useEffect, useRef, useState } from 'react';
import { ProjectModalProps } from '../../types/components';

// All focusable element types
const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * ProjectModal – Modern Silver & Slate Responsive Edition with Multi-Mockup Gallery
 * Accessible dialog for project details with focus trap and mobile-optimized viewport
 * Requirements: 6.5, 6.6, 6.8, 7.6, 7.7, 7.8, 7.9, 7.10
 */
function ProjectModal({ project, isOpen, onClose }: ProjectModalProps): React.ReactElement | null {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Combine primary image and additional images
  const allImages = project
    ? [project.imageUrl, ...(project.additionalImages || [])]
    : [];

  // Reset active image index when a new project opens
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  // Store the element that had focus before modal opened
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Move focus inside modal on next tick
      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
        firstFocusable?.focus();
      }, 50);
    } else {
      // Return focus to the trigger element
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Focus trap and ESC key handling
  useEffect((): (() => void) | undefined => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusables = Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return (): void => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect((): (() => void) => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return (): void => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const currentImage = allImages[activeImageIndex] || project.imageUrl;

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close dialog overlay"
        className="fixed inset-0 z-[100] bg-[#0d0d0f]/85 backdrop-blur-md border-0 w-full h-full cursor-default"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-6 pointer-events-none">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className={[
            'relative w-full max-w-2xl max-h-[88vh] overflow-y-auto pointer-events-auto',
            'bg-[#18181b] border border-[#464646]/60 rounded-2xl shadow-2xl shadow-black/90',
            'animate-fade-in',
          ].join(' ')}
        >
          {/* Close button */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            className={[
              'absolute top-3 right-3 sm:top-4 sm:right-4 z-20',
              'flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full',
              'bg-[#121214]/85 text-[#E8E8E8] hover:bg-[#464646] hover:text-white',
              'border border-[#464646]/60 backdrop-blur-sm shadow-md',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
            ].join(' ')}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Interactive Hero Image Viewer */}
          <div className="relative w-full overflow-hidden rounded-t-2xl bg-[#0d0d0f] border-b border-[#464646]/40 group flex items-center justify-center" style={{ minHeight: '200px', maxHeight: '500px' }}>
            <img
              src={currentImage}
              alt={`Screenshot ${activeImageIndex + 1} of ${project.title}`}
              className="object-contain transition-all duration-300"
              style={{ maxHeight: '500px', maxWidth: '100%' }}
            />

            {/* Next / Prev Image controls if multiple images exist */}
            {allImages.length > 1 && (
              <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))
                  }
                  className="pointer-events-auto w-8 h-8 rounded-full bg-[#121214]/80 text-white border border-[#464646]/60 flex items-center justify-center hover:bg-[#464646] transition-colors focus:outline-none"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))
                  }
                  className="pointer-events-auto w-8 h-8 rounded-full bg-[#121214]/80 text-white border border-[#464646]/60 flex items-center justify-center hover:bg-[#464646] transition-colors focus:outline-none"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            )}

            {/* Image counter indicator */}
            {allImages.length > 1 && (
              <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md bg-[#121214]/80 border border-[#464646]/50 text-[10px] font-mono text-[#E8E8E8]">
                {activeImageIndex + 1} / {allImages.length}
              </div>
            )}
          </div>

          {/* Thumbnail Strip Gallery (if more than 1 image) */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2 p-2.5 bg-[#141518] border-b border-[#464646]/40 overflow-x-auto no-scrollbar">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={[
                    'relative w-16 sm:w-20 aspect-video rounded-lg overflow-hidden flex-shrink-0 border transition-all',
                    activeImageIndex === idx
                      ? 'border-[#7693A1] ring-2 ring-[#7693A1]/40'
                      : 'border-[#464646]/50 opacity-60 hover:opacity-100',
                  ].join(' ')}
                  aria-label={`View thumbnail ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="p-4 sm:p-6 md:p-8">
            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-[#7693A1]/15 text-[#7693A1] border border-[#7693A1]/30">
                Featured Project
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-mono text-[#8e8e93] bg-[#121214] rounded-full border border-[#464646]/40">
                Full-Stack Architecture
              </span>
            </div>

            {/* Title */}
            <h2
              id="modal-title"
              className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white mb-2 sm:mb-3"
            >
              {project.title}
            </h2>

            {/* Description */}
            <p className="text-[#d9d9dc] text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 font-light whitespace-pre-line">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-5 sm:mb-6">
              <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#7693A1] font-semibold mb-2">
                Technologies
              </h3>
              <ul className="flex flex-wrap gap-1.5 sm:gap-2" aria-label="Technologies used">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <span className="px-2.5 sm:px-3 py-1 text-xs font-mono rounded-full bg-[#7693A1]/15 text-[#E8E8E8] border border-[#7693A1]/30">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action links */}
            {(project.demoUrl || project.repoUrl) && (
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-4 border-t border-[#464646]/30">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      'flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider',
                      'bg-gradient-to-r from-[#E8E8E8] to-[#d1d5db] text-[#121214] hover:from-white hover:to-[#E8E8E8]',
                      'transition-colors duration-200 text-center',
                      'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-[#18181b]',
                    ].join(' ')}
                    aria-label={`View live demo for ${project.title}`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      'flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider',
                      'bg-[#121214] text-[#E8E8E8] hover:bg-[#464646]/50',
                      'border border-[#464646]/60 text-center',
                      'transition-colors duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-[#18181b]',
                    ].join(' ')}
                    aria-label={`View source code for ${project.title}`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View Code
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectModal;
