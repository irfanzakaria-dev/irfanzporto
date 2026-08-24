import React, { Component, ReactNode } from 'react';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// UI components
import SkipLink from './components/ui/SkipLink';

// Section components
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';

import { NavItem } from './types/components';
import { ContactInfo } from './types/components';

/** Navigation items */
const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

/** Contact info from data – matched to placeholder.json */
const CONTACT_INFO: ContactInfo = {
  email: 'irfanzakariyah@gmail.com',
  phone: '+62 858-5637-0945',
  social: [
    { platform: 'GitHub', url: 'https://github.com/irfanzakariyah-pemula', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/irfanzakariyah', icon: 'linkedin' },
    { platform: 'Twitter', url: 'https://twitter.com/irfanzakariyah', icon: 'twitter' },
  ],
};

/** ── ErrorBoundary ── */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render(): ReactNode {
    if (this.state.hasError) {

      return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-error"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-neutral-400 text-sm mb-6">
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-lg bg-primary-600 text-white text-sm hover:bg-primary-500 transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Main application component
 * Assembles all layout, section, and UI components into the single-page portfolio
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 6.10
 */
function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      {/* Skip link – must be the very first focusable element */}
      <SkipLink targetId="main" />

      <header>
        <Navbar items={NAV_ITEMS} logo="Portfolio" />
      </header>

      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer
        contact={CONTACT_INFO}
        copyright={`© ${new Date().getFullYear()} IRFAN ZAKARIA. All rights reserved.`}
      />
    </ErrorBoundary>
  );
}

export default App;

