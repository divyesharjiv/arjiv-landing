import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NinthGridAnimation = () => {
  const gridRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1682687220795-796d3f6f7000?w=600&h=900&fit=crop",
  ];

  useEffect(() => {
    let loadedCount = 0;
    images.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const timer = setTimeout(() => {
      const grid = gridRef.current;
      const gridImages = grid.querySelectorAll(".grid-image");

      if (!gridImages || gridImages.length === 0) return;

      const tl = gsap.timeline({
        defaults: { ease: "expo" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: 2.5,
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger;

      tl.from(gridImages, {
        transformOrigin: "100% -450%",
        stagger: 0.10,
        scaleX: 1.07,
        skewX: 15,
        xPercent: 50,
        rotation: -10,
        autoAlpha: 0,
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [imagesLoaded]);

  return (
    <div className="w-full">
      <section
        ref={sectionRef}
        className="relative flex items-center justify-center"
      >
        <div
          ref={gridRef}
          className="grid grid-cols-5 auto-rows-min content-center w-full h-full"
        >
          {images.map((src, index) => (
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
    </div>
  );
};

export default NinthGridAnimation;
