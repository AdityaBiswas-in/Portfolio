import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layout, Server, Cpu, Check, Code, Sparkles } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-category-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const getCategoryIcon = (index) => {
    switch (index) {
      case 0:
        return <Layout className="w-5 h-5 text-[#f38a58]" />
      case 1:
        return <Server className="w-5 h-5 text-[#f38a58]" />
      case 2:
      default:
        return <Cpu className="w-5 h-5 text-[#f38a58]" />
    }
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-transparent text-[#fbeee0] py-28 px-4 sm:px-8 lg:px-16 overflow-hidden z-10"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#e6613b]/30 to-transparent" />
      <div className="absolute right-10 bottom-1/4 w-80 h-80 rounded-full bg-[#e6613b]/5 blur-[130px] pointer-events-none" />

      {/* Cinematic Glass Capsule */}
      <div className="max-w-7xl mx-auto w-full p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#140616]/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-0.5 bg-[#f38a58]" />
              <span className="text-xs sm:text-sm font-mono tracking-widest text-[#f38a58] uppercase">
                05 / TECHNICAL EXPERTISE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display">
              SKILLS &amp; TOOLBOX
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#dec6d4] leading-relaxed">
            A comprehensive overview of programming languages, design systems, animation engines, and development workflows.
          </p>
        </div>

        {/* 3 Large Categorized Skill Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {portfolioData.skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="skill-category-card rounded-3xl bg-[#210c23]/80 backdrop-blur-md border border-[#e6613b]/25 hover:border-[#e6613b]/65 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(230,97,59,0.15)] group"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#341235] border border-[#e6613b]/30 group-hover:scale-110 transition-transform">
                      {getCategoryIcon(idx)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#ffdfbe] transition-colors">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase text-[#ffae8f]/80">
                        {cat.skills.length} Core Competencies
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#dec6d4] mb-6 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skill Items with Level Bars */}
                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#fbeee0] font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f38a58]" />
                          {skill.name}
                        </span>
                        <span className="text-[#ffae8f] text-[11px] font-semibold">
                          {skill.status}
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-[#150616] overflow-hidden border border-white/5">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-[#e6613b] to-[#f38a58] transition-all duration-1000 group-hover:shadow-[0_0_8px_rgba(230,97,59,0.8)]"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer summary tag */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#d6b7c2]">
                <span>Status: Production Ready</span>
                <span className="text-[#22c55e] font-semibold">● Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Focus Highlight Banner */}
        <div className="rounded-2xl bg-linear-to-r from-[#2a1128] via-[#3d1637] to-[#240d23] border border-[#e6613b]/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e6613b]/20 border border-[#e6613b]/60 flex items-center justify-center text-[#ffae8f]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                Constantly Expanding the Architecture Stack
              </h4>
              <p className="text-xs sm:text-sm text-[#dec6d4]">
                Currently experimenting with React 19 Server Actions, Next.js App Router, WebGL particle physics, and WebAssembly.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-[#18081a] border border-white/10 text-xs font-mono text-[#ffdfbe]">
            <span>Git Commits This Month:</span>
            <strong className="text-[#e6613b] font-bold">48+</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
