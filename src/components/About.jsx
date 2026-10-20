import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolioData } from '../data/portfolioData'
import { ArrowRight, Terminal, Sparkles, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function About({ onViewToolbox }) {
  const sectionRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)
  const [activeCodeTab, setActiveCodeTab] = useState('arch')
  const [coffeeSteaming, setCoffeeSteaming] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for About section
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      )

      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full text-[#fbeee0] py-28 px-6 sm:px-12 lg:px-20 overflow-hidden flex items-center z-10 bg-transparent"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#e6613b]/30 to-transparent" />
      <div className="absolute -left-40 top-1/3 w-96 h-96 rounded-full bg-[#e6613b]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full p-6 sm:p-10 lg:p-14 rounded-3xl bg-[#140616]/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Biography & Tags (Image 2) */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-center">
          {/* Section Marker */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-[#f38a58]" />
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#f38a58] uppercase">
              02 / WHO I AM
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6 font-display">
            ABOUT ME
          </h2>

          {/* Subheading Greeting */}
          <h3 className="text-2xl sm:text-3xl font-bold text-[#ffdfbe] mb-6">
            Hi, I&apos;m Aditya.
          </h3>

          {/* Body Copy Matching Image 2 */}
          <div className="space-y-4 text-base sm:text-lg text-[#dec6d4] leading-relaxed mb-8">
            <p>
              I am a{' '}
              <strong className="text-white font-semibold underline decoration-[#e6613b]/60 underline-offset-4">
                Web Developer
              </strong>{' '}
              bridging analytical computer science with intuitive, human-centered
              frontend architecture. Fascinated by how scalable web applications operate under the
              hood, I craft digital products with precision, artistic storytelling, and clean,
              resilient code.
            </p>

            <p>
              Rather than assembling repetitive generic blocks, I view code as a medium of
              craftsmanship. From designing reactive state flows to engineering performant database
              schemas, my work focuses on building meaningful, tactile interfaces that users truly
              enjoy navigating.
            </p>
          </div>

          {/* Tag Pills (Matching Image 2) */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {portfolioData.personal.tags.map((tag, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-full bg-[#2a1228]/90 hover:bg-[#3d183a] border border-[#e6613b]/30 hover:border-[#e6613b]/70 text-xs sm:text-[13px] font-mono font-semibold tracking-wider text-[#fbeee0] uppercase transition-all duration-300 shadow-sm hover:scale-105 cursor-default select-none"
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Current Focus Card (Matching Image 2) */}
          <div className="w-full rounded-2xl bg-[#230f24]/80 backdrop-blur-md border border-[#e6613b]/25 hover:border-[#e6613b]/50 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 shadow-lg group">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22c55e]" />
              </span>
              <p className="text-xs sm:text-sm font-mono text-[#faeade] leading-snug">
                <strong className="text-[#22c55e] font-bold">CURRENT FOCUS:</strong>{' '}
                React 19 architecture, strict TypeScript patterns, and micro-interaction engineering.
              </p>
            </div>

            <button
              onClick={onViewToolbox}
              className="shrink-0 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#ffae8f] hover:text-white transition-colors duration-200 group-hover:translate-x-1 cursor-pointer"
            >
              <span>VIEW TOOLBOX</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Studio Workstation Illustration (Matching Image 2) */}
        <div ref={rightColRef} className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-md rounded-3xl bg-[#230e26]/80 backdrop-blur-xl border border-[#e6613b]/30 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-[#e6613b]/60 transition-all duration-500">
            {/* Ambient inner glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#e6613b]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Studio Workstation Header */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#f38a58] font-bold">
                STUDIO WORKSTATION / ARCHITECTURE LAB
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-tighter">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Vector Illustration of Desk Setup */}
            <div className="relative w-full aspect-4/3 bg-[#19091b] rounded-2xl border border-white/10 p-4 flex flex-col justify-between overflow-hidden shadow-inner">
              {/* Architectural Desk Lamp Arch & Warm Light Cone */}
              <div className="absolute top-2 right-4 w-32 h-32 pointer-events-none z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Lamp Stand */}
                  <path
                    d="M 85,90 L 85,30 C 85,15 65,10 50,20 L 45,26"
                    fill="none"
                    stroke="#e6613b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Lamp Shade */}
                  <polygon points="40,24 55,20 50,34 35,30" fill="#f38a58" />
                  {/* Warm Light Glow Cone */}
                  <polygon
                    points="35,30 50,34 85,95 10,95"
                    fill="url(#lamp-glow)"
                    opacity="0.25"
                  />
                  <defs>
                    <linearGradient id="lamp-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffb56b" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#e6613b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Curved Ultrawide Monitor */}
              <div className="relative z-10 w-full h-[78%] bg-[#210c23] rounded-xl border-2 border-[#e6613b]/40 p-2.5 flex flex-col shadow-lg">
                {/* Window Titlebar */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-[9px] font-mono text-[#ffae8f]/80 tracking-tight">
                    aditya-workspace.tsx
                  </span>
                  <Terminal className="w-3 h-3 text-[#f38a58]" />
                </div>

                {/* Editor Code Lines & Syntax Highlighting */}
                <div className="flex-1 font-mono text-[9px] sm:text-[10px] space-y-1.5 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e6613b]">const</span>
                    <span className="text-[#ffd1bd]">developer</span>
                    <span className="text-white">=</span>
                    <span className="text-[#ffdfbe]">&#123;</span>
                  </div>

                  <div className="pl-4 flex items-center gap-2">
                    <span className="text-[#f38a58]">role:</span>
                    <span className="text-[#34d399]">&apos;Web Developer&apos;</span>,
                  </div>

                  <div className="pl-4 flex items-center gap-2">
                    <span className="text-[#f38a58]">engine:</span>
                    <span className="text-[#38bdf8]">&apos;React 19 + GSAP&apos;</span>,
                  </div>

                  <div className="pl-4 flex items-center gap-2">
                    <span className="text-[#f38a58]">standards:</span>
                    <span className="text-[#f472b6]">[&apos;Clean&apos;, &apos;Resilient&apos;]</span>,
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[#ffdfbe]">&#125;;</span>
                  </div>

                  {/* Terminal Radar Graphic (matching right side of monitor in Image 2) */}
                  <div className="pt-1 flex items-center justify-end">
                    <div className="w-10 h-10 rounded-full border border-[#f38a58]/50 flex items-center justify-center relative">
                      <div className="w-6 h-6 rounded-full border border-[#f38a58]/30 animate-spin" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f38a58]" />
                      <span className="absolute -bottom-2 text-[6px] text-[#ffae8f] uppercase">
                        ACT: 99.8%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wooden Studio Desk & Steaming Coffee Cup */}
              <div className="relative z-10 w-full h-[18%] flex items-center justify-between px-2 pt-1 border-t-4 border-[#3f162c] bg-linear-to-r from-[#2c1025] to-[#3a142e] rounded-b-lg">
                {/* Steaming Coffee Mug */}
                <div
                  className="flex items-center gap-1.5 cursor-pointer group/coffee"
                  onClick={() => setCoffeeSteaming(!coffeeSteaming)}
                  title="Click to brew coffee"
                >
                  <div className="relative">
                    {/* Steam animation */}
                    {coffeeSteaming && (
                      <div className="absolute -top-3 left-1 flex gap-0.5 pointer-events-none">
                        <span className="w-0.5 h-2 bg-amber-100/60 rounded-full animate-bounce" />
                        <span className="w-0.5 h-2.5 bg-amber-100/40 rounded-full animate-bounce delay-100" />
                      </div>
                    )}
                    <div className="w-4 h-4 rounded-sm bg-[#ea653e] border border-amber-200/40 relative">
                      <div className="absolute -right-1.5 top-0.5 w-1.5 h-2.5 rounded-r border border-amber-200/40" />
                    </div>
                  </div>
                  <span className="text-[8px] font-mono text-[#dec6d4]">
                    COLD BREW
                  </span>
                </div>

                {/* Sleek Ergonomic Keyboard & Trackpad Silhouette */}
                <div className="w-24 h-2 rounded bg-black/50 border border-white/10" />

                <span className="text-[8px] font-mono text-[#ffae8f]/80">
                  KOLKATA LAB
                </span>
              </div>
            </div>

            {/* Workstation Info Footer */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#d6b7c2] font-mono">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Vite HMR Synchronized
              </span>
              <span className="text-[#f38a58] font-bold">120 FPS MOTION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
