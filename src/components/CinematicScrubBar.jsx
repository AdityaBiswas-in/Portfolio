import React, { useState, useEffect } from 'react'
import { Clapperboard, Play, Pause, Compass, Sparkles } from 'lucide-react'

export default function CinematicScrubBar({ activeSection, onNavigate }) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [timeLabel, setTimeLabel] = useState('18:42 SUNSET')

  useEffect(() => {
    let scrollTimeout

    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100))
        setScrollPercent(Math.round(pct))

        // Time of day based on scroll scrub
        if (pct < 18) {
          setTimeLabel('18:30 GOLDEN SUNSET')
        } else if (pct < 35) {
          setTimeLabel('20:15 TWILIGHT DESCENT')
        } else if (pct < 55) {
          setTimeLabel('23:45 MIDNIGHT STARFIELD')
        } else if (pct < 72) {
          setTimeLabel('02:30 MOONRISE PEAK')
        } else if (pct < 88) {
          setTimeLabel('04:15 CONSTELLATION WEB')
        } else {
          setTimeLabel('05:45 DAWN AWAKENING')
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <aside aria-label="Cinematic Timeline Navigation" className="fixed right-5 bottom-6 z-40 hidden sm:flex flex-col items-end gap-2 pointer-events-none select-none">
      {/* Floating HUD Scrub Capsule */}
      <div className="pointer-events-auto px-4 py-2 rounded-2xl bg-[#160618]/85 backdrop-blur-md border border-[#e6613b]/35 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center gap-3 transition-all duration-300">
        <div className="flex items-center gap-2">
          {/* Status Dot: Active advance or Frozen */}
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 transition-colors duration-200 ${
                isScrolling
                  ? 'bg-[#f38a58] shadow-[0_0_8px_#f38a58]'
                  : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
              }`}
            />
          </span>

          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-white">
            {timeLabel}
          </span>
        </div>

        <div className="h-3 w-px bg-white/15" />

        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ffae8f]">
          <span>SCRUB</span>
          <span className="font-bold text-white">{scrollPercent}%</span>
        </div>

        <div className="hidden lg:flex items-center text-[9px] font-mono text-[#d6b7c2]/60 uppercase tracking-tighter">
          {isScrolling ? '• ADVANCING' : '• FROZEN'}
        </div>
      </div>

      {/* Vertical Timeline Scrub Bar Indicator */}
      <div className="pointer-events-auto h-28 w-1 rounded-full bg-white/10 relative overflow-hidden mr-2">
        <div
          className="w-full bg-linear-to-b from-[#e6613b] via-[#f38a58] to-[#ffb885] rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(230,97,59,0.8)]"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>
    </aside>
  )
}
