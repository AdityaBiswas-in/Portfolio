import React, { useEffect } from 'react'
import { X, ShieldCheck, CheckCircle2, Award, Calendar, ExternalLink } from 'lucide-react'

export default function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (certificate) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [certificate, onClose])

  if (!certificate) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#1d0c1f] border border-[#e6613b]/40 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6613b]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Certificate Card Header */}
        <div className="flex items-start justify-between pb-6 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#341235] border border-[#e6613b]/40 flex items-center justify-center text-[#ffae8f]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Credential
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                {certificate.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#2a1128] hover:bg-[#e6613b] border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
            aria-label="Close Certificate Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Preview Frame */}
        <div className="p-6 rounded-2xl bg-[#160618] border-2 border-[#e6613b]/30 space-y-4 mb-6 relative">
          <div className="flex justify-between items-start border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#d6b7c2]">
                Issued To:
              </span>
              <h4 className="text-lg font-bold text-white mt-0.5">
                Aditya Biswas
              </h4>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono uppercase tracking-wider text-[#d6b7c2]">
                Issuing Authority:
              </span>
              <h4 className="text-sm font-semibold text-[#f38a58] mt-0.5">
                {certificate.issuer}
              </h4>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#d6b7c2]">
              Curriculum &amp; Examination Scope:
            </span>
            <p className="text-xs sm:text-sm text-[#fbeee0] mt-1 leading-relaxed">
              {certificate.description}
            </p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#d6b7c2] block mb-2">
              Demonstrated Competencies:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {certificate.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#2a1128] border border-white/10 text-[11px] font-mono text-[#ffdfbe]"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#d6b7c2]">
            <span>Record ID: {certificate.credentialId}</span>
            <span className="text-emerald-400 font-semibold">Status: Active &amp; Verified</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#e6613b] hover:bg-[#f3724a] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
          >
            Close Verification
          </button>
        </div>
      </div>
    </div>
  )
}
