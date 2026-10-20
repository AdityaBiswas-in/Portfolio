import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, ShieldCheck, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Certificates({ onSelectCertificate }) {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cert-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-transparent text-[#fbeee0] py-28 px-4 sm:px-8 lg:px-16 overflow-hidden z-10"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#e6613b]/30 to-transparent" />
      <div className="absolute left-1/3 top-1/3 w-80 h-80 rounded-full bg-[#e6613b]/5 blur-[140px] pointer-events-none" />

      {/* Cinematic Glass Capsule */}
      <div className="max-w-7xl mx-auto w-full p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#140616]/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-0.5 bg-[#f38a58]" />
              <span className="text-xs sm:text-sm font-mono tracking-widest text-[#f38a58] uppercase">
                06 / HONORS &amp; CREDENTIALS
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display">
              CERTIFICATES
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#dec6d4] leading-relaxed">
            Verified academic and industry certifications validating expertise across full-stack engineering, algorithmic logic, and animation architecture.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {portfolioData.certificates.map((cert) => (
            <div
              key={cert.id}
              className="cert-card rounded-3xl bg-[#220d24]/85 backdrop-blur-md border border-[#e6613b]/25 hover:border-[#e6613b]/70 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(230,97,59,0.15)] group relative overflow-hidden"
            >
              {/* Corner Watermark Seal */}
              <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-[#e6613b]/5 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />

              <div>
                {/* Header row: badge + date */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#341235] border border-[#e6613b]/40 text-xs font-mono font-bold uppercase tracking-wider text-[#ffae8f]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {cert.badge}
                  </span>

                  <span className="flex items-center gap-1 text-xs font-mono text-[#d6b7c2]">
                    <Calendar className="w-3.5 h-3.5 text-[#f38a58]" />
                    {cert.date}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#ffdfbe] transition-colors mb-1">
                  {cert.title}
                </h3>
                <h4 className="text-sm font-semibold text-[#f38a58] mb-4">
                  {cert.issuer}
                </h4>

                <p className="text-xs sm:text-sm text-[#dec6d4] leading-relaxed mb-6">
                  {cert.description}
                </p>

                {/* Competencies Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md bg-[#160618] border border-white/5 text-[11px] font-mono text-[#fbeee0]/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom footer: Credential ID + Verify Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-[#d6b7c2]/70">
                  ID: {cert.credentialId}
                </span>

                <button
                  onClick={() => onSelectCertificate(cert)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e6613b]/15 hover:bg-[#e6613b] border border-[#e6613b]/40 text-xs font-mono font-bold uppercase text-[#faeade] hover:text-white transition-all cursor-pointer"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
