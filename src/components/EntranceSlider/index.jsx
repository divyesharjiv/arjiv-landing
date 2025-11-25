import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const DiamondCarousel = () => {
  const containerRef = useRef(null);
  const groupRef = useRef(null);
  const headingsRef = useRef(null);
  const cardRefs = useRef([]);

  const images = [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=600&fit=crop",
  ];

  useEffect(() => {
    const initAnimation = async () => {
      const breakPoint = "20em";
      const isDesktop = window.matchMedia(`(min-width: ${breakPoint})`).matches;

      const cardList = cardRefs.current.filter(Boolean);
      const heading = headingsRef.current;
      const count = cardList.length;

      const radius = isDesktop ? 350 : 175;
      const sliceAngle = (2 * Math.PI) / count;

      gsap.set(cardList, {
        x: (index) => {
          return Math.round(
            radius * Math.cos(sliceAngle * index - Math.PI / 4)
          );
        },
        y: (index) => {
          return Math.round(
            radius * Math.sin(sliceAngle * index - Math.PI / 4)
          );
        },
        rotation: (index) => {
          return (index + 1) * (360 / count);
        },
      });

      gsap.fromTo(
        heading,
        {
          opacity: 0,
          filter: "blur(60px)",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "power4.inOut",
          duration: 3.5,
        }
      );

      const timeline = gsap
        .timeline()
        .set(cardList, {
          opacity: 0,
          scale: 0,
          x: 0,
          y: 0,
          duration: 1,
          filter: "blur(2px)",
        })
        .to(cardList, {
          filter: "blur(0px)",
          stagger: 0.15,
          opacity: 1,
          scale: 1,
          duration: 3,
          x: (index) => {
            return Math.round(
              radius * Math.cos(sliceAngle * index - Math.PI / 4)
            );
          },
          y: (index) => {
            return Math.round(
              radius * Math.sin(sliceAngle * index - Math.PI / 4)
            );
          },
          rotation: (index) => {
            return (index + 1) * (360 / count);
          },
        })
        .to(
          groupRef.current,
          {
            rotation: -360 + -360,
            duration: 5,
            ease: "power4",
          },
          0
        )
        .to(
          containerRef.current,
          {
            rotation: "-=360",
            duration: 60,
            ease: "none",
            repeat: -1,
          },
          0
        );

      return () => {
        timeline.kill();
      };
    };

    initAnimation();
  }, []);

  return (
    <div className="m-0 p-0 overflow-hidden h-screen w-screen relative bg-gradient-radial from-[#ece6df] to-[#8b8078] font-sans antialiased">
      <div className="flex justify-center items-center h-screen w-full absolute left-0 top-0">
        <div className="overflow-hidden absolute flex justify-center items-center h-screen w-screen left-0 top-0">
          <div ref={containerRef}>
            <div ref={groupRef}>
              {images.map((src, index) => (
                <div
                  key={index}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  ref={(el) => (cardRefs.current[index] = el)}
                >
                  <div
                    className="w-20 md:w-26 aspect-[2/3] bg-cover shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                    style={{ backgroundImage: `url(${src})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="text-center relative z-50 text-[#191818] uppercase font-serif"
          ref={headingsRef}
        >
          <h1 className="text-[clamp(2.5rem,1.59rem+2vw,1rem)] font-normal my-2">
            Diamond
          </h1>
          <h1 className="text-[clamp(2.5rem,1.59rem+2vw,1rem)] font-normal my-2">
            Manufacturer
          </h1>
          <h5 className="text-[clamp(1rem,0.757rem+1.036vw,2rem)] font-normal m-0">
            Since 1985
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DiamondCarousel;
