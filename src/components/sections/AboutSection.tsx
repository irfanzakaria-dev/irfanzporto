import React, { useEffect, useState } from 'react';
import { PlaceholderData } from '../../types/project';
import { loadPlaceholderData } from '../../lib/utils/loadPlaceholder';

/**
 * AboutSection – Modern Silver & Slate Responsive Edition
 * Optimized for mobile, tablet, and desktop viewing
 * Requirements: 3.3, 6.9, 7.2, 11.4, 11.7
 */
function AboutSection(): React.ReactElement {
  const [data, setData] = useState<PlaceholderData | null>(null);

  useEffect(() => {
    loadPlaceholderData()
      .then(setData)
      .catch(console.error);
  }, []);

  const about = data?.about.slice(0, 500) ?? '';

  return (
    <section
      id="about"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#121214] relative border-t border-[#464646]/30"
      aria-label="About section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Visual Profile Card with Silver Borders */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <div className="relative rounded-2xl bg-gradient-to-b from-[#1c1d21] to-[#141518] border border-[#464646]/60 p-5 sm:p-6 shadow-2xl">
                {/* Avatar container */}
                <div className="w-full rounded-xl bg-gradient-to-br from-[#25282e] via-[#1c1f24] to-[#121417] border border-[#464646]/40 flex flex-col items-center justify-center relative p-4 sm:p-5 mb-4 sm:mb-5">
                  <div className="relative mb-3 group">
                    <img
                      src="/images/profile.jpg"
                      alt={data?.name || 'IRFAN ZAKARIA'}
                      className="w-24 sm:w-28 h-24 sm:h-28 rounded-2xl object-cover border-2 border-[#7693A1]/40 shadow-xl shadow-black/60 group-hover:border-[#E8E8E8] transition-all duration-300"
                      onError={(e) => {
                        // Fallback icon if image fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="text-sm sm:text-base font-bold font-display text-[#E8E8E8] tracking-wide text-center">
                    {data?.name || 'IRFAN ZAKARIA'}
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-[#7693A1] tracking-wider uppercase mt-1 text-center">
                    Junior Full Stack Developer
                  </span>
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#8e8e93] border-t border-[#464646]/40 pt-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    Open to collaborate
                  </span>
                  <span className="text-[#d1d5db]">Pasuruan, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Key Pillars & Stats */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold font-mono text-[#7693A1] uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-2">
              Get to know me
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-4 sm:mb-6">
              About Me
            </h2>

            {data ? (
              <p className="text-[#d1d5db] text-sm sm:text-base md:text-lg leading-relaxed font-light mb-6">
                {about}
              </p>
            ) : (
              <div className="space-y-3 mb-6">
                {[100, 90, 80, 70, 85].map((w, i) => (
                  <div
                    key={i}
                    className="h-4 rounded bg-[#18181b] animate-pulse"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            )}

            {/* Core Focus Pillars & Education */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 sm:mb-8">
              <div className="p-3.5 rounded-xl bg-[#18181b]/80 border border-[#464646]/50">
                <div className="text-xs font-bold text-[#E8E8E8] mb-1 flex items-center gap-1.5">
                  <span className="text-[#7693A1]">🎓</span> Pendidikan
                </div>
                <div className="text-[11px] text-[#8e8e93] font-light leading-relaxed">
                  <strong className="text-[#d1d5db] font-medium">S1 Teknik Informatika</strong>
                  <div>Universitas Yudharta Pasuruan</div>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#18181b]/80 border border-[#464646]/50">
                <div className="text-xs font-bold text-[#E8E8E8] mb-1 flex items-center gap-1.5">
                  <span className="text-[#7693A1]">⚡</span> Clean Architecture
                </div>
                <div className="text-[11px] text-[#8e8e93] font-light leading-relaxed">Modular, maintainable, and highly tested codebase.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#18181b]/80 border border-[#464646]/50">
                <div className="text-xs font-bold text-[#7693A1] mb-1 flex items-center gap-1.5">
                  <span className="text-[#7693A1]">✨</span> Modern UI/UX
                </div>
                <div className="text-[11px] text-[#8e8e93] font-light leading-relaxed">Fast, accessible, and responsive user experiences.</div>
              </div>
            </div>

            {/* Metrics Grid */}
            {data && (
              <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-[#464646]/40 pt-4 sm:pt-6 mb-6">
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-[#7693A1]">
                    1+
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-[#8e8e93] uppercase tracking-wider mt-1">
                    Years Exp
                  </span>
                </div>
                <div className="flex flex-col border-l border-[#464646]/30 pl-2.5 sm:pl-4">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white">
                    4+
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-[#8e8e93] uppercase tracking-wider mt-1">
                    Built Projects
                  </span>
                </div>
                <div className="flex flex-col border-l border-[#464646]/30 pl-2.5 sm:pl-4">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-[#E8E8E8]">
                    {data.skills.length}+
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-[#8e8e93] uppercase tracking-wider mt-1">
                    Technologies
                  </span>
                </div>
              </div>
            )}

            {/* Resume / Contact Actions */}
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="/cv-irfan-zakaria.pdf"
                download="CV_Irfan_Zakaria.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide bg-[#18181b] text-[#E8E8E8] hover:bg-[#202024] border border-[#464646]/60 hover:border-[#7693A1] transition-all hover:-translate-y-0.5"
                aria-label="Download Irfan Zakaria Resume"
              >
                <svg className="w-4 h-4 text-[#7693A1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Resume</span>
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-[#8e8e93] hover:text-[#E8E8E8] transition-colors"
              >
                <span>Lihat Layanan & Solusi</span>
                <span className="text-[#7693A1]">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
