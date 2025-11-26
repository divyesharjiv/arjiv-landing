import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(MotionPathPlugin, Draggable, InertiaPlugin);

import IMG1 from "/img/shapeFrames/1.svg";
import IMG2 from "/img/shapeFrames/2.svg";
import IMG3 from "/img/shapeFrames/3.svg";
import IMG4 from "/img/shapeFrames/4.svg";
import IMG5 from "/img/shapeFrames/5.svg";
import IMG6 from "/img/shapeFrames/6.svg";
import IMG7 from "/img/shapeFrames/7.svg";
import IMG8 from "/img/shapeFrames/8.svg";
import IMG9 from "/img/shapeFrames/9.svg";
import IMG10 from "/img/shapeFrames/10.svg";
import IMG11 from "/img/shapeFrames/11.svg";
import IMG12 from "/img/shapeFrames/12.svg";

const images = [
  IMG1,
  IMG2,
  IMG3,
  IMG4,
  IMG5,
  IMG6,
  IMG7,
  IMG8,
  IMG9,
  IMG10,
  IMG11,
  IMG12,
];

export default function CircularCarousel() {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const draggableRef = useRef(null);
  const hasBeenDraggedRef = useRef(false);

  // Reset refs each render
  itemRefs.current = [];

  useEffect(() => {
    if (!images.length) return;

    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean);

      gsap.set(items, {
        motionPath: {
          path: "#myPath",
          align: "#myPath",
          alignOrigin: [0.5, 0.5],
          start: -0.25,
          autoRotate: true,
        },
        autoAlpha: 1,
      });

      gsap.to(items, {
        motionPath: {
          path: "#myPath",
          align: "#myPath",
          alignOrigin: [0.5, 0.5],
          start: -0.25,
          end: (i) => i / items.length - 0.25,
          autoRotate: true,
          stagger: 0.30,
        },
      });

      const draggables = Draggable.create(containerRef.current, {
        type: "rotation",
        inertia: true,
        snap: (endVal) => gsap.utils.snap(360 / items.length, endVal),
        onDrag: function() {
          hasBeenDraggedRef.current = true;
        },
        onPress: function() {
          hasBeenDraggedRef.current = true;
        }
      });

      draggableRef.current = draggables[0];
    }, containerRef);

    // Scroll event handler
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();

    const handleScroll = () => {
      if (hasBeenDraggedRef.current || !containerRef.current) return;

      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      
      const deltaY = currentScrollY - lastScrollY;
      const deltaTime = currentTime - lastScrollTime;
      
      // Calculate scroll velocity
      const velocity = Math.abs(deltaY / deltaTime);
      
      // Get current rotation
      const currentRotation = gsap.getProperty(containerRef.current, "rotation") || 0;
      
      // Add rotation based on scroll direction and velocity
      const rotationChange = (deltaY / 10) * (1 + velocity * 10);
      
      gsap.to(containerRef.current, {
        rotation: currentRotation + rotationChange,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
      
      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      draggableRef.current?.kill?.();
      ctx.revert();
    };
  }, [images]);

  const setItemRef = (el, i) => {
    itemRefs.current[i] = el;
  };

  return (
    <section className="w-full bg-amber-50 flex items-center justify-center overflow-hidden py-14">
      <div ref={containerRef} className="relative w-[400px] h-[400px]">
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
        >
          <path
            id="myPath"
            stroke="black"
            strokeWidth="2"
            fill="none"
            d="M396,200 C396,308.24781 308.24781,396 200,396 91.75219,396 4,308.24781 4,200 4,91.75219 91.75219,4 200,4 308.24781,4 396,91.75219 396,200 z"
          />
        </svg>

        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => setItemRef(el, i)}
            className="absolute opacity-0 invisible w-[60px] h-[60px] rounded-xl overflow-hidden"
          >
            <img
              src={img}
              alt={`item-${i}`}
              className="w-full h-full object-cover pointer-events-none select-none bg-amber-50"
              draggable="false"
            />
          </div>
        ))}
      </div>
    </section>
  );
}