import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollVideo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoaded = () => {
      const duration = video.duration;
      const fps = 60; // estimated fps
      const frameCount = Math.floor(duration * fps);

      // Create a smooth frame-by-frame scrub
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${frameCount * 16}`, // 8 pixels per frame for ultra smooth
        scrub: 1, // lower value for tighter coupling to scroll
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const frame = Math.floor(self.progress * frameCount);
          const time = frame / fps;
          video.currentTime = Math.min(time, duration - 0.01);
        },
      });
    };

    // Ensure video is ready
    video.preload = "auto";

    if (video.readyState >= 2) {
      // HAVE_CURRENT_DATA or greater
      handleLoaded();
    } else {
      video.addEventListener("loadeddata", handleLoaded);
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-screen overflow-hidden bg-black text-center"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full object-contain h-screen mx-auto"
          src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
          style={{ willChange: "transform" }}
        />
      </section>
    </>
  );
};

export default ScrollVideo;
