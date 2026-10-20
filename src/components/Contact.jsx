import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Copy,
  Check,
  Sparkles
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from './SocialIcons'
import { portfolioData } from '../data/portfolioData'


gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-fade',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 6000)
    }, 1200)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-transparent text-[#fbeee0] py-28 px-4 sm:px-8 lg:px-16 overflow-hidden flex items-center z-10"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#e6613b]/30 to-transparent" />
      <div className="absolute left-10 bottom-10 w-96 h-96 rounded-full bg-[#e6613b]/8 blur-[160px] pointer-events-none" />

      {/* Cinematic Glass Capsule */}
      <div className="max-w-7xl mx-auto w-full p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#140616]/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Section Header */}
        <div className="contact-fade mb-14 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-[#f38a58]" />
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#f38a58] uppercase">
              07 / GET IN TOUCH
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4 font-display">
            CONTACT
          </h2>
          <p className="text-base sm:text-lg text-[#dec6d4] leading-relaxed">
            Have an ambitious project in mind, an opportunity, or just want to discuss modern web architecture? Let&apos;s build something extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct info & social connections */}
          <div className="contact-fade lg:col-span-5 space-y-6">
            {/* Quick Status Pill */}
            <div className="p-6 rounded-3xl bg-[#220c24]/85 backdrop-blur-md border border-[#e6613b]/30 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                Available for Opportunities
              </div>
              <p className="text-sm text-[#fbeee0] leading-relaxed">
                Currently open for full-stack engineering internships, junior software roles, and creative web development collaborations.
              </p>
            </div>

            {/* Email Card with Copy button */}
            <div className="p-6 rounded-3xl bg-[#220c24]/85 backdrop-blur-md border border-[#e6613b]/30 shadow-xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ffae8f]">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-3 pt-1">
                <span className="text-sm sm:text-base font-mono text-white font-semibold truncate">
                  {portfolioData.personal.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="shrink-0 p-2.5 rounded-full bg-[#341235] hover:bg-[#e6613b] border border-[#e6613b]/40 text-white transition-all cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <p className="text-xs font-mono text-emerald-400 animate-fadeIn">
                  ✓ Email copied to clipboard!
                </p>
              )}
            </div>

            {/* Location & Timezone Card */}
            <div className="p-6 rounded-3xl bg-[#220c24]/85 backdrop-blur-md border border-[#e6613b]/30 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#341235] border border-[#e6613b]/30 text-[#f38a58]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Kolkata, India</h4>
                  <p className="text-xs font-mono text-[#d6b7c2]">IST (UTC +5:30)</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#ffae8f] px-3 py-1 rounded-full bg-[#170619] border border-white/10">
                EST. 2004
              </span>
            </div>

            {/* Social Network Circles */}
            <div className="pt-2">
              <p className="text-xs font-mono uppercase tracking-widest text-[#d6b7c2] mb-3">
                Digital Presence
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#220c24] hover:bg-[#e6613b] border border-[#e6613b]/30 hover:border-[#e6613b] flex items-center justify-center text-white transition-all hover:scale-110 shadow-md"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#220c24] hover:bg-[#0077b5] border border-[#e6613b]/30 hover:border-[#0077b5] flex items-center justify-center text-white transition-all hover:scale-110 shadow-md"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href={portfolioData.personal.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#220c24] hover:bg-[#1da1f2] border border-[#e6613b]/30 hover:border-[#1da1f2] flex items-center justify-center text-white transition-all hover:scale-110 shadow-md"
                  aria-label="Twitter / X"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
                <a
                  href={portfolioData.personal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#220c24] hover:bg-[#e1306c] border border-[#e6613b]/30 hover:border-[#e1306c] flex items-center justify-center text-white transition-all hover:scale-110 shadow-md"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Message Form */}
          <div className="contact-fade lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#230d25]/90 backdrop-blur-xl border border-[#e6613b]/35 shadow-2xl relative overflow-hidden">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-2">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-[#dec6d4] max-w-sm">
                    Thank you for reaching out, Aditya will review your note and respond promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#e6613b] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#f3724a] transition-all"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#ffae8f]">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-2xl bg-[#170619] border border-white/10 focus:border-[#e6613b] focus:outline-none text-white text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#ffae8f]">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-2xl bg-[#170619] border border-white/10 focus:border-[#e6613b] focus:outline-none text-white text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#ffae8f]">
                      Subject / Project Scope
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Full-Stack Role / Project Inquiry"
                      className="w-full px-4 py-3 rounded-2xl bg-[#170619] border border-white/10 focus:border-[#e6613b] focus:outline-none text-white text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#ffae8f]">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your vision, timeline, or thoughts..."
                      className="w-full px-4 py-3 rounded-2xl bg-[#170619] border border-white/10 focus:border-[#e6613b] focus:outline-none text-white text-sm transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-linear-to-r from-[#ea653e] to-[#d64e29] hover:from-[#f3724a] hover:to-[#e25832] text-white font-bold text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(234,101,62,0.4)] hover:shadow-[0_15px_30px_rgba(234,101,62,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {submitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
