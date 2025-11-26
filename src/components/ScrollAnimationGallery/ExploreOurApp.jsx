// ============================================
// FILE: components/galleries/ExploreOurApp.jsx
// ============================================

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { APP_STORE_APP_URL, PLAY_STORE_APP_URL } from "@/Common";
import { Link } from "react-router-dom";

import MOB1 from "/img/App/MOB1.png";
import MOB2 from "/img/App/MOB2.png";
import MOB3 from "/img/App/MOB3.png";
import MOB4 from "/img/App/MOB4.png";
import MOB5 from "/img/App/MOB5.png";
import MOB6 from "/img/App/MOB6.png";

gsap.registerPlugin(Flip, ScrollTrigger);

const ExploreOurApp = () => {
  const AppExoloreRef = useRef(null);

  useEffect(() => {
    const galleryEl = AppExoloreRef.current;
    if (!galleryEl) return;

    const timer = setTimeout(() => {
      const captionEl = galleryEl.querySelector(".explore-caption");
      const items = galleryEl.querySelectorAll(".explore-item");

      galleryEl.classList.add("explore-gallery--active");
      const flipstate = Flip.getState([items, captionEl], {
        props: "filter",
      });
      galleryEl.classList.remove("explore-gallery--active");

      Flip.to(flipstate, {
        ease: "power2",
        scale: true,
        simple: true,
        rotate: 10,
        stagger: 0.05,
        scrollTrigger: {
          trigger: galleryEl,
          start: "center center",
          end: "+=200%",
          pin: galleryEl.parentNode,
          scrub: 2,
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const APP_IMAGES = [MOB1, MOB2, MOB3, MOB4, MOB5, MOB6];

  return (
    <main className="explore-main">
      <div className="explore-wrap">
        <div className="explore-gallery" ref={AppExoloreRef}>
          {APP_IMAGES.map((img, i) => (
            <div
              key={i}
              className="explore-item"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="explore-caption">
            <h3 className="text-6xl mb-6">Explore our app</h3>
            <p className="text-3xl">Find your perfect diamond</p>
            <div className="flex lg:justify-start gap-2 items-center mt-6">
              <Link
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                to={APP_STORE_APP_URL}
                target="_blank"
              >
                <img
                  alt="Download from App Store"
                  className="w-38 h-auto shadow-md"
                  src="https://www.arjivexports.com/static/media/app-store-white.1afd2b718e38efd5968277d147cb032c.svg"
                />
              </Link>
              <Link
                rel="noopener noreferrer"
                aria-label="Download on Google Play Store"
                to={PLAY_STORE_APP_URL}
                target="_blank"
              >
                <img
                  alt="Download from Play Store"
                  className="w-38 h-auto shadow-md"
                  src="https://www.arjivexports.com/static/media/play-store-white.0efeed89c32a8f2418243971382c8a83.svg"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExploreOurApp;
