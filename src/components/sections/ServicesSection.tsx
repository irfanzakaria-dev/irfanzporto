import React from 'react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'fullstack-web',
    number: '01',
    title: 'Full-Stack Web Development',
    description:
      'Membangun aplikasi web modern, responsif, dan interaktif dari nol dengan arsitektur bersih. Berfokus pada kecepatan, skalabilitas, dan pengalaman pengguna yang optimal.',
    technologies: ['Laravel', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    icon: (
      <svg
        className="w-6 h-6 text-[#7693A1]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 'backend-api',
    number: '02',
    title: 'Backend & RESTful API Architecture',
    description:
      'Merancang arsitektur server yang andal, pembuatan REST API terstandarisasi, integrasi database relasional, serta sistem autentikasi data yang aman dan efisien.',
    technologies: ['Laravel 12', 'PHP', 'Node.js', 'Express', 'PostgreSQL', 'REST API'],
    icon: (
      <svg
        className="w-6 h-6 text-[#E8E8E8]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
  },
  {
    id: 'uiux-optimization',
    number: '03',
    title: 'UI/UX Engineering & Web Optimization',
    description:
      'Mentransformasi desain menjadi kode antarmuka yang presisi, aksesibel (WCAG), ramah SEO, dan berkinerja tinggi dengan fluid animation serta visual aesthetic modern.',
    technologies: ['Responsive Design', 'Clean Architecture', 'Web Performance', 'SEO'],
    icon: (
      <svg
        className="w-6 h-6 text-[#7693A1]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

/**
 * ServicesSection – Modern Silver & Slate Responsive Edition
 * Showcases core technical solutions and development services offered by Irfan Zakaria
 */
function ServicesSection(): React.ReactElement {
  return (
    <section
      id="services"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#121214] relative border-t border-[#464646]/30 overflow-hidden"
      aria-label="Services section"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-[#7693A1]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4">
          <div>
            <p className="text-xs font-semibold font-mono text-[#7693A1] uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-2">
              What I Offer
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white">
              Services & Solutions
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8e8e93] max-w-md font-light leading-relaxed">
            Menghadirkan solusi digital komprehensif dari perancangan antarmuka hingga integrasi backend yang handal.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={[
                'group relative rounded-2xl bg-gradient-to-b from-[#18181b] to-[#141518] p-6 sm:p-7',
                'border border-[#464646]/50 hover:border-[#7693A1]/70',
                'transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80',
                'flex flex-col justify-between',
              ].join(' ')}
            >
              <div>
                {/* Card Header: Icon & Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#121214] border border-[#464646]/50 flex items-center justify-center group-hover:border-[#7693A1] transition-colors duration-300">
                    {service.icon}
                  </div>
                  <span className="text-xl font-mono font-bold text-[#464646] group-hover:text-[#7693A1] transition-colors">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-3 group-hover:text-[#E8E8E8] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed font-light mb-6">
                  {service.description}
                </p>
              </div>

              {/* Technologies Badges */}
              <div className="pt-4 border-t border-[#464646]/30">
                <div className="flex flex-wrap gap-1.5" aria-label={`Tech stack for ${service.title}`}>
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-[#121214] text-[#b8b8be] border border-[#464646]/40 group-hover:border-[#7693A1]/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
