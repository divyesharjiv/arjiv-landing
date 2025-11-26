import { useEffect } from "react";
import gsap from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import IMG1 from "/img/shapeFrames/1.svg";
import IMG2 from "/img/shapeFrames/2.svg";
import IMG3 from "/img/shapeFrames/3.svg";
import IMG4 from "/img/shapeFrames/4.svg";
import IMG5 from "/img/shapeFrames/5.svg";
import IMG6 from "/img/shapeFrames/6.svg";
import IMG7 from "/img/shapeFrames/7.svg";
import IMG8 from "/img/shapeFrames/8.svg";
import IMG9 from "/img/shapeFrames/9.svg";
import IMG10 from "/img/shapeFrames/10.svg";
import IMG11 from "/img/shapeFrames/11.svg";
import IMG12 from "/img/shapeFrames/12.svg";

gsap.registerPlugin(CSSRulePlugin, ScrollTrigger);

const images = [
  IMG1,
  IMG2,
  IMG3,
  IMG4,
  IMG5,
  IMG6,
  IMG7,
  IMG8,
  IMG9,
  IMG10,
  IMG11,
  IMG12,
];

export default function HeroCursorFollower() {
  // Shape OnMove Effect
  useEffect(() => {
    const heading = document.querySelector(".hero_title");
    const words = heading.textContent.trim().split(" ");

    heading.innerHTML = words
      .map(
        (word) =>
          `<span class="word inline-block opacity-0 translate-y-6">${word}</span>`
      )
      .join(" ");

    const wordSpans = heading.querySelectorAll(".word");

    ScrollTrigger.batch(wordSpans, {
      onEnter: () => {
        gsap.to(wordSpans, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.3,
        });
      },
      once: false, // play only once
      start: "top 100%", // triggers when heading enters viewport
    });

    let imgElements = gsap.utils.toArray(".shapes_picture");
    let gap = 165;
    let index = 0;
    let wrapper = gsap.utils.wrap(0, imgElements.length);
    gsap.defaults({ duration: 1 });

    let mousePos = { x: 0, y: 0 };
    let lastMousePos = mousePos;
    let cachedMousePos = mousePos;

    const playAnimation = (img) => {
      let tl = gsap.timeline();
      tl.from(img, { scale: 0.8, duration: 0.5 }, "<").to(
        img,
        {
          y: "110vh",
          rotation: "random([270, -270])",
          ease: "power4.in",
          duration: 1.3,
          opacity: 0,
          filter: "blur(3px)",
        },
        0
      );
    };

    const animateImage = () => {
      let wrappedIndex = wrapper(index);
      let img = imgElements[wrappedIndex];

      gsap.killTweensOf(img);
      gsap.set(img, { clearProps: "all" });

      gsap.set(img, {
        opacity: 1,
        left: mousePos.x,
        top: mousePos.y,
        xPercent: -50,
        yPercent: -50,
      });

      playAnimation(img);
      index++;
    };

    function ImageTrail() {
      let travelDistance = Math.hypot(
        lastMousePos.x - mousePos.x,
        lastMousePos.y - mousePos.y
      );

      cachedMousePos.x = gsap.utils.interpolate(
        cachedMousePos.x || mousePos.x,
        mousePos.x,
        0.8
      );
      cachedMousePos.y = gsap.utils.interpolate(
        cachedMousePos.y || mousePos.y,
        mousePos.y,
        0.5
      );

      if (travelDistance > gap) {
        animateImage();
        lastMousePos = mousePos;
      }
    }

    const onMouseMove = (e) => {
      mousePos = { x: e.x, y: e.y };
    };

    window.addEventListener("mousemove", onMouseMove);
    gsap.ticker.add(ImageTrail);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ImageTrail);
    };
  }, []);

  // Waves vector Effect
  useEffect(() => {
    const paths = gsap.utils.toArray(".hero_line_svg path");

    // Initial setup
    paths.forEach((p) => {
      const xTo = p.getTotalLength();
      gsap.set(p, {
        strokeDasharray: xTo,
        strokeDashoffset: xTo,
        filter: "drop-shadow(0 0 12px rgba(255,255,255,0.25))",
      });
    });

    // Timeline for draw + glow
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero_line_svg",
        start: "top 60%",
        end: "bottom+=95% 10%",
        scrub: 1.5,
      },
    });

    tl.to(paths, {
      strokeDashoffset: 0,
      stagger: 0.12,
      ease: "power2.inOut",
    }).to(
      paths,
      {
        yoyo: true,
        repeat: 2,
        duration: 2,
        ease: "sine.inOut",
        opacity: 0.8,
      },
      "-=1.5"
    );
  }, []);

  return (
    <section className="flex items-center justify-center h-screen relative overflow-hidden">
      <div className="container">
        <h1 className="hero_title text-center leading-[1.2] text-[clamp(2.5rem,5vw,13rem)]">
          HOUSE OF THE FANCY SHAPES DIAMOND
          {/* Diamond Manufacturer Since 1985 */}
        </h1>

        <svg className="hero_line_svg absolute inset-0 -z-10 opacity-65 m-auto" width="1459" height="1004" viewBox="0 0 1459 1004" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M558.213 250.097C712.24 197.634 866.481 178.191 991.327 189.147C1116.22 200.107 1211.5 241.461 1247.93 310.408C1284.36 379.355 1255.19 463.1 1178.21 542.817C1101.26 622.507 976.661 698.04 822.635 750.503C668.608 802.966 514.367 822.41 389.52 811.453C264.631 800.493 169.35 759.139 132.918 690.192C96.4851 621.245 125.662 537.5 202.636 457.783C279.584 378.094 404.187 302.56 558.213 250.097Z" stroke="url(#paint0_linear_38_35)"/>
          <defs>
            <linearGradient id="paint0_linear_38_35" x1="557.98" y1="249.655" x2="738.511" y2="779.678" gradientUnits="userSpaceOnUse">
              <stop stop-color="#B9C78D"/>
              <stop offset="0.927885" stop-color="#A2A2C3"/>
            </linearGradient>
          </defs>
        </svg>

        <div>
          {images.map((src, i) => (
            <img
              key={i}
              className="shapes_picture absolute opacity-0 w-16 aspect-square object-contain"
              src={src}
              alt="Shape"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
