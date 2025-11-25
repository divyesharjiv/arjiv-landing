// ============================================
// FILE: components/galleries/ImperfectionsGridReveal.jsx
// ============================================

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(Flip, ScrollTrigger);

const ImperfectionsGridReveal = ({ images = [] }) => {
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
      const caption = galleryEl.querySelector(".imperfections-caption");
      const items = galleryEl.querySelectorAll(".imperfections-item");

      galleryEl.classList.add("imperfections-gallery--active");
      const flipstate = Flip.getState([items, caption], {
        props: "filter, opacity",
      });
      galleryEl.classList.remove("imperfections-gallery--active");

      Flip.to(flipstate, {
        ease: "none",
        scale: false,
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

  const defaultImages = [
    "https://www.arjivexports.com/static/media/mine-source.9b21a7dbfb73c4d75d9d.jpg",
    "https://www.arjivexports.com/static/media/Employee.65a4bbd9b511cc6247a8.jpg",
    "https://www.arjivexports.com/static/media/building.e1fd47024ce2842d6ab7.jpg",
    "https://www.arjivexports.com/static/media/Craftsmanship.1e062281399ef37d83ea.jpg",
    "https://www.arjivexports.com/static/media/Tailored.6c5fcc7fff7dd8b29c88.jpg",
    "https://www.arjivexports.com/static/media/Modification.0960eb215b57278e88b6.jpg",
    "https://www.arjivexports.com/static/media/grading.e5f8707fdcb7b791c97b.jpg",
    "https://www.arjivexports.com/static/media/Delivery.a7712148e2c055d9ddd1.jpg",
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <main className="imperfections-main">
      <div className="imperfections-wrap">
        <div className="imperfections-gallery" ref={galleryRef}>
          {displayImages.map((img, i) => (
            <div
              key={i}
              className="imperfections-item"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="imperfections-caption">Perfect Imperfections</div>
        </div>
      </div>
    </main>
  );
};

export default ImperfectionsGridReveal;
