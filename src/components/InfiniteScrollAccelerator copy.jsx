import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

export default function StoriesShowcase() {
  const scrollerRef = useRef(null);
  const speedRef = useRef(0.52);
  const posRef = useRef(0);

  // Product photography images - more variety
  const column1 = [
    "https://www.arjivexports.com/static/media/arjiv-exports-diamond-trade-show.c1c004a8fdc3b20022b0.jpg",
    "https://www.arjivexports.com/static/media/gem-geneva-international-expo-2025-arjiv-exports.f89a9e4f3289295db651.jpeg",
    "https://www.arjivexports.com/static/media/gem-geneva-international-expo-arjiv-exports.192aa38a7bd001489a51.jpg",
    "https://www.arjivexports.com/static/media/hong-kong-jewelry-manufacturers-association-arjiv-exports.0ff199027bfed53c2bb2.jpg",
    "https://www.arjivexports.com/static/media/hong-kong-trade-development-council-arjiv-exports.7672783b2376894167af.jpg",
  ];

  const column2 = [
    "https://www.arjivexports.com/static/media/hong-kong-jewelry-manufacturers-association-arjiv-exports.0ff199027bfed53c2bb2.jpg",
    "https://www.arjivexports.com/static/media/gem-geneva-international-expo-2025-arjiv-exports.f89a9e4f3289295db651.jpeg",
    "https://www.arjivexports.com/static/media/hong-kong-trade-development-council-expo-arjiv-exports-2024.7fc6b8b0f315b51576fe.jpg",
    "https://www.arjivexports.com/static/media/jewelry-circular-keystone-arjiv-exports.d00ce15ee150ba793a45.jpg",
    "https://www.arjivexports.com/static/media/hong-kong-trade-development-council-arjiv-exports.7672783b2376894167af.jpg",
    "https://www.arjivexports.com/static/media/gem-geneva-international-expo-arjiv-exports.192aa38a7bd001489a51.jpg",
  ];

  // Triple the images for seamless loop
  const col1Images = [...column1, ...column1, ...column1];
  const col2Images = [...column2, ...column2, ...column2];

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
      duration: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ({ scroll }) => {
      // Increase speed dramatically on scroll
      //   speedRef.current = 0.5 + scroll * 0.015;
      //   speedRef.current = Math.min(speedRef.current, 20);
    });

    return () => lenis.destroy();
  }, []);

  // Vertical auto-scroll animation
  useEffect(() => {
    let frame;

    const animate = () => {
      const wrap = scrollerRef.current;
      if (!wrap) return;

      posRef.current -= speedRef.current;

      const total = wrap.scrollHeight / 2;
      if (Math.abs(posRef.current) >= total) {
        posRef.current = 0;
      }

      gsap.set(wrap, { y: posRef.current });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      {/* BEFORE SECTION - to test scroll */}
      <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-4">Scroll Down</h2>
          <p className="text-xl opacity-70">See the Stories Showcase Below</p>
          <div className="mt-8 text-4xl animate-bounce">↓</div>
        </div>
      </div>

      {/* MAIN STORIES SHOWCASE */}
      <div className="flex w-full h-screen overflow-hidden font-sans">
        {/* LEFT STATIC SECTION */}
        <div className="w-[42%] bg-[#777978] text-white px-20 py-32 flex flex-col justify-center">
          <div className="opacity-80 text-[15px] tracking-[0.1em] font-light">
            STORIES<sup className="text-[10px]">45</sup>
          </div>
          <h1 className="text-[54px] font-medium leading-[1.1] mt-8">
            Know our
            <br />
            Stories
          </h1>
          <div className="mt-12 opacity-90 flex items-center gap-3 cursor-pointer group">
            <span className="group-hover:translate-x-1 transition-transform">
              VIEW ALL
            </span>
            <span className="group-hover:translate-x-2 transition-transform">
              →
            </span>
          </div>
        </div>

        {/* RIGHT SCROLLER */}
        <div className="w-[58%] overflow-hidden relative bg-[#777978]">
          <div ref={scrollerRef} className="grid grid-cols-2 gap-8">
            {/* COLUMN 1 */}
            <div className="flex flex-col gap-7 w-full">
              {col1Images.map((src, i) => (
                <div
                  key={`col1-${i}`}
                  className="w-full overflow-hidden shadow-lg"
                >
                  <img
                    src={src}
                    alt={`Product ${i + 1}`}
                    className="w-full h-auto block object-contain"
                  />
                </div>
              ))}
            </div>

            {/* COLUMN 2 */}
            <div className="flex flex-col gap-7 w-full">
              {col2Images.map((src, i) => (
                <div
                  key={`col2-${i}`}
                  className="w-full overflow-hidden shadow-lg"
                >
                  <img
                    src={src}
                    alt={`Product ${i + 1}`}
                    className="w-full h-auto block object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AFTER SECTION - to test scroll */}
      <div className="h-screen bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-4">End of Stories</h2>
          <p className="text-xl opacity-70">
            Scroll back up to see the animation speed up
          </p>
          <div className="mt-8 text-4xl animate-bounce rotate-180">↓</div>
        </div>
      </div>
    </>
  );
}
