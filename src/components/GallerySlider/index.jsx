import { useEffect, useRef } from "react";

import BDB from "@/assets/img/ALLIANCE/BDB.png";
import CANADAMARK from "@/assets/img/ALLIANCE/CANADAMARK.png";
import DUNS from "@/assets/img/ALLIANCE/DUNS.png";
import GIA from "@/assets/img/ALLIANCE/GIA.png";
import GJEPC from "@/assets/img/ALLIANCE/GJEPC.png";
import IGBC from "@/assets/img/ALLIANCE/IGBC.png";
import ITRACEIT from "@/assets/img/ALLIANCE/ITRACEIT.png";
import RJC from "@/assets/img/ALLIANCE/RJC.png";
import SDB from "@/assets/img/ALLIANCE/SDB.png";
import TRACR from "@/assets/img/ALLIANCE/TRACR.png";

const forwardImages = [CANADAMARK, GIA, RJC, TRACR, ITRACEIT];
const reverseImages = [DUNS, GJEPC, IGBC, SDB, BDB];

function MarqueeRow({ images, reverse = false }) {
  const trackRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const timeoutId = setTimeout(() => {
      const firstSet = track.querySelector(".image-set");
      if (!firstSet) return;

      const totalWidth = firstSet.scrollWidth;

      // Set initial position
      if (reverse) {
        track.style.transform = `translateX(-${totalWidth}px)`;
      } else {
        track.style.transform = "translateX(0px)";
      }

      // Create the animation
      animRef.current = track.animate(
        [
          {
            transform: reverse
              ? `translateX(-${totalWidth}px)`
              : "translateX(0px)",
          },
          {
            transform: reverse
              ? "translateX(0px)"
              : `translateX(-${totalWidth}px)`,
          },
        ],
        {
          duration: 40000,
          iterations: Infinity,
          easing: "linear",
        }
      );
    }, 100);

    // Scroll speed modification
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();

    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const timeDelta = currentTime - lastTime;

      if (timeDelta > 0) {
        const velocity = Math.abs(currentScrollY - lastScrollY) / timeDelta;
        const scale = Math.min(6, Math.max(1, 1 + velocity * 4));

        if (animRef.current) {
          animRef.current.playbackRate = scale;
        }

        // Gradually return to normal speed
        setTimeout(() => {
          if (animRef.current) {
            animRef.current.playbackRate = Math.max(
              1,
              animRef.current.playbackRate * 0.9
            );
          }
        }, 100);
      }

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      if (animRef.current) {
        animRef.current.cancel();
      }
    };
  }, [reverse]);

  return (
    <div className="overflow-hidden py-8 relative">
      <div ref={trackRef} className="flex whitespace-nowrap">
        <div className="flex image-set items-center">
          {images.map((src, i) => (
            <div key={i} className="w-60 mx-16 shrink-0">
              <img src={src} alt={src} className="w-full" />
            </div>
          ))}
        </div>
        <div className="flex image-set items-center">
          {images.map((src, i) => (
            <div key={`clone-${i}`} className="w-60 mx-16 shrink-0">
              <img src={src} alt={src} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GallerySlider() {
  return (
    <section className="bg-black/95 py-5 relative overflow-hidden">
      <MarqueeRow images={forwardImages} />
      <MarqueeRow images={reverseImages} reverse />

      <div className="pointer-events-none absolute inset-y-0 left-0 w-96 bg-gradient-to-r from-black/95 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-96 bg-gradient-to-l from-black/95 to-transparent"></div>
    </section>
  );
}
