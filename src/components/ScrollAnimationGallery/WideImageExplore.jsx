
// ============================================
// FILE: components/galleries/WideImageExplore.jsx
// ============================================

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(Flip, ScrollTrigger);

const WideImageExplore = ({ image, caption = "Excellence & Proficiency" }) => {
  const lenisRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const galleryEl = galleryRef.current;
    if (!galleryEl) return;

    const timer = setTimeout(() => {
      const captionEl = galleryEl.querySelector(".wideimage-caption");
      const item = galleryEl.querySelector(".wideimage-item");

      galleryEl.classList.add("wideimage-gallery--active");
      const flipstate = Flip.getState([item, captionEl], {
        props: "filter, opacity",
      });
      galleryEl.classList.remove("wideimage-gallery--active");

      Flip.to(flipstate, {
        ease: "none",
        scale: true,
        simple: true,
        scrollTrigger: {
          trigger: galleryEl,
          start: "center center",
          end: "+=300%",
          pin: galleryEl.parentNode,
          scrub: 1.8,
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const defaultImage = "https://images.unsplash.com/photo-1671363136910-a48eb544bfe4?q=80&w=2100&auto=format&fit=crop";

  return (
    <main className="wideimage-main">
      <div className="wideimage-wrap">
        <div className="wideimage-gallery" ref={galleryRef}>
          <div
            className="wideimage-item"
            style={{ backgroundImage: `url(${image || defaultImage})` }}
          />
          <div className="wideimage-caption">{caption}</div>
        </div>
      </div>
    </main>
  );
};

export default WideImageExplore;
