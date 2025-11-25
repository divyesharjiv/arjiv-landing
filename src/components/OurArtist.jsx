import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MAIN_IMG from "@/assets/img/bg.jpg";
// import OVERLAY from "@/assets/img/1.svg";
// import OVERLAY from "@/assets/img/2.svg";
import OVERLAY from "@/assets/img/3.svg";

// import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const OurArtist = () => {
  const containerRef = useRef(null);
  const dunesBlockRef = useRef(null);
  const overlayRef = useRef(null);
  const imageRef = useRef(null);

  //

  // const lenisRef = useRef(null);

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     easing: t => 1 - Math.pow(1 - t, 3),
  //     smooth: true,
  //     smoothTouch: false,
  //     touchMultiplier: 1.5,
  //   });

  //   lenisRef.current = lenis;

  //   function raf(time) {
  //     lenis.raf(time);
  //     ScrollTrigger.update();
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  //   return () => lenis.destroy();
  // }, []);

  //

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, {
        scale: 2,
        opacity: 0,
        transformOrigin: "center center",
      });

      gsap.set(imageRef.current, {
        opacity: 1,
        scale: 0.9,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: dunesBlockRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 2,
          pin: true,
        },
      });

      tl.to(
        imageRef.current,
        {
          scale: 2.2,
          duration: 1.2,
          ease: "sine.out",
        },
        0
      )
        .to(
          overlayRef.current,
          {
            scale: 0.8,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          imageRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: "sine.out",
          },
          0.5
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section
        ref={dunesBlockRef}
        className="relative w-full h-screen overflow-hidden bg-white"
      >
        <img
          ref={imageRef}
          src={MAIN_IMG}
          alt="Arjiv Brilliance"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 grayscale-100 opacity-80 rounded-xl"
        />

        <div
          ref={overlayRef}
          className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center"
        >
          <img
            src={OVERLAY}
            alt="Dunes Overlay"
            className="w-full h-full object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default OurArtist;
