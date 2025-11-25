import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NinthGridAnimation = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const GRID_IMAGES = [
    "/src/assets/img/custom/10.jpg",
    "/src/assets/img/custom/29.jpg",
    "/src/assets/img/custom/27.jpg",
    "/src/assets/img/custom/2.jpg",
    "/src/assets/img/custom/6.jpg",
  ];

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    GRID_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === GRID_IMAGES.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const ctx = gsap.context(() => {
      // Grab elements explicitly
      const section = document.querySelector(".ninth-section");
      const gridImages = document.querySelectorAll(".ninth-grid .grid-image");

      if (!section || gridImages.length === 0) return;

      const tl = gsap.timeline({
        defaults: { ease: "expo" },
        scrollTrigger: {
          trigger: section, // use the actual element instead of string
          start: "top top",
          end: "+=120%",
          pin: section, // also element reference
          pinSpacing: true,
          scrub: 2.5,
        },
      });

      tl.from(gridImages, {
        transformOrigin: "100% -450%",
        stagger: 0.1,
        scaleX: 1.07,
        skewX: 15,
        xPercent: 50,
        rotation: -10,
        autoAlpha: 0,
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [imagesLoaded]);

  return (
    <section className="ninth-section relative flex items-center justify-center min-h-screen py-[10vh] overflow-hidden">
        <div className="ninth-grid grid grid-cols-5 auto-rows-min content-center w-full h-auto">
            {GRID_IMAGES.map((src, index) => (
            <div key={index} className="w-full h-full">
                <img
                src={src}
                alt={`Grid ${index + 1}`}
                className="grid-image w-full h-full aspect-[2/3] object-cover relative"
                />
            </div>
            ))}
        </div>
    </section>
  );
};

export default NinthGridAnimation;
