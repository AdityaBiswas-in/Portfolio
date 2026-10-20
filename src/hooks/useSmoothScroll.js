import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

    // Synchronize Lenis with GSAP's internal ticker for buttery 60/120fps motion
    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = (target, offset = -60) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.4 })
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return { scrollTo, lenisRef }
}
