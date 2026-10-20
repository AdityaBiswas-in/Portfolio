import React, { useState, useEffect } from 'react'
import { ArrowUp, Heart } from 'lucide-react'

export default function Footer({ onScrollTop }) {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setCurrentTime(timeStr)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="relative w-full bg-[#110512] text-[#d6b7c2] border-t border-[#e6613b]/20 py-10 px-6 sm:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
        {/* Left: Attribution */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-white font-bold tracking-wider uppercase">
            ADITYA BISWAS — PORTFOLIO &apos;25
          </p>
          <p className="text-[#dec6d4]/70">
            Engineered with React 19, GSAP ScrollTrigger, Lenis &amp; Tailwind CSS.
          </p>
        </div>

        {/* Center: Live Kolkata Local Time */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#200b22] border border-[#e6613b]/30 text-[#ffdfbe]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>KOLKATA, IN:</span>
          <span className="font-bold text-[#f38a58]">{currentTime || '18:42 IST'}</span>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={onScrollTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#200b22] hover:bg-[#e6613b] border border-[#e6613b]/30 hover:border-[#e6613b] text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          title="Return to top"
        >
          <span className="text-[11px] font-bold tracking-widest uppercase">
            BACK TO TOP
          </span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  )
}
