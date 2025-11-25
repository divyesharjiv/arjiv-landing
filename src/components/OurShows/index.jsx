import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import "./style.css";

gsap.registerPlugin(ScrollTrigger);

export default function OurShows() {
  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis({
      lerp: 0.06, // super smooth (lower = smoother)
      smooth: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

  }, []);

  const icons = [
    [
      "https://gjepc.org/assets/images/logo.svg",
      "Pearl",
      "A shimmering pearl.",
    ],
    [
      "https://s39824.pcdn.co/wp-content/uploads/2021/07/JGA_logo_RGB.png",
      "Diamond",
      "A bright diamond.",
    ],
    [
      "https://www.pngfind.com/pngs/m/1-13458_png-logo-jck-las-vegas-transparent-png.png",
      "Star",
      "A shiny cartoon star.",
    ],
    [
      "https://schofer.com/wp-content/uploads/2022/08/Logo-Vicenzaoro.png",
      "Gemstone",
      "A glowing gem.",
    ],
    [
      "https://d2bll6dmdxhsio.cloudfront.net/media-uat/ymtbscxa/4-color-hktdc-logo-centred-copy.png",
      "Heart",
      "A cute cartoon heart.",
    ],
    [
      "https://www.jewelryshows.org/images/landing/logo-jma.png",
      "Jewel",
      "A royal jewel.",
    ],
  ];

  return (
    <section className="we-shows">
      <div>
        {icons.map(([img, title, text], i) => (
          <div
            key={i}
            className={`sticky h-dvh top-0 content-main content--sticky justify-center items-center content--half flex flex-col text-center bg-[] odd:ml-auto w-1/2 bg-white`}
          >
            <img src={img} alt={title} className="w-[600px] h-[450px] object-contain mb-4 bg-white" />
            {/* <h2 className="content__title tracking-tight !font-[Lexend] uppercase text-[clamp(2rem,6vw,5rem)] md:text-[clamp(3rem,5vw,4rem)]">
              The {title}
            </h2>
            <p className="content__text content__text--narrow text-meta">
              {text}
            </p> */}
          </div>
        ))}
      </div>
    </section>
  );
}
