import React, { useState, useEffect, useRef } from 'react'
import CinematicBackground from './components/CinematicBackground'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { ChevronDown, ArrowUp, Sun, Moon, Sparkles, Mountain, Compass } from 'lucide-react'

export default function App() {
  const { scrollTo } = useSmoothScroll()
  const [activeChapter, setActiveChapter] = useState('chapter-high-sun')
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const autoPlayAnimRef = useRef(null)

  const chapters = [
    'chapter-high-sun',
    'chapter-sunset',
    'chapter-midnight',
    'chapter-moonrise',
    'chapter-nocturne',
  ]

  // Track active chapter based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45

      for (let i = chapters.length - 1; i >= 0; i--) {
        const chId = chapters[i]
        const el = document.getElementById(chId)
        if (el && scrollPos >= el.offsetTop) {
          setActiveChapter(chId)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto Tour hands-free continuous cinematic scroll
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayAnimRef.current) cancelAnimationFrame(autoPlayAnimRef.current)
      return
    }

    let lastTime = performance.now()
    const autoScroll = (time) => {
      const delta = time - lastTime
      lastTime = time

      // Scroll speed: ~180px per second
      window.scrollBy(0, (180 * delta) / 1000)

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY >= maxScroll - 5) {
        setIsAutoPlaying(false)
        return
      }

      autoPlayAnimRef.current = requestAnimationFrame(autoScroll)
    }

    autoPlayAnimRef.current = requestAnimationFrame(autoScroll)

    return () => {
      if (autoPlayAnimRef.current) cancelAnimationFrame(autoPlayAnimRef.current)
    }
  }, [isAutoPlaying])

  const handleNavigate = (chapterId) => {
    setIsAutoPlaying(false)
    setActiveChapter(chapterId)
    scrollTo(`#${chapterId}`, -80)
  }

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false)
    } else {
      // If at bottom, reset to top before playing
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY >= maxScroll - 20) {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      setIsAutoPlaying(true)
    }
  }

  return (
    <div className="relative min-h-[520vh] bg-black text-[#fbeee0] selection:bg-[#e6613b] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Cinematic Scroll-Controlled Background Animation */}
      <CinematicBackground />

      {/* Main Narrative Chapters Overlay Container */}
      <main className="relative z-10 pointer-events-none">
        {/* CHAPTER 01: THE HIGH SUN (Golden Hour) */}
        <section
          id="chapter-high-sun"
          className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 pt-24 pb-16"
        >
          <div className="max-w-2xl pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(251,191,36,0.25)]">
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span>01 / SOLAR PEAK</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-[1.08]">
              The High Sun
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-amber-100/90 leading-relaxed font-light mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] max-w-xl">
              An alpine valley bathed in warm, luminous golden light. The radiant sun stands tall above the peaks, illuminating towering conifer pines and rocky spires.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleNavigate('chapter-sunset')}
                className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-linear-to-r from-[#e6613b] to-[#f38a58] text-white font-medium text-sm shadow-[0_6px_25px_rgba(230,97,59,0.5)] hover:shadow-[0_8px_32px_rgba(230,97,59,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Initiate Sunset</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={toggleAutoPlay}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 text-white/90 text-sm backdrop-blur-md transition-all duration-300"
              >
                <Compass className="w-4 h-4 text-amber-300" />
                <span>{isAutoPlaying ? 'Pause Tour' : 'Auto Play Experience'}</span>
              </button>
            </div>

            {/* Scroll indicator prompt */}
            <div className="mt-14 flex items-center gap-3 text-xs font-mono tracking-wider text-amber-200/70">
              <div className="w-5 h-9 rounded-full border border-amber-300/40 flex items-start justify-center p-1">
                <div className="w-1.5 h-2.5 rounded-full bg-amber-300 animate-bounce" />
              </div>
              <span>SCROLL DOWN TO WITNESS THE SUN SINK</span>
            </div>
          </div>
        </section>

        {/* CHAPTER 02: THE DESCENT (Sunset into Valley Pass) */}
        <section
          id="chapter-sunset"
          className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 py-20"
        >
          <div className="max-w-2xl pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-300 text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(249,115,22,0.25)]">
              <Sun className="w-3.5 h-3.5 text-orange-400" />
              <span>02 / THE DESCENT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] leading-[1.12]">
              Sinking into the Pass
            </h2>

            <p className="text-base sm:text-lg text-orange-100/85 leading-relaxed font-light mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-xl">
              As you scroll, the solar orb descends directly into the central saddle. Deep coral and crimson light cast long shadows over the firs before the colors softly dim.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavigate('chapter-midnight')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/50 hover:bg-black/70 border border-orange-500/30 text-orange-200 text-xs font-mono backdrop-blur-md transition-all duration-300"
              >
                <span>Descend to Midnight</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* CHAPTER 03: THE MIDNIGHT VOID (Pitch Black Darkness & Starfield) */}
        <section
          id="chapter-midnight"
          className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 py-20"
        >
          <div className="max-w-2xl pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-400/30 text-indigo-200 text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>03 / NIGHT SKY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.12]">
              Nocturnal Shadows
            </h2>

            <p className="text-base sm:text-lg text-indigo-100/85 leading-relaxed font-light mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-xl">
              The sun has set completely below the ridge. The valley rests in deep darkness without sun and without moon—the starry sky, mountain silhouettes, and fir tree contours quietly waiting.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavigate('chapter-moonrise')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-indigo-400/30 text-indigo-200 text-xs font-mono backdrop-blur-md transition-all duration-300"
              >
                <span>Witness Moonrise</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* CHAPTER 04: THE SILVER MOONRISE (Moon Arises & Light Returns Little by Little) */}
        <section
          id="chapter-moonrise"
          className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 py-20"
        >
          <div className="max-w-2xl pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/40 border border-sky-400/30 text-sky-200 text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <Moon className="w-3.5 h-3.5 text-sky-300" />
              <span>04 / LUNAR EMERGENCE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] leading-[1.12]">
              Silver Light Returns
            </h2>

            <p className="text-base sm:text-lg text-sky-100/85 leading-relaxed font-light mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-xl">
              From behind the crags, the glowing crescent moon ascends. Soft moonlight filters down little by little, casting gentle silver reflections on the mountain crests and valley mist.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavigate('chapter-nocturne')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-sky-400/30 text-sky-200 text-xs font-mono backdrop-blur-md transition-all duration-300"
              >
                <span>Explore Full Nocturne</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* CHAPTER 05: MOONLIT WILDS (Mountains and Trees Fully Visible in Night Aesthetic) */}
        <section
          id="chapter-nocturne"
          className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 py-24"
        >
          <div className="max-w-2xl pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/50 border border-blue-400/30 text-blue-200 text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(96,165,250,0.25)]">
              <Mountain className="w-3.5 h-3.5 text-blue-300" />
              <span>05 / MOONLIT WILDS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] leading-[1.12]">
              Nocturnal Solitude
            </h2>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-light mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-xl">
              The mountain peaks, snow couloirs, and dense conifer forests are now fully visible in serene nocturnal moonlight. The landscape rests under the peaceful glow of the night.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleNavigate('chapter-high-sun')}
                className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-linear-to-r from-[#e6613b] to-[#f38a58] text-white font-medium text-sm shadow-[0_6px_25px_rgba(230,97,59,0.5)] hover:shadow-[0_8px_32px_rgba(230,97,59,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Return to High Sun</span>
              </button>

              <button
                onClick={toggleAutoPlay}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 text-white text-sm backdrop-blur-md transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Replay Cinematic Cycle</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
