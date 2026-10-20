import React, { useState, useEffect } from 'react'
import { Menu, X, LayoutGrid, Sparkles } from 'lucide-react'

export default function Navbar({ activeSection, onNavigate, onOpenIndex }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleItemClick = (id) => {
    onNavigate(id)
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Floating Top Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-4 py-3 ${
          scrolled ? 'pt-3' : 'pt-5'
        }`}
      >
        <nav
          className={`flex items-center justify-between gap-4 px-5 py-2.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-[#150917]/85 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'bg-[#1a0c1c]/60 backdrop-blur-md border-white/10 shadow-lg'
          } max-w-4xl w-full mx-auto`}
        >
          {/* Logo / Brand */}
          <button
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2 text-left group focus:outline-none"
            aria-label="Aditya Biswas Home"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#e6613b] to-[#f38a58] flex items-center justify-center text-white text-xs font-bold shadow-md group-hover:scale-105 transition-transform">
              AB
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold tracking-wider text-white uppercase block leading-none">
                Aditya Biswas
              </span>
              <span className="text-[10px] text-[#ffae8f]/80 font-mono tracking-tight block mt-0.5">
                PORTFOLIO &apos;25
              </span>
            </div>
          </button>

          {/* Desktop Nav Links (Matching Image 1) */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-[#d6c3cf] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Active Indicator Underline matching Image 1 */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#f8e5c8] rounded-full shadow-[0_0_8px_rgba(248,229,200,0.8)]" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right Action: Index Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenIndex}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2a1329]/80 hover:bg-[#3d1a3b] border border-[#e6613b]/30 text-xs font-semibold text-[#fceee2] tracking-wider uppercase transition-all duration-200 hover:border-[#e6613b]/60 group focus:outline-none shadow-sm"
              title="Open Quick Index"
            >
              <span>INDEX</span>
              <LayoutGrid className="w-3.5 h-3.5 text-[#f38a58] group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-[#2a1329]/80 border border-white/10 text-white hover:bg-[#3d1a3b] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Dropdown Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/70 backdrop-blur-md flex flex-col justify-center items-center p-6 animate-fadeIn">
          <div className="w-full max-w-xs bg-[#1f0f22] border border-[#e6613b]/30 rounded-2xl p-6 shadow-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#f38a58]">
                Navigation Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/60 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-[#e6613b] text-white shadow-md'
                    : 'text-[#d6c3cf] hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-4 pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenIndex()
                }}
                className="w-full py-2.5 rounded-xl bg-linear-to-r from-[#2c152a] to-[#3a1a38] border border-[#f38a58]/40 text-xs uppercase tracking-widest text-[#fceee2] font-semibold flex items-center justify-center gap-2"
              >
                <LayoutGrid className="w-4 h-4 text-[#f38a58]" />
                View Full Index
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
