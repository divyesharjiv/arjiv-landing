// ============================================
// FILE: components/galleries/GalleryRow.jsx
// ============================================

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(Flip, ScrollTrigger);

const GalleryRow = ({ images = [], caption }) => {
  const lenisRef = useRef(null);
  const containerRef = useRef(null);
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
    const containerEl = containerRef.current;
    if (!galleryEl || !containerEl) return;

    const timer = setTimeout(() => {
      const captionEl = galleryEl.querySelector(".galleryrow-caption");
      const items = galleryEl.querySelectorAll(".galleryrow-item");

      galleryEl.classList.add("galleryrow-gallery--active");
      const flipstate = Flip.getState([items, captionEl], {
        props: "filter, opacity",
      });
      galleryEl.classList.remove("galleryrow-gallery--active");

      Flip.to(flipstate, {
        ease: "none",
        absoluteOnLeave: true,
        scale: false,
        scrollTrigger: {
          trigger: containerEl,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 1.8,
          anticipatePin: 1,
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const defaultImages = [
    "/img/custom/10.jpg",
    "/img/custom/3.jpg",
    "/img/custom/29.jpg",
    "/img/custom/27.jpg",
    "/img/custom/2.jpg",
    "/img/custom/31.jpg",
    "/img/custom/6.jpg",
  ];

  const displayImages = images.length > 0 ? images : defaultImages;
  const sizes = ["s", "m", "l", "xl", "l", "m", "s"];

  const defaultCaption =
    "Within this meticulously arranged AI-generated ensemble lies a tantalizing facade, captivating our gaze.";

  return (
    <section className="galleryrow-section">
      <div className="galleryrow-container" ref={containerRef}>
        <main className="galleryrow-main">
          <div className="galleryrow-wrap">
            <div className="galleryrow-gallery" ref={galleryRef}>
              {displayImages.map((img, i) => (
                <div
                  key={i}
                  className={`galleryrow-item galleryrow-item--${sizes[i]} ${
                    i === 3 ? "galleryrow-item--center" : ""
                  }`}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
              <h2 className="galleryrow-caption">{caption || defaultCaption}</h2>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default GalleryRow;