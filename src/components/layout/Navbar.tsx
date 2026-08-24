import React, { useState, useEffect, useCallback } from 'react';
import { NavbarProps, NavItem } from '../../types/components';

/**
 * Responsive Navbar component – Clean Silver & Slate Edition
 * Desktop: sleek matte floating capsule bar | Mobile: smooth drawer
 * Supports smooth scroll navigation and full keyboard accessibility
 * Requirements: 1.1, 3.5, 5.4, 6.5, 6.6, 6.7, 6.11
 */
function Navbar({ items, logo = 'Portfolio' }: NavbarProps): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for navbar backdrop effect
  useEffect((): (() => void) => {
    const handleScroll = (): void => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop width
  useEffect((): (() => void) => {
    const handleResize = (): void => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = useCallback((href: string): void => {
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, href: string): void => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNavClick(href);
      }
    },
    [handleNavClick]
  );

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#121214]/90 backdrop-blur-md shadow-2xl shadow-black/40 border-b border-[#464646]/40 py-1'
          : 'bg-transparent py-2',
      ].join(' ')}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('#hero')}
              className="text-lg sm:text-xl font-bold tracking-tight font-display text-[#E8E8E8] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1 flex items-center gap-2"
              aria-label="Go to top"
            >
              <span className="w-2 h-2 rounded-full bg-[#7693A1]" />
              <span>{logo}</span>
            </button>
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-1 bg-[#18181b]/80 border border-[#464646]/50 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-inner">
            {items.map((item: NavItem) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  className={[
                    'px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide',
                    'text-[#d1d5db] hover:text-white hover:bg-[#464646]/40',
                    'transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  ].join(' ')}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Action / Contact Cue */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-[#E8E8E8] to-[#d1d5db] text-[#121214] hover:from-white hover:to-[#E8E8E8] transition-all duration-200 hover:shadow-md hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            id="hamburger-btn"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={[
              'md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg',
              'text-[#E8E8E8] hover:text-white bg-[#18181b] border border-[#464646]/50',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
            ].join(' ')}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={[
                'block w-5 h-0.5 bg-current transition-all duration-300',
                isMenuOpen ? 'rotate-45 translate-y-1.5' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-5 h-0.5 bg-current transition-all duration-300 mt-1',
                isMenuOpen ? 'opacity-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-5 h-0.5 bg-current transition-all duration-300 mt-1',
                isMenuOpen ? '-rotate-45 -translate-y-2.5' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={[
          'md:hidden overflow-hidden transition-all duration-300',
          'bg-[#121214]/98 backdrop-blur-xl border-b border-[#464646]/50',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-hidden={!isMenuOpen}
      >
        <ul className="px-4 py-4 flex flex-col gap-2">
          {items.map((item: NavItem) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavClick(item.href)}
                onKeyDown={(e) => handleKeyDown(e, item.href)}
                className={[
                  'w-full text-left px-4 py-3 rounded-xl text-sm font-medium tracking-wide',
                  'text-[#E8E8E8] hover:text-white hover:bg-[#18181b] border border-transparent hover:border-[#464646]/40',
                  'transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  'min-h-[44px]',
                ].join(' ')}
                tabIndex={isMenuOpen ? 0 : -1}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
