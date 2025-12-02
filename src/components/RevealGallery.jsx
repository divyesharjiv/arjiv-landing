import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import IMG1 from "/img/3d/01.jpg";
import IMG2 from "/img/3d/02.jpg";
import IMG3 from "/img/3d/03.png";
import IMG4 from "/img/3d/Craftsmanship.jpg";
import IMG5 from "/img/3d/Delivery.jpg";
import IMG6 from "/img/3d/Modification.jpg";
import IMG7 from "/img/3d/Tailored.jpg";

gsap.registerPlugin(ScrollTrigger);

const RevealGallery = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const titleRef = useRef(null);

  const images = [IMG1, IMG2, IMG3, IMG4, IMG5, IMG6, IMG7, IMG1, IMG2, IMG3, IMG4];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const count = images.length;

      // Set initial states - closer together in grid pattern
      imagesRef.current.forEach((img, index) => {
        if (!img) return;

        const row = Math.floor(index / 2);
        const col = index % 2;

        // Calculate grid position
        const horizontalSpacing = 280;
        const verticalSpacing = 200;
        const xOffset = (col - 0.5) * horizontalSpacing;
        const yOffset = (row - 2) * verticalSpacing;

        gsap.set(img, {
          z: -2000,
          x: xOffset,
          y: yOffset,
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          scale: 0,
        });
      });

      // Create main scroll timeline with pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          smoothChildTiming: true,
        },
      });

      // Animate each image with stagger
      imagesRef.current.forEach((img, index) => {
        if (!img) return;

        const i = index + 1;
        const isOdd = i % 2 === 1;
        const delay = (i - 1) * 0.06;

        // Calculate final spread position
        const verticalSpread = (i - (count + 1) / 2) * 140;
        const horizontalSpread = isOdd ? -420 : 420;

        tl.to(
          img,
          {
            z: 3500,
            x: horizontalSpread,
            y: isOdd ? verticalSpread : -verticalSpread,
            opacity: 1,
            rotationY: isOdd ? -12 : 12,
            rotationX: 2,
            scale: 1.05,
            duration: 0.7,
            ease: "power1.inOut",
          },
          delay
        ).to(
          img,
          {
            opacity: 1,
            scale: 1.15,
            z: 4000,
            duration: 0.2,
            ease: "power1.inOut",
          },
          delay + 0.6
        );
      });

      // Title animation - fade in
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          scale: 0.7,
          y: -50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden"
      >
        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center"
          style={{
            perspective: "1400px",
            transformStyle: "preserve-3d",
          }}
        >
          <h1
            ref={titleRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center pointer-events-none tracking-[0.15em]"
            style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}
          >
            Everyday new innovation
          </h1>

          <div
            className="w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                ref={(el) => (imagesRef.current[index] = el)}
                src={src}
                alt={`Gallery ${index + 1}`}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  width: "26rem",
                  height: "32rem",
                  objectFit: "contain",
                  willChange: "transform",
                  transformStyle: "preserve-3d",
                  borderRadius: "0.75rem",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RevealGallery;
