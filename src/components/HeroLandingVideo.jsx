"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import introVideo from "@/assets/videos/intro-video.mp4";

const HeroLandingVideo = () => {
  const containerRef = useRef(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth transforms
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const grayScale = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Initialize Lenis (smooth scroll)
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smooth: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div style={{ backgroundColor: "#000", color: "#fff" }}>
      {/* Hero / Intro Video Section */}
      <section
        ref={containerRef}
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Fullscreen Video */}
        <motion.video
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale,
            opacity,
            grayScale,
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={introVideo} type="video/mp4" />
        </motion.video>
      </section>
    </div>
  );
};

export default HeroLandingVideo;
