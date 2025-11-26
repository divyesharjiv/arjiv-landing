import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import special from "/img/special.png";

gsap.registerPlugin(ScrollTrigger);

const Special = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.set(imageRef.current, {
      filter: "grayscale(0%)",
      scale: 1,
      opacity: 1,
    });

    gsap.to(imageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.to(imageRef.current, {
      filter: "grayscale(50%)",
      scale: 1.5,
      opacity: 0.5,
      ease: "circ.in",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => lenis.destroy();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-neutral-100 overflow-hidden"
    >
      <img
        ref={imageRef}
        src={special}
        alt="Special"
        className="absolute top-0 left-0 w-full h-full object-cover will-change-transform"
      />
    </section>
  );
};

export default Special;
