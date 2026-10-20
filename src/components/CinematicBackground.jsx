import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicBackground({ scrollProgress, currentTimeOfDay }) {
  const containerRef = useRef(null)
  const skyRef = useRef(null)
  const sunRef = useRef(null)
  const moonRef = useRef(null)
  const starsRef = useRef(null)
  const shootingStarRef = useRef(null)
  const cloudsRef = useRef(null)
  const birdsRef = useRef(null)
  const mtnBackRef = useRef(null)
  const mtnMidRef = useRef(null)
  const cabinGlowRef = useRef(null)
  const forestRef = useRef(null)
  const embersRef = useRef(null)
  const dawnGlowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // MASTER SCROLL-SCRUBBED TIMELINE
      // Acts like a video scrub from Frame 0 (Sunset) to Frame End (Dawn)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // Smooth interpolation (lag-free, reverses on scroll up, freezes on stop)
        }
      })

      // 1. SKY COLOR EVOLUTION (Sunset -> Twilight -> Midnight -> Deep Night -> Dawn)
      tl.to(skyRef.current, {
        background: 'linear-gradient(180deg, #3d1430 0%, #290e2b 35%, #180820 70%, #0d0412 100%)',
        ease: 'none',
        duration: 2,
      }, 0) // Around Section 02 (About)
      .to(skyRef.current, {
        background: 'linear-gradient(180deg, #0b071c 0%, #120926 40%, #1c0a2a 75%, #080310 100%)',
        ease: 'none',
        duration: 3,
      }, 2) // Section 03 & 04 (Projects & Education)
      .to(skyRef.current, {
        background: 'linear-gradient(180deg, #05040e 0%, #0c0822 45%, #150921 75%, #06020a 100%)',
        ease: 'none',
        duration: 3,
      }, 5) // Section 05 & 06 (Skills & Certificates)
      .to(skyRef.current, {
        background: 'linear-gradient(180deg, #2b0e27 0%, #4a1532 40%, #7d263a 70%, #c4472c 95%, #120414 100%)',
        ease: 'none',
        duration: 2,
      }, 8) // Section 07 (Contact - Dawn Arrival)

      // 2. SUN SINKING BEHIND MOUNTAINS
      tl.to(sunRef.current, {
        y: '180%',
        scale: 0.65,
        opacity: 0,
        ease: 'power1.in',
        duration: 2.5,
      }, 0)

      // 3. STARS & CONSTELLATIONS FADING IN & DRIFTING
      tl.fromTo(starsRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: -40, ease: 'none', duration: 3 }, 
        1.2
      )
      .to(starsRef.current, {
        y: -100,
        opacity: 0.85,
        ease: 'none',
        duration: 4,
      }, 4.2)
      .to(starsRef.current, {
        opacity: 0.1,
        y: -140,
        ease: 'power2.in',
        duration: 1.8,
      }, 8.2) // Stars fade as dawn breaks

      // 4. SHOOTING STAR STREAK SCRUB (Triggered during Projects / Midnight section)
      tl.fromTo(shootingStarRef.current,
        { x: -50, y: -20, opacity: 0, scaleX: 0 },
        { x: 300, y: 150, opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.out' },
        3.2
      )
      .to(shootingStarRef.current, {
        opacity: 0,
        x: 450,
        y: 220,
        duration: 0.4,
        ease: 'power1.in',
      }, 4.0)

      // 5. MOON RISING OVER THE MOUNTAIN APEX
      tl.fromTo(moonRef.current,
        { y: '200%', opacity: 0, scale: 0.6 },
        { y: '0%', opacity: 1, scale: 1, duration: 2.8, ease: 'power2.out' },
        3.5
      )
      .to(moonRef.current, {
        y: '-40%',
        opacity: 0.4,
        duration: 2.8,
        ease: 'none',
      }, 6.3)
      .to(moonRef.current, {
        y: '-80%',
        opacity: 0,
        duration: 1.5,
        ease: 'power1.in',
      }, 8.5)

      // 6. BIRDS SWOOPING & EXITING AS NIGHT FALLS
      tl.to(birdsRef.current, {
        x: -260,
        y: 120,
        opacity: 0,
        ease: 'power1.in',
        duration: 2.2,
      }, 0)

      // 7. CLOUDS DISSOLVING IN TWILIGHT
      tl.to(cloudsRef.current, {
        x: 180,
        opacity: 0.15,
        ease: 'none',
        duration: 3,
      }, 0)

      // 8. CABIN GLOW IN THE VALLEY (Lights up during About & Projects)
      tl.fromTo(cabinGlowRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 0.9, scale: 1.1, duration: 1.5, ease: 'power2.out' },
        1.5
      )
      .to(cabinGlowRef.current, {
        opacity: 0.85,
        duration: 4.5,
        ease: 'none',
      }, 3.0)
      .to(cabinGlowRef.current, {
        opacity: 0.2,
        duration: 2,
        ease: 'power1.in',
      }, 7.8)

      // 9. AMBIENT NIGHT EMBERS / FIREFLIES
      tl.fromTo(embersRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: -80, duration: 3.5, ease: 'none' },
        4.0
      )
      .to(embersRef.current, {
        opacity: 0,
        y: -160,
        duration: 1.5,
        ease: 'power1.in',
      }, 7.8)

      // 10. DAWN HORIZON GLOW (Section 07 Contact)
      tl.fromTo(dawnGlowRef.current,
        { opacity: 0, scaleY: 0.3 },
        { opacity: 0.95, scaleY: 1, duration: 1.8, ease: 'power2.out' },
        8.2
      )

      // 11. PARALLAX CAMERA PERSPECTIVE ON MOUNTAINS & FOREST
      tl.to(mtnBackRef.current, { y: 120, ease: 'none', duration: 10 }, 0)
      tl.to(mtnMidRef.current, { y: 60, ease: 'none', duration: 10 }, 0)
      tl.to(forestRef.current, { y: 25, ease: 'none', duration: 10 }, 0)

      // Subtle ambient continuous drift (layer physics that pause with scroll or gently breathe)
      gsap.to(cloudsRef.current, {
        x: '+=20',
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
      style={{ willChange: 'transform' }}
    >
      {/* 1. Dynamic Cinematic Sky Canvas */}
      <div
        ref={skyRef}
        className="absolute inset-0 w-full h-full transition-colors duration-300"
        style={{
          background: 'linear-gradient(180deg, #d85735 0%, #cf4d2c 45%, #7a2638 85%, #18091a 100%)',
          willChange: 'background',
        }}
      />

      {/* 2. Starfield & Cosmic Nebula (Revealed in Deep Sections) */}
      <div
        ref={starsRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
      >
        {/* SVG Star Clusters */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="nebula-glow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#nebula-glow)" />

          {/* Randomly distributed crisp stars */}
          {[
            [12, 18, 1.5, 0.9], [25, 8, 1.2, 0.7], [38, 24, 2, 0.95],
            [48, 12, 1, 0.6], [62, 7, 2.2, 1], [74, 22, 1.4, 0.8],
            [88, 14, 1.8, 0.9], [94, 28, 1.2, 0.6], [16, 42, 1.6, 0.85],
            [32, 36, 1.1, 0.7], [56, 32, 2.4, 0.95], [68, 44, 1.3, 0.65],
            [82, 38, 1.9, 0.9], [90, 48, 1.5, 0.8], [8, 62, 1.2, 0.5],
            [22, 54, 2, 0.85], [44, 58, 1.3, 0.7], [78, 64, 1.7, 0.9],
            [14, 78, 1.4, 0.6], [86, 76, 2.1, 0.95], [30, 84, 1.2, 0.5]
          ].map(([cx, cy, r, op], idx) => (
            <circle
              key={idx}
              cx={`${cx}%`}
              cy={`${cy}%`}
              r={r}
              fill="#ffffff"
              opacity={op}
            />
          ))}

          {/* Constellation Vector Lines (Skills Section) */}
          <g stroke="rgba(243, 138, 88, 0.25)" strokeWidth="0.8" strokeDasharray="3 3">
            <line x1="38%" y1="24%" x2="48%" y2="12%" />
            <line x1="48%" y1="12%" x2="62%" y2="7%" />
            <line x1="62%" y1="7%" x2="74%" y2="22%" />
            <line x1="56%" y1="32%" x2="68%" y2="44%" />
            <line x1="68%" y1="44%" x2="82%" y2="38%" />
          </g>
        </svg>

        {/* Cinematic Shooting Star */}
        <div
          ref={shootingStarRef}
          className="absolute top-[18%] left-[20%] w-36 h-[1.5px] opacity-0 rotate-[-25deg] origin-left"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,230,180,0.8) 70%, #ffffff 100%)',
            filter: 'drop-shadow(0 0 6px #fff)',
          }}
        />
      </div>

      {/* 3. Golden Setting Sun */}
      <div
        ref={sunRef}
        className="absolute top-[20%] right-[16%] sm:right-[22%] -translate-y-1/2 w-55 sm:w-80 md:w-105 h-55 sm:h-80 md:h-105 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,249,219,1) 0%, rgba(255,212,128,0.9) 35%, rgba(243,138,88,0.4) 65%, rgba(230,97,59,0) 80%)',
          filter: 'drop-shadow(0 0 60px rgba(255, 218, 140, 0.75))',
        }}
      />

      {/* 4. Silver Crescent Moon (Midway Scroll Scrub) */}
      <div
        ref={moonRef}
        className="absolute top-[18%] left-[18%] sm:left-[24%] w-24 sm:w-32 h-24 sm:h-32 rounded-full opacity-0"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #fff9eb 0%, #ecd3b4 50%, #997862 100%)',
          boxShadow: '0 0 45px rgba(255, 245, 220, 0.6), inset -8px -8px 20px rgba(40, 10, 30, 0.6)',
        }}
      >
        <div className="absolute inset-0 rounded-full border border-amber-100/40" />
      </div>

      {/* 5. Dawn Horizon Aura (Bottom Contact Section) */}
      <div
        ref={dawnGlowRef}
        className="absolute inset-x-0 bottom-0 h-[65%] opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(255, 140, 90, 0.45) 0%, rgba(217, 75, 38, 0.25) 45%, transparent 75%)',
        }}
      />

      {/* 6. Drifting Stylized Clouds */}
      <div ref={cloudsRef} className="absolute inset-0 w-full h-full">
        <div
          className="absolute top-[8%] left-[6%] w-45 sm:w-70 h-8.5 sm:h-11.5 rounded-full opacity-80"
          style={{
            background: 'linear-gradient(180deg, rgba(254, 237, 222, 0.75) 0%, rgba(242, 175, 146, 0.6) 100%)',
            filter: 'blur(0.5px)'
          }}
        />
        <div
          className="absolute top-[22%] right-[8%] w-40 sm:w-60 h-6.5 sm:h-9 rounded-full opacity-70"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 240, 226, 0.7) 0%, rgba(245, 185, 155, 0.5) 100%)',
          }}
        />
      </div>

      {/* 7. Soaring Falcon / Birds Silhouette */}
      <div ref={birdsRef} className="absolute inset-0 w-full h-full">
        <svg
          className="absolute top-[3%] right-[7%] sm:right-[10%] w-27.5 sm:w-37.5 md:w-45 text-[#240e1b] fill-current opacity-90 drop-shadow-md"
          viewBox="0 0 160 80"
        >
          <path d="M 0,25 C 28,18 60,6 100,0 C 92,15 88,32 94,45 C 105,48 135,42 160,35 C 142,50 115,62 88,60 C 72,58 55,48 40,40 C 25,32 10,28 0,25 Z" />
          <path d="M 94,45 C 85,55 70,68 50,78 C 65,70 82,58 92,48 Z" />
        </svg>

        <svg
          className="absolute top-[32%] right-[32%] w-8 sm:w-12 text-[#240e1b] fill-current opacity-70"
          viewBox="0 0 80 40"
        >
          <path d="M 0,15 C 20,8 35,2 50,0 C 45,10 42,20 48,25 C 60,25 72,18 80,15 C 70,25 55,30 42,28 C 30,22 15,18 0,15 Z" />
        </svg>
      </div>

      {/* 8. Distant Mountain Peaks with Snowcap */}
      <div ref={mtnBackRef} className="absolute inset-x-0 bottom-0 h-[65%] w-full">
        <svg
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1440 600"
        >
          <defs>
            <linearGradient id="cinematic-mtn-back" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cf4d30" />
              <stop offset="60%" stopColor="#8d2830" />
              <stop offset="100%" stopColor="#431221" />
            </linearGradient>
          </defs>
          <path
            d="M -50,600 L -50,280 L 160,150 L 380,420 L 720,260 L 1100,450 L 1500,280 L 1500,600 Z"
            fill="url(#cinematic-mtn-back)"
            opacity="0.9"
          />
          {/* Snowcap on sharp left peak */}
          <polygon
            points="160,150 135,180 155,172 170,185 185,172 160,150"
            fill="#fceee2"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* 9. Midground Mountain Ridges + Studio Cabin Light in Valley */}
      <div ref={mtnMidRef} className="absolute inset-x-0 bottom-0 h-[50%] w-full">
        <svg
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1440 500"
        >
          <defs>
            <linearGradient id="cinematic-mtn-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7a2034" />
              <stop offset="50%" stopColor="#551428" />
              <stop offset="100%" stopColor="#2c0a1e" />
            </linearGradient>
          </defs>
          <path
            d="M -50,500 L -50,280 Q 200,320 480,220 T 1000,240 T 1500,160 L 1500,500 Z"
            fill="url(#cinematic-mtn-mid)"
            opacity="0.95"
          />
        </svg>

        {/* Ambient Warm Cabin Windows in Valley (Lit up as night arrives) */}
        <div
          ref={cabinGlowRef}
          className="absolute bottom-[35%] left-[45%] opacity-0 pointer-events-none"
        >
          <div className="relative">
            <div className="w-3.5 h-2 rounded-xs bg-[#ffbe5b] shadow-[0_0_24px_rgba(255,190,91,0.9)]" />
            <div className="absolute -top-1 -left-1 w-6 h-4 bg-amber-400/20 rounded-full blur-xs" />
          </div>
        </div>
      </div>

      {/* 10. Foreground Dense Pine Forest Layer */}
      <div ref={forestRef} className="absolute inset-x-0 bottom-0 h-[38%] w-full">
        <svg
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1440 380"
        >
          <defs>
            <linearGradient id="cinematic-forest-back" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#320f26" />
              <stop offset="100%" stopColor="#150516" />
            </linearGradient>
            <linearGradient id="cinematic-forest-front" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#20071c" />
              <stop offset="100%" stopColor="#0c020d" />
            </linearGradient>
          </defs>

          {/* Back Row Trees */}
          <path
            d="M 0,380 L 0,160 
               L 30,110 L 60,160 L 90,100 L 120,165 L 150,115 L 180,170 
               L 220,95 L 260,175 L 300,105 L 340,165 L 380,120 L 420,170 
               L 460,90 L 500,160 L 540,110 L 580,170 L 620,100 L 660,165
               L 700,95 L 740,160 L 780,115 L 820,175 L 860,105 L 900,170
               L 940,90 L 980,165 L 1020,110 L 1060,170 L 1100,100 L 1140,165
               L 1180,120 L 1220,175 L 1260,95 L 1300,160 L 1340,110 L 1380,170
               L 1410,120 L 1440,160 L 1440,380 Z"
            fill="url(#cinematic-forest-back)"
            opacity="0.9"
          />

          {/* Front Row Trees */}
          <path
            d="M 0,380 L 0,210 
               L 25,150 L 50,220 L 75,140 L 100,215 L 130,160 L 160,225 
               L 195,135 L 230,220 L 265,145 L 300,215 L 335,150 L 370,220 
               L 410,130 L 450,215 L 490,145 L 530,225 L 570,140 L 610,215
               L 650,130 L 690,220 L 730,150 L 770,225 L 810,135 L 850,220
               L 890,125 L 930,215 L 970,145 L 1010,220 L 1050,135 L 1090,215
               L 1130,155 L 1170,225 L 1210,130 L 1250,215 L 1290,145 L 1330,220
               L 1370,140 L 1405,215 L 1440,150 L 1440,380 Z"
            fill="url(#cinematic-forest-front)"
          />
        </svg>
      </div>

      {/* 11. Ambient Floating Fireflies / Night Embers */}
      <div ref={embersRef} className="absolute inset-0 w-full h-full opacity-0 pointer-events-none">
        {[
          { left: '15%', top: '75%', size: 4, delay: '0s' },
          { left: '35%', top: '82%', size: 3, delay: '1s' },
          { left: '55%', top: '78%', size: 5, delay: '2s' },
          { left: '72%', top: '85%', size: 3, delay: '0.5s' },
          { left: '88%', top: '74%', size: 4, delay: '1.5s' },
        ].map((ember, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#f38a58] shadow-[0_0_12px_#f38a58] animate-pulse"
            style={{
              left: ember.left,
              top: ember.top,
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              animationDelay: ember.delay,
            }}
          />
        ))}
      </div>

      {/* 12. Cinematic Vignette Overlay */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(10, 3, 12, 0.45) 100%)',
        }}
      />
    </div>
  )
}
