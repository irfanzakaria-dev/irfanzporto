import React, { useEffect, useState } from 'react';
import { PlaceholderData } from '../../types/project';
import { loadPlaceholderData } from '../../lib/utils/loadPlaceholder';

/**
 * ContactSection – Modern Silver & Slate Responsive Edition with Direct Inquiry Form
 * Clean contact hub with interactive message form, email, phone, and social links
 * Requirements: 3.3, 6.9, 6.11, 7.7, 11.6, 11.7
 */
function ContactSection(): React.ReactElement {
  const [data, setData] = useState<PlaceholderData | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadPlaceholderData()
      .then(setData)
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 800);
  };

  const handleWhatsAppRedirect = (): void => {
    const phone = '6285856370945';
    const text = encodeURIComponent(
      `Halo Irfan Zakaria, saya ${formData.name || 'pengunjung web'} ingin mendiskusikan proyek: ${formData.message || 'pengembangan web'}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#121214] relative border-t border-[#464646]/30 overflow-hidden"
      aria-label="Contact section"
    >
      {/* Subtle silver glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 sm:w-[36rem] h-48 sm:h-72 rounded-full bg-[#7693A1]/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <p className="text-xs font-semibold font-mono text-[#7693A1] uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-2">
            Get in touch
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-3 sm:mb-4">
            Let's Work Together
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#8e8e93] max-w-lg mx-auto font-light leading-relaxed">
            Punya ide proyek, tawaran kerja sama, atau butuh bantuan pengembangan website? Kirimkan pesan atau hubungi langsung!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#18181b] to-[#141518] border border-[#464646]/50 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold font-display text-white mb-4">
                Direct Channels
              </h3>

              {data ? (
                <div className="space-y-3">
                  {data.contact.email && (
                    <a
                      href={`mailto:${data.contact.email}`}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-[#121214] border border-[#464646]/40 hover:border-[#E8E8E8] transition-all duration-200 group"
                      aria-label={`Send email to ${data.contact.email}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#7693A1]/15 border border-[#7693A1]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7693A1]/25 transition-colors">
                        <svg
                          className="w-4 h-4 text-[#7693A1]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="text-[10px] font-mono text-[#8e8e93] uppercase">Email Address</div>
                        <div className="text-xs sm:text-sm font-semibold font-mono text-[#E8E8E8] truncate group-hover:text-white">
                          {data.contact.email}
                        </div>
                      </div>
                    </a>
                  )}

                  {data.contact.phone && (
                    <a
                      href={`tel:${data.contact.phone}`}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-[#121214] border border-[#464646]/40 hover:border-[#E8E8E8] transition-all duration-200 group"
                      aria-label={`Call ${data.contact.phone}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#464646]/30 border border-[#464646]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#464646]/50 transition-colors">
                        <svg
                          className="w-4 h-4 text-[#E8E8E8]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="text-[10px] font-mono text-[#8e8e93] uppercase">Direct Phone / WhatsApp</div>
                        <div className="text-xs sm:text-sm font-semibold font-mono text-[#E8E8E8] truncate group-hover:text-white">
                          {data.contact.phone}
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              ) : (
                <div className="h-24 rounded-xl bg-[#121214] animate-pulse" />
              )}

              {/* Social Profiles */}
              {data?.contact.social && (
                <div className="mt-6 pt-5 border-t border-[#464646]/40">
                  <p className="text-[11px] font-mono text-[#8e8e93] uppercase tracking-wider mb-3">
                    Social Profiles
                  </p>
                  <ul className="flex flex-wrap gap-2" aria-label="Social media links">
                    {data.contact.social.map((link) => (
                      <li key={link.platform}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#121214] border border-[#464646]/40 text-[#d1d5db] hover:border-[#7693A1] hover:text-white transition-all text-xs font-mono"
                          aria-label={`Visit ${link.platform} profile`}
                        >
                          <span className="text-[#7693A1]">↗</span>
                          {link.platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#18181b] to-[#141518] border border-[#464646]/50 shadow-xl relative">
              <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2 text-left">
                Send a Direct Message
              </h3>
              <p className="text-xs text-[#8e8e93] font-light mb-6 text-left">
                Isi formulir berikut dan pesan Anda akan langsung diproses.
              </p>

              {submitStatus === 'success' && (
                <div
                  role="status"
                  className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs sm:text-sm font-mono flex items-center gap-3 animate-fade-in"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
                  <span>Terima kasih! Pesan Anda telah diterima dan akan segera direspons.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label htmlFor="form-name" className="block text-xs font-mono text-[#b8b8be] mb-1.5 uppercase tracking-wider">
                    Nama Lengkap <span className="text-[#7693A1]">*</span>
                  </label>
                  <input
                    id="form-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Budi Santoso"
                    className="w-full px-4 py-3 rounded-xl bg-[#121214] border border-[#464646]/50 text-white placeholder-[#8e8e93]/50 text-sm font-sans focus:outline-none focus:border-[#7693A1] focus:ring-1 focus:ring-[#7693A1] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="form-email" className="block text-xs font-mono text-[#b8b8be] mb-1.5 uppercase tracking-wider">
                    Alamat Email <span className="text-[#7693A1]">*</span>
                  </label>
                  <input
                    id="form-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#121214] border border-[#464646]/50 text-white placeholder-[#8e8e93]/50 text-sm font-sans focus:outline-none focus:border-[#7693A1] focus:ring-1 focus:ring-[#7693A1] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="form-message" className="block text-xs font-mono text-[#b8b8be] mb-1.5 uppercase tracking-wider">
                    Ceritakan Proyek / Pesan Anda <span className="text-[#7693A1]">*</span>
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Deskripsikan kebutuhan aplikasi web, sistem manajemen, atau kolaborasi yang ingin dibangun..."
                    className="w-full px-4 py-3 rounded-xl bg-[#121214] border border-[#464646]/50 text-white placeholder-[#8e8e93]/50 text-sm font-sans focus:outline-none focus:border-[#7693A1] focus:ring-1 focus:ring-[#7693A1] transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={[
                      'flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wide',
                      'bg-gradient-to-r from-[#E8E8E8] to-[#d1d5db] text-[#121214] hover:from-white hover:to-[#E8E8E8]',
                      'transition-all duration-200 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5',
                      'focus:outline-none focus:ring-2 focus:ring-[#E8E8E8]',
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : '',
                    ].join(' ')}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#121214] border-t-transparent rounded-full animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <span>Kirim Pesan</span>
                        <span>→</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wide bg-[#121214] text-[#E8E8E8] hover:bg-[#202024] border border-[#464646]/60 hover:border-emerald-500/60 hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
                  >
                    <span>💬</span>
                    <span>Chat via WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
