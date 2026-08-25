import React, { useEffect, useState } from 'react';
import { PlaceholderData } from '../../types/project';
import { loadPlaceholderData } from '../../lib/utils/loadPlaceholder';

/**
 * HeroSection – Modern Silver & Slate Responsive Edition
 * Optimized for seamless rendering across all screen sizes (320px mobile to 4K desktop)
 * Requirements: 3.3, 6.9, 7.1, 11.2, 11.3, 11.7
 */
function HeroSection(): React.ReactElement {
  const [data, setData] = useState<PlaceholderData | null>(null);

  useEffect(() => {
    loadPlaceholderData()
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#121214] overflow-hidden"
      aria-label="Hero section"
    >
      {/* Silver ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-[28rem] h-72 sm:h-[28rem] rounded-full bg-[#E8E8E8]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[#7693A1]/10 blur-3xl animate-pulse [animation-delay:2s]" />

        {/* Minimal grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#E8E8E8 1px, transparent 1px), linear-gradient(90deg, #E8E8E8 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Headline & Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Welcome Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-[#7693A1] animate-ping flex-shrink-0" />
              <p className="text-xs font-semibold font-mono text-[#7693A1] uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                Welcome to my portfolio
              </p>
            </div>

            {/* Status Pill with Silver Accent */}
            <div className="mb-5 sm:mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181b] text-[#E8E8E8] text-[11px] sm:text-xs font-mono font-medium border border-[#464646]/60 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                Available for Junior Developer Roles & Projects
              </span>
            </div>

            {/* Main h1 – responsive fluid font size */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white mb-4 sm:mb-6 leading-[1.15] sm:leading-[1.1] tracking-tight break-words">
              {data ? (
                <>
                  Hi, I'm{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E8E8] to-[#9CA3AF] drop-shadow-sm inline-block">
                    {data.name}
                  </span>
                </>
              ) : (
                <span className="inline-block w-48 sm:w-64 h-10 sm:h-14 rounded-lg bg-[#18181b] animate-pulse" />
              )}
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-base md:text-lg text-[#d1d5db] mb-6 sm:mb-8 leading-relaxed max-w-xl font-light">
              {data ? (
                data.tagline
              ) : (
                <span className="inline-block w-full max-w-xs h-5 sm:h-6 rounded bg-[#18181b] animate-pulse" />
              )}
            </p>

            {/* Key Skill Highlights */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10">
              {['Junior Full Stack', 'Laravel & Node.js', 'React & TypeScript', 'Clean Code & Fast Learner'].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono rounded-lg bg-[#18181b]/90 text-[#b8b8be] border border-[#464646]/50 hover:border-[#7693A1]/50 hover:text-[#E8E8E8] transition-colors"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={[
                  'w-full sm:w-auto text-center px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide',
                  'bg-gradient-to-r from-[#E8E8E8] to-[#d1d5db] text-[#121214] hover:from-white hover:to-[#E8E8E8]',
                  'transition-all duration-200 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5',
                  'focus:outline-none focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#121214]',
                ].join(' ')}
              >
                View My Work
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={[
                  'w-full sm:w-auto text-center px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide',
                  'bg-[#18181b] text-[#E8E8E8] hover:bg-[#202024]',
                  'border border-[#464646]/70 hover:border-[#7693A1]',
                  'transition-all duration-200 hover:-translate-y-0.5',
                  'focus:outline-none focus:ring-2 focus:ring-[#7693A1] focus:ring-offset-2 focus:ring-offset-[#121214]',
                ].join(' ')}
              >
                Get In Touch
              </a>
              <a
                href="/cv-irfan-zakaria.pdf"
                download="CV_Irfan_Zakaria.pdf"
                className={[
                  'w-full sm:w-auto text-center px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide',
                  'bg-[#141518] text-[#d1d5db] hover:text-white hover:bg-[#1c1d21]',
                  'border border-[#464646]/60 hover:border-[#E8E8E8]/70',
                  'transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2',
                  'focus:outline-none focus:ring-2 focus:ring-[#7693A1] focus:ring-offset-2 focus:ring-offset-[#121214]',
                ].join(' ')}
                aria-label="Download CV / Resume"
              >
                <svg className="w-4 h-4 text-[#7693A1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Right Column: Sleek Silver Glassmorphism Code/Terminal Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-full sm:max-w-md rounded-2xl bg-gradient-to-b from-[#1c1d21] to-[#141518] border border-[#464646]/60 p-4 sm:p-6 shadow-2xl shadow-black/80 overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#464646]/40 mb-4 sm:mb-5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#464646]" />
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#7693A1]" />
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#E8E8E8]" />
                </div>
                <span className="text-[11px] sm:text-xs font-mono text-[#8e8e93] truncate">developer.config.ts</span>
              </div>

              {/* Code Snippet Content */}
              <div className="space-y-2 sm:space-y-3 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto">
                <p className="text-[#8e8e93]">
                  <span className="text-[#7693A1]">const</span> developer = &#123;
                </p>
                <p className="pl-3 sm:pl-4 text-[#d1d5db]">
                  name: <span className="text-[#E8E8E8]">'{data?.name || 'IRFAN ZAKARIA'}'</span>,
                </p>
                <p className="pl-3 sm:pl-4 text-[#d1d5db]">
                  role: <span className="text-[#7693A1]">'Junior Full Stack Developer'</span>,
                </p>
                <p className="pl-3 sm:pl-4 text-[#d1d5db]">
                  location: <span className="text-[#E8E8E8]">'Pasuruan, Indonesia'</span>,
                </p>
                <p className="pl-3 sm:pl-4 text-[#d1d5db]">
                  github: <span className="text-[#7693A1]">'irfanzakaria-dev'</span>,
                </p>
                <p className="pl-3 sm:pl-4 text-[#d1d5db]">
                  focus: [<span className="text-[#7693A1]">'Laravel'</span>, <span className="text-[#7693A1]">'React'</span>, <span className="text-[#7693A1]">'Node.js'</span>],
                </p>
                <p className="pl-3 sm:pl-4 text-[#d1d5db]">
                  openToWork: <span className="text-emerald-400">true</span>
                </p>
                <p className="text-[#8e8e93]">&#125;;</p>
              </div>

              {/* Card Footer Metric Highlight */}
              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#464646]/40 grid grid-cols-2 gap-2 sm:gap-3 text-left">
                <div className="p-2.5 sm:p-3 rounded-xl bg-[#121214]/60 border border-[#464646]/40">
                  <div className="text-[9px] sm:text-[10px] font-mono text-[#8e8e93] uppercase">Code Quality</div>
                  <div className="text-xs sm:text-sm font-bold font-display text-[#E8E8E8] mt-0.5">100% Tested</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-[#121214]/60 border border-[#464646]/40">
                  <div className="text-[9px] sm:text-[10px] font-mono text-[#8e8e93] uppercase">Design Language</div>
                  <div className="text-xs sm:text-sm font-bold font-display text-[#7693A1] mt-0.5">Silver Slate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex flex-col items-center gap-1.5 text-xs font-mono text-[#8e8e93] hover:text-[#E8E8E8] transition-colors focus:outline-none"
            aria-label="Scroll to about section"
          >
            <span className="tracking-widest uppercase text-[10px]">SCROLL DOWN</span>
            <svg
              className="w-4 h-4 animate-bounce text-[#7693A1]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
