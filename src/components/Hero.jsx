import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from './SocialIcons'
import { portfolioData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ onExploreWork, onGetInTouch, onOpenIndex }) {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const bottomBarRef = useRef(null)

  const titleLetters = "ADITYA BISWAS".split("")

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered cinematic text entrance for the Home page
      const tl = gsap.timeline()

      // 1. Reveal subtitle
      tl.fromTo(
        '.hero-sub-header',
        { opacity: 0, y: 15, letterSpacing: '0.1em' },
        { opacity: 1, y: 0, letterSpacing: '0.3em', duration: 0.7, ease: 'power2.out' }
      )

      // 2. Stagger each letter of ADITYA BISWAS with a 3D tilt & pop
      .fromTo(
        '.hero-title-letter',
        { opacity: 0, y: 40, rotateX: -60 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.045,
          ease: 'back.out(2)',
          clearProps: 'transform',
        },
        '-=0.3'
      )

      // 3. Reveal Web Developer line & tagline
      .fromTo(
        '.hero-subtitle-line',
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        '.hero-tagline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )

      // 4. CTA Buttons bounce in
      .fromTo(
        '.hero-cta-btn',
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' },
        '-=0.3'
      )

      // 5. Bottom bar
      gsap.fromTo(
        bottomBarRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent select-none pt-28 pb-8 z-10"
    >
      {/* Hero Center Content Stack */}
      <div
        ref={contentRef}
        className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center my-auto py-12"
      >

        {/* Subtitle: PORTFOLIO OF */}
        <h2 className="hero-sub-header text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#ffdfbe] mb-3">
          PORTFOLIO OF
        </h2>

        {/* Massive Animated Title: ADITYA BISWAS with Letter-by-Letter Stagger & Hover Effect */}
        <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] mb-2 font-display flex flex-wrap justify-center animate-hero-glow">
          {titleLetters.map((char, index) => (
            <span
              key={index}
              className={`hero-title-letter inline-block transition-transform duration-200 hover:text-[#ffca85] hover:-translate-y-2 cursor-default ${
                char === " " ? "w-4 sm:w-6 md:w-8" : ""
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Second Line: WEB DEVELOPER with Warm Ambient Glow Animation */}
        <h2 className="hero-subtitle-line text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#ffaa88] mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] animate-hero-subglow">
          WEB DEVELOPER
        </h2>

        {/* Tagline Paragraph */}
        <p className="hero-tagline max-w-2xl text-base sm:text-lg text-[#fae4d4] font-normal leading-relaxed mb-8 drop-shadow-sm">
          Crafting scalable digital architecture with the precision of computer science and
          the visual warmth of fine art.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreWork}
            className="hero-cta-btn px-7 py-3.5 rounded-full bg-linear-to-r from-[#ea653e] to-[#d64e29] hover:from-[#f3724a] hover:to-[#e25832] text-white font-bold text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(234,101,62,0.45)] hover:shadow-[0_15px_30px_rgba(234,101,62,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>EXPLORE WORK</span>
            <span className="text-base font-bold">↓</span>
          </button>

          <button
            onClick={onGetInTouch}
            className="hero-cta-btn px-7 py-3.5 rounded-full bg-[#3d192c]/75 hover:bg-[#4d2238]/95 backdrop-blur-md border border-[#e6613b]/40 hover:border-[#e6613b]/80 text-[#fceee2] font-bold text-sm tracking-wider uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
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
        {/* Left: Location */}
        <div className="text-xs sm:text-sm font-mono tracking-wider text-[#d6b7c2]/90 uppercase">
          KOLKATA, INDIA
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

          <a
            href={`mailto:${portfolioData.personal.email}`}
            aria-label={`Email ${portfolioData.personal.email}`}
            className="w-9 h-9 rounded-full bg-black/45 hover:bg-[#ea653e] border border-white/15 hover:border-[#ea653e] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
