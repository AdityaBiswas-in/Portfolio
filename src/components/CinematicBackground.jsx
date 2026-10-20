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
  const cloudsRef = useRef(null)
  const mtnBackRef = useRef(null)
  const mtnMidRef = useRef(null)
  const cabinGlowRef = useRef(null)
  const forestRef = useRef(null)
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

      // 3. STARS & CONSTELLATIONS FADING IN (Midnight)
      tl.fromTo(starsRef.current, 
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 3 }, 
        1.2
      )
      .to(starsRef.current, {
        opacity: 0.85,
        ease: 'none',
        duration: 4,
      }, 4.2)
      .to(starsRef.current, {
        opacity: 0,
        ease: 'power2.in',
        duration: 1.8,
      }, 8.2) // Stars fade as dawn breaks

      // 4. MOON RISING OVER THE MOUNTAIN APEX
      tl.fromTo(moonRef.current,
        { y: '160%', opacity: 0, scale: 0.7 },
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


      // 6. CLOUDS DISSOLVING IN TWILIGHT (No horizontal sliding across right-hand side)
      tl.to(cloudsRef.current, {
        opacity: 0,
        ease: 'power1.out',
        duration: 2.2,
      }, 0)

      // 7. CABIN GLOW IN THE VALLEY (Lights up during About & Projects)
      tl.fromTo(cabinGlowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.9, scale: 1, duration: 1.5, ease: 'power2.out' },
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

      // 8. DAWN HORIZON GLOW (Section 07 Contact)
      tl.fromTo(dawnGlowRef.current,
        { opacity: 0, scaleY: 0.3 },
        { opacity: 0.95, scaleY: 1, duration: 1.8, ease: 'power2.out' },
        8.2
      )

      // 9. SUBTLE PARALLAX ON MOUNTAINS & FOREST
      tl.to(mtnBackRef.current, { y: 60, ease: 'none', duration: 10 }, 0)
      tl.to(mtnMidRef.current, { y: 30, ease: 'none', duration: 10 }, 0)
      tl.to(forestRef.current, { y: 12, ease: 'none', duration: 10 }, 0)

      // All elements are strictly synchronized with the master scroll timeline (tl).
      // When scroll stops, all frames freeze completely with zero autonomous drift.
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

      {/* 6. Realistic Layered Cumulus Clouds Moving Left to Right */}
      <div ref={cloudsRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Soft Organic Cloud 1 - Moving Left to Right */}
        <div className="absolute top-[6%] left-0 animate-cloud-left-to-right-1">
          <svg
            className="w-72 sm:w-105 md:w-lg opacity-80 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
            viewBox="0 0 460 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cloud-grad-left" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff2e6" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#ffd8c2" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#e5987d" stopOpacity="0.5" />
              </linearGradient>
              <filter id="soft-blur-left" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>
            <path
              d="M 60,110 
                 C 30,110 10,95 10,75 
                 C 10,55 30,42 55,42 
                 C 65,22 95,8 135,8 
                 C 180,8 215,26 225,48 
                 C 245,35 285,32 315,48 
                 C 345,38 385,42 405,62 
                 C 435,62 450,78 450,96 
                 C 450,115 425,125 395,125 
                 L 60,125 Z"
              fill="url(#cloud-grad-left)"
              filter="url(#soft-blur-left)"
            />
          </svg>
        </div>

        {/* Soft Organic Cloud 2 - Moving Left to Right */}
        <div className="absolute top-[18%] left-0 animate-cloud-left-to-right-2">
          <svg
            className="w-60 sm:w-88 md:w-105 opacity-75 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
            viewBox="0 0 380 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cloud-grad-right" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff5eb" stopOpacity="0.92" />
                <stop offset="50%" stopColor="#f7ccb5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#dc8c72" stopOpacity="0.45" />
              </linearGradient>
              <filter id="soft-blur-right" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" />
              </filter>
            </defs>
            <path
              d="M 45,95 
                 C 20,95 5,82 5,66 
                 C 5,50 22,38 42,38 
                 C 52,20 80,8 115,8 
                 C 155,8 185,24 195,42 
                 C 212,32 245,28 272,42 
                 C 298,34 330,38 348,54 
                 C 370,54 378,68 378,82 
                 C 378,98 355,105 330,105 
                 L 45,105 Z"
              fill="url(#cloud-grad-right)"
              filter="url(#soft-blur-right)"
            />
          </svg>
        </div>

        {/* Soft Organic Cloud 3 - Distant High Altitude */}
        <div className="absolute top-[3%] left-0 animate-cloud-left-to-right-3">
          <svg
            className="w-48 sm:w-68 opacity-45 filter blur-[2px]"
            viewBox="0 0 380 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 45,95 C 20,95 5,82 5,66 C 5,50 22,38 42,38 C 52,20 80,8 115,8 C 155,8 185,24 195,42 C 212,32 245,28 272,42 C 298,34 330,38 348,54 C 370,54 378,68 378,82 C 378,98 355,105 330,105 L 45,105 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>

      {/* Visual Wind Trails & Breeze Streamers Moving Left to Right */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-5">
        {/* Wind Streamer 1 */}
        <div className="absolute top-[16%] left-0 w-80 sm:w-115 h-8 animate-wind-stream-1 opacity-70">
          <svg className="w-full h-full" viewBox="0 0 360 30" fill="none">
            <defs>
              <linearGradient id="windGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="35%" stopColor="#fff2e6" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#ffd8c2" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 10,18 Q 80,8 160,18 T 320,12"
              stroke="url(#windGrad1)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 60,22 Q 130,14 210,22 T 350,16"
              stroke="url(#windGrad1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Wind Streamer 2 */}
        <div className="absolute top-[28%] left-0 w-72 sm:w-96 h-8 animate-wind-stream-2 opacity-65">
          <svg className="w-full h-full" viewBox="0 0 320 28" fill="none">
            <path
              d="M 10,14 Q 90,6 180,14 T 310,10"
              stroke="url(#windGrad1)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Wind Streamer 3 */}
        <div className="absolute top-[42%] left-0 w-96 h-8 animate-wind-stream-3 opacity-55">
          <svg className="w-full h-full" viewBox="0 0 360 26" fill="none">
            <path
              d="M 10,12 Q 100,20 200,12 T 340,16"
              stroke="url(#windGrad1)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Floating Gentle Wind Petals / Spores drifting with the wind */}
        {[
          { top: '15%', delay: '0s', dur: '10s', size: 'w-2 h-1' },
          { top: '22%', delay: '3s', dur: '12s', size: 'w-1.5 h-1' },
          { top: '34%', delay: '6s', dur: '14s', size: 'w-2.5 h-1' },
          { top: '45%', delay: '2s', dur: '13s', size: 'w-2 h-1' }
        ].map((windPoint, i) => (
          <div
            key={i}
            className={`absolute left-0 ${windPoint.size} rounded-full bg-white/40 blur-[0.5px] animate-wind-particle`}
            style={{
              top: windPoint.top,
              animationDelay: windPoint.delay,
              animationDuration: windPoint.dur,
            }}
          />
        ))}
      </div>

      {/* 8. Majestic Distant Alpine Mountain Peaks with Textured Ridges and Snowcaps */}
      <div ref={mtnBackRef} className="absolute inset-x-0 bottom-0 h-[72%] w-full">
        <svg
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1440 680"
        >
          <defs>
            <linearGradient id="cinematic-mtn-back" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e45938" />
              <stop offset="25%" stopColor="#bf3f34" />
              <stop offset="60%" stopColor="#802133" />
              <stop offset="100%" stopColor="#3c0e22" />
            </linearGradient>
            <linearGradient id="mtn-shading-left" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f58055" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#330b1c" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="mtn-shading-right" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff946b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4d1228" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="snow-crest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#ffeedd" />
              <stop offset="100%" stopColor="#f5cbb1" />
            </linearGradient>
          </defs>

          {/* Majestic Mountain Massif */}
          <path
            d="M -50,680 
               L -50,340 
               L 80,240 
               L 180,120 
               L 260,220 
               L 410,360 
               L 560,280 
               L 730,170 
               L 880,310 
               L 1040,220 
               L 1190,320 
               L 1350,190 
               L 1500,290 
               L 1500,680 Z"
            fill="url(#cinematic-mtn-back)"
          />

          {/* Mountain Ridge Facet Shadow (Left Peak) */}
          <path
            d="M 180,120 L 110,270 L 260,220 Z"
            fill="url(#mtn-shading-left)"
          />
          {/* Mountain Ridge Facet Light (Center Peak) */}
          <path
            d="M 730,170 L 620,320 L 880,310 Z"
            fill="url(#mtn-shading-right)"
            opacity="0.65"
          />
          {/* Mountain Ridge Facet Light (Right Peak) */}
          <path
            d="M 1350,190 L 1240,340 L 1500,290 Z"
            fill="url(#mtn-shading-right)"
            opacity="0.5"
          />

          {/* Crisp Multi-Faceted Snowcap on Grand Left Summit */}
          <polygon
            points="180,120 145,175 165,162 180,185 200,165 220,180 180,120"
            fill="url(#snow-crest)"
            filter="drop-shadow(0 2px 8px rgba(0,0,0,0.2))"
          />
          {/* Snowcap on Grand Center Summit */}
          <polygon
            points="730,170 700,215 720,205 735,225 750,208 765,220 730,170"
            fill="url(#snow-crest)"
            opacity="0.9"
          />
          {/* Snowcap on Far Right Summit */}
          <polygon
            points="1350,190 1325,230 1340,222 1352,238 1368,225 1380,235 1350,190"
            fill="url(#snow-crest)"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* 9. Midground Rolling Alpine Ridges + Studio Cabin Light */}
      <div ref={mtnMidRef} className="absolute inset-x-0 bottom-0 h-[56%] w-full">
        <svg
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1440 540"
        >
          <defs>
            <linearGradient id="cinematic-mtn-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#96293f" />
              <stop offset="45%" stopColor="#671932" />
              <stop offset="100%" stopColor="#2c091f" />
            </linearGradient>
            <linearGradient id="ridge-rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff9a70" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ff9a70" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Organic Layered Ridges */}
          <path
            d="M -50,540 
               L -50,260 
               Q 140,210 320,270 
               T 720,210 
               T 1120,250 
               T 1500,180 
               L 1500,540 Z"
            fill="url(#cinematic-mtn-mid)"
            opacity="0.98"
          />

          {/* Rim Light on Ridge Crests */}
          <path
            d="M -50,260 
               Q 140,210 320,270 
               T 720,210 
               T 1120,250 
               T 1500,180"
            stroke="url(#ridge-rim)"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        {/* Ambient Warm Cabin Windows in Valley (Lit up as night arrives) */}
        <div
          ref={cabinGlowRef}
          className="absolute bottom-[38%] left-[46%] opacity-0 pointer-events-none"
        >
          <div className="relative">
            <div className="w-4 h-2.5 rounded-xs bg-[#ffca65] shadow-[0_0_28px_rgba(255,202,101,0.95)]" />
            <div className="absolute -top-1.5 -left-1.5 w-7 h-5 bg-amber-400/25 rounded-full blur-xs" />
          </div>
        </div>
      </div>

      {/* 10. Foreground Dense Natural Pine & Fir Forest Layer */}
      <div ref={forestRef} className="absolute inset-x-0 bottom-0 h-[42%] w-full">
        <svg
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1440 420"
        >
          <defs>
            <linearGradient id="forest-deep-back" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d142d" />
              <stop offset="100%" stopColor="#19061a" />
            </linearGradient>
            <linearGradient id="forest-mid-layer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#290b20" />
              <stop offset="100%" stopColor="#110313" />
            </linearGradient>
            <linearGradient id="forest-front-layer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1c0618" />
              <stop offset="100%" stopColor="#08010a" />
            </linearGradient>
          </defs>

          {/* Natural Varied Conifer Canopy - Back Depth (Gentle wind sway) */}
          <path
            className="animate-tree-sway-back"
            d="M 0,420 L 0,165 
               C 15,145 25,120 35,100 C 45,120 55,145 70,165 
               C 85,150 95,130 105,115 C 115,130 125,155 140,170 
               C 155,140 170,105 185,85  C 200,110 215,145 230,175 
               C 245,155 255,135 268,118 C 280,138 295,160 310,180 
               C 325,145 340,100 355,75  C 370,105 385,150 400,182 
               C 415,160 428,138 440,120 C 452,142 468,168 485,185 
               C 500,150 515,110 530,90  C 545,115 560,152 575,180 
               C 590,160 605,140 618,125 C 630,145 645,168 660,185 
               C 675,148 690,102 705,78  C 720,108 735,150 750,182 
               C 765,162 778,140 790,122 C 802,145 818,170 835,188 
               C 850,152 865,112 880,92  C 895,118 910,155 925,182 
               C 940,162 955,142 968,126 C 980,146 995,170 1010,188 
               C 1025,150 1040,105 1055,80 C 1070,110 1085,152 1100,185 
               C 1115,162 1128,140 1140,122 C 1152,145 1168,170 1185,188 
               C 1200,152 1215,112 1230,90  C 1245,118 1260,155 1275,182 
               C 1290,162 1305,138 1320,118 C 1335,140 1350,168 1365,185 
               C 1380,155 1395,120 1410,95  C 1425,125 1435,155 1440,175 
               L 1440,420 Z"
            fill="url(#forest-deep-back)"
            opacity="0.85"
          />

          {/* Natural Conifer Canopy - Mid Layer */}
          <path
            d="M 0,420 L 0,195 
               C 20,175 35,150 48,135 C 60,155 75,180 92,205 
               C 110,185 125,160 140,145 C 155,165 170,190 190,215 
               C 210,175 225,135 240,115 C 255,140 270,185 290,218 
               C 310,195 325,170 340,152 C 355,172 370,200 390,222 
               C 410,180 425,140 440,118 C 455,145 470,190 490,220 
               C 510,195 525,170 540,152 C 555,175 570,202 590,225 
               C 610,178 625,136 640,115 C 655,142 670,188 690,220 
               C 710,195 725,170 740,152 C 755,175 770,205 790,228 
               C 810,182 825,140 840,118 C 855,145 870,190 890,222 
               C 910,198 925,172 940,154 C 955,176 970,205 990,228 
               C 1010,180 1025,138 1040,116 C 1055,144 1070,190 1090,222 
               C 1110,198 1125,172 1140,155 C 1155,178 1170,206 1190,230 
               C 1210,182 1225,140 1240,118 C 1255,146 1270,192 1290,224 
               C 1310,198 1325,170 1340,152 C 1355,175 1370,205 1390,228 
               C 1410,190 1425,160 1440,140 L 1440,420 Z"
            fill="url(#forest-mid-layer)"
            opacity="0.95"
          />

          {/* Foreground Crisp Pine Silhouettes with Individual Needle Boughs (Front wind sway) */}
          <path
            className="animate-tree-sway-front"
            d="M 0,420 L 0,230 
               L 18,195 L 36,245 L 55,185 L 75,248 L 95,200 L 115,255 
               L 138,180 L 162,250 L 185,190 L 210,260 L 235,175 L 260,252 
               L 285,198 L 310,265 L 335,170 L 362,255 L 388,195 L 415,268 
               L 442,165 L 470,258 L 498,190 L 525,270 L 552,175 L 580,262 
               L 608,198 L 635,272 L 662,168 L 690,258 L 718,192 L 745,270 
               L 772,172 L 800,265 L 828,195 L 855,272 L 882,165 L 910,260 
               L 938,190 L 965,272 L 992,170 L 1020,262 L 1048,195 L 1075,275 
               L 1102,168 L 1130,260 L 1158,192 L 1185,272 L 1212,175 L 1240,265 
               L 1268,195 L 1295,275 L 1322,170 L 1350,262 L 1378,192 L 1408,270 
               L 1440,185 L 1440,420 Z"
            fill="url(#forest-front-layer)"
          />
        </svg>
      </div>

      {/* 11. Cinematic Vignette Overlay */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(10, 3, 12, 0.45) 100%)',
        }}
      />
    </div>
  )
}
