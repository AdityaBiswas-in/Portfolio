import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LayoutGrid, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon, TwitterIcon } from './SocialIcons'
import { portfolioData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ onExploreWork, onGetInTouch, onOpenIndex }) {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const bottomBarRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power3.out', delay: 0.2 }
      )

      gsap.fromTo(
        bottomBarRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.6 }
      )

      // Scroll-scrub transition: content ascends & dissolves as the user enters Section 02
      gsap.to(contentRef.current, {
        y: -120,
        opacity: 0,
        scale: 0.92,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })

      gsap.to(bottomBarRef.current, {
        opacity: 0,
        y: -40,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent select-none pt-28 pb-8 z-10"
    >
      {/* Top Left & Top Right Overlay Badges (matching Image 3) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center pointer-events-none">
        {/* Top-left Portfolio badge */}
        <div className="pointer-events-auto flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 text-white shadow-lg">
          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-xs">
            🏛️
          </div>
          <div className="text-left">
            <p className="text-[11px] font-bold tracking-wider uppercase leading-none">
              ADITYA BISWAS
            </p>
            <p className="text-[9px] text-amber-200/80 font-mono tracking-tight mt-0.5">
              PORTFOLIO &apos;25
            </p>
          </div>
        </div>

        {/* Top-right Index Button */}
        <button
          onClick={onOpenIndex}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group cursor-pointer"
        >
          <span>INDEX</span>
          <LayoutGrid className="w-4 h-4 text-amber-300 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Hero Center Content Stack (Matching Image 3) */}
      <div
        ref={contentRef}
        className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center my-auto py-12"
      >
        {/* Floating Pill Badge: • BCA STUDENT • DEVELOPER • CREATOR */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-[#e6613b]/30 shadow-lg mb-6 group hover:border-[#e6613b]/60 transition-colors">
          <span className="w-2 h-2 rounded-full bg-[#f38a58] animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#faeade] uppercase font-mono">
            • BCA STUDENT • DEVELOPER • CREATOR
          </span>
        </div>

        {/* Subtitle: PORTFOLIO OF */}
        <h2 className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#ffdfbe] mb-3">
          PORTFOLIO OF
        </h2>

        {/* Massive Title: ADITYA BISWAS */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] mb-2 font-display">
          ADITYA BISWAS
        </h1>

        {/* Second Line: FULL-STACK DEVELOPER */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#ffaa88] mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          FULL-STACK DEVELOPER
        </h2>

        {/* Tagline Paragraph */}
        <p className="max-w-2xl text-base sm:text-lg text-[#fae4d4] font-normal leading-relaxed mb-8 drop-shadow-sm">
          Crafting scalable digital architecture with the precision of computer science and
          the visual warmth of fine art.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreWork}
            className="px-7 py-3.5 rounded-full bg-linear-to-r from-[#ea653e] to-[#d64e29] hover:from-[#f3724a] hover:to-[#e25832] text-white font-bold text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(234,101,62,0.45)] hover:shadow-[0_15px_30px_rgba(234,101,62,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>EXPLORE WORK</span>
            <span className="text-base font-bold">↓</span>
          </button>

          <button
            onClick={onGetInTouch}
            className="px-7 py-3.5 rounded-full bg-[#3d192c]/75 hover:bg-[#4d2238]/95 backdrop-blur-md border border-[#e6613b]/40 hover:border-[#e6613b]/80 text-[#fceee2] font-bold text-sm tracking-wider uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            GET IN TOUCH
          </button>
        </div>
      </div>

      {/* Hero Bottom Bar: Kolkata EST 2004 + Social Circles (Matching Image 3) */}
      <div
        ref={bottomBarRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10"
      >
        {/* Left: Location & Year */}
        <div className="text-xs sm:text-sm font-mono tracking-wider text-[#d6b7c2]/90 uppercase">
          KOLKATA, INDIA (EST. 2004)
        </div>

        {/* Right: Social Media Icons in Round Glass Buttons */}
        <div className="flex items-center gap-2.5">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full bg-black/45 hover:bg-[#e6613b] border border-white/15 hover:border-[#e6613b] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full bg-black/45 hover:bg-[#0077b5] border border-white/15 hover:border-[#0077b5] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={portfolioData.personal.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 rounded-full bg-black/45 hover:bg-[#1877f2] border border-white/15 hover:border-[#1877f2] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>

          <a
            href={portfolioData.personal.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full bg-black/45 hover:bg-[#e1306c] border border-white/15 hover:border-[#e1306c] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>

          <a
            href={portfolioData.personal.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="w-9 h-9 rounded-full bg-black/45 hover:bg-[#1da1f2] border border-white/15 hover:border-[#1da1f2] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>

          <button
            onClick={onGetInTouch}
            aria-label="Email Aditya"
            className="w-9 h-9 rounded-full bg-black/45 hover:bg-[#ea653e] border border-white/15 hover:border-[#ea653e] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
