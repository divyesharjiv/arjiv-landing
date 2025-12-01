import React from "react";
import { motion as Motion } from "framer-motion";

// import MOONVIDEO from "/videos/MOONVIDEO.mp4";
import BG_VIDEO from "/videos/hero-video-website.mp4";
// import spiral from "/svg/spiral.svg";
// import spiral from "/svg/inkpx-curved-text.png";
import spiral from "/svg/SPIRAL1.svg";

const TITLE_CHAR = [
  "A",
  "R",
  "J",
  "I",
  "V",
  " ",
  "E",
  "X",
  "P",
  "O",
  "R",
  "T",
  "S",
];

const HeroLanding = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="object-cover w-full h-full absolute inset-0 brightness-75"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={BG_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10" />

      <Motion.div
        className="absolute inset-0 flex items-center justify-center z-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.5 },
          },
        }}
      >
        {TITLE_CHAR.map((char, i) => (
          <Motion.h1
            key={i + 1}
            className="text-white zen-dots-regular text-[8.5vw]"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            {char === " " ? "\u00A0" : char}
          </Motion.h1>
        ))}
      </Motion.div>

      <img
        className="absolute bottom-5 right-5 z-10 round transition"
        style={{ animation: "spin 20s linear infinite" }}
        width={150}
        src={spiral}
        alt=""
      />
    </section>
  );
};

export default HeroLanding;
