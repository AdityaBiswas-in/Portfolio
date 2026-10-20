import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import landscapeSunsetOpenSky from '../assets/landscape-sunset-open-sky.jpg'
import landscapeNightNoMoon from '../assets/landscape-night-no-moon.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicBackground() {
  const containerRef = useRef(null)
  const layerSunsetRef = useRef(null)
  const layerNightRef = useRef(null)
  const sunOrbRef = useRef(null)
  const sunGlowRef = useRef(null)
  const moonOrbRef = useRef(null)
  const moonGlowRef = useRef(null)
  const mistRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // MASTER SCROLL-SCRUBBED TIMELINE
      // Total duration: 10 units scrubbed smoothly across page scroll
      //
      // CHOREOGRAPHY DIRECTLY REQUESTED BY USER:
      // 1. Initial State: Sun is high at the top of the sky, radiant over the sunset valley.
      // 2. Sunset Animation (Scroll 0% - 32%): A smooth, visible animation of the sun physically
      //    going down through the sky, sinking into the saddle pass, and setting behind the mountains.
      // 3. Transition to Night (Scroll 32% - 48%): Little by little the sunset colors dim into a night-time view.
      // 4. Full Dark Forest with Mountains (Scroll 48% - 62%): A realistic night view of the dark forest and
      //    mountain silhouettes under the starry sky — without sun and without moon.
      // 5. Moon Comes Up (Scroll 62% - 80%): The single silver crescent moon ascends from behind the saddle;
      //    little by little the brightness increases with moonlight illumination.
      // 6. Moon is Up (Scroll 80% - 100%): The moon is up high in the sky; mountains and pine trees are
      //    fully visible, beautifully illuminated by nocturnal moonlight.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        }
      })

      // Initial element states
      gsap.set(layerSunsetRef.current, { opacity: 1, filter: 'brightness(1.0)' })
      gsap.set(layerNightRef.current, { opacity: 1, filter: 'brightness(0.22) contrast(1.15)' })
      gsap.set(sunOrbRef.current, { top: '15%', opacity: 1, scale: 1 })
      gsap.set(moonOrbRef.current, { top: '58%', opacity: 0, scale: 0.75 })

      // --- STAGE 1: VISIBLE SUNSET ANIMATION (The Sun Goes Down & Sets Behind Mountains) ---
      // The sun visibly glides down through the open sky: from top (15%) down into the saddle (58%)
      tl.to(sunOrbRef.current, {
        top: '60%',
        scale: 0.88,
        ease: 'power1.inOut',
        duration: 2.8,
      }, 0.2)

      // As the sun approaches the horizon, sunset colors warm and softly dim
      tl.to(layerSunsetRef.current, {
        filter: 'brightness(0.85) saturate(1.1)',
        ease: 'power1.in',
        duration: 1.6,
      }, 1.2)

      // The sun finishes sinking behind the mountain saddle and disappears
      tl.to(sunOrbRef.current, {
        opacity: 0,
        ease: 'power2.in',
        duration: 0.8,
      }, 2.4)

      // --- STAGE 2: LITTLE BY LITTLE A NIGHT-TIME VIEW (2.8 - 4.4) ---
      // "and then it's little by little a night time view"
      // Sunset layer dims and fades out, smoothly revealing the nocturnal night landscape underneath
      tl.to(layerSunsetRef.current, {
        filter: 'brightness(0.3) saturate(0.8)',
        ease: 'power1.in',
        duration: 1.0,
      }, 2.6)
      .to(layerSunsetRef.current, {
        opacity: 0,
        ease: 'power2.inOut',
        duration: 1.2,
      }, 3.2)

      // --- STAGE 3: FULL DARK FOREST WITH THE MOUNTAINS (4.2 - 6.0) ---
      // "then a full dark forest with the mountains, without the moon, without the sun"
      // The moonless night landscape is active at deep nocturnal shadow brightness (0.22).
      // Starry night sky, dark mountain ridges, and forest contours are visible in dark shades.
      tl.to(layerNightRef.current, {
        filter: 'brightness(0.22) contrast(1.15)',
        duration: 1.8,
      }, 4.2)

      // --- STAGE 4: THE MOON COMES UP & BRIGHTNESS INCREASES (5.8 - 8.0) ---
      // "and then a moon comes up, little by little the brightness increases, the moonlight illumination"
      // The single silver crescent moon ascends from behind the mountain pass into the night sky
      tl.to(moonOrbRef.current, {
        top: '35%',
        opacity: 1,
        scale: 1,
        ease: 'power1.out',
        duration: 2.2,
      }, 5.8)

      // Soft lunar aura blooms around the rising moon
      tl.fromTo(moonGlowRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 0.7, scale: 1.2, ease: 'power1.out', duration: 2.0 },
        6.0
      )

      // Moonlight illumination: brightness increases little by little as the moon ascends
      tl.to(layerNightRef.current, {
        filter: 'brightness(0.65) contrast(1.08)',
        ease: 'power1.inOut',
        duration: 1.8,
      }, 6.0)

      // --- STAGE 5: THE MOON IS UP & FULL MOONLIGHT ILLUMINATION (7.8 - 10.0) ---
      // "and then the moon is up"
      // Moon is perched high in the sky; mountains, snow couloirs, and pine trees fully visible
      tl.to(layerNightRef.current, {
        filter: 'brightness(1.0) contrast(1.0)',
        ease: 'power1.out',
        duration: 1.6,
      }, 7.8)

      // Gentle parallax drift on mist ribbons
      tl.to(mistRef.current, {
        y: -30,
        opacity: 0.7,
        ease: 'none',
        duration: 10,
      }, 0)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0 bg-[#000000]"
      style={{ isolation: 'isolate' }}
    >
      {/* 1. LAYER 1 (z-1): BASE REALISTIC NIGHT MOUNTAIN VALLEY (NO MOON BAKED IN)
          Always sits at the base.
          In Stage 3 & 4, it displays the full dark forest and mountains under the starry sky (no sun, no moon).
          In Stage 4 & 5, its brightness increases as the moon ascends. */}
      <div
        ref={layerNightRef}
        className="absolute inset-0 w-full h-full will-change-transform z-1"
      >
        <img
          src={landscapeNightNoMoon}
          alt="Night Mountain Valley without Moon"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* 2. LAYER 2 (z-2): SUNSET MOUNTAIN VALLEY WITH OPEN SKY
          Sits over the night layer.
          Contains the full mountain range and pine forest with an open sky channel in the center.
          Fades out into the night layer as the sun finishes setting. */}
      <div
        ref={layerSunsetRef}
        className="absolute inset-0 w-full h-full will-change-transform z-2"
      >
        <img
          src={landscapeSunsetOpenSky}
          alt="Sunset Mountain Valley with Open Sky"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* 3. LAYER 3 (z-5): ANIMATED DESCENDING SUN WITH SADDLE HORIZON OCCLUSION
          The sun element sits in the open sky and physically glides down through the sky.
          The wrapper has a clip-path matching the mountain saddle notch, so when the sun
          descends into the saddle, it physically sinks behind the mountain ridges! */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-5 overflow-hidden"
        style={{
          // Clip path matching the mountain slopes and central saddle notch
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 65% 51%, 53.5% 58.5%, 42% 51%, 0% 50%)',
        }}
      >
        <div
          ref={sunOrbRef}
          className="absolute left-[53.5%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none will-change-transform"
          style={{
            top: '15%',
            width: 'clamp(140px, 14vw, 210px)',
            height: 'clamp(140px, 14vw, 210px)',
            background: 'radial-gradient(circle at 48% 48%, #ffffff 0%, #fffbe0 24%, #ffd347 48%, #ff8b26 76%, transparent 100%)',
            filter: 'drop-shadow(0 0 35px rgba(255, 195, 60, 0.9)) drop-shadow(0 0 75px rgba(245, 105, 30, 0.55))',
          }}
        >
          {/* Brilliant luminous solar core */}
          <div className="absolute inset-[10%] rounded-full bg-white/80 blur-xs" />
          {/* Atmospheric solar corona glow */}
          <div
            ref={sunGlowRef}
            className="absolute -inset-10 rounded-full bg-radial from-amber-300/35 via-orange-500/15 to-transparent blur-lg"
          />
        </div>
      </div>

      {/* 4. LAYER 4 (z-10): THE ONLY MOON - ANIMATED RISING SILVER CRESCENT
          Since Layer 1 has NO moon, this is the sole moon in the entire experience.
          It rises up from behind the mountain saddle into the starry night sky. */}
      <div
        ref={moonOrbRef}
        className="absolute left-[53.1%] -translate-x-1/2 -translate-y-1/2 w-24 sm:w-28 md:w-32 lg:w-36 h-24 sm:h-28 md:h-32 lg:h-36 rounded-full pointer-events-none z-10 opacity-0 will-change-transform"
        style={{
          top: '58%',
        }}
      >
        {/* Soft Lunar Corona Glow */}
        <div
          ref={moonGlowRef}
          className="absolute -inset-10 sm:-inset-14 rounded-full pointer-events-none opacity-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(210, 235, 255, 0.5) 0%, rgba(140, 195, 255, 0.22) 42%, rgba(80, 130, 220, 0.08) 65%, transparent 85%)',
            filter: 'blur(16px)',
          }}
        />

        {/* Crisp Silver Crescent Moon SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_22px_rgba(200,230,255,0.9)]"
        >
          <defs>
            <linearGradient id="single-moon-grad" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#f0f7ff" />
              <stop offset="70%" stopColor="#c5ddfc" />
              <stop offset="100%" stopColor="#81a8de" />
            </linearGradient>
            <mask id="single-crescent-mask">
              <rect width="100" height="100" fill="white" />
              {/* Occluding circle to carve out crescent shape */}
              <circle cx="59" cy="46" r="39" fill="black" />
            </mask>
          </defs>
          <circle
            cx="48"
            cy="52"
            r="41"
            fill="url(#single-moon-grad)"
            mask="url(#single-crescent-mask)"
          />
        </svg>
      </div>

      {/* 5. VALLEY MIST & ATMOSPHERIC NIGHT HAZE */}
      <div
        ref={mistRef}
        className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none z-15 overflow-hidden"
      >
        <div
          className="absolute inset-0 w-[200%] h-full opacity-25 animate-cloud-left-to-right-1"
          style={{
            background: 'linear-gradient(to top, rgba(140, 180, 230, 0.16) 0%, rgba(100, 140, 210, 0.05) 50%, transparent 100%)',
            filter: 'blur(20px)',
          }}
        />
        <div
          className="absolute inset-0 w-[200%] h-full opacity-15 animate-cloud-left-to-right-2"
          style={{
            background: 'linear-gradient(to top, rgba(255, 230, 210, 0.08) 0%, transparent 60%)',
            filter: 'blur(25px)',
          }}
        />
      </div>

      {/* 6. FLOATING GENTLE PINE SPORES / FIREFLIES */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
        {[
          { top: '65%', left: '15%', delay: '0s', dur: '12s', size: 'w-1.5 h-1.5' },
          { top: '72%', left: '28%', delay: '3s', dur: '14s', size: 'w-1 h-1' },
          { top: '80%', left: '42%', delay: '6s', dur: '11s', size: 'w-2 h-2' },
          { top: '68%', left: '62%', delay: '1.5s', dur: '13s', size: 'w-1 h-1' },
          { top: '75%', left: '78%', delay: '4.5s', dur: '15s', size: 'w-1.5 h-1.5' },
          { top: '85%', left: '88%', delay: '2s', dur: '10s', size: 'w-1 h-1' },
        ].map((point, i) => (
          <div
            key={i}
            className={`absolute ${point.size} rounded-full bg-amber-200/40 blur-[0.6px] animate-wind-particle`}
            style={{
              top: point.top,
              left: point.left,
              animationDelay: point.delay,
              animationDuration: point.dur,
            }}
          />
        ))}
      </div>
    </div>
  )
}
