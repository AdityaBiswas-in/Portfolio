import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, BookOpen, Award, Calendar, MapPin, CheckCircle } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edu-card',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#160818] text-[#fbeee0] py-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #160818 0%, #1a0a1c 50%, #150817 100%)'
      }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#e6613b]/30 to-transparent" />
      <div className="absolute left-1/4 top-1/2 w-80 h-80 rounded-full bg-[#f38a58]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-[#f38a58]" />
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#f38a58] uppercase">
              04 / ACADEMIC BACKGROUND
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display">
            EDUCATION
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#dec6d4] max-w-xl">
            Grounding modern software engineering in rigorous computer science fundamentals, discrete mathematics, and system design.
          </p>
        </div>

        {/* Education Timeline */}
        <div ref={timelineRef} className="relative pl-6 sm:pl-10 border-l-2 border-[#e6613b]/30 space-y-12">
          {portfolioData.education.map((item, idx) => (
            <div
              key={idx}
              className="edu-card relative group"
            >
              {/* Timeline indicator node */}
              <div className="absolute -left-7.75 sm:-left-11.75 top-1.5 w-6 h-6 rounded-full bg-[#200c22] border-2 border-[#e6613b] flex items-center justify-center text-[#ffae8f] shadow-[0_0_12px_rgba(230,97,59,0.5)] group-hover:scale-125 transition-transform duration-300">
                <div className="w-2 h-2 rounded-full bg-[#f38a58]" />
              </div>

              {/* Education Card Container */}
              <div className="rounded-3xl bg-[#220d24]/85 backdrop-blur-md border border-[#e6613b]/25 hover:border-[#e6613b]/60 p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(230,97,59,0.12)]">
                {/* Top Meta info */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#361337] border border-[#e6613b]/40 text-xs font-mono font-bold uppercase tracking-wider text-[#ffae8f]">
                    {item.status}
                  </span>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#d6b7c2]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#f38a58]" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f38a58]" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Degree & College */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 group-hover:text-[#ffdfbe] transition-colors">
                  {item.degree}
                </h3>
                <h4 className="text-base sm:text-lg font-semibold text-[#f38a58] mb-4">
                  {item.institution}
                </h4>

                <p className="text-sm sm:text-base text-[#dec6d4] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Highlights Bullet List */}
                <div className="space-y-2 mb-6">
                  {item.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#f5e6d6]">
                      <CheckCircle className="w-4 h-4 text-[#e6613b] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Coursework & Skills Badges */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-[#ffae8f] uppercase font-bold mr-1">
                    Core Focus:
                  </span>
                  {item.skillsLearned.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded-full bg-[#170619] border border-white/10 text-xs font-mono text-[#fbeee0]/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
