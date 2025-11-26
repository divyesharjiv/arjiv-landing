import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import brilliantcut from "/img/Diamondcuts/brilliant-cut.jpg";
import stepcut from "/img/Diamondcuts/step-cut.jpg";
import oldcut from "/img/Diamondcuts/old-cut.jpg";
import rosepotraitcut from "/img/Diamondcuts/rose-potrait-cut.jpg";
import exquiste from "/img/Diamondcuts/exquiste.jpg";
import fancycolor from "/img/Diamondcuts/fancy-color.jpg";
import brioletteCut from "/img/Diamondcuts/briolette-cut.jpg";

gsap.registerPlugin(ScrollTrigger);

const DIAMOND_DETAILS = [
  {
    cutName: "Brilliant cut",
    detail:
      "A brilliant cut is simply a diamond or any other gemstone cut in a particular form with numerous facets so to ensure exceptional brilliance.",
    image: brilliantcut,
    position: "center",
  },
  {
    cutName: "Step cut",
    detail:
      "Stones whose outlines are either square or rectangular and whose facets are rectilinear and arranged parallel to the girdle are known as step-cut stones.",
    image: stepcut,
    position: "center",
  },
  {
    cutName: "Old Cut / Antique & Vintage",
    detail:
      "These are one of the oldest cutting styles for diamonds with old-world charmand modern precision. Modern jewellery designers are creating contemporary jewellery with an interesting old-world vibe by adding old cuts.",
    image: oldcut,
    position: "center",
  },
  {
    cutName: "Rose Cut / Portrait Cut",
    detail:
      "The Rose Cut showcases a domed shape with triangular facets, creating a gentle, glowing brilliance. The Portrait Cut, with its flat surface and minimal facets, highlights clarity and a classic, elegant look. Both cuts offer timeless, vintage appeal.",
    image: rosepotraitcut,
    position: "center",
  },
  {
    cutName: "Exquisite",
    detail:
      "Arjiv Exports is the home to the world's most exquisite diamonds designed to your exact shape and size needs that continue to underline the legacy.",
    image: exquiste,
    position: "center",
  },
  {
    cutName: "Fancy Color",
    detail:
      "Natural fancy colored diamonds are as rare as they are exquisite. Arjiv Exports carries a variety of fancy colors including ovals, pears, marquise, cushions, and more in a range of shapes, sizes, and clarity with certified loose diamonds that are lab-tested with guaranteed quality and rare natural diamonds sourced ethically.",
    image: fancycolor,
    position: "center",
  },
  {
    cutName: "Briolette Cut",
    detail:
      "A briolette cut is an elegant teardrop-shaped gemstone cut with triangular facets covering the entire surface, creating exceptional brilliance from all angles.",
    image: brioletteCut,
    position: "center",
  },
];

export default function OurDiamondCuts() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const scrollContainer = scrollRef.current;

      const scrollWidth =
        scrollContainer.scrollWidth -
        window.innerWidth +
        window.innerHeight * 0.5;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top end",
          end: () => `+=${scrollWidth}`,
          scrub: 1.4,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(scrollContainer, {
        x: () => -scrollWidth,
        ease: "none",
      });

      gsap.utils.toArray(".fade-card").forEach((card) => {
        const title = card.querySelector(".box-title");
        const image = card.querySelector(".parallax-img");
        const description = card.querySelector(".description");

        if (title) {
          gsap.from(title, {
            opacity: 0,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 40%",
              end: "left 10%",
              scrub: true,
            },
          });
          gsap.to(title, {
            x: -400,
            y: -80,
            ease: "none",
            scale: 1.5,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 100%",
              end: "right 40%",
              scrub: true,
            },
          });
        }

        if (image) {
          gsap.to(image, {
            x: -150,
            ease: "back.in",
            scale: 1.5,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 100%",
              end: "right 40%",
              scrub: true,
            },
          });
        }

        if (description) {
          gsap.from(description, {
            opacity: 0,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 40%",
              end: "left 10%",
              scrub: true,
            },
          });
          gsap.to(description, {
            y: 70,
            x: 200,
            ease: "back.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 100%",
              end: "right 40%",
              scrub: true,
            },
          });
        }

        gsap.from(card, {
          opacity: 1,
          y: 500,
          x: -100,
          scale: 0.6,
          ease: "sine.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left 100%",
            end: "right 40%",
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const svg = container.querySelector(".vectorize_svg");
      if (!svg) return;

      const paths = svg.querySelectorAll("path");
      if (!paths.length) return;

      // Get the existing horizontal scroll timeline
      const scrollTriggers = ScrollTrigger.getAll();
      const scrollTimeline = scrollTriggers.find(
        (t) => t.animation && t.animation.vars && t.animation.vars.scrollTrigger?.trigger === container
      )?.animation;

      if (!scrollTimeline) return;

      paths.forEach((path) => {
        if (!path || typeof path.getTotalLength !== "function") return;

        const length = path.getTotalLength();

        // Initial setup
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,

        });

        scrollTimeline.to(
          path,
          {
            strokeDashoffset: 1,
            ease: "power2.out",
          },
          0
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);


  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden text-black bg-white"
    >

        <svg className="vectorize_svg absolute top-0 left-0 w-full h-full pointer-events-none -z-10" width="1459" height="1004" viewBox="0 0 1459 1004" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M558.213 250.097C712.24 197.634 866.481 178.191 991.327 189.147C1116.22 200.107 1211.5 241.461 1247.93 310.408C1284.36 379.355 1255.19 463.1 1178.21 542.817C1101.26 622.507 976.661 698.04 822.635 750.503C668.608 802.966 514.367 822.41 389.52 811.453C264.631 800.493 169.35 759.139 132.918 690.192C96.4851 621.245 125.662 537.5 202.636 457.783C279.584 378.094 404.187 302.56 558.213 250.097Z" stroke="url(#paint0_linear_38_35)"/>
          <path d="M871.547 597.758C865.454 709.6 835.275 806.379 791.432 872.437C747.579 938.512 690.13 973.759 629.507 962.818C568.885 951.877 516.357 896.78 480.487 816.318C444.626 735.874 425.477 630.193 431.57 518.351C437.663 406.509 467.842 309.73 511.684 243.672C555.537 177.597 612.987 142.35 673.609 153.291C734.232 164.232 786.759 219.329 822.629 299.791C858.49 380.235 877.64 485.916 871.547 597.758Z" stroke="url(#paint1_linear_38_35)"/>
          <path d="M1226.24 403.993C1162.3 455.383 1089.23 489.699 1022.81 503.654C956.367 517.612 896.68 511.184 859.335 481.235C821.99 451.286 813.915 403.373 831.224 350.014C848.53 296.667 891.19 237.966 955.124 186.576C1019.06 135.187 1092.12 100.87 1158.55 86.9153C1224.99 72.9573 1284.68 79.3859 1322.02 109.335C1359.37 139.283 1367.44 187.196 1350.13 240.555C1332.83 293.903 1290.17 352.604 1226.24 403.993Z" stroke="url(#paint2_linear_38_35)"/>
          <path d="M904.187 324.982C1017.48 392.498 1112.86 465.64 1175.49 529.304C1206.81 561.139 1229.92 590.583 1242.99 615.752C1256.08 640.949 1259.03 661.713 1250.32 676.314C1241.62 690.916 1221.96 698.201 1193.57 698.682C1165.21 699.162 1128.32 692.848 1085.42 680.451C999.619 655.657 889.902 606.568 776.611 539.052C663.321 471.536 567.937 398.394 505.305 334.73C473.986 302.896 450.877 273.451 437.807 248.282C424.722 223.085 421.772 202.322 430.473 187.72C439.175 173.118 458.841 165.833 487.23 165.352C515.586 164.872 552.479 171.186 595.382 183.583C681.179 208.377 790.897 257.466 904.187 324.982Z" stroke="url(#paint3_linear_38_35)"/>
          <defs>
          <linearGradient id="paint0_linear_38_35" x1="557.98" y1="249.655" x2="738.511" y2="779.678" gradientUnits="userSpaceOnUse">
          <stop stop-color="#B9C78D"/>
          <stop offset="0.927885" stop-color="#A2A2C3"/>
          </linearGradient>
          <linearGradient id="paint1_linear_38_35" x1="872.039" y1="597.847" x2="428.06" y2="573.66" gradientUnits="userSpaceOnUse">
          <stop stop-color="#A76D84"/>
          <stop offset="1" stop-color="#C9C9E0"/>
          </linearGradient>
          <linearGradient id="paint2_linear_38_35" x1="954.734" y1="186.263" x2="1167.92" y2="451.492" gradientUnits="userSpaceOnUse">
          <stop stop-color="#91D9DE"/>
          <stop offset="1" stop-color="#AAAAB4"/>
          </linearGradient>
          <linearGradient id="paint3_linear_38_35" x1="430.044" y1="187.464" x2="1250.75" y2="676.57" gradientUnits="userSpaceOnUse">
          <stop stop-color="#A7D485"/>
          <stop offset="1" stop-color="#625B5B"/>
          </linearGradient>
          </defs>
        </svg>
      {/* className="vectorize_svg absolute top-0 left-0 w-full h-full pointer-events-none -z-10"    */}

        <div
          ref={scrollRef}
          className="flex h-full items-stretch"
          style={{ width: "fit-content" }}
        >
        {DIAMOND_DETAILS.map((diamond, index) => (
          <div
            key={index}
            className="fade-card flex-shrink-0 h-screen flex items-center px-14"
            style={{ width: "100vw", maxWidth: "1200px" }}
          >
            <div className="flex flex-col gap-8 items-center w-full max-w-6xl mx-auto py-8">
              <div className="w-full md:w-1/2 flex justify-center flex-col gap-3">
                <h2 className="box-title text-4xl font-bold text-center text-nowrap">
                  {diamond.cutName}
                </h2>
                <img
                  src={diamond.image}
                  alt={diamond.cutName}
                  className="parallax-img w-full object-contain shadow-2xl select-none"
                  draggable="false"
                />
                <div className="description w-full py-5 mt-2 border-t border-t-black/30">
                  <p className="text-xl">{diamond.detail}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
