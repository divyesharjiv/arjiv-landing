

// ============================================
// FILE: components/galleries/PerfectionArt1.jsx
// ============================================

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(Flip, ScrollTrigger);

const PerfectionArt1 = ({ images = [] }) => {
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
      const caption = galleryEl.querySelector(".perfection-caption");
      const items = galleryEl.querySelectorAll(".perfection-item");

      galleryEl.classList.add("perfection-gallery--active");
      const flipstate = Flip.getState([items, caption], {
        props: "filter, opacity",
      });
      galleryEl.classList.remove("perfection-gallery--active");

      Flip.to(flipstate, {
        ease: "none",
        absolute: true,
        scale: false,
        scrollTrigger: {
          trigger: galleryEl,
          start: "center center",
          end: "+=900%",
          pin: galleryEl.parentNode,
          scrub: 1.8,
        },
        stagger: 0.07,
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const defaultImages = Array(15).fill(0).map((_, i) => 
    `/src/assets/img/custom/${i + 1}.jpg`
  );

  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <main className="perfection-main">
      <div className="perfection-wrap">
        <div className="perfection-gallery" ref={galleryRef}>
          {displayImages.map((img, i) => (
            <div
              key={i}
              className={`perfection-item perfection-pos-${i + 1}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <h2 className="perfection-caption">The Art of Perfection?</h2>
        </div>
      </div>
    </main>
  );
};

export default PerfectionArt1;