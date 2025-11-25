import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import IMG1 from '@/assets/img/custom/1.jpg'
import IMG2 from '@/assets/img/custom/2.jpg'
import IMG3 from '@/assets/img/custom/3.jpg'
import IMG4 from '@/assets/img/custom/4.jpg'
import IMG5 from '@/assets/img/custom/5.jpg'
import IMG6 from '@/assets/img/custom/6.jpg'
import IMG7 from '@/assets/img/custom/7.jpg'
import IMG8 from '@/assets/img/custom/8.jpg'
import IMG9 from '@/assets/img/custom/9.jpg'

gsap.registerPlugin(ScrollTrigger);

const TelescopeZoom = () => {
  const sectionRef = useRef(null);
  const frontImagesRef = useRef([]);
  const smallImagesRef = useRef([]);

  useEffect(() => {

    const section = sectionRef.current;
    const frontImages = frontImagesRef.current.filter(Boolean);
    const smallImages = smallImagesRef.current.filter(Boolean);

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(smallImages, {
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        force3D: true,
        willChange: 'transform, opacity, filter',
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=500%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          onUpdate: (self) => {
            const easedProgress = gsap.parseEase('power2.inOut')(self.progress);
            section.style.setProperty('--progress', easedProgress);
          },
        },
      });

      timeline.to(smallImages, {
        z: '120vh',
        scale: 2.5,
        filter: 'blur(3px)',
        opacity: 0,
        duration: 3,
        ease: 'power2',
        stagger: {
          amount: 1.2,
          from: 'center',
        },
      });

      timeline.to(
        frontImages,
        {
          scale: 1,
          duration: 0.7,
          ease: 'power4.inOut',
        },
        2
      );

      timeline.to(
        frontImages,
        {
          duration: 1.8,
          filter: 'blur(0px)',
          ease: 'power3.out',
          stagger: {
            amount: 0.3,
            from: 'center',
          },
        },
        0.3
      );
    }, section);

    return () => ctx.revert(); // Kills animations
  }, []);


  return (
    <div className="relative w-full bg-white">
      <style>{`
        .tz-section { --progress: 0; }
        .tz-media { transform: scale(var(--progress)); }
        @media (max-width: 768px) {
          .tz-left { transform: translate3d(calc(var(--progress) * (-100vw + 100%) - 0.5vw), 0, 0); }
          .tz-right { transform: translate3d(calc(var(--progress) * (100vw - 100%)), 0, 0); }
        }
      `}</style>


      <div className="tz-section relative h-screen flex items-center justify-center overflow-hidden" ref={sectionRef}>
        <h1 className="tz-title text-[3vw] md:text-[3vw] sm:text-[9vw] font-semibold -translate-y-[15%] flex gap-[1vw] m-0 -z-10">
            Diamond Customization
            {/* Pair &<br /> Layout  */}
        </h1>


        <div className="tz-media absolute inset-0 -z-10">
          <div className="absolute inset-0">
            <img 
              src={IMG9} 
              alt="Earth" 
              className="absolute w-full h-full object-cover"
            />
          </div>

          {[
            { scale: 'scale-100', blur: 'blur-[2px]' },
            { scale: 'scale-[0.85]', blur: 'blur-[2px]' },
            { scale: 'scale-[0.6]', blur: 'blur-[2px]' },
            { scale: 'scale-[0.45]', blur: 'blur-[2px]' },
            { scale: 'scale-[0.3]', blur: 'blur-[2px]' },
            { scale: 'scale-[0.15]', blur: 'blur-[2px]' },
          ].map((style, idx) => (
            <div
              key={idx}
              className={`tz-front absolute inset-0 ${style.scale} ${style.blur}`}
              ref={(el) => (frontImagesRef.current[idx] = el)}
            >
              <img 
                src={IMG9} 
                alt="Earth" 
                className="absolute w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{ perspective: '100vh' }}>
          {[
            { src: IMG1, pos: 'top-[15vw] left-[2vw]' },
            { src: IMG2, pos: 'top-[1vw] left-[20vw]' },
            { src: IMG5, pos: 'top-[70%] left-[20.5vw] md:bottom-[5vw] md:left-[25vw]' },
            { src: IMG4, pos: 'top-[18vw] right-[18vw] md:top-[30vw] md:right-[15vw]' },
            { src: IMG3, pos: 'top-[5vw] right-[10vw] md:top-[5vw] md:right-[7vw]' },
            { src: IMG6, pos: 'bottom-[6vw] left-[10vw] md:left-[7vw]' },
            { src: IMG7, pos: 'bottom-[8vw] left-[22.5vw] md:left-[50vw] md:top-[5vw]' },
            { src: IMG9, pos: 'bottom-[3vw] left-[45vw] md:botstom-[5vw] md:left-[45vw]' },
            { src: IMG8, pos: 'bottom-[9vw] right-[7vw] md:right-[3vw] md:bottom-[15vw]' },
          ].map((img, idx) => (
            <img
              key={idx}
              src={img.src}
              alt={`Nature ${idx + 1}`}
              className={`absolute w-[7vw] md:w-[12vw] ${img.pos}`}
              ref={(el) => (smallImagesRef.current[idx] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TelescopeZoom;