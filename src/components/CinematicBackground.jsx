import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  distantMountainPath,
  mainMassifPath,
  mountainShadingLeft,
  centerMountainShading,
  mountainShadingRight,
  centerSunlitFlank,
  rightSunlitFlank,
  leftPeakSnowHighlight,
  leftPeakSnowShadow,
  centerPeakSnow,
  rightPeakSnow,
  midgroundRidgePath,
  backForestPath,
  midForestPath,
  fgForestPath,
} from '../data/landscapePaths'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicBackground({ scrollProgress, currentTimeOfDay }) {
  const containerRef = useRef(null)
  const skySunsetRef = useRef(null)
  const skyTwilightRef = useRef(null)
  const skyNightRef = useRef(null)
  const skyMoonlitRef = useRef(null)
  const skyDawnRef = useRef(null)
  const sunRef = useRef(null)
  const moonRef = useRef(null)
  const starsRef = useRef(null)
  const cloudsRef = useRef(null)
  const mtnBackRef = useRef(null)
  const mtnMoonlightRef = useRef(null)
  const mtnMidRef = useRef(null)
  const cabinGlowRef = useRef(null)
  const forestRef = useRef(null)
  const forestMoonlightRef = useRef(null)
  const dawnGlowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // MASTER SCROLL-SCRUBBED TIMELINE
      // Continuous, rhythmic transition:
      // 1. Sunrise/Sunset: colorful & warm
      // 2. Sun sets down: colors softly dim
      // 3. Sun totally down: pure black night sky & crisp stars
      // 4. Moon arrives: silver moonlight gently returns visibility to mountains and forest
      // 5. Dawn arrives: soft morning rose/gold horizon
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // Smooth interpolation (lag-free, reverses on scroll up, freezes on stop)
        }
      })

      // 1. SKY OPACITY CROSS-FADE TIMELINE (Continuous GPU-interpolated cross-fades without gradient snapping)
      // Layer A: Vibrant Sunset / Golden Hour (Hero) -> slowly dims as sun sets
      tl.to(skySunsetRef.current, {
        opacity: 0,
        ease: 'power1.inOut',
        duration: 2.2,
      }, 1.2)

      // Layer B: Warm Twilight / Dusk (About Me) -> fades in, then fades into pure night
      tl.fromTo(skyTwilightRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'power1.inOut', duration: 1.8 },
        1.0
      )
      .to(skyTwilightRef.current, {
        opacity: 0,
        ease: 'power1.in',
        duration: 1.4,
      }, 2.8)

      // Layer C: Pure Deep Black Midnight (Sun totally down around Projects)
      tl.fromTo(skyNightRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'power1.inOut', duration: 1.4 },
        2.8
      )
      .to(skyNightRef.current, {
        opacity: 0.15,
        ease: 'power1.out',
        duration: 1.8,
      }, 4.2)
      .to(skyNightRef.current, {
        opacity: 0,
        ease: 'power1.in',
        duration: 1.5,
      }, 7.8)

      // Layer D: Moonlit Indigo Sky (Moon arrives -> Visibility returns!)
      tl.fromTo(skyMoonlitRef.current,
        { opacity: 0 },
        { opacity: 0.95, ease: 'power2.out', duration: 2.0 },
        4.2
      )
      .to(skyMoonlitRef.current, {
        opacity: 0,
        ease: 'power1.in',
        duration: 1.8,
      }, 7.8)

      // Layer E: Soft Morning Dawn (Contact)
      tl.fromTo(skyDawnRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'power2.out', duration: 2.0 },
        7.8
      )

      // 2. SUN SINKING BEHIND MOUNTAINS (Gradual, natural sunset)
      tl.to(sunRef.current, {
        y: '180%',
        scale: 0.65,
        opacity: 0,
        ease: 'power1.in',
        duration: 2.8,
      }, 0)

      // 3. STARS & CONSTELLATIONS FADING IN (Sparkles brightly in the black night sky)
      tl.fromTo(starsRef.current, 
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 1.8 }, 
        2.6
      )
      .to(starsRef.current, {
        opacity: 0.85,
        ease: 'none',
        duration: 4.2,
      }, 4.4)
      .to(starsRef.current, {
        opacity: 0,
        ease: 'power2.in',
        duration: 1.6,
      }, 8.0)

      // 4. MOON RISING OVER THE MOUNTAIN APEX
      // "After that moon is arrives, then little visible... again little by little the visibility is gonna come"
      tl.fromTo(moonRef.current,
        { y: '160%', opacity: 0, scale: 0.7 },
        { y: '0%', opacity: 1, scale: 1, duration: 2.4, ease: 'power2.out' },
        4.0
      )
      .to(moonRef.current, {
        y: '-40%',
        opacity: 0.65,
        duration: 2.4,
        ease: 'none',
      }, 6.4)
      .to(moonRef.current, {
        y: '-80%',
        opacity: 0,
        duration: 1.4,
        ease: 'power1.in',
      }, 8.2)

      // 5. MOONLIGHT ILLUMINATION ON MOUNTAIN CRESTS & PINES
      // As the moon arrives, silver moonlight illuminates the peaks, snow, and needle boughs
      tl.fromTo([mtnMoonlightRef.current, forestMoonlightRef.current],
        { opacity: 0 },
        { opacity: 0.85, ease: 'power2.out', duration: 2.0 },
        4.2
      )
      .to([mtnMoonlightRef.current, forestMoonlightRef.current], {
        opacity: 0,
        ease: 'power1.in',
        duration: 1.6,
      }, 7.8)

      // 6. CLOUDS DISSOLVING IN TWILIGHT
      tl.to(cloudsRef.current, {
        opacity: 0,
        ease: 'power1.out',
        duration: 2.2,
      }, 0)

      // 7. CABIN GLOW IN THE VALLEY (Lights up during About & Projects)
      tl.fromTo(cabinGlowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.9, scale: 1, duration: 1.5, ease: 'power2.out' },
        1.8
      )
      .to(cabinGlowRef.current, {
        opacity: 0.85,
        duration: 4.5,
        ease: 'none',
      }, 3.3)
      .to(cabinGlowRef.current, {
        opacity: 0.15,
        duration: 1.8,
        ease: 'power1.in',
      }, 7.8)

      // 8. DAWN HORIZON GLOW (Section 07 Contact)
      tl.fromTo(dawnGlowRef.current,
        { opacity: 0, scaleY: 0.3 },
        { opacity: 0.95, scaleY: 1, duration: 1.8, ease: 'power2.out' },
        8.0
      )

      // 9. SUBTLE PARALLAX ON MOUNTAINS & FOREST
      tl.to(mtnBackRef.current, { y: 60, ease: 'none', duration: 10 }, 0)
      tl.to(mtnMidRef.current, { y: 30, ease: 'none', duration: 10 }, 0)
      tl.to(forestRef.current, { y: 12, ease: 'none', duration: 10 }, 0)

      // 10. REALISTIC DAY-TO-NIGHT RHYTHM ON MOUNTAINS & FOREST
      // 0.0 - 1.2: Vibrant colorful sunset
      // 1.2 - 2.8: "Little by little sun was setting down, the color dims"
      tl.to([mtnBackRef.current, mtnMidRef.current, forestRef.current], {
        filter: 'brightness(0.7) saturate(0.85) hue-rotate(-8deg)',
        ease: 'power1.inOut',
        duration: 1.8,
      }, 1.2)
      // 2.8 - 4.0: "And then when the sun is totally down, then the color should be black"
      .to([mtnBackRef.current, mtnMidRef.current, forestRef.current], {
        filter: 'brightness(0.2) saturate(0.35) hue-rotate(-18deg)',
        ease: 'power1.inOut',
        duration: 1.2,
      }, 2.8)
      // 4.0 - 6.2: "After that moon is arrives, then little visible... again little by little the visibility is gonna come"
      .to([mtnBackRef.current, mtnMidRef.current, forestRef.current], {
        filter: 'brightness(0.78) saturate(0.92) hue-rotate(-32deg)',
        ease: 'power2.out',
        duration: 2.2,
      }, 4.0)
      // 6.2 - 7.8: Moonlit visibility holds steady through the night
      .to([mtnBackRef.current, mtnMidRef.current, forestRef.current], {
        filter: 'brightness(0.74) saturate(0.9) hue-rotate(-30deg)',
        ease: 'none',
        duration: 1.6,
      }, 6.2)
      // 7.8 - 9.8: Dawn awakens with morning warmth
      .to([mtnBackRef.current, mtnMidRef.current, forestRef.current], {
        filter: 'brightness(0.98) saturate(1.08) hue-rotate(5deg)',
        ease: 'power1.out',
        duration: 2.0,
      }, 7.8)

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
      {/* 1. Dynamic Cinematic Sky Canvas (Layered Opacity Cross-Fades for Smooth Continuous Rhythm) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Layer A: Vibrant Sunset / Golden Hour (Hero) */}
        <div
          ref={skySunsetRef}
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(180deg, #d85735 0%, #cf4d2c 45%, #7a2638 85%, #18091a 100%)',
            willChange: 'opacity',
          }}
        />

        {/* Layer B: Warm Twilight / Dusk (About Me - Little by little sun sets, color dims) */}
        <div
          ref={skyTwilightRef}
          className="absolute inset-0 w-full h-full opacity-0"
          style={{
            background: 'linear-gradient(180deg, #441635 0%, #300e2e 40%, #1a0822 75%, #0e0314 100%)',
            willChange: 'opacity',
          }}
        />

        {/* Layer C: Pure Deep Black Midnight (Sun Totally Down - Projects start) */}
        <div
          ref={skyNightRef}
          className="absolute inset-0 w-full h-full opacity-0"
          style={{
            background: 'linear-gradient(180deg, #090514 0%, #06030e 50%, #020108 100%)',
            willChange: 'opacity',
          }}
        />

        {/* Layer D: Moonlit Indigo Sky (Moon Arrives - Visibility Returns) */}
        <div
          ref={skyMoonlitRef}
          className="absolute inset-0 w-full h-full opacity-0"
          style={{
            background: 'radial-gradient(ellipse at 25% 25%, rgba(67, 56, 202, 0.3) 0%, transparent 60%), linear-gradient(180deg, #0d102e 0%, #100b26 45%, #05020e 100%)',
            willChange: 'opacity',
          }}
        />

        {/* Layer E: Soft Morning Dawn (Contact) */}
        <div
          ref={skyDawnRef}
          className="absolute inset-0 w-full h-full opacity-0"
          style={{
            background: 'linear-gradient(180deg, #2b0e27 0%, #4a1532 40%, #7d263a 70%, #c4472c 95%, #120414 100%)',
            willChange: 'opacity',
          }}
        />
      </div>

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

      {/* 8. Majestic Distant Alpine Mountain Peaks with Textured Ridges and Realistic Snow Couloirs */}
      <div ref={mtnBackRef} className="absolute inset-x-0 bottom-0 h-[72%] w-full">
        <svg
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1440 680"
        >
          <defs>
            {/* Distant Hazy Range Gradient */}
            <linearGradient id="mtn-distant-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cf4e36" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#a32e42" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#671634" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#2c081e" stopOpacity="1" />
            </linearGradient>

            {/* Main Massif Base Gradient */}
            <linearGradient id="cinematic-mtn-back" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#df5736" />
              <stop offset="20%" stopColor="#be3d35" />
              <stop offset="55%" stopColor="#7a1e35" />
              <stop offset="85%" stopColor="#430c26" />
              <stop offset="100%" stopColor="#1e0415" />
            </linearGradient>

            {/* Shadow Flank (West Facing Face - Rich twilight plum) */}
            <linearGradient id="mtn-shading-left" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4f122e" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#2e071c" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#180310" stopOpacity="0.98" />
            </linearGradient>

            {/* Center Massif Shadow */}
            <linearGradient id="center-mtn-shadow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5c1535" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#240517" stopOpacity="0.9" />
            </linearGradient>

            {/* Sunlit Flanks (East Facing Face - Warm Sunset Light) */}
            <linearGradient id="mtn-shading-right" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff946b" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#e8613d" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#4d1228" stopOpacity="0.85" />
            </linearGradient>

            {/* Right Peak Direct Sunset Illumination */}
            <linearGradient id="mtn-sun-direct" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffb38a" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#f36c46" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#55122b" stopOpacity="0.9" />
            </linearGradient>

            {/* Realistic Snow Highlight (Golden-white summit reflection) */}
            <linearGradient id="snow-crest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#fff3e6" />
              <stop offset="85%" stopColor="#fed3bb" />
              <stop offset="100%" stopColor="#e39885" />
            </linearGradient>

            {/* Realistic Snow Shadow (Cool atmospheric lavender) */}
            <linearGradient id="snow-shadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0c2cf" />
              <stop offset="50%" stopColor="#ca7a92" />
              <stop offset="100%" stopColor="#7e2844" />
            </linearGradient>

            {/* Valley Mist Overlay */}
            <linearGradient id="valley-mist" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffb094" stopOpacity="0" />
              <stop offset="50%" stopColor="#f48666" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#1a0414" stopOpacity="0" />
            </linearGradient>

            {/* Ethereal Moonlight Mountain Wash */}
            <linearGradient id="mtn-moonlight-wash" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#818cf8" stopOpacity="0.38" />
              <stop offset="70%" stopColor="#4338ca" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.75" />
            </linearGradient>
          </defs>

          {/* 1. Distant Atmospheric Mountain Range */}
          <path
            d={distantMountainPath}
            fill="url(#mtn-distant-grad)"
            opacity="0.75"
          />

          {/* 2. Main Grand Massif Base Profile */}
          <path
            d={mainMassifPath}
            fill="url(#cinematic-mtn-back)"
          />

          {/* Ethereal Silver-Indigo Moonlight Wash (Fades in as Moon Arrives) */}
          <path
            ref={mtnMoonlightRef}
            d={mainMassifPath}
            fill="url(#mtn-moonlight-wash)"
            opacity="0"
          />

          {/* 3. Shadow Facets on Left Peak (Mount Sentinel) */}
          <path
            d={mountainShadingLeft}
            fill="url(#mtn-shading-left)"
          />

          {/* 4. Center Massif Shadow Facet */}
          <path
            d={centerMountainShading}
            fill="url(#center-mtn-shadow)"
          />

          {/* 5. Sunlit Rocky Flanks */}
          <path
            d={mountainShadingRight}
            fill="url(#mtn-shading-right)"
          />

          {/* 6. Center Peak Sunlit Flank */}
          <path
            d={centerSunlitFlank}
            fill="url(#mtn-shading-right)"
            opacity="0.85"
          />

          {/* 7. Right Peak Direct Sunset Illumination */}
          <path
            d={rightSunlitFlank}
            fill="url(#mtn-sun-direct)"
          />

          {/* 8. Realistic Glacial Snowpack & Avalanche Couloirs */}
          <path
            d={leftPeakSnowShadow}
            fill="url(#snow-shadow)"
            opacity="0.9"
          />
          <path
            d={leftPeakSnowHighlight}
            fill="url(#snow-crest)"
            filter="drop-shadow(0 2px 8px rgba(0,0,0,0.25))"
          />

          <path
            d={centerPeakSnow}
            fill="url(#snow-crest)"
            opacity="0.92"
            filter="drop-shadow(0 2px 6px rgba(0,0,0,0.2))"
          />

          <path
            d={rightPeakSnow}
            fill="url(#snow-crest)"
            opacity="0.95"
            filter="drop-shadow(0 2px 6px rgba(0,0,0,0.18))"
          />

          {/* 9. Valley Atmospheric Mist Ribbon */}
          <rect
            x="-50"
            y="380"
            width="1550"
            height="200"
            fill="url(#valley-mist)"
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
              <stop offset="30%" stopColor="#7a1f38" />
              <stop offset="65%" stopColor="#4f1128" />
              <stop offset="100%" stopColor="#1e0417" />
            </linearGradient>
            <linearGradient id="ridge-rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffaa85" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffaa85" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="mid-valley-mist" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff9a78" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#1c0517" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Organic Layered Foothill Ridge */}
          <path
            d={midgroundRidgePath}
            fill="url(#cinematic-mtn-mid)"
            opacity="0.98"
          />

          {/* Golden Rim Light on Ridge Crest */}
          <path
            d="M -50,260 Q 120,210 280,260 T 680,205 T 1080,240 T 1500,180"
            stroke="url(#ridge-rim)"
            strokeWidth="3.5"
            fill="none"
          />

          {/* Soft Mist in Foothill Hollow */}
          <rect
            x="-50"
            y="320"
            width="1550"
            height="160"
            fill="url(#mid-valley-mist)"
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
            {/* Distant Forest Ridge Gradient */}
            <linearGradient id="forest-deep-back" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#451433" />
              <stop offset="40%" stopColor="#2e0c24" />
              <stop offset="100%" stopColor="#140316" />
            </linearGradient>

            {/* Mid Forest Layer Gradient */}
            <linearGradient id="forest-mid-layer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c0922" />
              <stop offset="45%" stopColor="#1b0517" />
              <stop offset="100%" stopColor="#0c010d" />
            </linearGradient>

            {/* Foreground Hero Pine Layer Gradient */}
            <linearGradient id="forest-front-layer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1c0519" />
              <stop offset="35%" stopColor="#120313" />
              <stop offset="100%" stopColor="#060008" />
            </linearGradient>

            {/* Sunset Rim Light on Foreground Pines */}
            <linearGradient id="pine-needle-rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffaa85" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#ea653e" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            {/* Forest Ground Mist Ribbon */}
            <linearGradient id="forest-ground-mist" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f58055" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffd2ba" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#08010a" stopOpacity="0" />
            </linearGradient>

            {/* Ethereal Silver Moonlight Pine Needle Rim */}
            <linearGradient id="pine-moonlight-rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#818cf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. Distant High-Density Pine Skyline (Gentle Wind Sway) */}
          <path
            className="animate-tree-sway-back"
            d={backForestPath}
            fill="url(#forest-deep-back)"
            opacity="0.88"
          />

          {/* 2. Soft Valley Mist Weaving Between Forest Layers */}
          <rect
            x="-50"
            y="260"
            width="1550"
            height="90"
            fill="url(#forest-ground-mist)"
          />

          {/* 3. Midground Realistic Fir & Spruce Stands */}
          <path
            d={midForestPath}
            fill="url(#forest-mid-layer)"
            opacity="0.96"
          />

          {/* 4. Foreground Majestic Pines with Tiered Boughs & Needles (Front Wind Sway) */}
          <path
            className="animate-tree-sway-front"
            d={fgForestPath}
            fill="url(#forest-front-layer)"
          />

          {/* 5. Warm Sunset Needle Rim-Light on Foreground Pines */}
          <path
            className="animate-tree-sway-front"
            d={fgForestPath}
            stroke="url(#pine-needle-rim)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.75"
          />

          {/* 6. Silver Moonlight Needle Rim on Foreground Pines (Fades in as Moon Arrives) */}
          <path
            ref={forestMoonlightRef}
            className="animate-tree-sway-front"
            d={fgForestPath}
            stroke="url(#pine-moonlight-rim)"
            strokeWidth="1.6"
            fill="none"
            opacity="0"
          />

          {/* 6. Solid Forest Floor Anchor */}
          <rect
            x="-50"
            y="410"
            width="1550"
            height="20"
            fill="#060008"
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
