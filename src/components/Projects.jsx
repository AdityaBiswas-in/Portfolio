import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Layers, Sparkles, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { portfolioData } from '../data/portfolioData'



gsap.registerPlugin(ScrollTrigger)

export default function Projects({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  const categories = ['All', 'Frontend / GSAP', 'Full-Stack', 'Tools & Systems']

  const filteredProjects =
    activeFilter === 'All'
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeFilter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        '.projects-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      // Project cards stagger
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [activeFilter])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-transparent text-[#fbeee0] py-28 px-4 sm:px-8 lg:px-16 overflow-hidden z-10"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#e6613b]/30 to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-[#e6613b]/5 blur-[140px] pointer-events-none" />

      {/* Cinematic Glass Capsule */}
      <div className="max-w-7xl mx-auto w-full p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#140616]/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Section Header */}
        <div className="projects-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-0.5 bg-[#f38a58]" />
              <span className="text-xs sm:text-sm font-mono tracking-widest text-[#f38a58] uppercase">
                03 / SELECTED WORKS
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display">
              PROJECTS
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#dec6d4] leading-relaxed">
            Scalable full-stack systems, dynamic frontend architectures, and creative experiments engineered for real-world impact.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#e6613b] text-white shadow-[0_4px_15px_rgba(230,97,59,0.4)] scale-105'
                  : 'bg-[#230d25]/80 text-[#d6b7c2] hover:text-white hover:bg-[#341437] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="project-card group rounded-3xl bg-[#210c23]/80 backdrop-blur-md border border-[#e6613b]/25 hover:border-[#e6613b]/70 p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(230,97,59,0.15)] relative overflow-hidden"
            >
              {/* Subtle card glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#e6613b]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div>
                {/* Top card bar: Category badge + index */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#341235] border border-[#e6613b]/30 text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffae8f]">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-[#d6b7c2]/60">
                    0{idx + 1}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#ffdfbe] transition-colors mb-2">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-mono text-[#f38a58] font-semibold mb-3">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-[#dec6d4] leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-[#160618] border border-white/5 text-[11px] font-mono text-[#ffdfbe]/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 mt-auto">
                <span className="text-[10px] font-mono text-[#dec6d4]/70">
                  {project.metrics}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#170619] hover:bg-[#e6613b] border border-white/10 text-white/80 hover:text-white transition-all"
                    title="View GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e6613b]/20 hover:bg-[#e6613b] border border-[#e6613b]/50 text-xs font-mono font-bold uppercase text-[#faeade] hover:text-white transition-all cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
