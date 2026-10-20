import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Education from './components/Education'
import Skills from './components/Skills'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import IndexModal from './components/IndexModal'
import ProjectModal from './components/ProjectModal'
import CertificateModal from './components/CertificateModal'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  const { scrollTo } = useSmoothScroll()
  const [activeSection, setActiveSection] = useState('home')
  const [isIndexOpen, setIsIndexOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  // ScrollSpy to determine active section for Navbar underline indicator (Image 1)
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'education', 'skills', 'certificates', 'contact']

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i]
        const element = document.getElementById(sectionId)
        if (element) {
          const top = element.offsetTop
          if (scrollPos >= top) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId)
    scrollTo(`#${sectionId}`)
  }

  return (
    <div className="relative min-h-screen bg-[#150a17] text-[#fbeee0] selection:bg-[#e6613b] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Top Floating Glass Navigation Bar (Matching Image 1) */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenIndex={() => setIsIndexOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section 01: Hero (Matching Image 3) */}
        <Hero
          onExploreWork={() => handleNavigate('projects')}
          onGetInTouch={() => handleNavigate('contact')}
          onOpenIndex={() => setIsIndexOpen(true)}
        />

        {/* Section 02: About Me (Matching Image 2) */}
        <About onViewToolbox={() => handleNavigate('skills')} />

        {/* Section 03: Projects */}
        <Projects onSelectProject={(p) => setSelectedProject(p)} />

        {/* Section 04: Education */}
        <Education />

        {/* Section 05: Skills */}
        <Skills />

        {/* Section 06: Certificates */}
        <Certificates onSelectCertificate={(c) => setSelectedCertificate(c)} />

        {/* Section 07: Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onScrollTop={() => scrollTo('#home')} />

      {/* Interactive Modals */}
      <IndexModal
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        onNavigate={handleNavigate}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  )
}
