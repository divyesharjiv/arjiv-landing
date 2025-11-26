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
  useEffect(() => {
    /* =====================================================
       WORD SPLIT + H1 ANIMATIONS
    ====================================================== */

    const heading = document.querySelector(".hero_title");
    const words = heading.textContent.trim().split(" ");

    heading.innerHTML = words
      .map(
        (word) =>
          `<span class="word inline-block opacity-0 translate-y-6">${word}</span>`
      )
      .join(" ");

    const wordSpans = heading.querySelectorAll(".word");

    // 1. On load — fade + rise
    // 1. Trigger entrance only when H1 becomes visible
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

    /* =====================================================
       YOUR EXISTING SHAPE TRAIL ANIMATION (UNCHANGED)
    ====================================================== */

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

  useEffect(() => {
    const paths = gsap.utils.toArray(".hero_line_svg path");

    // Initial setup
    paths.forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, {
        strokeDasharray: len,
        strokeDashoffset: len,
        filter: "drop-shadow(0 0 12px rgba(255,255,255,0.25))",
      });
    });

    // Timeline for draw + glow
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero_line_svg",
        start: "top 90%",
        end: "bottom+=80% 30%",
        scrub: 1.3,
      },
    });

    tl.to(paths, {
      strokeDashoffset: 0,
      stagger: 0.50,
      ease: "power2.inOut",
    }).to(
      paths,
      {
        filter: "drop-shadow(0 0 24px rgba(255,255,255, 0.8))",
        yoyo: true,
        repeat: 2,
        duration: 2,
        ease: "sine.inOut",
      },
      "-=1.5"
    );
  }, []);

  return (
    <section className="flex items-center justify-center h-screen relative">
      <div className="container">
        <h1 className="hero_title text-center leading-[1.2] text-[clamp(2.5rem,5vw,13rem)]">
          HOUSE OF THE FANCY SHAPES DIAMOND
        </h1>

        <svg
          className="hero_line_svg absolute inset-0 -z-10"
          xmlns="http://www.w3.org/2000/svg"
          width="1662"
          height="990"
          fill="none"
        >
          <path
            stroke="#091717"
            stroke-opacity=".06"
            d="M975.115 513.355c-102.718-21.764-200.406-19.192-275.303 2.538-74.92 21.736-126.905 62.594-138.498 117.304-11.592 54.71 19.355 113.14 79.021 163.393 59.648 50.238 147.898 92.209 250.616 113.974 102.718 21.765 200.409 19.192 275.299-2.538 74.92-21.736 126.91-62.594 138.5-117.304 11.59-54.71-19.35-113.14-79.02-163.393-59.65-50.238-147.9-92.209-250.615-113.974Z"
          />
          <path
            stroke="url(#a)"
            d="M975.115 513.355c-102.718-21.764-200.406-19.192-275.303 2.538-74.92 21.736-126.905 62.594-138.498 117.304-11.592 54.71 19.355 113.14 79.021 163.393 59.648 50.238 147.898 92.209 250.616 113.974 102.718 21.765 200.409 19.192 275.299-2.538 74.92-21.736 126.91-62.594 138.5-117.304 11.59-54.71-19.35-113.14-79.02-163.393-59.65-50.238-147.9-92.209-250.615-113.974Z"
          />
          <path
            stroke="#091717"
            stroke-opacity=".08"
            d="M646.85 206.146c-178.535 50.126-331.746 125.418-435.13 206.609-51.693 40.596-90.909 82.65-114.61 123.751-23.702 41.098-31.872 81.206-21.556 117.951 10.317 36.746 38.169 66.74 79.798 89.496 41.631 22.758 97.005 38.256 162.274 46.014 130.535 15.516 300.546.059 479.081-50.066 178.536-50.126 331.753-125.417 435.133-206.608 51.69-40.596 90.91-82.651 114.61-123.752 23.7-41.098 31.87-81.206 21.55-117.951-10.31-36.746-38.16-66.74-79.79-89.496-41.63-22.758-97.01-38.256-162.28-46.014-130.532-15.515-300.544-.059-479.08 50.066Z"
          />
          <path
            stroke="url(#b)"
            d="M646.85 206.146c-178.535 50.126-331.746 125.418-435.13 206.609-51.693 40.596-90.909 82.65-114.61 123.751-23.702 41.098-31.872 81.206-21.556 117.951 10.317 36.746 38.169 66.74 79.798 89.496 41.631 22.758 97.005 38.256 162.274 46.014 130.535 15.516 300.546.059 479.081-50.066 178.536-50.126 331.753-125.417 435.133-206.608 51.69-40.596 90.91-82.651 114.61-123.752 23.7-41.098 31.87-81.206 21.55-117.951-10.31-36.746-38.16-66.74-79.79-89.496-41.63-22.758-97.01-38.256-162.28-46.014-130.532-15.515-300.544-.059-479.08 50.066Z"
          />
          <path
            stroke="#091717"
            stroke-opacity=".08"
            d="M1055.74 189.189c-72.805 52.099-128.894 112.947-160.736 169.189-31.864 56.282-39.356 107.773-15.344 141.329 24.013 33.556 75.167 43.077 138.72 31.078 63.51-11.991 139.2-45.446 212-97.544 72.81-52.099 128.9-112.948 160.74-169.19 31.86-56.282 39.35-107.772 15.34-141.328-24.01-33.555-75.17-43.079-138.72-31.08-63.51 11.991-139.2 45.448-212 97.546Z"
          />
          <path
            stroke="url(#c)"
            d="M1055.74 189.189c-72.805 52.099-128.894 112.947-160.736 169.189-31.864 56.282-39.356 107.773-15.344 141.329 24.013 33.556 75.167 43.077 138.72 31.078 63.51-11.991 139.2-45.446 212-97.544 72.81-52.099 128.9-112.948 160.74-169.19 31.86-56.282 39.35-107.772 15.34-141.328-24.01-33.555-75.17-43.079-138.72-31.08-63.51 11.991-139.2 45.448-212 97.546Z"
          />
          <path
            stroke="#091717"
            stroke-opacity=".06"
            d="M977.974 642.246c155.786 84.736 303.496 149.15 416.376 184.797 56.44 17.825 104.14 28.449 139.79 30.833 17.82 1.193 32.59.323 43.92-2.719 11.33-3.042 19.16-8.239 23.2-15.657 4.03-7.419 4.14-16.815.54-27.979-3.61-11.165-10.9-24.041-21.59-38.354-21.37-28.624-56.21-62.901-101.84-100.597-91.26-75.387-225.6-164.387-381.39-249.122-155.78-84.735-303.491-149.149-416.367-184.796-56.441-17.825-104.149-28.449-139.789-30.833-17.822-1.193-32.597-.323-43.928 2.719-11.33 3.042-19.158 8.239-23.193 15.657-4.036 7.419-4.144 16.815-.541 27.979 3.603 11.165 10.901 24.041 21.586 38.354 21.369 28.624 56.21 62.901 101.844 100.597 91.26 75.387 225.598 164.387 381.382 249.121Z"
          />
          <path
            stroke="url(#d)"
            d="M977.974 642.246c155.786 84.736 303.496 149.15 416.376 184.797 56.44 17.825 104.14 28.449 139.79 30.833 17.82 1.193 32.59.323 43.92-2.719 11.33-3.042 19.16-8.239 23.2-15.657 4.03-7.419 4.14-16.815.54-27.979-3.61-11.165-10.9-24.041-21.59-38.354-21.37-28.624-56.21-62.901-101.84-100.597-91.26-75.387-225.6-164.387-381.39-249.122-155.78-84.735-303.491-149.149-416.367-184.796-56.441-17.825-104.149-28.449-139.789-30.833-17.822-1.193-32.597-.323-43.928 2.719-11.33 3.042-19.158 8.239-23.193 15.657-4.036 7.419-4.144 16.815-.541 27.979 3.603 11.165 10.901 24.041 21.586 38.354 21.369 28.624 56.21 62.901 101.844 100.597 91.26 75.387 225.598 164.387 381.382 249.121Z"
          />
          <defs>
            <radialGradient
              id="a"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(35.3685 201.408 320.038 -68.5752 688.249 561)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#E1385A" />
              <stop offset="1" stop-color="#944454" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="b"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(755.75 -387.904 -44.7808 -2054.37 54.041 659.194)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#1FB8CD" />
              <stop offset="1" stop-color="#BADEDD" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="c"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(273.567 -308.552 -426.687 -1021.31 870.417 505.485)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#1FB8CD" />
              <stop offset="1" stop-color="#BADEDD" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="d"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(668.666 569.822 -271.555 -535.687 541.196 222.245)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".379" stop-color="#FFD2A6" />
              <stop offset="1" stop-color="#FFD2A6" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg>

        <div>
          {images.map((src, i) => (
            <img
              key={i}
              className="shapes_picture fixed opacity-0 w-16 aspect-square object-contain"
              src={src}
              alt=""
            />
          ))}
        </div>
      </div>
    </section>
  );
}
