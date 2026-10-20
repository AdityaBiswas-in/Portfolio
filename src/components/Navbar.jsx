import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, LayoutGrid, Sparkles } from 'lucide-react'

export default function Navbar({ activeSection, onNavigate, onOpenIndex }) {
  const [scrolled, setScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const timeoutRef = useRef(null)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' },
  ]

  const currentItem = navItems.find((item) => item.id === activeSection) || navItems[0]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 600)
  }

  const handleItemClick = (id) => {
    onNavigate(id)
    setMobileMenuOpen(false)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 500)
  }

  return (
    <>
      {/* Floating Top Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center px-4 py-3 ${
          scrolled ? 'pt-3' : 'pt-5'
        }`}
      >
        <nav
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`group flex items-center justify-center rounded-full border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? 'bg-[#150917]/90 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'bg-[#1a0c1c]/75 backdrop-blur-md border-white/10 shadow-lg hover:border-[#e6613b]/40'
          } ${
            isHovered
              ? 'px-4 sm:px-6 py-2.5 max-w-fit'
              : 'px-5 py-2 max-w-55'
          } mx-auto relative cursor-pointer`}
        >
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {!isHovered ? (
              /* Shrunk / Collapsed State: Shows Only The Page I'm In */
              <div className="flex items-center px-3 py-0.5 transition-all duration-700 animate-nav-fade">
                <span className="text-sm font-semibold tracking-wide text-white relative">
                  {currentItem.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f8e5c8] rounded-full shadow-[0_0_8px_rgba(248,229,200,0.8)]" />
                </span>
              </div>
            ) : (
              /* Expanded State: Reveals Full Menu Across The Bar */
              <div className="flex items-center gap-1 sm:gap-2 animate-nav-fade">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                        isActive
                          ? 'text-white'
                          : 'text-[#d6c3cf] hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {/* Active Indicator Underline */}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#f8e5c8] rounded-full shadow-[0_0_8px_rgba(248,229,200,0.8)]" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Mobile View - No blinking dot */}
          <div className="flex md:hidden items-center gap-3">
            <div
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-2 px-2 cursor-pointer"
            >
              <span className="text-sm font-semibold text-white">
                {currentItem.label}
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full bg-[#2a1329]/80 border border-white/10 text-white hover:bg-[#3d1a3b] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
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
