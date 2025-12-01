/*
HorizontalScrollShowcase.jsx
Award‑winning smooth horizontal scroll (React + GSAP + ScrollTrigger + Lenis)
Drop‑in component for Vite + Tailwind
*/

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScrollShowcase() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const sections = track.querySelectorAll('.panel')
    const totalWidth = track.scrollWidth

    gsap.to(track, {
      x: () => -(totalWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    })

    sections.forEach((panel, i) => {
      gsap.fromTo(
        panel.querySelector('.inner'),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: ScrollTrigger.getById('horizontal'),
            start: 'left center',
          }
        }
      )
    })
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex gap-10 px-20 items-center"
      >
        {/* PANEL 1 */}
        <div className="panel min-w-[90vw] h-[80vh] bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl flex items-center justify-center shadow-2xl">
          <div className="inner text-center opacity-0">
            <h1 className="text-6xl font-serif mb-4">Immersive Motion</h1>
            <p className="text-lg max-w-sm mx-auto opacity-80">Award‑winning parallax motion crafted with GSAP + ScrollTrigger.</p>
          </div>
        </div>

        {/* PANEL 2 */}
        <div className="panel min-w-[90vw] h-[80vh] bg-gradient-to-br from-fuchsia-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl">
          <div className="inner text-center opacity-0">
            <h1 className="text-6xl font-serif mb-4">Ultra Smooth Lenis</h1>
            <p className="text-lg max-w-sm mx-auto opacity-80">Natural, friction‑based momentum for premium navigation feel.</p>
          </div>
        </div>

        {/* PANEL 3 */}
        <div className="panel min-w-[90vw] h-[80vh] bg-gradient-to-br from-cyan-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl">
          <div className="inner text-center opacity-0">
            <h1 className="text-6xl font-serif mb-4">Cinematic UI</h1>
            <p className="text-lg max-w-sm mx-auto opacity-80">Combine light, depth, and motion for world‑class experience.</p>
          </div>
        </div>

        {/* PANEL 4 */}
        <div className="panel min-w-[90vw] h-[80vh] bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl flex items-center justify-center shadow-2xl">
          <div className="inner text-center opacity-0">
            <h1 className="text-6xl font-serif mb-4">Next‑Level Branding</h1>
            <p className="text-lg max-w-sm mx-auto opacity-80">Designed for premium studios, luxury brands, and award sites.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
