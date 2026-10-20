import React, { useEffect } from 'react'
import { X, ArrowRight, LayoutGrid, Sparkles } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'


export default function IndexModal({ isOpen, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sections = [
    { id: 'home', num: '01', title: 'HOME', desc: 'Hero & sunset vector parallax' },
    { id: 'about', num: '02', title: 'ABOUT ME', desc: 'Craftsmanship, background & studio' },
    { id: 'projects', num: '03', title: 'PROJECTS', desc: 'Web & frontend engineering' },
    { id: 'education', num: '04', title: 'EDUCATION', desc: 'Computer science & academic foundations' },
    { id: 'skills', num: '05', title: 'SKILLS & TOOLBOX', desc: 'Languages, frameworks & dev tooling' },
    { id: 'certificates', num: '06', title: 'CERTIFICATES', desc: 'Verified technical honors & mastery' },
    { id: 'contact', num: '07', title: 'CONTACT', desc: 'Direct communications & inquiry' },
  ]

  const handleSelect = (id) => {
    onClose()
    onNavigate(id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#1b0b1d] border border-[#e6613b]/40 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden max-h-[90vh] flex flex-col justify-between"
      >
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6613b]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#341235] border border-[#e6613b]/40 flex items-center justify-center text-[#ffae8f]">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight font-display">
                INDEX DIRECTORY
              </h3>
              <p className="text-xs font-mono text-[#ffae8f]/80">
                PORTFOLIO MAP &amp; FAST NAVIGATION
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#2a1128] hover:bg-[#e6613b] border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
            aria-label="Close Index"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 overflow-y-auto pr-1 my-2">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleSelect(sec.id)}
              className="flex items-center justify-between p-4 rounded-2xl bg-[#230d25]/80 hover:bg-[#38143a] border border-white/5 hover:border-[#e6613b]/50 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-xs font-mono font-bold text-[#f38a58] group-hover:scale-110 transition-transform">
                  {sec.num}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#ffdfbe] transition-colors">
                    {sec.title}
                  </h4>
                  <p className="text-[11px] text-[#dec6d4] font-sans">
                    {sec.desc}
                  </p>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-[#dec6d4] group-hover:text-[#e6613b] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        {/* Modal Footer: Quick Stats */}
        <div className="pt-6 border-t border-white/10 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {portfolioData.stats.map((stat, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-[#170619] border border-white/5">
              <span className="block text-xl sm:text-2xl font-black text-[#f38a58]">
                {stat.value}
              </span>
              <span className="block text-[10px] sm:text-xs font-mono text-[#d6b7c2] uppercase mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
