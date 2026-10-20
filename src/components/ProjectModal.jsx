import React, { useEffect } from 'react'
import { X, ExternalLink, CheckCircle, Layers } from 'lucide-react'
import { GithubIcon } from './SocialIcons'


export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-[#1d0c1f] border border-[#e6613b]/40 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden max-h-[90vh] flex flex-col justify-between"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6613b]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-6 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#341235] border border-[#e6613b]/30 text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffae8f]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-emerald-400">
                ● High Performance
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-[#f38a58] font-semibold mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#2a1128] hover:bg-[#e6613b] border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto space-y-6 pr-2 my-2">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#ffae8f] mb-2 font-bold">
              Architecture Overview
            </h4>
            <p className="text-sm sm:text-base text-[#dec6d4] leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#ffae8f] mb-3 font-bold">
              Engineering Metrics
            </h4>
            <div className="p-4 rounded-2xl bg-[#160618] border border-white/10 text-xs sm:text-sm font-mono text-[#faeade]">
              {project.metrics}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#ffae8f] mb-3 font-bold">
              Stack &amp; Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#270e2a] border border-[#e6613b]/30 text-xs font-mono text-[#fbeee0]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#250d27] hover:bg-[#341235] border border-white/10 text-xs font-mono uppercase tracking-wider text-white font-semibold transition-all"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Source Code</span>
          </a>

          <a
            href={project.liveDemo}
            onClick={(e) => {
              if (project.liveDemo === '#') {
                e.preventDefault()
                alert('Live sandbox demonstration is active in interactive mode.')
              }
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-linear-to-r from-[#ea653e] to-[#d64e29] hover:from-[#f3724a] hover:to-[#e25832] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg transition-all"
          >
            <span>Live Demonstration</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
