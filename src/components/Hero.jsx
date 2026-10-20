import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LayoutGrid, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon, TwitterIcon } from './SocialIcons'
import { portfolioData } from '../data/portfolioData'



gsap.registerPlugin(ScrollTrigger)

export default function Hero({ onExploreWork, onGetInTouch, onOpenIndex }) {
  const heroRef = useRef(null)
  const sunRef = useRef(null)
  const cloudsRef = useRef(null)
  const birdsRef = useRef(null)
  const mountainsBackRef = useRef(null)
  const mountainsMidRef = useRef(null)
  const forestRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for content
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      )

      // Entrance animation for background elements
      gsap.fromTo(
        sunRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
      )

      // Birds gliding animation
      gsap.to(birdsRef.current, {
        x: -25,
        y: 12,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Clouds gentle drift
      gsap.to(cloudsRef.current, {
        x: 30,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // ScrollTrigger Parallax
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })

      tl.to(contentRef.current, { y: 150, opacity: 0.2, ease: 'none' }, 0)
        .to(sunRef.current, { y: 120, ease: 'none' }, 0)
        .to(cloudsRef.current, { y: 80, x: 40, ease: 'none' }, 0)
        .to(birdsRef.current, { y: 60, x: -50, ease: 'none' }, 0)
        .to(mountainsBackRef.current, { y: 60, ease: 'none' }, 0)
        .to(mountainsMidRef.current, { y: 35, ease: 'none' }, 0)
        .to(forestRef.current, { y: 10, ease: 'none' }, 0)
    }, heroRef)

    // Interactive mouse subtle tilt / parallax
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const { innerWidth, innerHeight } = window
      const xNorm = (e.clientX / innerWidth - 0.5) * 2
      const yNorm = (e.clientY / innerHeight - 0.5) * 2

      gsap.to(sunRef.current, { x: xNorm * 12, y: yNorm * 8, duration: 1.2, ease: 'power1.out' })
      gsap.to(cloudsRef.current, { x: xNorm * -18, duration: 1.4, ease: 'power1.out' })
      gsap.to(birdsRef.current, { x: xNorm * 25, y: yNorm * 15, duration: 0.9, ease: 'power1.out' })
      gsap.to(mountainsMidRef.current, { x: xNorm * -8, duration: 1.5, ease: 'power1.out' })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-linear-to-b from-[#da5736] via-[#c84628] to-[#1e0d20] select-none pt-24 pb-8"
      style={{
        background: 'linear-gradient(180deg, #d85735 0%, #cf4d2c 45%, #7a2638 85%, #18091a 100%)'
      }}
    >
      {/* Top Left & Top Right Overlay Badges (matching Image 3) */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center pointer-events-none">
        {/* Top-left Portfolio badge */}
        <div className="pointer-events-auto flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-black/25 backdrop-blur-md border border-white/15 text-white shadow-lg">
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
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
        >
          <span>INDEX</span>
          <LayoutGrid className="w-4 h-4 text-amber-300 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* SVG Scenery Parallax Canvas (Firewatch / Sunset Aesthetic - Image 3) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glowing Setting Sun */}
        <div
          ref={sunRef}
          className="absolute top-[22%] right-[16%] sm:right-[22%] -translate-y-1/2 w-55 sm:w-80 md:w-105 h-55 sm:h-80 md:h-105 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,249,219,1) 0%, rgba(255,212,128,0.9) 35%, rgba(243,138,88,0.4) 65%, rgba(230,97,59,0) 80%)',
            filter: 'drop-shadow(0 0 60px rgba(255, 218, 140, 0.65))',
          }}
        />

        {/* Drifting Stylized Clouds (Matching Image 3) */}
        <div ref={cloudsRef} className="absolute inset-0 w-full h-full">
          {/* Top Left Cloud */}
          <div
            className="absolute top-[8%] left-[6%] w-45 sm:w-70 h-8.5 sm:h-11.5 rounded-full opacity-80"
            style={{
              background: 'linear-gradient(180deg, rgba(254, 237, 222, 0.75) 0%, rgba(242, 175, 146, 0.6) 100%)',
              filter: 'blur(0.5px)'
            }}
          />
          {/* Top Right Cloud over Sun */}
          <div
            className="absolute top-[22%] right-[8%] w-40 sm:w-60 h-6.5 sm:h-9 rounded-full opacity-70"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 240, 226, 0.7) 0%, rgba(245, 185, 155, 0.5) 100%)',
            }}
          />
        </div>

        {/* Soaring Falcons / Birds Silhouette (Matching Image 3) */}
        <div ref={birdsRef} className="absolute inset-0 w-full h-full">
          {/* Giant Silhouette Falcon swooping top-right */}
          <svg
            className="absolute top-[3%] right-[7%] sm:right-[10%] w-27.5 sm:w-37.5 md:w-45 text-[#240e1b] fill-current opacity-90 drop-shadow-md"
            viewBox="0 0 160 80"
          >
            <path d="M 0,25 C 28,18 60,6 100,0 C 92,15 88,32 94,45 C 105,48 135,42 160,35 C 142,50 115,62 88,60 C 72,58 55,48 40,40 C 25,32 10,28 0,25 Z" />
            <path d="M 94,45 C 85,55 70,68 50,78 C 65,70 82,58 92,48 Z" />
          </svg>

          {/* Smaller distant bird near sun */}
          <svg
            className="absolute top-[32%] right-[32%] w-8 sm:w-12 text-[#240e1b] fill-current opacity-70"
            viewBox="0 0 80 40"
          >
            <path d="M 0,15 C 20,8 35,2 50,0 C 45,10 42,20 48,25 C 60,25 72,18 80,15 C 70,25 55,30 42,28 C 30,22 15,18 0,15 Z" />
          </svg>
        </div>

        {/* Background Mountain Peaks with Snowcap (Left) */}
        <div ref={mountainsBackRef} className="absolute inset-x-0 bottom-0 h-[65%] w-full">
          <svg
            className="w-full h-full object-cover"
            preserveAspectRatio="none"
            viewBox="0 0 1440 600"
          >
            <defs>
              <linearGradient id="mtn-back-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cf4d30" />
                <stop offset="60%" stopColor="#ab3528" />
                <stop offset="100%" stopColor="#691d29" />
              </linearGradient>
            </defs>
            {/* Distant Mountain Peak */}
            <path
              d="M -50,600 L -50,280 L 160,150 L 380,420 L 720,260 L 1100,450 L 1500,280 L 1500,600 Z"
              fill="url(#mtn-back-grad)"
              opacity="0.85"
            />
            {/* Snow cap on sharp left peak (matching Image 3) */}
            <polygon
              points="160,150 135,180 155,172 170,185 185,172 160,150"
              fill="#fceee2"
              opacity="0.95"
            />
          </svg>
        </div>

        {/* Midground Rolling Mountain Ridges */}
        <div ref={mountainsMidRef} className="absolute inset-x-0 bottom-0 h-[50%] w-full">
          <svg
            className="w-full h-full object-cover"
            preserveAspectRatio="none"
            viewBox="0 0 1440 500"
          >
            <defs>
              <linearGradient id="mtn-mid-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8c2635" />
                <stop offset="50%" stopColor="#67192a" />
                <stop offset="100%" stopColor="#3d1022" />
              </linearGradient>
            </defs>
            <path
              d="M -50,500 L -50,280 Q 200,320 480,220 T 1000,240 T 1500,160 L 1500,500 Z"
              fill="url(#mtn-mid-grad)"
              opacity="0.95"
            />
          </svg>
        </div>

        {/* Dense Jagged Pine Forest Silhouettes at Base (Image 3) */}
        <div ref={forestRef} className="absolute inset-x-0 bottom-0 h-[38%] w-full">
          <svg
            className="w-full h-full object-cover"
            preserveAspectRatio="none"
            viewBox="0 0 1440 380"
          >
            <defs>
              <linearGradient id="forest-back" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3d1428" />
                <stop offset="100%" stopColor="#1a0818" />
              </linearGradient>
              <linearGradient id="forest-front" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#250b1d" />
                <stop offset="100%" stopColor="#130514" />
              </linearGradient>
            </defs>

            {/* Back Row of Pine Trees */}
            <path
              d="M 0,380 L 0,160 
                 L 30,110 L 60,160 L 90,100 L 120,165 L 150,115 L 180,170 
                 L 220,95 L 260,175 L 300,105 L 340,165 L 380,120 L 420,170 
                 L 460,90 L 500,160 L 540,110 L 580,170 L 620,100 L 660,165
                 L 700,95 L 740,160 L 780,115 L 820,175 L 860,105 L 900,170
                 L 940,90 L 980,165 L 1020,110 L 1060,170 L 1100,100 L 1140,165
                 L 1180,120 L 1220,175 L 1260,95 L 1300,160 L 1340,110 L 1380,170
                 L 1410,120 L 1440,160 L 1440,380 Z"
              fill="url(#forest-back)"
              opacity="0.85"
            />

            {/* Foreground Row of Dense Jagged Pine Trees */}
            <path
              d="M 0,380 L 0,210 
                 L 25,150 L 50,220 L 75,140 L 100,215 L 130,160 L 160,225 
                 L 195,135 L 230,220 L 265,145 L 300,215 L 335,150 L 370,220 
                 L 410,130 L 450,215 L 490,145 L 530,225 L 570,140 L 610,215
                 L 650,130 L 690,220 L 730,150 L 770,225 L 810,135 L 850,220
                 L 890,125 L 930,215 L 970,145 L 1010,220 L 1050,135 L 1090,215
                 L 1130,155 L 1170,225 L 1210,130 L 1250,215 L 1290,145 L 1330,220
                 L 1370,140 L 1405,215 L 1440,150 L 1440,380 Z"
              fill="url(#forest-front)"
            />
          </svg>
        </div>
      </div>

      {/* Hero Center Content Stack (Matching Image 3) */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center my-auto py-12"
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
            className="px-7 py-3.5 rounded-full bg-[#3d192c]/70 hover:bg-[#4d2238]/90 backdrop-blur-md border border-[#e6613b]/40 hover:border-[#e6613b]/80 text-[#fceee2] font-bold text-sm tracking-wider uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            GET IN TOUCH
          </button>
        </div>
      </div>

      {/* Hero Bottom Bar: Kolkata EST 2004 + Social Circles (Matching Image 3) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
        {/* Left: Location & Year */}
        <div className="text-xs sm:text-sm font-mono tracking-wider text-[#d6b7c2]/80 uppercase">
          KOLKATA, INDIA (EST. 2004)
        </div>

        {/* Right: Social Media Icons in Round Glass Buttons */}
        <div className="flex items-center gap-2.5">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-[#e6613b] border border-white/10 hover:border-[#e6613b] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-[#0077b5] border border-white/10 hover:border-[#0077b5] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={portfolioData.personal.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-[#1877f2] border border-white/10 hover:border-[#1877f2] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>

          <a
            href={portfolioData.personal.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-[#e1306c] border border-white/10 hover:border-[#e1306c] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>

          <a
            href={portfolioData.personal.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-[#1da1f2] border border-white/10 hover:border-[#1da1f2] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>

          <button
            onClick={onGetInTouch}
            aria-label="Email Aditya"
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-[#ea653e] border border-white/10 hover:border-[#ea653e] flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-md cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
